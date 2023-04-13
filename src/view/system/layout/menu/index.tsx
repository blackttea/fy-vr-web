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
import {useNavigate} from "react-router-dom";

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

const items: MenuItem[] = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

console.log(system.menu)
console.log(items)

const App: React.FC = () => {
  const toggleCollapsed = () => {
    system.collapsed = !system.collapsed
  };
  const { mode, theme, collapsed } = useSnapshot(system)

  const changeMode = (value: boolean) => {
    system.mode = value ? 'vertical' : 'inline';
  };

  const changeTheme = (value: boolean) => {
    system.theme = value ? 'dark' : 'light';
  };
  const navigate = useNavigate()
  const selectMenu = (data: any) => {
    navigate('/home')
  }

  return (
    <Menu
      style={{ height: 'calc(100% - 85px)', width: "100%" }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode={mode}
      theme={theme}
      items={items}
      inlineCollapsed={collapsed}
      onSelect={ selectMenu }
    />
  );
};

export default App;
