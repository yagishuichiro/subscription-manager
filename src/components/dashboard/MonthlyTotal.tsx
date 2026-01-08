import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Subscriptions } from "@/types/subscription";

const MonthlyTotal = ({ subscriptions }: Subscriptions) => {
  const today = new Date();

  const month = today.setMonth(today.getMonth() + 1);
  //   const result = subscriptions.reduce((total, subsciption) => (
  //     if()
  //   ), 0);
  return (
    <Card className=" pt-[17px] pb-[45px]">
      <CardHeader>
        <CardTitle className="font-medium">月間合計</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-right">
          <span className="text-2xl inline-block mr-[10px]"></span>円
        </p>
      </CardContent>
    </Card>
  );
};

export default MonthlyTotal;
