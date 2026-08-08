import { useState } from "react";
import { HiMiniMicrophone, HiStop, HiArrowPath } from "react-icons/hi2";

import Button from "@/components/common/button/Button";
import useRecorder from "@/hooks/useRecorder";
import WaveAnimation from "./WaveAnimation";
import RecordingStatusBadge from "./RecordingStatusBadge";
import RecordingInfoCard from "./RecordingInfoCard";
import BrowserReminder from "./BrowserReminder";
import RecordingInstructionsModal from "./RecordingInstructionsModal";
import DemoModeHelperText from "@/components/common/DemoModeHelperText";

const RecordingControls = () => {
  const {
    isRecording,
    seconds,
    audioURL,
    isUploading,
    startRecording,
    stopRecording,
    formatTime,
    deliveryEmail,
    setDeliveryEmail,
  } = useRecorder();

  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const formattedTime = formatTime(seconds);

  const handleStartRecordingClick = () => {
    const isDismissed =
      localStorage.getItem("recordingInstructionsDismissed") === "true";
    if (isDismissed) {
      startRecording();
    } else {
      setShowInstructionsModal(true);
    }
  };

  const handleModalContinue = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      localStorage.setItem("recordingInstructionsDismissed", "true");
    }
    setShowInstructionsModal(false);
    startRecording();
  };

  const handleModalClose = () => {
    setShowInstructionsModal(false);
  };

  return (
    <>
      <div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
        <div className="flex flex-col items-center">
          {/* Live Status Badge */}
          <div className="mb-4">
            <RecordingStatusBadge
              isRecording={isRecording}
              isUploading={isUploading}
            />
          </div>

          {/* UPLOADING STATE UI */}
          {isUploading ? (
            <div className="my-6 flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
                <HiArrowPath size={30} className="animate-spin text-violet-400" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                Uploading Recording...
              </h3>

              <p className="mt-1.5 max-w-sm text-xs text-zinc-400">
                Preparing AI transcription and meeting summary pipeline.
                Please do not close this window.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                Processing audio file & generating insights...
              </div>
            </div>
          ) : isRecording ? (
            /* ACTIVE RECORDING UI */
            <div className="w-full max-w-2xl space-y-3.5 text-center">
              {/* Wave Visualizer */}
              <div className="flex justify-center">
                <WaveAnimation isRecording={isRecording} />
              </div>

              {/* Large Primary Focus Timer */}
              <div className="flex flex-col items-center justify-center">
                <div className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {formattedTime}
                </div>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">
                  Live Recording Time
                </p>
              </div>

              {/* Recording Info Card */}
              <RecordingInfoCard
                isRecording={isRecording}
                isUploading={isUploading}
                formattedTime={formattedTime}
              />

              {/* Browser Reminder Alert */}
              <BrowserReminder />

              {/* Stop Action Button */}
              <div className="flex justify-center pt-0.5">
                <Button
                  onClick={stopRecording}
                  aria-label="Stop recording meeting"
                  className="group relative flex items-center gap-2.5 bg-red-600 px-7 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:bg-red-500 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <HiStop size={18} className="transition-transform group-hover:scale-110" />
                  <span>Stop Recording</span>
                </Button>
              </div>
            </div>
          ) : (
            /* READY / IDLE STATE UI */
            <div className="w-full max-w-lg text-center">
              {/* Icon / Hero illustration */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/20 to-violet-900/10 shadow-xl shadow-violet-500/10 transition-transform duration-300 hover:scale-105">
                <HiMiniMicrophone size={32} className="text-violet-400" />
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white">
                Ready to Record
              </h3>

              <p className="mx-auto mt-1.5 max-w-md text-xs sm:text-sm text-zinc-400">
                Share your Chrome Tab with audio enabled to record your meeting. AI will automatically summarize and transcribe it.
              </p>

              {/* Start Action Button */}
              <div className="mt-5 flex justify-center">
                <Button
                  onClick={handleStartRecordingClick}
                  disabled={!deliveryEmail.trim() || !deliveryEmail.includes("@")}
                  aria-label="Start recording meeting tab"
                  className="group relative flex items-center gap-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiMiniMicrophone size={18} className="transition-transform group-hover:scale-110" />
                  <span>Start Recording</span>
                </Button>
              </div>

              {/* Delivery Email Input */}
              <div className="mt-5 text-left">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Delivery Email
                </label>

                <input
                  type="email"
                  value={deliveryEmail}
                  onChange={(e) => setDeliveryEmail(e.target.value)}
                  placeholder="Where should we send your meeting summary?"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition duration-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />

                <DemoModeHelperText showSettingsLink />
              </div>

              {/* Audio Preview if available */}
              {audioURL && (
                <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
                  <p className="mb-1.5 text-xs font-medium text-zinc-400">
                    Last Recorded Audio Preview
                  </p>
                  <audio controls src={audioURL} className="w-full h-8" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Onboarding Instructions Modal */}
      <RecordingInstructionsModal
        isOpen={showInstructionsModal}
        onClose={handleModalClose}
        onContinue={handleModalContinue}
      />
    </>
  );
};

export default RecordingControls;
