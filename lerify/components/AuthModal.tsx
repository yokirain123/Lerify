"use client";

import { useEffect, useState } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { SocialLayout, ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      console.log("User Session:", session);
      if (!session.user?.email) {
        console.error("⚠️ No email received from Spotify! Supabase requires an email.");
      }
      onClose();  // Close modal first
      router.refresh();
    }
  }, [session, router, onClose]);
  

  

  const onChange = (open: boolean) => {
    console.log("Modal open state:", open);
    if (!open) {
      onClose();
    }
  };
  

  //Styles for auth
  const radii = ["20px", "40px", "20px"] as const;
  const [borderRadius] = useState(radii[0] as string);
  const [borderRadiusAlt] = useState(radii[1] as string);

  const socialAlignments = ["horizontal", "vertical"] as const;
  const [socialLayout, setSocialLayout] = useState<SocialLayout>(
    socialAlignments[0] satisfies SocialLayout
  );

  const handleSpotifyLogin = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: "http://localhost:3000/auth/callback", // Adjust this if needed
      },
    });
  
    if (error) {
      console.error("Spotify login error:", error.message);
    } else {
      console.log("Spotify login success:", data);
    }
  };
  
  return (
    <Modal
      title="Welcome"
      description="to the world of endless music."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        socialLayout={socialLayout}
        providers={["google", "github", "spotify"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#131313",
                brandAccent: "#88b4fc",
              },
              radii: {
                inputBorderRadius: borderRadius,
                borderRadiusButton: borderRadiusAlt,
                buttonBorderRadius: borderRadius,
              },
            },
          },
        }}
        supabaseClient={supabaseClient}
      />
    </Modal>
  );
};

export default AuthModal;
