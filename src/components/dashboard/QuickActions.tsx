import {
  HiMiniMicrophone,
  HiOutlineClock,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Start Recording",
    icon: HiMiniMicrophone,
  },
  {
    title: "Meeting History",
    icon: HiOutlineClock,
  },
  {
    title: "Settings",
    icon: HiOutlineCog6Tooth,
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {actions.map(({ title, icon: Icon }) => (
        <button
          key={title}
          onClick={() => {
            if (title === "Start Recording") {
              navigate("/recording");
            }
          }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-violet-500 hover:bg-zinc-800"
        >
          <Icon size={34} className="text-violet-400" />

          <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
