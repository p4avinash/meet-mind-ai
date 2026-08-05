import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue using MeetMind AI"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
