interface TranscriptCardProps {
  transcript: string;
}

const TranscriptCard = ({ transcript }: TranscriptCardProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Transcript</h2>

      <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
        {transcript || "Transcript not generated yet."}
      </p>
    </section>
  );
};

export default TranscriptCard;
