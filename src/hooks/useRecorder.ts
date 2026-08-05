import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

import { uploadMeeting } from "@/api/meeting.api";

const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [seconds, setSeconds] = useState(0);

  const [meetingId, setMeetingId] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let interval: number;

    if (isRecording) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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

      setMeetingId("");
      setIsUploaded(false);

      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

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
    };

    recorder.stream.getTracks().forEach((track) => track.stop());
  };

  const uploadRecording = async () => {
    if (!audioBlob) return;

    try {
      setIsUploading(true);

      const formData = new FormData();

      formData.append("audio", audioBlob, "meeting.webm");
      formData.append("duration", seconds.toString());

      const response = await uploadMeeting(formData);

      setMeetingId(response.data._id);
      setIsUploaded(true);

      toast.success(response.message);
    } catch (error) {
      console.error(error);

      toast.error("Failed to upload recording");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isRecording,
    isUploading,
    isUploaded,

    seconds,

    audioURL,
    audioBlob,

    meetingId,

    startRecording,
    stopRecording,
    uploadRecording,

    formatTime,
  };
};

export default useRecorder;
