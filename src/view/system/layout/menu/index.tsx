import React, { useState } from 'react';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Divider, Menu, Switch} from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import system from "../../../../store/system";
import {useSnapshot} from "valtio";
import { useNavigate, useParams } from "react-router-dom";
import SvgIcon from "../../../../components/SvgIcon";
import useDfs from "../../../../hook/useDfs";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const toggleCollapsed = () => {
    system.collapsed = !system.collapsed
  };
  const setIcon = (item: any) => {
    const tem = item.svgIcon
    if (item.svgIcon) item.icon = <SvgIcon icon={ tem } />
    delete item.svgIcon
    const show = ["key", "icon", "children", "label", "path"]
    for (let key in item) if (!show.includes(key)) delete item[key]
  }

  const { mode, theme, collapsed, menu, tags, cRouter, activeMenu } = useSnapshot(system)
  useDfs(menu, setIcon)


  const changeMode = (value: boolean) => {
    system.mode = value ? 'vertical' : 'inline';
  };

  const changeTheme = (value: boolean) => {
    system.theme = value ? 'dark' : 'light';
  };
  const navigate = useNavigate()

  const selectMenu = (data: any) => {
    const path = data.keyPath.reverse().join('/')
    const index = cRouter.findIndex((c: any) => {
      return c.key === path
    })
    const tagIndex = tags.findIndex((t) => { return t.path === path } )
    if (tagIndex < 0) {
      system.tags.push({
        name: cRouter[index].label,
        path: path
      })
    }
    system.activeTag = path
    if (data.keyPath.length > 1) {
      navigate(path)
    } else navigate(data.key)
  }

  return (
    <Menu
      style={{ height: 'calc(100% - 85px)', width: "100%" }}
      defaultSelectedKeys={system.activeMenu}
      defaultOpenKeys={['sub1']}
      mode={mode}
      theme={theme}
      items={menu}
      inlineCollapsed={collapsed}
      onSelect={ selectMenu }
    />
  );
};

export default App;
