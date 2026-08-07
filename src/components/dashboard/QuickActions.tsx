import toast from "react-hot-toast";
import {
  HiMiniMicrophone,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Record Meeting",
    description: "Capture a new meeting",
    icon: HiMiniMicrophone,
    route: "/recording",
  },
  {
    title: "AI Chat",
    description: "Ask questions about meetings",
    icon: HiOutlineChatBubbleLeftRight,
    comingSoon: true,
  },
  {
    title: "Analytics",
    description: "Insights & productivity trends",
    icon: HiOutlineChartBar,
    comingSoon: true,
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  const handleClick = (action: (typeof actions)[0]) => {
    if (action.route) {
      navigate(action.route);
      return;
    }

    if (action.comingSoon) {
      toast("🚀 Coming in the next update");
    }
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;
        const isRecordingCard = action.title === "Record Meeting";

        return (
          <div
            key={action.title}
            className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
              isRecordingCard ? "animated-border p-[2px]" : ""
            }`}
          >
            {isRecordingCard && (
              <div className="animated-border-bg pointer-events-none" />
            )}

            <button
              onClick={() => handleClick(action)}
              className={`relative h-full w-full bg-zinc-900 p-6 text-left ${
                isRecordingCard ? "rounded-[14px]" : "rounded-2xl border border-zinc-800"
              }`}
            >
              <Icon
                size={34}
                className="text-violet-400 transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="mt-5 text-lg font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">{action.description}</p>

              {action.comingSoon && (
                <span className="mt-5 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                  Coming Soon
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default QuickActions;
