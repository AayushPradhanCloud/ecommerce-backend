import client from "./client";
import type { User } from "../shared/store/auth";

export interface CasdoorAuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export const getLoginUrl = async (): Promise<string> => {
  try {
    const response = await client.get("/api/auth/login", {
      maxRedirects: 0,
      validateStatus: (status) => status === 302 || status === 200,
    });

    if (response.status === 302 && response.headers.location) {
      return response.headers.location;
    }

    return response.data?.url || "/";
  } catch (err) {
    console.error("Failed to get Casdoor login URL:", err);
    return "/";
  }
};

export const exchangeCodeForToken = async (
  code: string
): Promise<CasdoorAuthResponse> => {
  try {
    const response = await client.get<CasdoorAuthResponse>(
      `/api/auth/callback?code=${encodeURIComponent(code)}`
    );

    return response.data;
  } catch (err) {
    console.error("Failed to exchange code for token:", err);
    throw err;
  }
};
