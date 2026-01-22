"use server";

import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "./server";
import { revalidatePath } from "next/cache";
import { authSchema } from "../varidations/auth";
import { prisma } from "../prisma";

export type ActionStateType = {
  success: boolean;
  message?: string;
  error?: {
    email?: string[];
    password?: string[];
    message?: string;
  };
};

export async function login(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validate = authSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: validate.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!existingUser) {
    return {
      success: false,
      error: { message: "このメールアドレスは登録されていません" },
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      error: { message: "パスワードが正しくありません" },
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(prevState: ActionStateType, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validate = authSchema.safeParse(data);

  if (!validate.success) {
    return {
      success: false,
      error: validate.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return {
      success: false,
      error: {
        email: ["このメールアドレスは既に使用されています"],
      },
    };
  }
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Supabase signup error:", error);
    return {
      success: false,
      error: { message: `登録に失敗しました: ${error.message}` },
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

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

// ---------------------------------------------
// ログアウト
// ---------------------------------------------
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("ログアウトエラー:", error.message);
    return false;
  }

  return true;
}

// ---------------------------------------------
// ユーザー削除
// ---------------------------------------------
export async function deleteUser(id: string) {
  try {
    // Admin API用のクライアントを使用
    const supabaseAdmin = createAdminClient();

    // Supabase認証システムからユーザーを削除
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.error("Supabase auth deletion failed:", authError);
      throw new Error("認証ユーザーの削除に失敗しました。");
    }

    // Prismaデータベースからユーザーを削除
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("User deletion failed:", error);
    throw new Error("削除に失敗しました。");
  }
}

export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.log("認証失敗、ログインページにリダイレクト");
    redirect("/login");
  }

  return user;
}
