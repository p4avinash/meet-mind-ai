import { FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import useAuthStore from "@/stores/auth.store";

const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">MeetMind AI</h1>

        <p className="mt-1 text-zinc-400">Welcome back, {user?.name} 👋</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/settings")}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            px-4
            py-3
            text-zinc-300
            transition
            hover:border-violet-500
            hover:text-violet-400
          "
        >
          <FiSettings />
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-500
            px-4
            py-3
            text-white
            transition
            hover:bg-red-600
          "
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
