import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import system from "../../../../../store/system";
import "./index.scss"
import {useSnapshot} from "valtio";

const NavigationBar: React.FC = () => {

  const toggleCollapsed = () => {
    system.collapsed = !system.collapsed
  };

  const { collapsed } = useSnapshot(system)
  return (
    <div className="layout-navigation" >
      <div onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined className="collapse-icon" /> : <MenuFoldOutlined className="collapse-icon" />}
      </div>
    </div>
  );
};

export default NavigationBar;
