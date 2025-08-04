import type { RouteObject } from "react-router-dom";
import Step0_Page from "@/pages/step0";
import Step1_1Page from "@/pages/step1_1";
import Step1_2Page from "@/pages/step1_2";
import Step1_3Page from "@/pages/step1_3";
import Step1_4Page from "@/pages/step1_4";
import Step1_5Page from "@/pages/step1_5";

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
    path: "/Plaza/step1_3",
    element: <Step1_3Page />,
  },
  {
    path: "/Plaza/step1_4",
    element: <Step1_4Page />,
  },
  {
    path: "/Plaza/step1_5",
    element: <Step1_5Page />,
  },
];

export default routes;
