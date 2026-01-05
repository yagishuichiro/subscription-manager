import AddSubscriptionForm from "@/components/dashboard/AddSubscriptionForm";
import React from "react";

const AdditionPage = () => {
  return (
    <section className="pt-15 pb-7.5 px-30">
      <div className="max-w-[530px] mx-auto">
        <h2 className="text-xl font-extrabold">サブスク追加</h2>
        <AddSubscriptionForm />
      </div>
    </section>
  );
};

export default AdditionPage;
