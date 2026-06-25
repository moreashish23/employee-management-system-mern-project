import axiosInstance from "./axiosInstance";
import { RegisterPayload, LoginPayload, AuthResponse, User } from "../types/auth.types";

interface ApiSuccess<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await axiosInstance.post<ApiSuccess<AuthResponse>>(
      "/auth/register",
      payload
    );
    return res.data.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axiosInstance.post<ApiSuccess<AuthResponse>>(
      "/auth/login",
      payload
    );
    return res.data.data;
  },

  getMe: async (): Promise<User> => {
    const res = await axiosInstance.get<ApiSuccess<{ user: User }>>("/auth/me");
    return res.data.data.user;
  },
};