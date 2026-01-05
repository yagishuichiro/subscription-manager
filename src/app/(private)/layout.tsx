import PrivateHeader from "@/components/layout/PrivateHeader";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PrivateLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <PrivateHeader />
      <main>{children}</main>
    </>
  );
};

export default PrivateLayout;
