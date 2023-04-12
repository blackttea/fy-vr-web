import React, { useState } from 'react';
import {
  TagFilled
} from '@ant-design/icons';
import "./index.scss"
import { useSnapshot } from "valtio";
import system from "../../../../../store/system";
import { Space, Tag } from 'antd';

const TagsView: React.FC = () => {
  const { tags, activeTag } = useSnapshot(system)

  const closeTag = (item: any) => {
    const index = system.tags.indexOf(item)
    system.tags.splice(index, 1)
  }
  return (
    <div className="layout-tag">
      <Space size={[0, 8]} wrap>
        { tags.map((item, index) =>
          <Tag
            closable
            className="tag-item"
            key={ item }
            onClick={ () => system.activeTag = item }
            color={ activeTag == item ? "#55acee" : "" }
            onClose={() => closeTag(item)}
            icon={ <TagFilled style={{  color: "#FFFFFF" }} /> }
          >
            { item }
          </Tag>)
        }
      </Space>
    </div>
  );
};

export default TagsView;
