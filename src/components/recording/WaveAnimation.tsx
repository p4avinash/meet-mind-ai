interface WaveAnimationProps {
  isRecording: boolean;
}

const WaveAnimation = ({ isRecording }: WaveAnimationProps) => {
  // 12 bars with staggered animation delays for a rhythmic audio wave effect
  const delays = [
    "0ms",
    "150ms",
    "300ms",
    "100ms",
    "400ms",
    "200ms",
    "350ms",
    "50ms",
    "250ms",
    "450ms",
    "180ms",
    "320ms",
  ];

  return (
    <div className="flex h-12 items-center justify-center gap-1.5 px-4 py-2">
      {delays.map((delay, index) => (
        <span
          key={index}
          style={{
            animationDelay: isRecording ? delay : "0ms",
          }}
          className={`
            w-1.5 rounded-full transition-all duration-300
            ${
              isRecording
                ? "bg-gradient-to-t from-violet-500 to-red-400 animate-wave-bar"
                : "h-2 bg-zinc-700 opacity-40"
            }
          `}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;
