import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "@/lib/axios";
import useAuthStore from "@/stores/auth.store";

const useLogin = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    // Basic Validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      // Save user in Zustand
      login(data.user, data.token);

      toast.success("Login successful 🎉");

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
  };
};

export default useLogin;
