import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Legend from '../component/Legend';
import Optionsfield from '../component/Optionsfield';
// import '../Component/Map.css';
import data from '../data.json';
import { Col, InputNumber, Row, Slider, Space, Card, Layout } from 'antd';
import Wordcloud from '../component/WordCloud'
import EChartsReact from "echarts-for-react";
import BarChart from '../component/barChart';
import Map from '../component/map'
import axios from 'axios'
import MyComponent from '../component/mycomp';
// import "./styles.css";

const states = {
  '0': 'New South Wales',
  '1': 'Northern Territory',
  '2': 'Queensland',
  '3': 'South Australia',
  '4': 'Tasmania',
  '5': 'Victoria',
  '6': 'Western Australia'
}

mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';


const ProfilePage = () => {
  // const GDPurl = 'http://localhost:8080/api/gdp/v1/all'
  // const POPurl = 'http://localhost:8080/api/population/v1/all'
  // const MIGurl = 'http://localhost:8080/api/migration/v1/all'
  // const voteurl = 'http://localhost:8080/api/vote/v1/all'
  // var emp = document.getElementById('emp')
  const [emp_rate, setEmpstate] = useState([])
  const [vote, setVotestate] = useState([])
  const [GDP, setGDPstate] = useState([])
  const [statename, setStatename] = useState(null)
  const [currentstate, setCurrentstate] = useState('');
  const [data, setData] = useState([]);
  const [salary, setSalary] = useState([]);
  const [migration, setMigration] = useState([])
  var tick = 0

  const EmpChartSetup = {
    title: {
      text: "Empolyment rate",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        data: emp_rate,
        name: "Employment Rate",
        type: "pie",
        radius: "60%",
        label: null,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      },

    ]
  }
  const GDPChartSetup = {
    title: {
      text: "GDP Composition",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        data: GDP,
        name: "GDP",
        type: "pie",
        radius: "60%",
        label: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }

      }
    ]
  }
  const VoteChartSetup = {
    title: {
      text: "Votes",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    xAxis: {
      type: "category",
      data: ["Labor Party", "Liberal Party"]
    },
    yAxis: {
      type: "value"
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        data: vote,
        type: "bar",
        smooth: true
      }
    ],
    tooltip: {
      trigger: "axis"
    }
  }

  const MigrationChartSetup = {
    title: {
      text: "Net Overseas Migration",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    xAxis: {
      type: "category",
      data: ["State", "Average "],
      axisLabel: {
        textStyle: {
          fontSize: 12, // Set the font size for x-axis labels
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: 7, // Set the font size for x-axis labels
        },
      },

    },

    series: [
      {
        data: migration,
        type: "bar",
        smooth: true
      }
    ],
    tooltip: {
      trigger: "axis"
    }
  }
  const WeeklySalarySetup = {
    title: {
      text: "Weekly Salary",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    xAxis: {
      type: "category",
      data: ["<1999", "2000-2999", ">3000"],
      axisLabel: {
        textStyle: {
          fontSize: 12, // Set the font size for x-axis labels
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: 7, // Set the font size for x-axis labels
        },
      },

    },

    series: [
      {
        data: salary,
        type: "bar",
        smooth: true
      }
    ],
    tooltip: {
      trigger: "axis"
    }
  }


  const updateMapState = (newState) => {
    setStatename(newState);
  }

  var input = []

  useEffect(() => {
    tick+=1
    axios.get('http://localhost:8080/api/employment/2018/v1/all')
      .then(res => {
        // var index = states.indexOf(currentstate)
        var temp = res.data.data[0]
        var unknown = 100 - temp['employment_rate'] - temp['unemployment_rate']
        if (typeof input !== 'undefined') {

          input = [
            { name: states[0] + 'Employment_rate', value: temp['employment_rate'] },
            { name: states[0] + 'unemployment_rate', value: temp['unemployment_rate'] },
            { name: states[0] + 'Unknown', value: unknown }
          ]
          console.log(input)
          if (input.length !== 0) {
            
            setEmpstate(input)
            if (tick !== 1) {
              
              setTimeout(() => {
                const emp = document.getElementById("emp")
                console.log(emp)
                // $("#emp").load(window.location.href + " #emp" );
              }, 2000)
              
              
            }
           

          }
        }
      })

    axios.get('http://localhost:8080/api/vote/v1/2016')
      .then(res => {
        var vote = res.data.data[0]
        input = [
          {
            name: 'Australian Labor Party Percentage', value: vote['tpp_australian_labor_party_percentage'], itemStyle: { color: '#eb7f7f' },
          },
          {
            name: 'Liberal National Coalition Percentage', value: vote['tpp_liberal_national_coalition_percentage'], itemStyle: { color: '#78aede' },
          },
        ]
        console.log('vote', vote)
        if (input.length !== 0) {
          setVotestate(input)
        }
      }
      );
    axios.get('http://localhost:8080/api/agesalary/2016/v1/all').then(res => {
      var salary_all = res.data.data[0]
      input = [
        {
          name: "1750 to 1999", value: salary_all['tot_1750_1999_tot']
        },
        {
          name: "2000 to 2999", value: salary_all['tot_2000_2999_tot']
        },
        {
          name: "Over 3000", value: salary_all["tot_3000mo_tot"]
        },
      ]
      console.log('salary ', salary_all)
      if (input.length !== 0) {
        setSalary(input)
      }
    })
      axios.get('http://localhost:8080/api/migration/v1/all').then(res => {
        var migration_all = res.data.data
        var migration_count = 0
        for (var i = 0; i < migration_all.length; i++){
          var state_migration = migration_all[i]
          migration_count = migration_count + state_migration["net_overseas_migration_2019_20"]
        }
        var migration_avg = migration_count / (migration_all.length)
        var state_name = migration_all[0]["state_name_2021"]
        var option = [
          {
            name: state_name,  value: migration_all[0]['net_overseas_migration_2019_20'],itemStyle: { color: '466D1D' }

          },
          {
            name: "All State Avg",  value: migration_avg,itemStyle: { color: 'D6B85A' }

          },

        ]
        console.log('migration ',migration_all)
        if (option.length !== 0) {
          setMigration(option)
        }

      })

      axios.get('http://localhost:8080/api/gdp/v1/all')
      .then(res=> {
        var gdp = res.data.data[0]
        input = [
          {
            name: 'ACT', value: gdp['ACT']
          },
          {
            name: 'NSW', value: gdp['NSW']
          },
          {
            name:'NT', value: gdp['NT']
          },
          {
            name:'QLD', value: gdp['QLD']
          },
          {
            name:'SA', value: gdp['SA']
          }, 
          {
            name:'TAS', value: gdp['TAS']
          },
          {
            name:'VIC', value: gdp['VIC']
          },
          {
            name:'WA', value: gdp['WA']
          }

        ]
        console.log('gdp ',gdp)
        if (input.length !== 0) {
          
          setGDPstate(input)
        }
      })
}, [])
    
  return (

    <div className="body">

      <Row>
        <Card title='Map'
          style={{ top: '100px', left: '50px', height: '700px' , width: "600px"}}>
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

        <Col span={12}>
          <Row>
            <Card title='Charts'
              style={{ top: "100px", left: '100px', height: '700px' }}>
              <Row>
                <Col span={8}>
                    {/* <MyComponent option={EmpChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} /> */}
                    <EChartsReact  option={EmpChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} />

                </Col>
                <Col span={8}>
                  <EChartsReact option={VoteChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} />
                </Col>
                <Col span={8}>
                  <EChartsReact option={GDPChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} />
                </Col>
              </Row>
              <Row>

                <Col span={9}>
                  <EChartsReact option={WeeklySalarySetup} style={{ width: '300px', height: '250px', bottom: '40px' }} />
                </Col>
                <Col span={8}>
                  <EChartsReact option={MigrationChartSetup} style={{ width: '200px', height: '250px', bottom: '40px' }} />
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