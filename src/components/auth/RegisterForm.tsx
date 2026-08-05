import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { Button, Input, PasswordInput } from "@/components/common";
import useRegister from "@/hooks/useRegister";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleRegister, isLoading } = useRegister();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleRegister(name, email, password, confirmPassword);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        label="Email"
        placeholder="john@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordInput
        label="Password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <Button fullWidth type="submit" isLoading={isLoading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-zinc-400">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 font-medium text-violet-400 hover:text-violet-300"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

