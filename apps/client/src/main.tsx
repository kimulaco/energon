import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutDefault from "./layouts/Default";
import PageIndex from "./pages/Index";
import PageLogin from "./pages/login/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <PageIndex />,
        index: true,
      },
      {
        path: "/login",
        element: <PageLogin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
