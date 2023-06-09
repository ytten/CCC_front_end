import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import Legend from '../component/Legend';
import Optionsfield from '../component/Optionsfield';
// import '../Component/Map.css';
import data from '../data.json';
import { Col, InputNumber, Row, Slider, Space, Card } from 'antd';
import Wordcloud from '../component/WordCloud'
import EChartsReact from "echarts-for-react";
import Map from '../component/map'
// import "./styles.css";


mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';


const KeywordPage = () => {

  const [statename, setStatename] = useState(null)
  const node = useRef(document.getElementById('wordcloud'));
  const updateMapState = (newState) => {
    setStatename(newState);
    console.log(node)
    node.current.handleStateChange();
  };

  return (
    <div>
    <Row>
      <Card title='Map'
      style={{ top: '30px',  left: '50px', height:'700px', width: '600px' }}>
        <Row>
          <h5>{statename}</h5>
        </Row>
        <Col span={12}>
          
          <Row>
            <Col span={24}>
              <Map updateMapState={updateMapState}></Map>
            </Col>
          </Row>
          
        </Col>
        </Card>

        <Col span={12}>
          <Row>
          <Card title='Word Cloud'
          style={{ top: '30px', height:'700px', left:'100px', width:'800px' }}>
            
            <Col span={12}>
                <Wordcloud id='wordcloud' ref={node}></Wordcloud>
                
            </Col>
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};


export default KeywordPage;