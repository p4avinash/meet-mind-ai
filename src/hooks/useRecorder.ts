import { useEffect, useRef, useState } from "react";

const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [seconds, setSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // timer
  useEffect(() => {
    let interval: number;

    if (isRecording) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  // format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // start recording
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

      setSeconds(0);
      setAudioURL("");
      setAudioBlob(null);
      setIsRecording(true);

      console.log("🎙 Recording Started");
    } catch (error) {
      console.error(error);
    }
  };

  // stop recording
  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    recorder.stop();

    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const url = URL.createObjectURL(blob);

      setAudioBlob(blob);
      setAudioURL(url);
      setIsRecording(false);

      console.log("🛑 Recording Stopped");
    };

    recorder.stream.getTracks().forEach((track) => track.stop());
  };

  return {
    isRecording,
    seconds,
    audioURL,
    audioBlob,
    startRecording,
    stopRecording,
    formatTime,
  };
};

export default useRecorder;
