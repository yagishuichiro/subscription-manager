import { prisma } from "../prisma";

export async function getSubscriptions(userId: string) {
  return await prisma.subscription.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
      user: true,
      name: true,
      amount: true,
      next_update: true,
      update_cycle_number: true,
      update_cycle_unit: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
