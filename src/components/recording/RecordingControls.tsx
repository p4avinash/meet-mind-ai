import { useRef, useState } from "react";
import { HiMiniMicrophone } from "react-icons/hi2";

import Button from "@/components/common/button/Button";

const RecordingControls = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.start();

      setIsRecording(true);

      console.log("🎙 Recording Started");
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    recorder.stop();

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const url = URL.createObjectURL(audioBlob);

      setAudioURL(url);

      setIsRecording(false);

      console.log("🛑 Recording Stopped");
      console.log(audioBlob);
    };

    recorder.stream.getTracks().forEach((track) => track.stop());
  };

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

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className="mt-10 px-10"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

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
