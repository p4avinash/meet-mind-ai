import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "@/components/common/button/Button";

import { getMeeting } from "@/api/meeting.api";

import useTranscript from "@/hooks/useTranscript";

const MeetingDetails = () => {
  const { id } = useParams();

  const [meeting, setMeeting] = useState<any>(null);

  const {
    handleGenerateSummary,
    isGeneratingSummary,
    handleGenerateActionItems,
    isGeneratingActionItems,
  } = useTranscript();

  const fetchMeeting = async () => {
    try {
      if (!id) return;

      const response = await getMeeting(id);

      setMeeting(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeeting();
  }, [id]);

  const onGenerateSummary = async () => {
    if (!meeting?._id) return;

    const success = await handleGenerateSummary(meeting._id);

    if (success) {
      fetchMeeting();
    }
  };

  const onGenerateActionItems = async () => {
    if (!meeting?._id) return;

    const success = await handleGenerateActionItems(meeting._id);

    if (success) {
      fetchMeeting();
    }
  };

  if (!meeting) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-white">{meeting.title}</h1>

        <audio controls src={meeting.audioUrl} className="mt-8 w-full" />

        {/* Transcript */}

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Transcript</h2>

          <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
            {meeting.transcript || "Transcript not generated yet."}
          </p>
        </div>

        {/* Summary */}

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Summary</h2>

          {meeting.summary ? (
            <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
              {meeting.summary}
            </p>
          ) : (
            <>
              <p className="mt-4 text-zinc-400">
                Summary has not been generated yet.
              </p>

              <Button
                onClick={onGenerateSummary}
                disabled={isGeneratingSummary}
                className="mt-6"
              >
                {isGeneratingSummary
                  ? "Generating Summary..."
                  : "Generate Summary"}
              </Button>
            </>
          )}
        </div>
        {/* Action items  */}
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Action Items</h2>

          {meeting.actionItems?.length ? (
            <ul className="mt-4 space-y-3">
              {meeting.actionItems.map((item: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-zinc-300"
                >
                  <span className="mt-1 text-violet-400">✓</span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="mt-4 text-zinc-400">
                No action items generated yet.
              </p>

              <Button
                onClick={onGenerateActionItems}
                disabled={isGeneratingActionItems}
                className="mt-6"
              >
                {isGeneratingActionItems
                  ? "Generating..."
                  : "Generate Action Items"}
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MeetingDetails;
