import * as casdoorApi from "@/api/casdoor";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const url = await casdoorApi.getLoginUrl();
      window.location.href = url;
    } catch (err) {
      console.error("Failed to start Casdoor login:", err);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Login with Casdoor
    </button>
  );
};

export default LoginButton;
