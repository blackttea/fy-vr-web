import React from 'react';
import "./index.scss"

const SvgIcon = (props: any) => {
  const { icon, style } = props;
  let svg = ""
  if (icon.length > 15) {
    const w_icon = icon.replace(/width="\d+"/g, `width="${props.width || 18}"`)
    svg = w_icon.replace(/height="\d+"/g, `height="${props.height || 18}"`)
    svg = svg.replaceAll(/fill="[\s\S]+"/g, `fill="${props.color || '#c0c4cc'}"`)
  }
  return (
    <span
      dangerouslySetInnerHTML={{__html: svg}}
      style={ style || { width: `${props.width || 18}px` } }
      className="svg-icon"
    />
  );
};

export default SvgIcon;

