import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { registerUser, clearError } from "../../features/auth/authSlice";
import { RegisterPayload } from "../../types/auth.types";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAuth();

  const { register, handleSubmit, watch, formState: { errors } } =
    useForm<RegisterPayload & { confirmPassword: string }>();

  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  const onSubmit = async (data: RegisterPayload & { confirmPassword: string }) => {
    const { confirmPassword, ...payload } = data;
    void confirmPassword;
    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created! Welcome to EMS.");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(result.payload as string || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-11 w-11 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-bold">E</span>
          </div>
          <h1 className="text-xl font-semibold text-surface-900">Create an account</h1>
          <p className="text-sm text-surface-500 mt-1">
            Get started with EMS today
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
          {error && (
            <div className="bg-danger-50 text-danger-700 text-sm px-4 py-3 rounded-lg border border-danger-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input
              label="Full name"
              required
              autoComplete="name"
              placeholder="Ashish Sharma"
              leftIcon={<HiUser className="h-4 w-4" />}
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" },
              })}
            />

            <Input
              label="Email address"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              leftIcon={<HiMail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Min. 6 characters"
              leftIcon={<HiLockClosed className="h-4 w-4" />}
              hint="Must include uppercase, lowercase and a number"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Must include uppercase, lowercase and a number",
                },
              })}
            />

            <Input
              label="Confirm password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Re-enter your password"
              leftIcon={<HiLockClosed className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              })}
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-surface-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}