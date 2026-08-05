import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMeeting } from "@/api/meeting.api";

const MeetingDetails = () => {
  const { id } = useParams();

  const [meeting, setMeeting] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMeeting = async () => {
      try {
        const response = await getMeeting(id);

        setMeeting(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeeting();
  }, [id]);

  if (!meeting) {
    return (
      <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-white">{meeting.title}</h1>

        <audio controls src={meeting.audioUrl} className="mt-8 w-full" />

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Transcript</h2>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {meeting.transcript || "Transcript not generated yet."}
          </p>
        </div>
      </div>
    </main>
  );
};

export default MeetingDetails;
