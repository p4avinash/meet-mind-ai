import { HiExclamationTriangle } from "react-icons/hi2";

const BrowserReminder = () => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-300/90">
      <HiExclamationTriangle size={22} className="mt-0.5 shrink-0 text-amber-400" />
      <div className="text-xs leading-relaxed sm:text-sm">
        <span className="font-semibold text-amber-200">
          Keep this tab open while recording.
        </span>{" "}
        You may switch to your Google Meet or Zoom tab. Do not close or refresh this page until your recording is completed and uploaded.
      </div>
    </div>
  );
};

export default BrowserReminder;
