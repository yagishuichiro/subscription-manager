import nodemailer from "nodemailer";
import { PrismaClient } from "../src/generated/prisma";
import { startOfDay, endOfDay } from "date-fns";

const prisma = new PrismaClient();

async function sendNotifications() {
  const today = new Date();

  const subscriptions = await prisma.subscription.findMany({
    where: {
      next_update: {
        gte: startOfDay(today),
        lte: endOfDay(today),
      },
    },
    include: { user: true },
  });

  if (subscriptions.length === 0) {
    console.log("今日更新のサブスクはありません");
    return;
  }

  // ユーザーごとにグループ化
  const userMap = new Map<string, { email: string; names: string[] }>();

  for (const sub of subscriptions) {
    const email = sub.user.notification_email || sub.user.email;
    if (!userMap.has(sub.user_id)) {
      userMap.set(sub.user_id, { email, names: [] });
    }
    userMap.get(sub.user_id)!.names.push(sub.name);
  }

  // メール送信
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASS,
    },
  });

  for (const { email, names } of userMap.values()) {
    const list = names.map((n) => `・${n}`).join("\n");

    await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: "サブスク更新通知",
      text: `本日更新のサブスクをご連絡いたします\n\n${list}`,
    });

    console.log("送信成功:", email);
  }
}

sendNotifications()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
