import toast from "react-hot-toast";

const copyToClipboard = async (
  text: string,
  successMessage = "Copied to clipboard!",
) => {
  if (!text) {
    toast.error("Nothing to copy.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);

    toast.success(successMessage);
  } catch (error) {
    console.error(error);

    toast.error("Failed to copy.");
  }
};

export default copyToClipboard;
