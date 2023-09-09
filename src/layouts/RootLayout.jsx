import React from "react";
import { Header } from "@/components/layout/";

const RootLayout = ({ children }) => {
  return (
    <div className="bg-purple-200 ">
        <Header />
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;

