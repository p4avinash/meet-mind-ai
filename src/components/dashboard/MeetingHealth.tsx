import AnimatedCounter from "@/components/common/AnimatedCounter";
import {
  HiArrowTrendingUp,
  HiChartBar,
  HiCheckCircle,
  HiClock,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiMicrophone,
} from "react-icons/hi2";

interface MeetingStats {
  totalMeetings: number;
  completedMeetings: number;
  processingMeetings: number;
  failedMeetings: number;
  totalRecordingMinutes: number;
}

interface Props {
  stats: MeetingStats | null;
  loading: boolean;
}

const getHealthStatus = (stats: MeetingStats | null) => {
  if (!stats) {
    return {
      label: "Healthy",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      Icon: HiArrowTrendingUp,
    };
  }

  const completed = stats.completedMeetings || 0;
  const failed = stats.failedMeetings || 0;
  const totalProcessed = completed + failed;

  if (totalProcessed === 0 || failed === 0) {
    return {
      label: "Healthy",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      Icon: HiArrowTrendingUp,
    };
  }

  const successRate = (completed / totalProcessed) * 100;

  if (successRate >= 80) {
    return {
      label: "Healthy",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      Icon: HiArrowTrendingUp,
    };
  }

  if (successRate >= 50) {
    return {
      label: "Attention Needed",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Icon: HiExclamationCircle,
    };
  }

  return {
    label: "Degraded",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    Icon: HiExclamationTriangle,
  };
};

const cards = (stats: MeetingStats) => [
  {
    title: "Total Meetings",
    value: stats.totalMeetings,
    icon: HiChartBar,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Completed",
    value: stats.completedMeetings,
    icon: HiCheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Processing",
    value: stats.processingMeetings,
    icon: HiClock,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Failed",
    value: stats.failedMeetings,
    icon: HiExclamationTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    title: "Recording Time",
    value: stats.totalRecordingMinutes,
    suffix: " mins",
    icon: HiMicrophone,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const MeetingHealth = ({ stats, loading }: Props) => {
  const { label, color, Icon } = getHealthStatus(stats);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Meeting Health</h2>

        <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${color}`}>
          <Icon />
          <span>{label}</span>
        </div>
      </div>

      {loading || !stats ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-zinc-800"
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {cards(stats).map((card) => {
            const CardIcon = card.icon;

            return (
              <div
                key={card.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-950
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-violet-500/40
                  hover:shadow-xl
                  hover:shadow-violet-500/10
                "
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-xl p-3 ${card.bg}`}>
                    <CardIcon className={`text-2xl ${card.color}`} />
                  </div>
                </div>

                <p className="mt-6 text-sm text-zinc-400">{card.title}</p>

                <h3 className="mt-2 text-4xl font-bold text-white">
                  <AnimatedCounter end={Number(card.value) || 0} duration={1.5} />
                  {card.suffix ?? ""}
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MeetingHealth;
