import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/button/Button";

import useMeeting from "@/hooks/useMeeting";

import AudioCard from "@/components/meeting/AudioCard";
import TranscriptCard from "@/components/meeting/TranscriptCard";
import SummaryCard from "@/components/meeting/SummaryCard";
import ActionItemsCard from "@/components/meeting/ActionItemsCard";
import ProcessingStatus from "@/components/meeting/ProcessingStatus";

import { getMeeting } from "@/api/meeting.api";

import useTranscript from "@/hooks/useTranscript";

const MeetingDetails = () => {
  const { id } = useParams();

  const [meeting, setMeeting] = useState<any>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const { isRenaming, isDeleting, handleRenameMeeting, handleDeleteMeeting } =
    useMeeting();

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

      setMeeting(response?.data);
      setTitle(response?.data?.title);
    } catch (error) {
      console.error(error);
    }
  };

  const shouldPoll = meeting && meeting.status !== "completed";

  useEffect(() => {
    fetchMeeting();
  }, [id]);

  useEffect(() => {
    if (!shouldPoll) return;

    const interval = setInterval(() => {
      fetchMeeting();
    }, 2000);

    return () => clearInterval(interval);
  }, [shouldPoll]);

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

  const onRenameMeeting = async () => {
    if (!meeting?._id) return;

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitle(meeting.title);
      setIsEditingTitle(false);
      return;
    }

    const success = await handleRenameMeeting(meeting._id, trimmedTitle);

    if (success) {
      await fetchMeeting();
      setIsEditingTitle(false);
    }
  };

  const onDeleteMeeting = async () => {
    if (!meeting?._id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting?",
    );

    if (!confirmed) return;

    const success = await handleDeleteMeeting(meeting._id);

    if (success) {
      navigate("/dashboard");
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isEditingTitle ? (
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={onRenameMeeting}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onRenameMeeting();
                  }

                  if (e.key === "Escape") {
                    setTitle(meeting.title);
                    setIsEditingTitle(false);
                  }
                }}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-3xl font-bold text-white outline-none focus:border-violet-500"
              />
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white">
                  {meeting.title}
                </h1>

                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="text-zinc-400 transition hover:text-violet-400"
                >
                  <HiPencil size={22} />
                </button>
              </>
            )}
          </div>

          <button
            onClick={onDeleteMeeting}
            disabled={isDeleting}
            className="rounded-xl border border-red-500/30 p-3 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            <HiTrash size={20} />
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <ProcessingStatus status={meeting.status} />
          <AudioCard audioUrl={meeting.audioUrl} />
          <TranscriptCard transcript={meeting.transcript} />
          <SummaryCard
            summary={meeting.summary}
            loading={isGeneratingSummary}
            onGenerate={onGenerateSummary}
          />
          <ActionItemsCard
            actionItems={meeting.actionItems || []}
            loading={isGeneratingActionItems}
            onGenerate={onGenerateActionItems}
          />
        </div>
      </div>
    </main>
  );
};

export default MeetingDetails;
