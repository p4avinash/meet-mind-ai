import { useState } from "react";
import toast from "react-hot-toast";

import { renameMeeting } from "@/api/meeting.api";

const useMeeting = () => {
  const [isRenaming, setIsRenaming] = useState(false);

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

  return {
    isRenaming,
    handleRenameMeeting,
  };
};

export default useMeeting;
