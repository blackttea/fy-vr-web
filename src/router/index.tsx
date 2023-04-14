import React, {Suspense, lazy, ReactNode} from "react";
import {Outlet, Navigate, useRoutes, Route} from "react-router-dom";
import system from "../store/system";
import Layout from "../view/system/layout";
import Login from "../view/system/login";
import Home from "../view/dashboard";
import useDeepClone from "../hook/useDeepClone";

// const LayoutComponent = ({children}: any) => {
//   return (
//     <Suspense fallback = {""}>
//       <Layout />
//     </Suspense>
//   );
// };

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  auth: boolean;
  children?: RouteConfig[];
  redirect?: string
}

const routers = [
  {path: "/login", element: <Login />, auth: false},
  {
    path: "/",
    element: <Layout />,
    auth: true,
    children: [
    ],
  },
];

export const initRouter = () => {
  system.routers = useDeepClone(routers)
}
