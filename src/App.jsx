import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { RootLayout } from "@/layouts";
import { Login, Home } from "@/pages";
import { AuthContextProvider } from "@/lib/contexts/AuthContext";
const App = () => {
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
