import PublicHeader from "@/components/layout/PublicHeader";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
