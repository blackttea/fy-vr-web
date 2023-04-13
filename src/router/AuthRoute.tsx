import { message } from "antd";
import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routers } from "./index";
import {getLocal} from "../utils/cache/useSession";
import system from "../store/system";
import {getMenu} from "../store/system";

const AuthRoute = ({ children, auth }: any) => {
  const navigate = useNavigate();
  const token = getLocal("token", false);
  const match = matchRoutes(routers, location);

  const isExist = match?.some((item) => item.pathname == location.pathname);
  useEffect(() => {
    if (!token && auth) {
      navigate("/login");
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist) {
      const next = () => {
        // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
        if (location.pathname == "/login") {
          navigate("/");
        } else {
          // 如果是其他路由就跳到其他的路由
          navigate(location.pathname);
        }
      }
      if (system.menu.length === 0) {
        getMenu().then(r => {
          next()
        })
      } else {
        next()
      }
    }
  }, [token, location.pathname]);

  return children;
};
export default AuthRoute;
