import { Link } from "react-router-dom";
import MeetingCard from "@/components/meeting/MeetingCard";

interface Meeting {
  _id: string;
  title: string;
  duration: number;
  status: string;
  createdAt: string;
}

interface RecentMeetingsProps {
  meetings: Meeting[];
  loading: boolean;
}

const RecentMeetings = ({ meetings, loading }: RecentMeetingsProps) => {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="text-xl font-semibold text-white">Recent Meetings</h2>

      {loading ? (
        <div className="mt-8 text-center text-zinc-500">
          Loading meetings...
        </div>
      ) : meetings.length === 0 ? (
        <div className="mt-8 text-center text-zinc-500">No meetings yet.</div>
      ) : (
        <div className="mt-8 space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting._id} meeting={meeting} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentMeetings;
