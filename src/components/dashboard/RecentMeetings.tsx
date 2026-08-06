import { Link } from "react-router-dom";

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
            <Link
              key={meeting._id}
              to={`/meetings/${meeting._id}`}
              className="block rounded-2xl border border-zinc-800 p-5 transition hover:border-violet-500"
            >
              <h3 className="font-semibold text-white">{meeting.title}</h3>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  {meeting.duration}s
                </span>

                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs capitalize text-violet-400">
                  {meeting.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentMeetings;
