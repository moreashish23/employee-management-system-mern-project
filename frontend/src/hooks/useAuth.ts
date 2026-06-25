import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { logout } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user:            auth.user,
    token:           auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading:       auth.isLoading,
    error:           auth.error,
    logout:          handleLogout,
  };
};