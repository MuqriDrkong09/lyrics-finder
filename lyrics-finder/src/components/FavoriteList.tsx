import { useLyricsStore } from "@/store/lyricsStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import {Trash2} from "lucide-react";

export default function FavoriteList() {
    const { favorites, removeFavorite } = useLyricsStore();

    const handleCopy = (artist: string, title: string) => {
        const link = `${window.location.origin}/lyrics?artist=${encodeURIComponent(
            artist
        )}&title=${encodeURIComponent(title)}`;
        navigator.clipboard.writeText(link);
        toast("Link copied!", {
            description: "Share it with others 🎶",
        });
    };

    if (favorites.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">⭐ Favorite Lyrics</h2>
            <ul className="space-y-6">
                {favorites.map((fav, idx) => (
                    <li key={idx} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
                        <div className="flex justify-between items-center">
                            <strong>{fav.artist} - {fav.title}</strong>
                            <Button size="sm" variant="ghost" onClick={() => handleCopy(fav.artist, fav.title)}>
                                Copy Link
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeFavorite(idx)}
                                className="text-red-500"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <pre className="whitespace-pre-wrap mt-2 text-sm">{fav.lyrics}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}
