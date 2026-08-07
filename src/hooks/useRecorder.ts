import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadMeeting } from "@/api/meeting.api";
import { getUserSettings, updateUserSettings } from "@/api/user.api";

const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [seconds, setSeconds] = useState(0);
  const [deliveryEmail, setDeliveryEmail] = useState("");

  const navigate = useNavigate();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const secondsRef = useRef(0);
  const deliveryEmailRef = useRef("");

  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    deliveryEmailRef.current = deliveryEmail;
  }, [deliveryEmail]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getUserSettings();

        setDeliveryEmail(
          response.data.defaultDeliveryEmail || response.data.email,
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    let interval: number;

    if (isRecording) {
      interval = window.setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          secondsRef.current = next;
          return next;
        });
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
      secondsRef.current = 0;

      setAudioURL("");
      setAudioBlob(null);

      setIsRecording(true);
    } catch (error) {
      console.error(error);
      toast.error("Microphone access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    recorder.stop();

    recorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const url = URL.createObjectURL(blob);

      setAudioBlob(blob);
      setAudioURL(url);
      setIsRecording(false);

      try {
        setIsUploading(true);

        const formData = new FormData();

        formData.append("audio", blob, "meeting.webm");
        formData.append("duration", secondsRef.current.toString());
        formData.append("deliveryEmail", deliveryEmailRef.current);

        const settings = await getUserSettings();

        if (settings.data.defaultDeliveryEmail !== deliveryEmailRef.current) {
          await updateUserSettings(deliveryEmailRef.current);
        }

        const response = await uploadMeeting(formData);

        toast.success(response.message);

        navigate(`/meetings/${response.data._id}`);
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data?.message || "Failed to upload recording",
        );
      } finally {
        setIsUploading(false);
      }
    };

    recorder.stream.getTracks().forEach((track) => track.stop());
  };

  return {
    isRecording,
    isUploading,
    seconds,
    audioURL,
    audioBlob,
    startRecording,
    stopRecording,
    formatTime,
    deliveryEmail,
    setDeliveryEmail,
  };
};

export default useRecorder;
