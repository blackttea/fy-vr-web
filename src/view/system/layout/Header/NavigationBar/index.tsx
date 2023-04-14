import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import system from "../../../../../store/system";
import "./index.scss"
import {useSnapshot} from "valtio";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {clearLocal, setLocal} from "../../../../../utils/cache/useSession";

const items: MenuProps['items'] = [
  {
    label: '系统设置',
    key: 'system',
  },
  {
    type: 'divider',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
];


const NavigationBar: React.FC = () => {
  const navigate = useNavigate()
  const toggleCollapsed = () => {
    system.collapsed = !system.collapsed
  };

  const { userInfo: { img, username } } = useSnapshot(system)
  const userClick = (key: any) => {
    const name = key.key
    switch (name) {
      case 'logout':
        clearLocal('token')
        navigate('/login')
        break
    }
  }
  const { collapsed } = useSnapshot(system)
  return (
    <div className="layout-navigation" >
      <div onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined className="collapse-icon" /> : <MenuFoldOutlined className="collapse-icon" />}
      </div>
      <div className="user-info">
        <Dropdown menu={{ items, onClick: userClick }} trigger={['click']}>
          <div className="info">
              <img src={ img } alt="" className="user-logo" />
              <span>{ username }</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavigationBar;
