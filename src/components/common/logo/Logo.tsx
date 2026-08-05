import clsx from "clsx";
import { BrainCircuit } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <div
        className="
          flex h-11 w-11 items-center justify-center
          rounded-xl
          bg-gradient-to-br
          from-violet-600
          to-purple-500
          shadow-lg shadow-violet-500/20
        "
      >
        <BrainCircuit size={22} className="text-white" />
      </div>

      {showText && (
        <div>
          <h1 className="text-lg font-bold text-white">MeetMind AI</h1>

          <p className="text-xs text-zinc-400">AI Meeting Assistant</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
