import Button from "@/components/common/button/Button";

interface ActionItemsCardProps {
  actionItems: string[];
  loading: boolean;
  onGenerate: () => void;
}

const ActionItemsCard = ({
  actionItems,
  loading,
  onGenerate,
}: ActionItemsCardProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold text-white">Action Items</h2>

      {actionItems?.length ? (
        <ul className="mt-4 space-y-3">
          {actionItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-zinc-300">
              <span className="mt-1 text-violet-400">✓</span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="mt-4 text-zinc-400">No action items generated yet.</p>

          <Button onClick={onGenerate} disabled={loading} className="mt-6">
            {loading ? "Generating..." : "Generate Action Items"}
          </Button>
        </>
      )}
    </section>
  );
};

export default ActionItemsCard;
