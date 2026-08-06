import { Link } from "react-router-dom";

import formatDuration from "@/utils/formatDuration";
import formatRelativeDate from "@/utils/formatRelativeDate";

import MeetingStatusBadge from "@/components/dashboard/MeetingStatusBadge";

interface MeetingCardProps {
  meeting: {
    _id: string;
    title: string;
    duration: number;
    status: string;
    createdAt: string;
  };
}

const MeetingCard = ({ meeting }: MeetingCardProps) => {
  return (
    <Link
      to={`/meetings/${meeting._id}`}
      className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-white">{meeting.title}</h3>

        <MeetingStatusBadge status={meeting.status} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
        <span>{formatDuration(meeting.duration)}</span>

        <span>{formatRelativeDate(meeting.createdAt)}</span>
      </div>
    </Link>
  );
};

export default MeetingCard;
