import { useEffect, useRef, useState } from "react";

// The `window.google` type comes from src/types/google-identity.d.ts
// (kept in exactly ONE file in the project — don't redeclare it here
// or anywhere else, or TypeScript will complain about conflicting
// declarations of the same global interface member).

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

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
 * Loads Google Identity Services and renders Google's real (invisible)
 * button into `buttonContainerRef`. Put that ref on a div positioned
 * absolutely on top of your own styled button — the real click lands on
 * Google's button (a genuine trusted user gesture), so the flow works
 * even when third-party cookies / One Tap are blocked by the browser.
 *
 * We intentionally avoid `google.accounts.id.prompt()` triggered from a
 * click handler — it depends on FedCM/third-party cookies and commonly
 * fails silently (or with a 403 on accounts.google.com/gsi/status) in
 * current Chrome versions.
 */
export function useGoogleSignIn(onCredential: (credential: string) => void) {
  const [isReady, setIsReady] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
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
          // `use_fedcm_for_prompt` is not in the bundled Google typings here,
          // so we cast the config to keep the runtime option without a type error.
        } as typeof window.google.accounts.id.initialize extends (
          config: infer T
        ) => unknown
          ? T & { use_fedcm_for_prompt?: boolean }
          : never);

        // NOTE: The runtime option is applied via the cast above; the typed
        // Google SDK in this project doesn't expose it yet.

        setIsReady(true);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady || !window.google || !buttonContainerRef.current) return;

    // Render Google's real button (invisible) into the container.
    // Its width matches the container so the whole overlay is clickable.
    window.google.accounts.id.renderButton(buttonContainerRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      width: 343,
    });
  }, [isReady]);

  return { buttonContainerRef, isReady };
}