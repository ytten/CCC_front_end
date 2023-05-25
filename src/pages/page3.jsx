import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { Col, InputNumber, Row, Slider, Space, Card, Layout } from 'antd';
import WordcloudT from '../component/WordCloudOnly';
import WordcloudM from '../component/WordCloudOnlyM';
import axios from 'axios'

mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';


const ComparisonPage = () => {
//   const node = useRef(document.getElementById('wordcloud'));

    
//   const TwitterSentimentChartSetup = {
//     title: {
//       text: "Twitter Weighted Sentiment",
//       // subtext: "Fake Data",
//       left: "center",
//       top: "bottom"
//     },
//     xAxis: {
//       type: "category",
//       data: ["ALP", "LPA","GREENS","NPA"],
//       axisLabel: {
//         textStyle: {
//           fontSize: 12, // Set the font size for x-axis labels
//         },
//       },
//     },
//     yAxis: {
//       type: "value",
//       axisLabel: {
//         textStyle: {
//           fontSize: 7, // Set the font size for x-axis labels
//         },
//       },

//     },

//     series: [
//       {
        
//         data: sentiment,
//         type: "bar",
//         smooth: true
//       }
//     ],
//     tooltip: {
//       valueFormatter: (value) => value.toFixed(5),
//       trigger: "axis"
//     }
//   }


//   const updateMapState = (newState) => {
//     setStatename(newState);
//   }

//   useEffect(() => {
    
//     axios.get('http://localhost:8080/api/twitter/v1/party/sentiment')
//     .then(res=>{
//       var option = {}
//       var sentiment = []
//       console.log(res.data.data)
//       for (let i = 244; i <= 247; i++) {
//         sentiment.push(res.data.data[i])
//       } 
      
//       sentiment.forEach(item => {
//         const { state, party, sentiment, ...rest } = item;
//         var color = ''
//         if (party === "ALP") {
//           color = '#eb7f7f'
//         }
//         if (party === "LPA") {
//           color = '#cedb85'
//         }
//         if (party === "NPA") {
//           color = '#ff8000'
//         }
//         if (party === "GREENS") {
//           color = '#78aede'
//         }   
//         if (option['Australia']) {
//           option['Australia'].push({'name':party,'value':sentiment,itemStyle:{color:color}});
//         } else {
//           option['Australia'] = [{'name':party, 'value':sentiment,itemStyle:{color:color}}];
//         }
//       })


//       console.log('test',option)
//       setSentiment(option['Australia'])
//       })
// }, [statename])
    
  return (

    <div className="body">

      <Row>

        <Col span={24}>
          <Row>
            <Card title='Twitter WordCloud'
              style={{ top: "100px", left:'400px'}}>
              <Row>
               <Col span={24}>
                    <WordcloudT id='wordcloudT' style={{left:'800px'}}></WordcloudT>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Card title='Mastdon WordCloud'
              style={{ top: "100px",left:'400px'}}>
              <Row>
               <Col span={24}>
                    <WordcloudM id='wordcloudM' style={{top:'-100px'}}></WordcloudM>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>
      </Row>

    </div>
  );
};


export default ComparisonPage;