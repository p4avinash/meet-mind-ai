import { HiMiniMicrophone } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";
import useRecorder from "@/hooks/useRecorder";
import useTranscript from "@/hooks/useTranscript";

const RecordingControls = () => {
  const navigate = useNavigate();

  const {
    isRecording,
    seconds,
    audioURL,
    meetingId,
    isUploading,
    isUploaded,
    startRecording,
    stopRecording,
    uploadRecording,
    formatTime,
  } = useRecorder();

  const { transcript, isGeneratingTranscript, handleGenerateTranscript } =
    useTranscript();

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
          {isRecording ? "Recording..." : "Ready to Record"}
        </h2>

        <p className="mt-3 max-w-md text-center text-zinc-400">
          {isRecording
            ? "Recording is in progress."
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
          className="mt-10 px-10"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        {audioURL && (
          <div className="mt-8 w-full max-w-lg">
            <audio controls src={audioURL} className="w-full" />

            {!isUploaded && (
              <Button
                onClick={uploadRecording}
                disabled={isUploading}
                className="mt-6 w-full"
              >
                {isUploading ? "Uploading..." : "Upload Recording"}
              </Button>
            )}

            {isUploaded && (
              <div className="mt-6 rounded-xl border border-green-600 bg-green-500/10 p-4">
                <p className="font-medium text-green-400">
                  ✅ Recording uploaded successfully
                </p>

                <Button
                  onClick={async () => {
                    const success = await handleGenerateTranscript(meetingId);

                    if (success) {
                      navigate(`/meetings/${meetingId}`);
                    }
                  }}
                  disabled={isGeneratingTranscript}
                  className="mt-4 w-full"
                >
                  {isGeneratingTranscript
                    ? "Generating Transcript..."
                    : "Generate Transcript"}
                </Button>
              </div>
            )}

            {transcript && (
              <div className="mt-8 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Transcript
                </h3>

                <p className="whitespace-pre-wrap leading-7 text-zinc-300">
                  {transcript}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingControls;
