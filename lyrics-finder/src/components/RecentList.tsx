import { useLyricsStore } from "@/store/lyricsStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import {Trash2} from "lucide-react";

export default function RecentList() {
    const { recent, setArtist, setTitle, fetchLyrics, removeRecent } = useLyricsStore();

    const handleCopy = (artist: string, title: string) => {
        const link = `${window.location.origin}/lyrics?artist=${encodeURIComponent(
            artist
        )}&title=${encodeURIComponent(title)}`;
        navigator.clipboard.writeText(link);
        toast("Link copied!", {
            description: "Share it with others 🎶",
        });
    };

    if (recent.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Recent Searches</h2>
            <ul className="space-y-2">
                {recent.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2">
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => {
                                setArtist(item.artist);
                                setTitle(item.title);
                                fetchLyrics(artistName, songTitle);
                            }}
                        >
                            {item.artist} - {item.title}
                        </button>
                        <Button size="sm" variant="ghost" onClick={() => handleCopy(item.artist, item.title)}>
                            Copy Link
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeRecent(idx)}
                            className="text-red-500"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
