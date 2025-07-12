import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLyricsStore } from "@/store/lyricsStore";
import SearchBar from "@/components/SearchBar";
import LyricsDisplay from "@/components/LyricsDisplay";
import RecentList from "@/components/RecentList";
import FavoriteList from "@/components/FavoriteList";
import { Button } from "@/components/ui/button";
import "./App.css";
import {Toaster} from "@/components/ui/sonner.tsx";

export default function App() {
    const [searchParams] = useSearchParams();
    const { theme, toggleTheme, setArtist, setTitle, fetchLyrics, resetLyrics } = useLyricsStore();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    useEffect(() => {
        const artist = searchParams.get("artist");
        const title = searchParams.get("title");
        if (artist && title) {
            setArtist(artist);
            setTitle(title);
            fetchLyrics(artist, title);
        } else {
            resetLyrics();
        }
    }, [searchParams]);

    return (
        <main className="min-h-screen p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">🎶 Lyrics Finder</h1>
                <Button variant="outline" onClick={toggleTheme}>
                    Toggle Theme
                </Button>
            </div>
            <SearchBar />
            <LyricsDisplay />
            <RecentList />
            <FavoriteList />
            <Toaster />
        </main>
    );
}
