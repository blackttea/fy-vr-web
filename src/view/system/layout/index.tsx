import React from 'react';
import './index.scss'
import FyMenu from "./menu";
import system from "../../../store/system";
import {useSnapshot} from "valtio";
import NavigationBar from "./Header/NavigationBar"
import TagsView from "./Header/TagsView"
import Home from "../../dashboard";
import { Routes, Route, Outlet } from "react-router-dom";
import {RouteConfig} from "../../../router";
import AuthRoute from "../../../router/AuthRoute";



const Layout: React.FC = () => {
  const { collapsed, cRouter } = useSnapshot(system)
  const RouteAuthFun = (routeList: RouteConfig[]) => {
    return ( routeList.map(
      (item: {
        path: string;
        auth: boolean;
        element: any;
        children?: any;
      }) => {
        return (
          <Route
            path={ item.path }
            element={
              <AuthRoute auth={item.auth} key={item.path}>
                { <item.element /> }
              </AuthRoute>
            }
            key={item.path}
          >
            {item?.children && RouteAuthFun(item.children)}
          </Route>);
      }
    ));
  }

  return (
    <section className="layout-container">
      <aside className="layout-side" style={ !collapsed ? { width: "220px" } : { width: "80px" } }>
        <img src="/src/assets/img/logo-text-2.png" alt="" className="logo-icon" />
        <FyMenu></FyMenu>
      </aside>
      <main className="layout-main">
        <header className="layout-header">
          <NavigationBar />
          <TagsView />
        </header>
        <div className="layout-content">
          <Routes>
            { RouteAuthFun(cRouter) }
          </Routes>
          <Outlet></Outlet>
        </div>
      </main>
    </section>);
}

export default Layout;
