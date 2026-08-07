import { HiClipboardDocument } from "react-icons/hi2";

import Button from "@/components/common/button/Button";
import copyToClipboard from "@/utils/copyToClipboard";

interface ActionItemsCardProps {
  actionItems: string[];
  status: string;
  onGenerate: () => void;
}

const ActionItemsCard = ({
  actionItems,
  status,
  onGenerate,
}: ActionItemsCardProps) => {
  const isProcessing =
    status === "transcribing" ||
    status === "summarizing" ||
    status === "generating_action_items" ||
    status === "sending_email";

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Action Items</h2>

        {!!actionItems?.length && (
          <button
            onClick={() =>
              copyToClipboard(actionItems.join("\n"), "Action items copied!")
            }
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-violet-400"
          >
            <HiClipboardDocument size={22} />
          </button>
        )}
      </div>

      {actionItems?.length ? (
        <ul className="mt-4 space-y-3">
          {actionItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-zinc-300">
              <span className="mt-1 text-violet-400">✓</span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : isProcessing ? (
        <p className="mt-4 text-zinc-400">
          Action items are being generated...
        </p>
      ) : (
        <>
          <p className="mt-4 text-zinc-400">No action items generated yet.</p>

          <Button onClick={onGenerate} className="mt-6">
            Generate Action Items
          </Button>
        </>
      )}
    </section>
  );
};

export default ActionItemsCard;
