import { HiExclamationTriangle } from "react-icons/hi2";

const BrowserReminder = () => {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 text-amber-300/90 text-left">
      <HiExclamationTriangle size={18} className="shrink-0 text-amber-400" />
      <div className="text-xs leading-normal">
        <span className="font-semibold text-amber-200">
          Keep this tab open while recording.
        </span>{" "}
        You may switch to your Google Meet or Zoom tab. Do not close or refresh this page until finished.
      </div>
    </div>
  );
};

export default BrowserReminder;
