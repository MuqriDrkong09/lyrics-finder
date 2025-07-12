import axios from "axios";
import { useState } from "react";

export const useLyrics = () => {
    const [lyrics, setLyrics] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const getLyrics = async (artist: string, title: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
            setLyrics(res.data.lyrics);
        } catch (error) {
            setLyrics("Lyrics not found.");
        } finally {
            setLoading(false);
        }
    };

    return { lyrics, getLyrics, loading };
};
