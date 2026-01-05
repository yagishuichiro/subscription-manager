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
    next_update: formData.get("next_update") as string, // ← 文字列のまま
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
