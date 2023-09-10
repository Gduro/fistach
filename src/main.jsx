import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute, ProtectedRouteId } from "./layouts";
import {
  Account,
  Library,
  SignUp,
  MySets,
  Login,
  Create,
  Home,
  EnglishLib,
  DeutchLib,
  OpenCard,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/fistach",
    element: <App />,
   
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
