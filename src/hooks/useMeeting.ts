import { useState } from "react";
import toast from "react-hot-toast";

import { renameMeeting, deleteMeeting } from "@/api/meeting.api";

const useMeeting = () => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRenameMeeting = async (
    meetingId: string,
    title: string,
  ): Promise<boolean> => {
    try {
      setIsRenaming(true);

      const response = await renameMeeting(meetingId, title);

      toast.success(response.message);

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to rename meeting");

      return false;
    } finally {
      setIsRenaming(false);
    }
  };

  const handleDeleteMeeting = async (meetingId: string): Promise<boolean> => {
    try {
      setIsDeleting(true);

      const response = await deleteMeeting(meetingId);

      toast.success(response.message);

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete meeting");

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isRenaming,
    isDeleting,
    handleRenameMeeting,
    handleDeleteMeeting,
  };
};

export default useMeeting;
