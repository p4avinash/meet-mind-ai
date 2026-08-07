import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton = ({
  to = "/dashboard",
  label = "Back to Dashboard",
}: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => (window.history.length > 2 ? navigate(-1) : navigate(to))}
      className="group flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white"
    >
      <HiArrowLeft
        size={16}
        className="transition-transform duration-200 group-hover:-translate-x-1 text-zinc-400 group-hover:text-white"
      />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
