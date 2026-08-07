import MeetingCard from "@/components/meeting/MeetingCard";

interface Meeting {
  _id: string;
  title: string;
  duration: number;
  status: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface RecentMeetingsProps {
  meetings: Meeting[];
  loading: boolean;
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

const RecentMeetings = ({
  meetings,
  loading,
  pagination,
  onPageChange,
}: RecentMeetingsProps) => {
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
        <>
          <div className="mt-8 space-y-4">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting._id} meeting={meeting} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={!pagination.hasPrevPage}
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:border-violet-500
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                ← Previous
              </button>

              <p className="text-sm text-zinc-400">
                Page{" "}
                <span className="font-semibold text-white">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white">
                  {pagination.totalPages}
                </span>
              </p>

              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={!pagination.hasNextPage}
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:border-violet-500
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RecentMeetings;
