import { HiClipboardDocument } from "react-icons/hi2";

import copyToClipboard from "@/utils/copyToClipboard";

interface TranscriptCardProps {
  transcript: string;
}

const TranscriptCard = ({ transcript }: TranscriptCardProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Transcript</h2>

        {!!transcript && (
          <button
            onClick={() => copyToClipboard(transcript, "Transcript copied!")}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-violet-400"
          >
            <HiClipboardDocument size={22} />
          </button>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
        {transcript || "Transcript not generated yet."}
      </p>
    </section>
  );
};

export default TranscriptCard;
