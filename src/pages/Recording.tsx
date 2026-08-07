import BackButton from "@/components/common/BackButton";
import RecordingControls from "@/components/recording/RecordingControls";

const Recording = () => {
  return (
    <main className="min-h-screen bg-[#0B0F19] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Navigation & Page Title */}
        <div className="flex items-center justify-between">
          <BackButton />

          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            MeetMind AI Studio
          </span>
        </div>

        <div className="mt-6">
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span>Record Meeting</span>
            <span className="text-2xl">🎙️</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Capture your shared Chrome Tab audio and generate automated AI transcripts, action items & summaries.
          </p>
        </div>

        <RecordingControls />
      </div>
    </main>
  );
};

export default Recording;
