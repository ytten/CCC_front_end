import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './component/Legend';
import Optionsfield from './component/Optionsfield';
import './Map.css';
import data from './data.json';
import ReactDOM from 'react-dom';
import Tooltip from './component/tooltip';

import { Col, InputNumber, Row, Slider, Space } from 'antd';
// const IntegerStep = () => {
//   const [inputValue, setInputValue] = useState(1);
//   const onChange = (newValue) => {
//     setInputValue(newValue);
//   };
//   return (

//   );
// };

mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';

const DemoAreaMap = () => {
  const options = [
    {
      name: 'Population',
      description: 'Estimated total population',
      property: 'sentiment',
      stops: [
        [0, '#f8d5cc'],
        [1, '#f4bfb6'],
        [2, '#f1a8a5'],
        [3, '#ee8f9a'],
        [4, '#ec739b'],
        [5, '#dd5ca8'],
        [6, '#c44cc0'],
        [7, '#9f43d7'],
        [100, '#6e40e6']
      ]
    },
    {
      name: 'GDP',
      description: 'Estimate total GDP in millions of dollars',
      property: 'sentiment2',
      stops: [
        [0, '#f8d5cc'],
        [1, '#f4bfb6'],
        [2, '#f1a8a5'],
        [3, '#ee8f9a'],
        [4, '#ec739b'],
        [5, '#dd5ca8'],
        [6, '#c44cc0'],
        [7, '#9f43d7'],
        [100, '#6e40e6']
      ]
    },

  ];
  const mapContainerRef = useRef(true);
  const [active, setActive] = useState(options[0]);
  const [inputValue, setInputValue] = useState(0);
  const [map, setMap] = useState(null);
  const tooltipRef = useRef(new mapboxgl.Popup());

  const [show, setShow] = React.useState(false);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/ytten/clh5sjia8009j01rh4co2fzvh',
      center: [134, -25],
      zoom: 3.5
    });
    // const Tooltip = () => <div>tooltip</div>
    
    map.on('mousemove', (e) => {
      // console.log( mapContainerRef.current)
      const states = map.queryRenderedFeatures(e.point)
      
      var state_name = states['0']['properties']['STATE_NAME']
      var value = states['0']['properties']['sentiment']
      console.log(state_name)
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
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
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
        stops: active.stops
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
        stops: active.stops
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
        />
      </Col>
    </div>
  );
};


export default DemoAreaMap;
