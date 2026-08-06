interface SearchMeetingsProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchMeetings = ({ value, onChange }: SearchMeetingsProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search meetings..."
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none transition focus:border-violet-500"
    />
  );
};

export default SearchMeetings;
