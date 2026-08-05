import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Start recording and summarizing your meetings"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
