import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Logo from "../components/common/logo";
import AuthIllustration from "../assets/illustrations/auth-illustration.svg";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}

        <div className="hidden lg:flex items-center justify-center bg-[#101827]">
          <img
            src={AuthIllustration}
            alt="MeetMind AI"
            className="w-[80%] max-w-xl"
          />
        </div>

        {/* Right */}

        <div className="flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md"
          >
            {/* Logo */}

            <div className="mb-10">
              <Logo className="mb-10" />
            </div>

            <h1 className="text-4xl font-bold text-white">{title}</h1>

            <p className="mt-3 mb-8 text-zinc-400">{subtitle}</p>

            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
