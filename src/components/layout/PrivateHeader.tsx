"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "../ui/buttons/LogoutButton";

const PrivateHeader = () => {
  return (
    <header className="flex justify-between items-center pt-4.5 pr-[25px] pb-3.5 pl-8.5 bg-gray-dr">
      <h1 className="w-[93px]">
        <Image src="/lg-header.svg" width={93} height={23} alt="サブスクのロゴ" />
      </h1>
      <div className="flex items-center gap-[23px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <figure>
              <Image src="/icn-person.svg" width={21} height={22} alt="" />
            </figure>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="">詳細</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="">編集</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer">削除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <LogoutButton />
      </div>
    </header>
  );
};

export default PrivateHeader;
