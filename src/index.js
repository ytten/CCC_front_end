import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DemoPieChart from './PieChart';
// import DemoMap from './map';
import reportWebVitals from './reportWebVitals';
import DemoAreaMap from './map';
// import map from './map2'
import './App.css'
import Wordcloudl from './WordCloud';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <DemoWordC
    loud/>
    <DemoPieChart/> */}
    {/* <DemoAreaMap></DemoAreaMap> */}
    <DemoAreaMap></DemoAreaMap>
    {/* <div style={{ position: 'fixed', bottom: 0, right: 0 }}> */}
    {/* <Wordcloudl>
    </Wordcloudl> */}
    {/* </div> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
