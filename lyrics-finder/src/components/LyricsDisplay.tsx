import { useLyricsStore } from "@/store/lyricsStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import FullLyricsModal from "@/components/FullLyricsModal.tsx";

export default function LyricsDisplay() {
    const { lyrics, loading, error, addToFavorites, artist, title } = useLyricsStore();

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!lyrics) return null;

    const shareLink = `${window.location.origin}/lyrics?artist=${encodeURIComponent(
        artist
    )}&title=${encodeURIComponent(title)}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            toast("Link copied!", {
                description: "Share it with others 🎶",
            });
        } catch {
            toast.error("Copy failed. Please try again.");
        }
    };

    const tweetURL = `https://twitter.com/intent/tweet?text=Check out lyrics for ${title} by ${artist}: ${encodeURIComponent(
        shareLink
    )}`;
    const whatsappURL = `https://wa.me/?text=Check out lyrics for ${title} by ${artist}: ${encodeURIComponent(
        shareLink
    )}`;

    const downloadLyrics = () => {
        const filename = `${artist}-${title}.txt`;
        const blob = new Blob([lyrics], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };


    return (
        <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
                <Button onClick={addToFavorites} variant={"outline"}>❤️ Add to Favorites</Button>
                <Button variant="outline" onClick={copyToClipboard}>🔗 Copy Link</Button>
                <a href={tweetURL} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary">🐦 Tweet</Button>
                </a>
                <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary">📱 WhatsApp</Button>
                </a>
            </div>
            <pre className="whitespace-pre-wrap p-4 bg-gray-100 dark:bg-gray-800 rounded">
        {lyrics}
      </pre>
            <Button variant="outline" onClick={downloadLyrics}>
                ⬇️ Export to .txt
            </Button>
            <FullLyricsModal />
        </div>
    );
}
