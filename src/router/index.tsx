import React, {Suspense, lazy, ReactNode} from "react";
import {Outlet, Navigate, useRoutes, Route} from "react-router-dom";

import Layout from "../view/system/layout";
import Login from "../view/system/login";
import Home from "../view/dashboard";

const LayoutComponent = ({children}: any) => {
  return (
    <Suspense fallback = {""}>
      <Layout />
    </Suspense>
  );
};

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  auth: boolean;
  children?: RouteConfig[];
  redirect?: string
}

export const routers = [
  {path: "/login", element: <Login />, auth: false},
  {
    path: "/",
    element: <Layout />,
    auth: true,
    children: [
      {path: "/home", element: <Home />, auth: true},
    ],
  },
];
