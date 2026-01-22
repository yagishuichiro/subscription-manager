"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/supabase/auth";

export default function LogoutButton() {
  const router = useRouter();
  const onCLickLogout = async () => {
    const result = await signOut();
    if (result) router.push("/");
  };
  return (
    <button onClick={onCLickLogout}>
      <Image src="/icn-logout.svg" width={22} height={22} alt="logout" />
    </button>
  );
}
