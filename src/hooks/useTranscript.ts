import { useState } from "react";
import toast from "react-hot-toast";

import {
  generateSummary,
  generateTranscript,
  generateActionItems,
} from "@/api/meeting.api";

const useTranscript = () => {
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingActionItems, setIsGeneratingActionItems] = useState(false);

  const handleGenerateTranscript = async (
    meetingId: string,
  ): Promise<boolean> => {
    if (!meetingId) return false;

    try {
      setIsGeneratingTranscript(true);

      const response = await generateTranscript(meetingId);

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

  const handleGenerateSummary = async (meetingId: string): Promise<boolean> => {
    if (!meetingId) return false;

    try {
      setIsGeneratingSummary(true);

      const response = await generateSummary(meetingId);

      toast.success(response.message);

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate summary");

      return false;
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateActionItems = async (
    meetingId: string,
  ): Promise<boolean> => {
    if (!meetingId) return false;

    try {
      setIsGeneratingActionItems(true);

      const response = await generateActionItems(meetingId);

      toast.success(response.message);

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate action items");

      return false;
    } finally {
      setIsGeneratingActionItems(false);
    }
  };

  return {
    isGeneratingTranscript,
    isGeneratingSummary,

    handleGenerateTranscript,
    handleGenerateSummary,

    isGeneratingActionItems,
    handleGenerateActionItems,
  };
};

export default useTranscript;
