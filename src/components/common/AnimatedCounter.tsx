import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter = ({ end, duration = 1.5 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!end || end <= 0) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

export default AnimatedCounter;
