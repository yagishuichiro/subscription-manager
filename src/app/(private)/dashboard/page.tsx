import React from "react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubscriptionList from "@/components/dashboard/SubscriptionList";
import { getSubscriptions } from "@/lib/data/subscription";
import MonthlyTotal from "@/components/dashboard/MonthlyTotal";

const DashboardPage = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const userId = data.user.id;
  const subscriptions = await getSubscriptions(userId);
  console.log(subscriptions);

  return (
    <section className="pt-15 pb-7.5 px-12">
      <div className="max-w-[1456px] mx-auto">
        <div className="flex items-center gap-x-[9px]">
          <figure className="w-[25px]">
            <Image src="/icn-dashboard.svg" width={25} height={21} alt="ダッシュボードのアイコン" />
          </figure>
          <h2 className="text-[20px] font-bold">新規登録</h2>
        </div>
        <div className="flex justify-between mt-[35px]">
          <div className="w-[calc((1050/1456)*100%)]">
            <div className="grid grid-cols-3 gap-x-8.5">
              <MonthlyTotal subscriptions={subscriptions} />
              <Card className=" pt-[17px] pb-[45px]">
                <CardHeader>
                  <CardTitle className="font-medium">年間合計</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-right">
                    <span className="text-2xl inline-block mr-[10px]">5,000</span>円
                  </p>
                </CardContent>
              </Card>
              <Card className=" pt-[17px] pb-[45px]">
                <CardHeader>
                  <CardTitle className="font-medium">サブスク合計</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-right">
                    <span className="text-2xl inline-block mr-[10px]">5</span>件
                  </p>
                </CardContent>
              </Card>
            </div>
            <SubscriptionList subscriptions={subscriptions} />
          </div>
          <Card className="w-[calc((350/1456)*100%)]">
            <CardHeader>
              <CardTitle className="font-medium">更新予定のサブスク</CardTitle>
              <CardDescription>7日以内に更新予定</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="grid grid-cols-2 border-none">
                    <TableHead className="text-xs text-[#868686]">サブスク名</TableHead>
                    <TableHead className="text-xs text-[#868686] text-right">更新日</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="block">
                  <TableRow className="grid grid-cols-2 ">
                    <TableCell>Netflix</TableCell>
                    <TableCell className="text-right">
                      <time>2025/11/22</time>
                    </TableCell>
                  </TableRow>
                  <TableRow className="grid grid-cols-2 ">
                    <TableCell>Netflix</TableCell>
                    <TableCell className="text-right">
                      <time>2025/11/22</time>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
