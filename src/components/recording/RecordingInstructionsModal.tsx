import { useState } from "react";
import {
  HiCheckCircle,
  HiExclamationTriangle,
  HiLockClosed,
  HiGlobeAlt,
  HiSpeakerWave,
  HiPlayCircle,
  HiXMark,
} from "react-icons/hi2";
import Button from "@/components/common/button/Button";

interface RecordingInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (dontShowAgain: boolean) => void;
}

const RecordingInstructionsModal = ({
  isOpen,
  onClose,
  onContinue,
}: RecordingInstructionsModalProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    onContinue(dontShowAgain);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-float-in">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/80 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <HiXMark size={22} />
        </button>

        {/* Modal Header */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300">
            <span>🎙️ Setup Guide</span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Before you start recording
          </h2>

          <p className="mt-1.5 text-sm text-zinc-400">
            To generate accurate AI transcripts and meeting summaries, please follow these steps.
          </p>
        </div>

        {/* CSS/HTML Chrome Share Dialog Illustration */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 text-xs font-medium text-zinc-400">
            <span>Share your screen & tab</span>
            <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
              Chrome Native Dialog
            </span>
          </div>

          {/* Dialog Tabs Mockup */}
          <div className="mt-3 flex gap-2 border-b border-zinc-800 text-xs">
            <div className="border-b-2 border-transparent px-3 py-1.5 text-zinc-600">
              Entire Screen
            </div>
            <div className="border-b-2 border-transparent px-3 py-1.5 text-zinc-600">
              Window
            </div>
            <div className="relative border-b-2 border-violet-500 px-3 py-1.5 font-bold text-violet-400">
              <span>Chrome Tab</span>
              <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] text-emerald-400">
                ✓ Select This
              </span>
            </div>
          </div>

          {/* Tab Audio Toggle Mockup */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            <div className="flex items-center gap-2 font-medium">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500 text-zinc-950 font-bold">
                ✓
              </span>
              <span>Share tab audio</span>
            </div>

            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              MUST ENABLE
            </span>
          </div>
        </div>

        {/* 3 Step Instruction Cards */}
        <div className="mt-6 space-y-3">
          {/* Step 1 */}
          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition hover:border-zinc-700/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <HiGlobeAlt size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs font-bold text-violet-300">
                  Step 1
                </span>
                <h4 className="text-sm font-semibold text-white">
                  Select <span className="text-violet-400">Chrome Tab</span>
                </h4>
              </div>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                Choose <span className="font-semibold text-zinc-200">Chrome Tab</span> at the top. Do <span className="text-red-400 font-medium">NOT</span> select Entire Screen or Window.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition hover:border-zinc-700/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <HiSpeakerWave size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                  Step 2
                </span>
                <h4 className="text-sm font-semibold text-white">
                  Enable <span className="text-emerald-400">✔ Share tab audio</span>
                </h4>
              </div>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                Check the <span className="font-semibold text-zinc-200">Share tab audio</span> checkbox at the bottom. This captures participant voices.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition hover:border-zinc-700/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <HiPlayCircle size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs font-bold text-cyan-300">
                  Step 3
                </span>
                <h4 className="text-sm font-semibold text-white">
                  Click <span className="text-cyan-400">Share</span>
                </h4>
              </div>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                Click Share. MeetMind AI will start recording and processing automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
          <HiExclamationTriangle size={20} className="mt-0.5 shrink-0 text-amber-400" />
          <span>
            <strong className="font-semibold text-amber-300">Warning:</strong> If you don't enable <span className="underline font-semibold">Share tab audio</span>, your meeting participants' voices cannot be captured.
          </span>
        </div>

        {/* Privacy Box */}
        <div className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3.5 text-xs text-zinc-400">
          <HiLockClosed size={18} className="mt-0.5 shrink-0 text-violet-400" />
          <span>
            <strong className="font-semibold text-zinc-300">Privacy Guarantee:</strong> MeetMind AI only records the selected tab's audio. Your camera and full screen are never recorded.
          </span>
        </div>

        {/* Footer Actions & Checkbox */}
        <div className="mt-6 flex flex-col gap-4 border-t border-zinc-800 pt-5">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-400 hover:text-zinc-200">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-violet-600 focus:ring-violet-500 focus:ring-offset-zinc-900"
            />
            <span>Don't show this guide again</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={onClose}
              type="button"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:bg-zinc-700 hover:text-white"
            >
              Cancel
            </button>

            <Button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 h-auto py-3 text-sm font-bold shadow-lg shadow-violet-600/30"
            >
              <span>Continue & Share Tab</span>
              <HiCheckCircle size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingInstructionsModal;
