import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { CasdoorAuthResponse } from "@/api/casdoor";
import { exchangeCodeForToken } from "@/api/casdoor";
import { useAuthStore } from "@/shared/store/auth";

const CasdoorCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setTokens);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login", { replace: true });
      return;
    }

    const handleCallback = async () => {
      try {
        const data: CasdoorAuthResponse = await exchangeCodeForToken(code);

        setAuth(data.token, data.refreshToken, data.user);

        navigate("/", { replace: true });
      } catch (err) {
        console.error("Casdoor callback error:", err);
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Logging in with Casdoor...</p>
    </div>
  );
};

export default CasdoorCallback;
