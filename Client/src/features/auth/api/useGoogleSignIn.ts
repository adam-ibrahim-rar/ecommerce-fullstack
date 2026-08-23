import { useCallback, useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (
            momentListener?: (notification: unknown) => void
          ) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>
          ) => void;
        };
      };
    };
  }
}

let scriptLoadingPromise: Promise<void> | null = null;

const loadGoogleScript = () => {
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${GOOGLE_SCRIPT_SRC}"]`
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("Failed to load Google Identity Services"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Identity Services"));

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};

/**
 * Loads Google Identity Services and gives you a `promptGoogleSignIn`
 * function that opens the Google One Tap / account chooser and calls
 * `onCredential` with the ID token once the user picks an account.
 */
export function useGoogleSignIn(onCredential: (credential: string) => void) {
  const [isReady, setIsReady] = useState(false);
  const onCredentialRef = useRef(onCredential);
  onCredentialRef.current = onCredential;

  useEffect(() => {
    let cancelled = false;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as
      | string
      | undefined;

    if (!clientId) {
      console.error(
        "VITE_GOOGLE_CLIENT_ID is not set — Google sign-in is disabled."
      );
      return;
    }

    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google) return;

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            onCredentialRef.current(response.credential);
          },
          cancel_on_tap_outside: true,
        });

        setIsReady(true);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const promptGoogleSignIn = useCallback(() => {
    if (!window.google?.accounts?.id) {
      console.error("Google Identity Services is not ready yet.");
      return;
    }

    window.google.accounts.id.prompt();
  }, []);

  return { promptGoogleSignIn, isReady };
}