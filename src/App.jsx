import React from "react";
import { Outlet, useLocation } from "react-router-dom";
// @ts-ignore
import { RootLayout } from "@/layouts";
// @ts-ignore
import { Login, Home } from "@/pages";
// @ts-ignore
import { AuthContextProvider } from "@/lib/contexts/AuthContext";
const App = () => {
  // @ts-ignore
  const { pathname } = useLocation();

  return (
    <AuthContextProvider>
        <RootLayout>
          <Outlet />
        </RootLayout>
    </AuthContextProvider>
  );
};

export default App;
