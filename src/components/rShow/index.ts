import React from 'react';
import {useLocation} from "react-router-dom";
import system from "../../store/system";
import {useSnapshot} from "valtio";
const RShow: React.FC = ({ children, show }: any) => {
  const { pathname } = useLocation();
  const { cRouter, userInfo: { page } } = useSnapshot(system)
  let appShow = true
  const index = cRouter.findIndex((r: any) => {
    return pathname === r.key
  })
  const { id, permission } = cRouter[index]
  const userPer = page[id]
  if (permission && Array.isArray(permission)) {
    if (permission.includes(show)) {
      if (!userPer || Array.isArray(userPer) && (userPer.length === 0 || !userPer.includes(show))) appShow = false
    }
  }
  return (
    appShow ? children : ''
  )
}

export default RShow;
