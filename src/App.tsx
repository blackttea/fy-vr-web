import {ReactNode, useCallback, useEffect, useState} from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {RouteConfig} from "./router";
import AuthRoute from "./router/AuthRoute";
import "./App.css"
import system, {getMenu} from "./store/system";
import { useSnapshot } from "valtio";
import { initRouter } from "./router";
import dashboard from "./view/dashboard";
import {getLocal} from "./utils/cache/useSession";
import Layout from "./view/system/layout";

const getM = async () => {
  const token = getLocal("token", false);
  if (token) await getMenu()
}

getM().then(r => { return })
const App = () => {
  initRouter()
  const { routers } = useSnapshot(system)
  // 处理我们的routers
  const RouteAuthFun = (routeList: RouteConfig[]) => {
    return routeList.map(
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
                { item.element }
              </AuthRoute>
            }
            key={item.path}
          >
          </Route>
        );
      }
    );
  }
  // @ts-ignore
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <AuthRoute auth={"/"} key={"/"}>
            <Layout />
          </AuthRoute>
          } />
        {RouteAuthFun(routers)}
      </Routes>
    </BrowserRouter>
  </div>
};
export default App

