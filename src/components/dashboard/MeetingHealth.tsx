interface MeetingHealthProps {
  meetings: {
    status: string;
  }[];
}

const MeetingHealth = ({ meetings }: MeetingHealthProps) => {
  const totalMeetings = meetings.length;

  const completedMeetings = meetings.filter(
    (meeting) => meeting.status === "completed",
  ).length;

  const processingMeetings = meetings.filter((meeting) =>
    ["uploaded", "transcribing", "transcribed", "summarizing"].includes(
      meeting.status,
    ),
  ).length;

  const failedMeetings = meetings.filter(
    (meeting) => meeting.status === "failed",
  ).length;

  const stats = [
    {
      title: "Total Meetings",
      value: totalMeetings,
    },
    {
      title: "Completed",
      value: completedMeetings,
    },
    {
      title: "Processing",
      value: processingMeetings,
    },
    {
      title: "Failed",
      value: failedMeetings,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <p className="text-sm text-zinc-400">{stat.title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">{stat.value}</h2>
        </div>
      ))}
    </section>
  );
};

export default MeetingHealth;
