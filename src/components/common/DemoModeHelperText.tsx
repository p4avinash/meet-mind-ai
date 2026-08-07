import { useNavigate } from "react-router-dom";

interface DemoModeHelperTextProps {
  showSettingsLink?: boolean;
}

const DemoModeHelperText = ({
  showSettingsLink = false,
}: DemoModeHelperTextProps) => {
  const navigate = useNavigate();

  return (
    <p className="mt-2 text-xs leading-relaxed text-zinc-500">
      <span className="font-medium text-amber-400/90">Demo Mode:</span> Meeting
      summaries are generated normally. For this live demo, emails are delivered
      to the developer inbox while preserving the entered recipient.
      {showSettingsLink && (
        <>
          {" "}
          Change default in{" "}
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="font-medium text-violet-400 transition hover:text-violet-300 hover:underline"
          >
            Settings
          </button>
          .
        </>
      )}
    </p>
  );
};

export default DemoModeHelperText;
