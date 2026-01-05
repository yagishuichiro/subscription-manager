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
import Link from "next/link";

const DashboardPage = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
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
              <Card className=" pt-[17px] pb-[45px]">
                <CardHeader>
                  <CardTitle className="font-medium">月間合計</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-right">
                    <span className="text-2xl inline-block mr-[10px]">5,000</span>円
                  </p>
                </CardContent>
              </Card>
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
                      <TableHead className="text-xs text-[#868686]">更新サイクル</TableHead>
                      <TableHead className="text-xs text-[#868686]">契約開始日</TableHead>
                      <TableHead className="text-xs text-[#868686]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="block">
                    <TableRow className="grid grid-cols-[repeat(4,1fr)_24%]">
                      <TableCell>Netflix</TableCell>
                      <TableCell>1,000 円</TableCell>
                      <TableCell>１か月ごと</TableCell>
                      <TableCell>2025/10/22</TableCell>
                      <TableCell className="flex justify-end gap-x-[13px]">
                        <figure className="w-[15px]">
                          <Link href="/addition">
                            <Image
                              src="/icn-edit.svg"
                              width={15}
                              height={15}
                              alt="編集のアイコン"
                            />
                          </Link>
                        </figure>
                        <figure className="w-[14px]">
                          <Image
                            src="/icn-delete.svg"
                            width={14}
                            height={16}
                            alt="ゴミ箱のアイコン"
                          />
                        </figure>
                      </TableCell>
                    </TableRow>
                    <TableRow className="grid grid-cols-[repeat(4,1fr)_24%]">
                      <TableCell>Netflix</TableCell>
                      <TableCell>1,000 円</TableCell>
                      <TableCell>１か月ごと</TableCell>
                      <TableCell>2025/10/22</TableCell>
                      <TableCell className="flex justify-end gap-x-[13px]">
                        <figure className="w-[15px]">
                          <Link href="/addition">
                            <Image
                              src="/icn-edit.svg"
                              width={15}
                              height={15}
                              alt="編集のアイコン"
                            />
                          </Link>
                        </figure>
                        <figure className="w-[14px]">
                          <Image
                            src="/icn-delete.svg"
                            width={14}
                            height={16}
                            alt="ゴミ箱のアイコン"
                          />
                        </figure>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
