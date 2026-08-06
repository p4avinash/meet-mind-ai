import { HiClipboardDocument } from "react-icons/hi2";

import Button from "@/components/common/button/Button";
import copyToClipboard from "@/utils/copyToClipboard";

interface SummaryCardProps {
  summary: string;
  loading: boolean;
  onGenerate: () => void;
}

const SummaryCard = ({ summary, loading, onGenerate }: SummaryCardProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Summary</h2>

        {!!summary && (
          <button
            onClick={() => copyToClipboard(summary, "Summary copied!")}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-violet-400"
          >
            <HiClipboardDocument size={22} />
          </button>
        )}
      </div>

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
