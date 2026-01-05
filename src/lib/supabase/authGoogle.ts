"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// ---------------------------------------------
// Googleログイン
// ---------------------------------------------
export async function signInWithGoogle() {
  const supabase = await createClient();

  console.log("ログイン開始");
  console.log("SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  console.log("redirectTo:", `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`);
  console.log("OAuth URL:", url);

  if (error) console.error("Googleログインエラー:", error.message);
  if (!error && url) redirect(url);
}


