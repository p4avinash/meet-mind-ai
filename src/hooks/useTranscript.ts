import { useState } from "react";
import toast from "react-hot-toast";

import { generateTranscript } from "@/api/meeting.api";

const useTranscript = () => {
  const [transcript, setTranscript] = useState("");
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false);

  const handleGenerateTranscript = async (meetingId: string): Promise<boolean> => {
    if (!meetingId) return false;

    try {
      setIsGeneratingTranscript(true);

      const response = await generateTranscript(meetingId);

      setTranscript(response.data.transcript);

      toast.success(response.message);
      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate transcript");
      return false;
    } finally {
      setIsGeneratingTranscript(false);
    }
  };

  return {
    transcript,
    isGeneratingTranscript,
    handleGenerateTranscript,
  };
};

export default useTranscript;
