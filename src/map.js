import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './component/Legend';
import Optionsfield from './component/Optionsfield';
import './Map.css';
import data from './data.json';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import Wordcloud from './WordCloud'
import PieChart from './PieChart';
import { Pie } from '@ant-design/charts';
// axios

mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';

const DemoAreaMap = () => {
  const options = [
    {
      name: 'Population',
      property: 'sentiment',
    },
    {
      name: 'GDP',
      property: 'sentiment2',
    },

  ];
  const mapContainerRef = useRef(true);
  const [active, setActive] = useState(options[0]);
  const [inputValue, setInputValue] = useState(0);
  const [map, setMap] = useState(null);
  // const tooltipRef = useRef(new mapboxgl.Popup());

  const [show, setShow] = React.useState(false);
  
  const popup = new mapboxgl.Popup({
    
    anchor: 'left',
    closeButton: false,
    closeOnClick: false
    })
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/ytten/clh5sjia8009j01rh4co2fzvh',
      center: [134, -25],
      zoom: 3,
      minZoom: 3,
      maxZoom: 3,
      dragPan: false
    });
    // const Tooltip = () => <div>tooltip</div>

    

    
    map.on('mousemove','states', (e) => {
      // console.log( mapContainerRef.current)
      // const states = map.queryRenderedFeatures(e.point)
      map.getCanvas().style.cursor = 'pointer';
      const state_name = e.features['0']['properties']['STATE_NAME']
      const value = e.features['0']['properties']['sentiment']
      if (typeof value !== "undefined"){
          popup
            .setLngLat(map.getCenter())
            // .setText(value)
            // .setText(state_name)
            .setHTML('<p>Name: ' + state_name + '</p>' +
            '<p>Sentiment 1: ' + value + '</p>')
            .addTo(map);
                }
    });

    map.on('mouseleave','states', () => {
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

      map.setPaintProperty('states', 'fill-color', {
        property: active.property,
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty('states', 'fill-color', {
        property: active.property,
      });
    }
  };

  const changeState = i => {
    console.log(i)
    setInputValue(i+1)
    setActive(options[i]);
    map.setPaintProperty('states', 'fill-color', {
      property: active.property,
      stops: active.stops
    });
  };

  const onChange = (newValue) => {
    setInputValue(newValue);
    setActive(options[newValue-1])
    
  };

  
  // map.on('mousemove',  (e) => {

  // });

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
      {/* <Legend active={active} stops={active.stops} /> */}
      {/* <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      /> */}
      <Col span={12}>
        <Slider
          min={1}
          max={2}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          style={{top:'50px', left: '70px', width:'880px'}}
        />
      </Col>
      <PieChart>
      </PieChart>
      <Wordcloud>
      </Wordcloud>
      
      </div>
  );
};


export default DemoAreaMap;
