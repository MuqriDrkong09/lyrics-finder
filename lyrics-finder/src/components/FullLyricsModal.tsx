import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLyricsStore } from "@/store/lyricsStore";

export default function FullLyricsModal() {
    const { lyrics, artist, title } = useLyricsStore();

    if (!lyrics) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">📰 View Full Lyrics</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        {artist} - {title}
                    </DialogTitle>
                </DialogHeader>
                <pre className="whitespace-pre-wrap text-sm">{lyrics}</pre>
            </DialogContent>
        </Dialog>
    );
}
