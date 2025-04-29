// hooks/useRefreshToken.ts
import { useEffect } from "react";
import { getToken, refreshSpotifyToken } from "@/app/pages/api/authorize";

const useRefreshToken = (code?: string) => {
  useEffect(() => {
    if (code) {
      // Handle initial token fetch with authorization code
      const fetchToken = async () => {
        try {
          await getToken(code);
        } catch (error) {
          console.error("Failed to get token:", error);
        }
      };
      fetchToken();
    }

    // Handle token refresh logic
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const interval = setInterval(async () => {
        try {
          await refreshSpotifyToken(refreshToken);
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }, 3500000); // Refresh every ~58 minutes (token expires in 1 hour)

      return () => clearInterval(interval);
    }
  }, [code]);
};

export default useRefreshToken;