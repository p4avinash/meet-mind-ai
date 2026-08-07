import toast from "react-hot-toast";

import { updateUserSettings } from "@/api/user.api";

const useUser = () => {
  const handleUpdateSettings = async (email: string) => {
    try {
      const response = await updateUserSettings(email);

      toast.success(response.message);

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to update settings.");

      return false;
    }
  };

  return {
    handleUpdateSettings,
  };
};

export default useUser;
