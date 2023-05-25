import React from "react";
import { BrowserRouter, Route, Link, Navigate } from "react-router-dom";
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate()
  return (
    // <nav>
      <Header>
          <Menu
          theme='dark'
          mode="horizontal"
          style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="/" onClick={() => {navigate("/")}}>
                  Profile
            </Menu.Item>
            <Menu.Item key="/Keyword" onClick={() => { navigate("/Keyword", { replace: true }) }}>
                  Keyword Anaylsis
            </Menu.Item>
            <Menu.Item key="/ComparisonPage" onclick={() => { navigate("/ComparisonPage",  { replace: true })}}>
                  Twitter vs Mastdon
            </Menu.Item>
          </Menu>
      </Header>
  );
}

export default Navbar;