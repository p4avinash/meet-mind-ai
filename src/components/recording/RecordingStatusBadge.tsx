interface RecordingStatusBadgeProps {
  isRecording: boolean;
  isUploading: boolean;
}

const RecordingStatusBadge = ({
  isRecording,
  isUploading,
}: RecordingStatusBadgeProps) => {
  if (isUploading) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-400">
        <span className="h-2 w-2 animate-ping rounded-full bg-violet-400" />
        <span>Uploading Recording...</span>
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 shadow-sm shadow-red-500/10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
        <span>Live Recording</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-4 py-1.5 text-xs font-semibold text-zinc-400">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      <span>Ready to Record</span>
    </div>
  );
};

export default RecordingStatusBadge;
