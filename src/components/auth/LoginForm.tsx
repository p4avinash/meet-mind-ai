import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { Button, Input, PasswordInput } from "@/components/common";
import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, isLoading } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-violet-400 hover:text-violet-300 transition"
        >
          Forgot Password?
        </Link>
      </div> */}

      <Button fullWidth type="submit" isLoading={isLoading}>
        Sign In
      </Button>

      <p className="text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-violet-400 hover:text-violet-300"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
