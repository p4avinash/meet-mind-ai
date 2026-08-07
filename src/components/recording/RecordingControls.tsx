import { HiMiniMicrophone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import useRecorder from "@/hooks/useRecorder";

const RecordingControls = () => {
  const navigate = useNavigate();

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

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 ${
            isRecording ? "bg-red-500/20" : "bg-violet-500/10"
          }`}
        >
          <HiMiniMicrophone
            size={56}
            className={isRecording ? "text-red-500" : "text-violet-400"}
          />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          {isRecording
            ? "Recording..."
            : isUploading
              ? "Uploading..."
              : "Ready to Record"}
        </h2>

        <p className="mt-3 max-w-md text-center text-zinc-400">
          {isRecording
            ? "Recording is in progress."
            : isUploading
              ? "Uploading your meeting..."
              : "Click the button below to start recording your meeting."}
        </p>

        {isRecording && (
          <div className="mt-6 flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />

            <span className="font-mono text-2xl font-semibold text-white">
              {formatTime(seconds)}
            </span>
          </div>
        )}

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={
            isUploading || !deliveryEmail.trim() || !deliveryEmail.includes("@")
          }
          className="mt-10 px-10"
        >
          {isRecording
            ? "Stop Recording"
            : isUploading
              ? "Uploading..."
              : "Start Recording"}
        </Button>

        <div className="mt-8 w-full">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Delivery Email
          </label>

          <input
            type="email"
            value={deliveryEmail}
            onChange={(e) => setDeliveryEmail(e.target.value)}
            placeholder="Where should we send this meeting summary?"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

          <p className="mt-2 text-sm text-zinc-500">
            This email is only for this meeting. You can change your default
            delivery email from{" "}
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="font-medium text-violet-400 transition hover:text-violet-300 hover:underline"
            >
              Settings
            </button>
            .
          </p>
        </div>

        {audioURL && (
          <div className="mt-8 w-full max-w-lg">
            <audio controls src={audioURL} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingControls;
