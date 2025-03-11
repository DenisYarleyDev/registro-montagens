import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Index from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Registros from "./pages/registros";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/registros",
    element: <Registros />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
