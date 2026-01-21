"use server";

import { UpdateCycleUnit } from "@/generated/prisma";
import { subcriptionSchema } from "../varidations/subscription";
import { createClient } from "../supabase/server";
import { prisma } from "../prisma";

export type ActionStateType = {
  success: boolean;
  message?: string;
  error?: {
    name?: string[];
    amount?: string[];
    update_cycle_number?: string[];
    update_cycle_unit?: string[];
    next_update?: string[];
  };
};

export async function addSubscription(prevState: ActionStateType, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    amount: Number(formData.get("amount")),
    update_cycle_number: Number(formData.get("update_cycle_number")),
    update_cycle_unit: (formData.get("update_cycle_unit") as UpdateCycleUnit) || undefined,
    next_update: formData.get("next_update") as string,
  };

  const validationResult = subcriptionSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "不正なアクセスです" };
  }
  const userId = user.id;

  const { name, amount, update_cycle_number, update_cycle_unit, next_update } =
    validationResult.data;

  await prisma.subscription.create({
    data: {
      user_id: userId,
      name,
      amount,
      update_cycle_number,
      update_cycle_unit,
      next_update,
    },
  });
  return { success: true };
}

export async function editSubscription(prevState: ActionStateType, formData: FormData) {
  const data = {
    id: formData.get("subscriptionId") as string,
    name: formData.get("name") as string,
    amount: Number(formData.get("amount")),
    update_cycle_number: Number(formData.get("update_cycle_number")),
    update_cycle_unit: (formData.get("update_cycle_unit") as UpdateCycleUnit) || undefined,
    next_update: formData.get("next_update") as string,
  };

  const validationResult = subcriptionSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "不正なアクセスです" };
  }
  const userId = user.id;

  const { name, amount, update_cycle_number, update_cycle_unit, next_update } =
    validationResult.data;

  await prisma.subscription.update({
    where: {
      id: data.id,
    },
    data: {
      user_id: userId,
      name,
      amount,
      update_cycle_number,
      update_cycle_unit,
      next_update,
    },
  });
  return { success: true };
}

export async function deleteSubscription(id: string) {
  try {
    await prisma.subscription.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Subscription deletion failed:", error);
    throw new Error("削除に失敗しました。レコードが存在しない可能性があります。");
  }
}
