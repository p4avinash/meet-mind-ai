import toast from "react-hot-toast";
import { useEffect, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";

import { uploadMeeting } from "@/api/meeting.api";
import { getUserSettings, updateUserSettings } from "@/api/user.api";

// ------------------------------------------------------------
// MODULE-LEVEL RECORDER SINGLETON STORE
// Persists recording state across React route navigations without external libraries.
// ------------------------------------------------------------
interface RecorderState {
  isRecording: boolean;
  isUploading: boolean;
  seconds: number;
  startTimestamp: number;
  audioURL: string;
  audioBlob: Blob | null;
  deliveryEmail: string;
}

let storeState: RecorderState = {
  isRecording: false,
  isUploading: false,
  seconds: 0,
  startTimestamp: 0,
  audioURL: "",
  audioBlob: null,
  deliveryEmail: "",
};

let activeMediaRecorder: MediaRecorder | null = null;
let activeAudioChunks: Blob[] = [];
let activeTimerInterval: number | null = null;

// Active stream & AudioContext references for resource cleanup
let activeDisplayStream: MediaStream | null = null;
let activeMicStream: MediaStream | null = null;
let activeAudioContext: AudioContext | null = null;

const storeListeners = new Set<() => void>();

const subscribeStore = (listener: () => void) => {
  storeListeners.add(listener);
  return () => storeListeners.delete(listener);
};

const getStoreSnapshot = () => storeState;

const updateStoreState = (partial: Partial<RecorderState>) => {
  storeState = { ...storeState, ...partial };
  storeListeners.forEach((listener) => listener());
};

const setDeliveryEmail = (email: string) => {
  updateStoreState({ deliveryEmail: email });
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const useRecorder = () => {
  const currentState = useSyncExternalStore(subscribeStore, getStoreSnapshot);
  const navigate = useNavigate();

  useEffect(() => {
    if (!storeState.isRecording) {
      const fetchSettings = async () => {
        try {
          const response = await getUserSettings();
          const defaultEmail =
            response.data.defaultDeliveryEmail || response.data.email;

          if (defaultEmail) {
            updateStoreState({ deliveryEmail: defaultEmail });
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchSettings();
    }
  }, []);

  const startRecording = async () => {
    // Prevent starting another recording session while one is already active
    if (
      storeState.isRecording ||
      (activeMediaRecorder && activeMediaRecorder.state !== "inactive")
    ) {
      return;
    }

    try {
      // 1. Acquire Display Stream (Chrome Tab / System Audio)
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (displayStream.getAudioTracks().length === 0) {
        toast.error(
          "No tab audio detected. Please make sure to enable 'Share tab audio' when sharing.",
        );
        displayStream.getTracks().forEach((track) => track.stop());
        return;
      }

      activeDisplayStream = displayStream;

      // 2. Acquire Microphone Stream with audio enhancements
      let micStream: MediaStream | null = null;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        activeMicStream = micStream;
      } catch (micError: any) {
        console.warn("Microphone access denied or unavailable:", micError);
        toast(
          "Microphone permission denied. Recording will continue with tab audio only.",
          { icon: "ℹ️" },
        );
      }

      // 3. Merge Audio Streams via Web Audio API if Microphone is available
      let streamToRecord = displayStream;

      if (micStream && micStream.getAudioTracks().length > 0) {
        try {
          const AudioCtxClass =
            window.AudioContext || (window as any).webkitAudioContext;
          const audioContext = new AudioCtxClass();
          activeAudioContext = audioContext;

          const destination = audioContext.createMediaStreamDestination();

          // Connect Tab Audio to Destination
          const tabSource = audioContext.createMediaStreamSource(displayStream);
          tabSource.connect(destination);

          // Connect Microphone Audio to Destination
          const micSource = audioContext.createMediaStreamSource(micStream);
          micSource.connect(destination);

          // Combine Display Video tracks with the Merged Audio track
          const combinedTracks = [
            ...displayStream.getVideoTracks(),
            ...destination.stream.getAudioTracks(),
          ];

          streamToRecord = new MediaStream(combinedTracks);
        } catch (audioCtxErr) {
          console.error("Error merging audio streams:", audioCtxErr);
          streamToRecord = displayStream;
        }
      }

      // Automatically handle user clicking Chrome's native "Stop sharing" button
      displayStream.getTracks().forEach((track) => {
        track.onended = () => {
          if (
            activeMediaRecorder &&
            activeMediaRecorder.state !== "inactive"
          ) {
            stopRecording();
          }
        };
      });

      const recorder = new MediaRecorder(streamToRecord);
      activeMediaRecorder = recorder;
      activeAudioChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          activeAudioChunks.push(event.data);
        }
      };

      recorder.start();

      const now = Date.now();

      if (activeTimerInterval) {
        window.clearInterval(activeTimerInterval);
      }

      activeTimerInterval = window.setInterval(() => {
        if (storeState.isRecording) {
          const elapsed = Math.floor(
            (Date.now() - storeState.startTimestamp) / 1000,
          );
          updateStoreState({ seconds: elapsed });
        }
      }, 1000);

      updateStoreState({
        isRecording: true,
        startTimestamp: now,
        seconds: 0,
        audioURL: "",
        audioBlob: null,
      });
    } catch (error: any) {
      console.error(error);
      if (error?.name !== "NotAllowedError") {
        toast.error("Tab audio recording permission denied or unavailable.");
      }
    }
  };

  const stopRecording = () => {
    const recorder = activeMediaRecorder;

    if (!recorder) return;

    if (activeTimerInterval) {
      window.clearInterval(activeTimerInterval);
      activeTimerInterval = null;
    }

    recorder.stop();

    recorder.onstop = async () => {
      const blob = new Blob(activeAudioChunks, {
        type: "audio/webm",
      });

      const url = URL.createObjectURL(blob);
      const finalDuration = storeState.seconds;
      const currentEmail = storeState.deliveryEmail;

      updateStoreState({
        audioBlob: blob,
        audioURL: url,
        isRecording: false,
        isUploading: true,
      });

      try {
        const formData = new FormData();

        formData.append("audio", blob, "meeting.webm");
        formData.append("duration", finalDuration.toString());
        formData.append("deliveryEmail", currentEmail);

        const settings = await getUserSettings();

        if (settings.data.defaultDeliveryEmail !== currentEmail) {
          await updateUserSettings(currentEmail);
        }

        const response = await uploadMeeting(formData);

        toast.success(
          "Meeting uploaded successfully. Email delivery is running in Demo Mode.",
        );

        navigate(`/meetings/${response.data._id}`);
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.response?.data?.message || "Failed to upload recording",
        );
      } finally {
        updateStoreState({ isUploading: false });
        activeMediaRecorder = null;
      }
    };

    // Clean up streams & AudioContext
    if (activeDisplayStream) {
      activeDisplayStream.getTracks().forEach((track) => track.stop());
      activeDisplayStream = null;
    }

    if (activeMicStream) {
      activeMicStream.getTracks().forEach((track) => track.stop());
      activeMicStream = null;
    }

    if (activeAudioContext) {
      activeAudioContext.close().catch(console.error);
      activeAudioContext = null;
    }
  };

  return {
    isRecording: currentState.isRecording,
    isUploading: currentState.isUploading,
    seconds: currentState.seconds,
    audioURL: currentState.audioURL,
    audioBlob: currentState.audioBlob,
    startRecording,
    stopRecording,
    formatTime,
    deliveryEmail: currentState.deliveryEmail,
    setDeliveryEmail,
  };
};

export default useRecorder;
