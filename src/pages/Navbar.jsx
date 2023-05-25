import React from "react";
import { BrowserRouter, Route, Link, Navigate } from "react-router-dom";
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  return (
    // <nav>
      <Header id='header-1'>
          <Menu
          theme='dark'
          mode="horizontal"
          style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item id = "menu-item1" key="/" onClick={() => {navigate("/", { replace: true})}}>
                  Profile
            </Menu.Item>
            <Menu.Item id = "menu-item2"  key="/Keyword" onClick={() => { navigate("/Keyword", { replace: true }) }}>
                  Keyword Analysis
            </Menu.Item>
            <Menu.Item id = "menu-item3" key="/ComparisonPage" onClick={() => { navigate("/ComparisonPage",  { replace: true })}}>
                  Twitter vs Mastodon
            </Menu.Item>
          </Menu>
      </Header>
  );
}

export default Navbar;