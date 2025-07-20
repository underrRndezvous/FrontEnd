import type { RouteObject } from "react-router-dom";
import StartPage from "@/pages/step0";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <StartPage />,
  },
];

export default routes;
