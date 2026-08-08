import { useEffect } from "react";
import toast from "react-hot-toast";
import AppRouter from "@/router/AppRouter";

const App = () => {
  useEffect(() => {
    toast(
      "The backend is hosted on Render's free tier, so the first request may take 50–60 seconds to wake up the server.",
      {
        duration: 7000,
        icon: "⚡",
        style: {
          background: "#18181b",
          color: "#f4f4f5",
          border: "1px solid #3f3f46",
          fontSize: "13px",
          borderRadius: "12px",
          padding: "12px 16px",
        },
      },
    );
  }, []);

  return <AppRouter />;
};

export default App;
