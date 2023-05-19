import React from 'react';
// import ReactDOM from "react-dom";

// import './index.css';
import reportWebVitals from './reportWebVitals';
// // import map from './map2'
// import './App.css'
// import Wordcloudl from './WordCloud';
// import AppRouter from './AppRouter';


// const root = ReactDOM.createRoot(document.getElementById('root'));


// ReactDOM.render(
//   <React.StrictMode>
//     <AppRouter />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import ProfilePage from "./pages/map";
import KeywordPage from "./pages/map2";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
    <App />
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
