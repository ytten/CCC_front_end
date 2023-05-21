import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from '../component/Legend';
import Optionsfield from '../component/Optionsfield';
// import '../Component/Map.css';
import data from '../data.json';
import { Col, InputNumber, Row, Slider, Space, Card, Layout} from 'antd';
import Wordcloud from '../component/WordCloud'
import EChartsReact from "echarts-for-react";
import BarChart from '../component/barChart';
import Map from '../component/map'
// import "./styles.css";



mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';


const ProfilePage = () => {


  const chartOptions = [{
    title: {
      text: "Test",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "60%",
        label: null,
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  },{
      title: {
        text: "Test",
        // subtext: "Fake Data",
        left: "center",
        top: "bottom"

      },
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "60%",
          label: null,
          data: [
            { value: 1, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 3, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    },{
      title: {
        text: "Test",
        // subtext: "Fake Data",
        left: "center",
        top: "bottom"
      },
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "60%",
          label: null,
          data: [
            { value: 1000, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 4, name: "Video Ads" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    },
  ]
  const [statename, setStatename] = useState(null)
  const updateMapState = (newState) => {
    setStatename(newState);
  };

  return (

    <div className="body">
      
      {/* {/* <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      /> */}
          
      
      <Row>
      <Card title='Map'
      style={{ top: '100px',  left: '50px', height:'600px'	}}>
        <Row>
          <h5>{statename}</h5>
        </Row>
        <Col span={12}>
          
          <Row>
            <Col span={24}>
              {/* <div ref={mapContainerRef} className='map-container' />
              <Slider
                min={1}
                max={4}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
                style={{width: '500px'}}
              /> */}
              <Map updateMapState={updateMapState}></Map>
              
              
            </Col>
          </Row>
          
          
        </Col>
        </Card>
        <Card title='Map'
      style={{ top: '100px',  left: '50px', height:'600px'	}}>
        {/* <Legend active={active} stops={active.stops} style={{height: '200px', width: '50px', left:'0px', top:'40px'}}/> */}
        </Card>
        <Col span={12}>
          <Row>
          <Card title='Charts'
          style={{ top:"100px", left: '50px', height: '600px'}}>
            <Row>
              <Col span={8}>
                <EChartsReact option={chartOptions[0]} style={{width:'250px', height:'250px', bottom: '40px'}}/>
              </Col>
              <Col span={8}>
              <EChartsReact option={chartOptions[2]} style={{width:'250px',  height:'250px', bottom: '40px'}}/>
              </Col>
              <Col span={8}>
              <EChartsReact option={chartOptions[0]} style={{width:'250px',  height:'250px', bottom: '40px'}}/>
              </Col>
            </Row>
              <Row>
              <Col span={8}>
              <EChartsReact option={chartOptions[1]} style={{width:'250px',  height:'250px', bottom: '40px'}}/>
              </Col>
              <Col span={8}>
              <EChartsReact option={chartOptions[0]} style={{width:'250px',   height:'250px', bottom: '40px'}}/>
              </Col>
              <Col span={8}>
              <BarChart style={{ bottom: '40px'}}/>
              </Col>
              </Row>
              </Card>
          </Row>
        </Col>
      </Row>
      
    </div>
  );
};


export default ProfilePage;