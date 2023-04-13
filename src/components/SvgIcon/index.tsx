import React from 'react';
const SvgIcon = (props: any) => {
  const { icon, style } = props;
  return (
    <span dangerouslySetInnerHTML={{__html: icon}} style={ style }></span>
  );
};

export default SvgIcon;

