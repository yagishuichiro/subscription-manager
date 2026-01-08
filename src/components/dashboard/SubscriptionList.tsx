import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";
import Image from "next/image";
import { Subscriptions } from "@/types/subscription";
import { format } from "date-fns";

const SubscriptionList = ({ subscriptions }: Subscriptions) => {
  return (
    <Card className="mt-9.5 ">
      <CardHeader>
        <CardTitle className="font-medium">サブスク一覧</CardTitle>
        <CardDescription>追加済みのサブスク一覧</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-[repeat(4,1fr)_24%] border-none">
              <TableHead className="text-xs text-[#868686]">サブスク名</TableHead>
              <TableHead className="text-xs text-[#868686]">料金</TableHead>
              <TableHead className="text-xs text-[#211b1b]">更新サイクル</TableHead>
              <TableHead className="text-xs text-[#868686]">次回更新日</TableHead>
              <TableHead className="text-xs text-[#868686]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="block">
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id} className="grid grid-cols-[repeat(4,1fr)_24%]">
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.amount} 円</TableCell>
                <TableCell>
                  {subscription.update_cycle_number}
                  {subscription.update_cycle_unit === "DAY" && "日"}
                  {subscription.update_cycle_unit === "MONTH" && "ヶ月"}
                  {subscription.update_cycle_unit === "YEAR" && "年"}
                  ごと
                </TableCell>
                <TableCell>{format(subscription.next_update, "yyyy/MM/dd")}</TableCell>
                <TableCell className="flex justify-end gap-x-[13px]">
                  <figure className="w-[15px]">
                    <Link href="/addition">
                      <Image src="/icn-edit.svg" width={15} height={15} alt="編集のアイコン" />
                    </Link>
                  </figure>
                  <figure className="w-[14px]">
                    <Image src="/icn-delete.svg" width={14} height={16} alt="ゴミ箱のアイコン" />
                  </figure>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscriptionList;
