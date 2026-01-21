"use server";

import { redirect } from "next/navigation";
import { createClient } from "./server";
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
