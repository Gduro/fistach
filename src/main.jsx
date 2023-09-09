import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "@/App.jsx";
import "@/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// @ts-ignore
import { ProtectedRoute, ProtectedRouteId } from "@/layouts/";
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
// @ts-ignore
} from "@/pages";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/lib",
            element: <Library />,
          },
          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "/MyLib",
            element: <MySets />,
          },
          {
            element: <ProtectedRouteId />,
            children: [
              {
                path: "/create/:id",
                element:<Create/>
              },
              {
                path:"/open/:id",
                element:<OpenCard/>
              }
            ],
          },
          {
            path: "EnglishLibrary",
            element: <EnglishLib />,
          },
          {
            path: "DeutchLibrary",
            element: <DeutchLib />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
