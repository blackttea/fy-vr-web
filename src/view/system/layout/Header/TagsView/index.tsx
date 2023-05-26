import React, { useState } from 'react';
import {
  TagFilled
} from '@ant-design/icons';
import "./index.scss"
import { useSnapshot } from "valtio";
import system from "../../../../../store/system";
import { Space, Tag } from 'antd';
import {it} from "node:test";
import {useNavigate} from "react-router-dom";

const TagsView: React.FC = () => {
  const { tags, activeTag } = useSnapshot(system)

  const navigate = useNavigate()
  const closeTag = (item: any) => {
    const index = system.tags.findIndex((tag) => {
      return tag.path === item.path
    })
    system.tags.splice(index, 1)
  }

  const toRoute = (item: any): any => {
    system.activeTag = item.path
    system.activeMenu = [item.path]
    navigate(item.path)
  }

  return (
    <div className="layout-tag">
      <Space size={[0, 8]} wrap>
        { tags.map((item, index) =>
          <Tag
            closable
            className="tag-item"
            key={ item.path }
            onClick={ () => toRoute(item) }
            color={ activeTag == item.path ? "#55acee" : "" }
            onClose={() => closeTag(item)}
            icon={ <TagFilled style={{  color: "#FFFFFF" }} /> }
          >
            { item.name }
          </Tag>)
        }
      </Space>
    </div>
  );
};

export default TagsView;
