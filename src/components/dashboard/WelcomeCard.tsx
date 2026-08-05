import useAuthStore from "@/stores/auth.store";

const WelcomeCard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold text-white">
        Welcome back, {user?.name || "User"} 👋
      </h1>

      <p className="mt-2 text-zinc-400">Ready to record your next meeting?</p>
    </div>
  );
};

export default WelcomeCard;
