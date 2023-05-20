import React from 'react';
// import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPage from "./pages/layout";
import ProfilePage from "./pages/map";
import KeywordPage from "./pages/map2";
import {Layout, Menu } from 'antd'
import './index.css';
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<ProfilePage />} />
          <Route path="Keyword" element={<KeywordPage />} />    
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div>
    <Layout>
      {/* <Header>
          <Menu
          theme='dark'
          mode="horizontal"
          style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="/charts">
              Charts
            </Menu.Item>
            <Menu.Item key="/detail">
              Detail
            </Menu.Item>
          </Menu>
      </Header> */}
    <Content>
      <App />
    </Content>

    </Layout>
    </div>
     
  </React.StrictMode>
);







// root.render(
//   <React.StrictMode>
//     {/* <DemoWordC
//     loud/>
//     <DemoPieChart/> */}
//     {/* <DemoAreaMap></DemoAreaMap> */}
//     <DemoAreaMap></DemoAreaMap>
//     {/* <div style={{ position: 'fixed', bottom: 0, right: 0 }}> */}
//     {/* <Wordcloudl>
//     </Wordcloudl> */}
//     {/* </div> */}
    
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
