import RecordingControls from "@/components/recording/RecordingControls";

const Recording = () => {
  return (
    <main className="min-h-screen bg-[#0B0F19] p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-white">Record Meeting 🎙️</h1>

        <p className="mt-2 text-zinc-400">
          Record your meeting and let AI generate transcript & summary.
        </p>

        <RecordingControls />
      </div>
    </main>
  );
};

export default Recording;
