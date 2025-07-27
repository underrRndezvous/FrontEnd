import type { RouteObject } from "react-router-dom";
import Step0_Page from "@/pages/step0";
import Step1_1Page from "@/pages/step1_1";
import Step1_2Page from "@/pages/step1_2";
import Step1_3Page from "@/pages/step1_3";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Step0_Page />,
  },
  {
    path: "/Plaza/step1_1",
    element: <Step1_1Page />,
  },
  {
    path: "/Plaza/step1_2",
    element: <Step1_2Page />,
  },
  {
    path: "/plaza/step1_3",
    element: <Step1_3Page />,
  },
];

export default routes;
