import React from 'react';
import './index.scss'
import FyMenu from "./menu";
import system from "../../../store/system";
import {useSnapshot} from "valtio";
import NavigationBar from "./Header/NavigationBar"
import TagsView from "./Header/TagsView"
import Home from "../../Home";
import { Routes, Route, Outlet } from "react-router-dom";

const App: React.FC = () => {
  const { collapsed } = useSnapshot(system)
  return (
    <section className="layout-container">
      <aside className="layout-side" style={ !collapsed ? { width: "220px" } : { width: "80px" } }>
        <img src="src/assets/img/logo-text-2.png" alt="" className="logo-icon" />
        <FyMenu></FyMenu>
      </aside>
      <main className="layout-main">
        <header className="layout-header">
          <NavigationBar />
          <TagsView />
        </header>
        <div className="layout-content">
          <Outlet></Outlet>
        </div>
      </main>
    </section>
  );
}

export default App;
