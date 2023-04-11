import React from 'react';
import './index.scss'
import FyMenu from "./menu";
import system from "../../../store/system";
import {useSnapshot} from "valtio";

const App: React.FC = () => {
  const { collapsed } = useSnapshot(system)
  return (
    <section className="layout-container">
      <aside className="layout-side" style={ !collapsed ? { width: "220px" } : { width: "80px" } }>

        <FyMenu></FyMenu>
      </aside>
    </section>
  );
}

export default App;
