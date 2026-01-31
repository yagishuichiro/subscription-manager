import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),

  password: z
    .string()
    .min(1, { message: "パスワードは必須です" })
    .min(6, { message: "パスワードは6文字以上である必要があります" }),
});

export const notificationEmailSchema = z.object({
  notification_email: z
    .string()
    .min(1, { message: "通知先メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),
});

export type authFormValues = z.infer<typeof authSchema>;
export type notificationEmailFormValues = z.infer<typeof notificationEmailSchema>;
