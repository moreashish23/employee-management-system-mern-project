import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { loginUser, clearError } from "../../features/auth/authSlice";
import { LoginPayload } from "../../types/auth.types";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function LoginPage() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isLoading, error } = useAuth();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: LoginPayload) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } else {
      toast.error(result.payload as string || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-11 w-11 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-bold">E</span>
          </div>
          <h1 className="text-xl font-semibold text-surface-900">Sign in to EMS</h1>
          <p className="text-sm text-surface-500 mt-1">
            Manage your workforce efficiently
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
          {error && (
            <div className="bg-danger-50 text-danger-700 text-sm px-4 py-3 rounded-lg border border-danger-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
                  message: "Enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Your password"
              leftIcon={<HiLockClosed className="h-4 w-4" />}
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />

            <Button
              type="submit"
              className="w-full"
              size="md"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-surface-500 mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}