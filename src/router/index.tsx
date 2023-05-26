import React, {Suspense, lazy, ReactNode} from "react";
import {Outlet, Navigate, useRoutes, Route} from "react-router-dom";
import system from "../store/system";
import Layout from "../view/system/layout";
import Login from "../view/system/login";
import Home from "../view/dashboard";
import useDeepClone from "../hook/useDeepClone";

const view = import.meta.glob("../view/**/**.tsx")
const view1 = import.meta.glob("../view/**/**.tsx", {eager: true})

// const LayoutComponent = ({children}: any) => {
//   return (
//     <Suspense fallback = {""}>
//       <Layout />
//     </Suspense>
//   );
// };

//懒加载组件
// function lazyLoad(path) {
// //懒加载
//   let Module = React.lazy(() => import(path));
//   return <Module />
// }

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  auth: boolean;
  children?: RouteConfig[];
  redirect?: string
}

const routers = [
  {path: "/login", element: <Login />, auth: false},
];

export const initRouter = () => {
  system.routers = useDeepClone(routers)
}
