import {ReactNode, useCallback, useEffect, useState} from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {RouteConfig, routers} from "./router";
import AuthRoute from "./router/AuthRoute";
import "./App.css"

const App = () => {

  const loginState = "login";

  // 处理我们的routers
  const RouteAuthFun = (
    (routeList: RouteConfig[]) => {
      return routeList.map(
        (item: {
          path: string;
          auth: boolean;
          element: ReactNode;
          children?: any;
        }) => {
          return (
            <Route
              path={ item.path }
              element={
                <AuthRoute auth={item.auth} key={item.path}>
                  {item.element}
                </AuthRoute>
              }
              key={item.path}
            >
              {/* 递归调用，因为可能存在多级的路由 */}
              {item?.children && RouteAuthFun(item.children)}
            </Route>
          );
        }
      );
    }
  );
  return <div className="App">
    <BrowserRouter>
      <Routes>
        {RouteAuthFun(routers)}
      </Routes>
    </BrowserRouter>
  </div>
};
export default App

