interface Props {
  status: string;
}

const MeetingStatusBadge = ({ status }: Props) => {
  const styles = {
    completed: "bg-green-500/10 text-green-400",

    failed: "bg-red-500/10 text-red-400",

    uploaded: "bg-yellow-500/10 text-yellow-400",

    transcribing: "bg-yellow-500/10 text-yellow-400",

    transcribed: "bg-blue-500/10 text-blue-400",

    summarizing: "bg-violet-500/10 text-violet-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs capitalize ${
        styles[status as keyof typeof styles] ?? "bg-zinc-700 text-white"
      }`}
    >
      {status}
    </span>
  );
};

export default MeetingStatusBadge;
