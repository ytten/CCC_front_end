import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from './Legend';
import Optionsfield from './Optionsfield';
import './Map.css';
import data from '../data.json';
import { Col, InputNumber, Row, Slider, Space, Card } from 'antd';
import Wordcloud from './WordCloud'
import EChartsReact from "echarts-for-react";

const Map = ({updateMapState}) => {

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
      const [statename, setStatename] = useState([])
      // 
    
      const popup = new mapboxgl.Popup({
    
        anchor: 'left',
        closeButton: false,
        closeOnClick: false
      })
      
      // Initialize map when component mounts
      useEffect(() => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/ytten/clhujlbwd006601pvecwh9d76',
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
              .setHTML('<p>Name: ' + statename + '</p>' +
                '<p>Sentiment: ' + ALP + '</p>'  )
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
        setInputValue(i + 1)
        setActive(options[i]);
        // setPie(pie_options[i])
        map.setPaintProperty('states', 'fill-color', {
          property: active.property,
          stops: active.stops
        });
      };
      const onChange = (newValue) => {
        // setPie(pie_options[newValue - 1])
        setInputValue(newValue);
        setActive(options[newValue - 1])
      };
    return(
    <div>
        <div ref={mapContainerRef} className='map-container' />
        {/* <Map/>  */}
        {/* <Wordcloud statename={statename}/> */}
              <Slider
                min={1}
                max={4}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
                style={{width: '500px'}}
              />
              
    </div>
    

    
    )
}
export default Map 