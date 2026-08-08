import BackButton from "@/components/common/BackButton";
import RecordingControls from "@/components/recording/RecordingControls";

const Recording = () => {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-4 py-6 sm:px-8 sm:py-8 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Navigation & Page Title */}
        <div className="flex items-center justify-between">
          <BackButton />

          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            MeetMind AI Studio
          </span>
        </div>

        <div className="mt-4">
          <h1 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            <span>Record Meeting</span>
            <span className="text-xl">🎙️</span>
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Capture your shared Chrome Tab audio and generate automated AI transcripts, action items & summaries.
          </p>
        </div>

        <RecordingControls />
      </div>
    </main>
  );
};

export default Recording;
