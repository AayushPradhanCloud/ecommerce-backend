import apiClient from "./client";

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    role: string;
    casdoorId?: string;
    username?: string;
    displayName?: string;
    avatar?: string;
    createdAt?: string;
  };
}

/**
 * Save tokens & user to localStorage
 */
export const saveAuth = (data: AuthResponse) => {
  localStorage.setItem("accessToken", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));
};

/**
 * Get logged-in user from localStorage
 */
export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Remove tokens & user (logout)
 */
export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

/**
 * Call backend Casdoor login (redirect)
 */
export const loginWithCasdoor = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
};

/**
 * Exchange Casdoor callback code for tokens
 */
export const handleCasdoorCallback = async (code: string) => {
  const res = await apiClient.get<AuthResponse>("/auth/callback", {
    params: { code },
  });
  saveAuth(res.data);
  return res.data;
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  const res = await apiClient.post<AuthResponse>("/auth/refresh", {
    refreshToken,
  });

  saveAuth(res.data);
  return res.data;
};

/**
 * Get currently authenticated user (from API, not localStorage)
 */
export const getCurrentUser = async () => {
  const res = await apiClient.get("/profile/me");
  return res.data;
};
