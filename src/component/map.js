import React, { useRef, useEffect, useState } from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import Legend from './Legend';
import Optionsfield from './Optionsfield';
import './Map.css';
import data from '../data.json';
import { Col, InputNumber, Row, Slider, Space, Card } from 'antd';
import Wordcloud from './WordCloud'
import EChartsReact from "echarts-for-react";
import axios from 'axios';


const paint_property = [
  "interpolate",
  ["linear"],
  ["get", "sentiment2"],
  1,
  "hsl(0, 58%, 76%)",
  10,
  "hsl(0, 73%, 71%)",
  10.000001,
  "hsl(175, 35%, 82%)",
  20,
  "hsl(208, 61%, 67%)",
  20.0000001,
  "hsl(69, 69%, 51%)",
  30,
  "hsl(119, 69%, 41%)",
  30.000001,
  "hsl(69, 54%, 69%)",
  40,
  "hsl(119, 59%, 70%)"
]
var states = ['new%20south%20wales', 'victoria', 'queensland', 'western%20australia', 'south%20australia', 'tasmania', 'australian%20capital%20territory', 'northern%20territory'];

var months = ['01','02','03','04','05','06','07','08','09','10','11','12']

var years = ['2022', '2023']



const Map = ({updateMapState}) => {
    // for (var i = 0; i < states.length; i++) {
    //   for (var j = 0; j < years.length; j++){
    //     for (var k = 0; k < months.length; k++)
    //       // console.log('http://localhost:8080/api/twitter/v1/sentiment?geo=' + states[i] + '&t=' + years[j] + '-' + months[k])
    //       axios.get('http://localhost:8080/api/twitter/v1/sentiment?geo=' + states[i] + '&t=' + years[j] + '-' + months[k])
    //       .then(res=>{

    //         console.log(res.data)
    //     })
    //   }
      
    // }

    const options = [
        {
          name: 'ALP',
          property: 'sentiment',
          stops: [
            [25, '#f4bfb6'],
            [40, '#f1a8a5'],
            [60, '#ee8f9a'],
            [80, '#ff3800'],
          ]
        },
        {
          name: 'LPA',
          property: 'sentiment2',
          stops: [
            [25, '#babaf8'],
            [40, '#7c7cf8'],
            [60, '#385ac9'],
            [80, '#0000f8'],
          ]
        },
        {
          name:'NPA',
          property:'sentiment3',
          stops: [
            [25, '#babaf8'],
            [40, '#7c7cf8'],
            [60, '#385ac9'],
            [80, '#0000f8'],
          ]
        },{
          name:'AGP',
        property: 'sentiment4',
          stops: [
            [25, '#babaf8'],
            [40, '#7c7cf8'],
            [60, '#385ac9'],
            [80, '#0000f8'],
          ]
        }
    
      ];
      // const [option, setPie] = useState(pie_options[0]);
      const mapContainerRef = useRef(true);
      const [active, setActive] = useState(options[0]);
      const [inputValue, setInputValue] = useState(0);
      const [map, setMap] = useState(null);
      const [statename, setStatename] = useState(['Victoria'])
      // 
    
      const popup = new mapboxgl.Popup({
    
        anchor: 'left',
        closeButton: false,
        closeOnClick: false
      })
      
      // Initialize map when component mounts
      useEffect(() => {
        // asyncFetch()
        // console.log(test_data)
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/ytten/clhz05dfo003t01rbcl3z7oj9',
          center: [134, -25],
          zoom: 3,
          minZoom: 3,
          maxZoom: 3,
          dragPan: false
        });
        // const Tooltip = () => <div>tooltip</div>
        map.on('click', 'states', (e) => {
          // console.log( mapContainerRef.current)
          // const states = map.queryRenderedFeatures(e.point)
          map.getCanvas().style.cursor = 'pointer';
          const statename = e.features['0']['properties']['STATE_NAME']
          localStorage.setItem('MapState', JSON.stringify(statename));
          console.log(statename)
          setStatename(statename);
          updateMapState(statename); // Invoke callback function to update parent state
          

        //   console.log('state name: ', e)
          const ALP = e.features['0']['properties']['sentiment']
          const LPA = e.features['0']['properties']['sentiment2']
          const NAP = e.features['0']['properties']['sentiment3']
          const NGP = e.features['0']['properties']['sentiment4']
          // && typeof LPA !== "undefined" && typeof NAP !== "undefined" && typeof NGP !== "undefined" 
          
          if (typeof ALP !== "undefined" ) {
            popup
              .setLngLat(map.getCenter())
              // .setText(value)
              // .setText(state_name)
              .setHTML('<p>' + statename + '</p>' +
                '<p>Highest Support Rate: ' + LPA + '</p>'  )
                // '<p>Sentiment: ' + LPA + '</p>'+
                // '<p>Sentiment: ' + NAP + '</p>'+
                // '<p>Sentiment: ' + NGP + '</p>')
              .addTo(map);
          }
        });
        map.on('mouseleave', 'states', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
        map.on('load', () => {
          map.addSource('states', {
            type: 'geojson',
            data
          });
          map.setLayoutProperty('state-label', 'text-field', [
            'format',
            ['get', 'name_en'],
            { 'font-scale': 1.2 },
            ['get', 'name'],
            {
              'font-scale': 0.8,
              'text-font': [
                'literal',
              ]
            }
          ]);
          map.addLayer(
            {
              id: 'states',
              type: 'fill',
              source: 'states'
            },
            'state-label'
          );
          map.setPaintProperty('states', 'fill-color',paint_property);
          setMap(map);
        });
        // Clean up on unmount
        return () => map.remove();
      }, [statename]);
      
      useEffect(() => {
        paint();
      }, [active]);
      const paint = () => {
        // console.log(active.properties)
        // map.setPaintProperty('states', 'fill-color', active.properties, paint_property)
        if (map) {
          map.setPaintProperty('states', 'fill-color', paint_property);
        }
      };

      const onChange = (newValue) => {
        // setPie(pie_options[newValue - 1])
        axios.get()
        setInputValue(newValue);
        setActive(options[newValue - 1])
        
      };
      
    return(
      <div>
        <Legend active={active} stops={active.stops} />
        <div ref={mapContainerRef} className='map-container' />

        {/* <Map/>  */}
        {/* <Wordcloud statename={statename}/> */}
              {/* <Slider
                min={1}
                max={24}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
                style={{width: '500px'}}
              /> */}
        {/* <Card 
          style={{ top: '370px', height: '70px', width: '440px' }}>
 


        </Card> */}

    </div>
    

    
    )
}
export default Map 