interface ProcessingStatusProps {
  status: string;
}

const statusText: Record<string, string> = {
  uploaded: "Uploading meeting...",
  transcribing: "Generating transcript...",
  summarizing: "Generating summary...",
  generating_action_items: "Generating action items...",
  sending_email: "Sending email...",
};

const ProcessingStatus = ({ status }: ProcessingStatusProps) => {
  if (status === "completed" || status === "failed") {
    return null;
  }

  return (
    <div className="mb-6 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 animate-pulse rounded-full bg-violet-500" />

        <span className="font-medium text-violet-300">
          {statusText[status] ?? "Processing..."}
        </span>
      </div>
    </div>
  );
};

export default ProcessingStatus;
