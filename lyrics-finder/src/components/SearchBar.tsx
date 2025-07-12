import { useState } from "react";
import { useLyricsStore } from "@/store/lyricsStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSuggestions } from "@/hooks/useSuggestions";

export default function SearchBar() {
    const { setArtist, setTitle, fetchLyrics } = useLyricsStore();
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = useSuggestions(query);

    const handleSuggestionClick = (suggestion: string) => {
        const [artistName, songTitle] = suggestion.split(" - ");
        setArtist(artistName);
        setTitle(songTitle);
        setQuery(`${artistName} - ${songTitle}`);
        setShowSuggestions(false); // ✅ close suggestions immediately

        // ✅ fetch lyrics after updating artist/title
        fetchLyrics(artistName, songTitle); // pass directly
    };

    return (
        <div className="relative space-y-2 max-w-md mx-auto w-full">
            <Input
                placeholder="Type song or artist..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white dark:bg-gray-900 border rounded shadow z-10 w-full max-h-48 overflow-y-auto">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            onMouseDown={(e) => {
                                e.preventDefault(); // 🛡️ ensure blur doesn't fire before click
                                handleSuggestionClick(s);
                            }}
                            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}

            <Button
                onClick={() => {
                    const [artistName, songTitle] = query.split(" - ");
                    if (artistName && songTitle) {
                        setArtist(artistName);
                        setTitle(songTitle);
                        fetchLyrics(artistName, songTitle);
                    }
                }}
                className="w-full"
            >
                Search
            </Button>
        </div>
    );
}
