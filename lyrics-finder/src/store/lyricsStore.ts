import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

type Lyrics = {
    artist: string;
    title: string;
    lyrics: string;
};

type LyricsState = {
    artist: string;
    title: string;
    lyrics: string;
    loading: boolean;
    error: string;
    recent: Lyrics[];
    favorites: Lyrics[];
    theme: 'light' | 'dark';

    setArtist: (artist: string) => void;
    setTitle: (title: string) => void;
    fetchLyrics: (artistName: string, songTitle: string) => Promise<void>;
    toggleTheme: () => void;
    addToFavorites: () => void;
    removeRecent: (index: number) => void;
    removeFavorite: (index: number) => void;
    resetLyrics: () => void;
    resetAll: () => void;
};

export const useLyricsStore = create<LyricsState>()(
    persist(
        (set, get) => ({
            artist: '',
            title: '',
            lyrics: '',
            loading: false,
            error: '',
            recent: [],
            favorites: [],
            theme: 'light',

            setArtist: (artist) => set({ artist }),
            setTitle: (title) => set({ title }),

            fetchLyrics: async (artistParam?: string, titleParam?: string) => {
                const { recent } = get();
                const artist = artistParam ?? get().artist;
                const title = titleParam ?? get().title;

                if (!artist || !title) return;

                set({ loading: true, lyrics: '', error: '', artist, title }); // update state
                try {
                    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
                    const lyrics = response.data.lyrics;

                    const search: Lyrics = { artist, title, lyrics };

                    const isDuplicate = recent.some(
                        (item) => item.artist === artist && item.title === title
                    );
                    const updatedRecent = isDuplicate ? recent : [search, ...recent.slice(0, 4)];

                    set({ lyrics, recent: updatedRecent });
                } catch (err) {
                    set({ error: 'Lyrics not found.', lyrics: '' });
                } finally {
                    set({ loading: false });
                }
            },

            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),

            addToFavorites: () => {
                const { artist, title, lyrics, favorites } = get();
                if (!lyrics) return;

                const isDuplicate = favorites.some(
                    (item) => item.artist === artist && item.title === title
                );
                if (!isDuplicate) {
                    set({ favorites: [...favorites, { artist, title, lyrics }] });
                }
            },
            removeRecent: (index: number) =>
                set((state) => ({
                    recent: state.recent.filter((_, i) => i !== index),
                })),
            removeFavorite: (index: number) =>
                set((state) => ({
                    favorites: state.favorites.filter((_, i) => i !== index),
                })),
            resetLyrics: () => set({ lyrics: "", error: "" }),
            resetAll: () => set({
                artist: "",
                title: "",
                lyrics: "",
                error: "",
                loading: false,
            })
        }),
        {
            name: 'lyrics-storage',
        }
    )
);
