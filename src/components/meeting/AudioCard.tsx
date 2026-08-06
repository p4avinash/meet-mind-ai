interface AudioCardProps {
  audioUrl: string;
}

const AudioCard = ({ audioUrl }: AudioCardProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Meeting Recording</h2>

      <audio controls src={audioUrl} className="mt-6 w-full" />
    </section>
  );
};

export default AudioCard;
