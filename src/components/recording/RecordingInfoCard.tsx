import { HiClock, HiComputerDesktop, HiSignal } from "react-icons/hi2";

interface RecordingInfoCardProps {
  isRecording: boolean;
  isUploading: boolean;
  formattedTime: string;
}

const RecordingInfoCard = ({
  isRecording,
  isUploading,
  formattedTime,
}: RecordingInfoCardProps) => {
  const getStatusText = () => {
    if (isUploading) return "Uploading & Processing";
    if (isRecording) return "Active Recording";
    return "Standby";
  };

  const getStatusColor = () => {
    if (isUploading) return "text-violet-400";
    if (isRecording) return "text-red-400";
    return "text-emerald-400";
  };

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 sm:grid-cols-3">
      {/* Recording Source */}
      <div className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3.5">
        <div className="rounded-lg bg-violet-500/10 p-2.5 text-violet-400">
          <HiComputerDesktop size={20} />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500">Recording Source</p>
          <p className="mt-0.5 text-sm font-semibold text-zinc-200">
            Chrome Tab Audio
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3.5">
        <div className="rounded-lg bg-red-500/10 p-2.5 text-red-400">
          <HiSignal size={20} />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500">Current Status</p>
          <p className={`mt-0.5 text-sm font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3.5">
        <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-400">
          <HiClock size={20} />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500">Elapsed Duration</p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-200">
            {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordingInfoCard;
