import { useState, useEffect } from "react";
import axios from "axios";

export const useSuggestions = (query: string) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const fetch = async () => {
            if (query.length < 3) return;
            try {
                const res = await axios.get(
                    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=5`
                );
                const titles = res.data.results.map((item: any) => `${item.artistName} - ${item.trackName}`);
                setSuggestions(titles);
            } catch {
                setSuggestions([]);
            }
        };
        fetch();
    }, [query]);

    return suggestions;
};
