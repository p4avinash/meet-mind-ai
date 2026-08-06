import Button from "@/components/common/button/Button";

interface SummaryCardProps {
  summary: string;
  loading: boolean;
  onGenerate: () => void;
}

const SummaryCard = ({ summary, loading, onGenerate }: SummaryCardProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Summary</h2>

      {summary ? (
        <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
          {summary}
        </p>
      ) : (
        <>
          <p className="mt-4 text-zinc-400">
            Summary has not been generated yet.
          </p>

          <Button onClick={onGenerate} disabled={loading} className="mt-6">
            {loading ? "Generating Summary..." : "Generate Summary"}
          </Button>
        </>
      )}
    </section>
  );
};

export default SummaryCard;
