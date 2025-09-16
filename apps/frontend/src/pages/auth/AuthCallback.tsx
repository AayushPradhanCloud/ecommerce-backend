// src/pages/AuthCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleCasdoorCallback } from "@/api/auth";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processing login...");

  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          setStatus("Missing authorization code");
          return;
        }

        await handleCasdoorCallback(code);

        setStatus("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1000); // redirect after 1s
      } catch (err) {
        console.error("Casdoor callback error:", err);
        setStatus("Login failed. Please try again.");
      }
    };

    run();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">{status}</p>
    </div>
  );
};

export default AuthCallback;
