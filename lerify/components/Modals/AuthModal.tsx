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
import { useTheme } from "next-themes";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      console.log("User Session:", session);
      if (!session.user?.email) {
        console.error(
          "No email received from Spotify! Supabase requires an email."
        );
      }
      onClose();
      router.refresh();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    console.log("Modal open state:", open);
    if (!open) {
      onClose();
    }
  };

  const radii = ["20px", "40px", "20px"] as const;
  const [borderRadius] = useState(radii[0] as string);
  const [borderRadiusAlt] = useState(radii[1] as string);

  const socialAlignments = ["horizontal", "vertical"] as const;
  const [socialLayout, setSocialLayout] = useState<SocialLayout>(
    socialAlignments[0] satisfies SocialLayout
  );

  const { theme } = useTheme();

  return (
    <Modal
      title="Ласкаво просимо"
      description="до світу нескінченої музики."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme={theme === "dark" ? "dark" : "default"}
        socialLayout={socialLayout}
        providers={["google", "github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "var(--bg-color)",
                brandAccent: "#88b4fc",
                inputBackground: theme === "dark" ? "#1a1a1a" : "white",
                inputText: theme === "dark" ? "#ffffff" : "#000000",
                brandButtonText: "var(--theme)",
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
        localization={{
          variables: {
            sign_in: {
              email_label: "Електронна пошта",
              password_label: "Пароль",
              button_label: "Увійти",
               email_input_placeholder: "Ваша електронна адреса",
        password_input_placeholder: "Ваш пароль",
            },
            sign_up: {
              email_label: "Електронна пошта",
              password_label: "Пароль",
              button_label: "Зареєструватися",
              link_text: "Не маєте акаунта? Зареєструйтеся",
            },
            forgotten_password: {
        link_text: "Забули пароль?",
      },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
