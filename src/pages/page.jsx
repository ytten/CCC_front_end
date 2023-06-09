import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
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
import { map, tail, times, uniq , cloneDeep, clone} from 'lodash';
// import "./styles.css";


const states = {
  'New South Wales': 0,
  'Northern Territory':1,
  'Queensland':2,
  'South Australia':3,
  'Tasmania':4,
  'Victoria':5,
  'Western Australia':6
}

const states_2 = {
  'Australian Capital Territory':0,
  'New South Wales': 1,
  'Northern Territory':2,
  'Queensland':3,
  'South Australia':4,
  'Tasmania':5,
  'Victoria':6,
  'Western Australia':7
}


const state_to_code = {
  'Australian Capital Territory':'ACT',
  'New South Wales':'NSW',
  'Northern Territory':'NT',
  'Queensland':'QLD',
  'South Australia:':'SA',
  'Tasmania':'TAS',
  'Victoria':'VIC',
  'Western Australia':'WA',
}


const state_code = {
  'ACT':0,
  'NSW':1,
  'NT':2,
  'QLD':3,
  'SA':4,
  'TAS':5,
  'VIC':6,
  'WA':7,
}

mapboxgl.accessToken =
  'pk.eyJ1IjoieXR0ZW4iLCJhIjoiY2xoMW03bXMzMTRreTNzcWhvMDZjbngxeSJ9.zqejo9sD3BqcxLbnKkB5yg';


const ProfilePage = () => {
  const DEFAULT_OPTION = {
    title: {
      text: "Empolyment rate",
      left: "center",
      top: "bottom"
    },
    tooltip: {
      valueFormatter: (value) => value.toFixed(5),
      trigger: "item"
    },
    series: [
      {
        data: [],
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
  const [vote, setVotestate] = useState([])
  const [GDP, setGDPstate] = useState([])
  const [statename, setStatename] = useState('Victoria')
  const [salary, setSalary] = useState([]);
  const [migration, setMigration] = useState([])
  const [optionEmp, setOptionEmp] = useState(DEFAULT_OPTION);
  const [sentiment, setSentiment] = useState()
    
  const GDPChartSetup = {
    title: {
      text: "GDP Comparison",
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
      valueFormatter: (value) => value.toFixed(5),
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
      formatter: function(params) {
        // if (typeof params !== 'undefined'){
        var formattedValue = params[0].value.toFixed(5); // Format the first value to five decimal places
        return formattedValue;
        // }
      },
      trigger: "axis"
    }
  }

  const MigrationChartSetup = {
    title: {
      text: "Overseas Migration",
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
      valueFormatter: (value) => value.toFixed(5),
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
  const SentimentChartSetup = {
    title: {
      text: "Weighted Sentiment",
      // subtext: "Fake Data",
      left: "center",
      top: "bottom"
    },
    xAxis: {
      type: "category",
      data: ["ALP", "LPA","GREENS","NPA"],
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
        data: sentiment,
        type: "bar",
        smooth: true
      }
    ],
    tooltip: {
      valueFormatter: (value) => value.toFixed(5),
      trigger: "axis"
    }
  }


  const updateMapState = (newState) => {
    setStatename(newState);
  }

  var emp_input = []
  var gdp_input = []
  var sal_input = []
  var vote_input = []

  useEffect(() => {
    axios.get('http://localhost:8080/api/employment/2018/v1/all')
      .then(res => {
        var index = states[statename]
        var temp = res.data.data[index]
        
        if (typeof temp !== 'undefined') {
          var unknown = 100 - temp['employment_rate'] - temp['unemployment_rate']
          emp_input = [
            { name: statename + ' Employment Rate', value: temp['employment_rate'] },
            { name: statename + ' unemployment Rate', value: temp['unemployment_rate'] },
            { name: statename + ' Unknown', value: unknown }
          ]
          console.log('employment', emp_input)
          console.log('current state', statename)
          if (emp_input.length !== 0) {
            setTimeout(() => {
              var newoption = cloneDeep(optionEmp)
              newoption.series[0]['data'] = emp_input
              setOptionEmp(newoption)
            }, 100);
          }
        }
        })


    axios.get('http://localhost:8080/api/vote/v1/2016')
      .then(res => {
        var index = state_code[state_to_code[statename]]
        var temp_vote = res.data.data[index]
        if (typeof temp_vote !== 'undefined' && typeof temp_vote !== 'undefined'){
          vote_input = [
            {
              name: 'Australian Labor Party Percentage', value: temp_vote['tpp_australian_labor_party_percentage'], itemStyle: { color: '#eb7f7f' },
            },
            {
              name: 'Liberal National Coalition Percentage', value: temp_vote['tpp_liberal_national_coalition_percentage'], itemStyle: { color: '#78aede' },
            },
          ]
          
          // console.log('vote', vote_input)
          if (vote_input.length !== 0) {
            setVotestate(vote_input)
          }
        }
      }
      );
    axios.get('http://localhost:8080/api/agesalary/2016/v1/all').then(res => {
      var index = state_code[state_to_code[statename]]
      var salary_all = res.data.data[index]
      if(typeof salary_all !== 'undefined'){
        sal_input = [
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
        if (sal_input.length !== 0) {
          setSalary(sal_input)
        }
      }
    })
    axios.get('http://localhost:8080/api/twitter/v1/party/sentiment')
    .then(res=>{
      var option = {}
      
      var sentiment = []
      for (let i = 212; i <= 247; i++) {
        sentiment.push(res.data.data[i])
      } 
      
      sentiment.forEach(item => {
        const { state, party, sentiment, ...rest } = item;
        var color = ''
        if (party == "ALP") {
          color = '#eb7f7f'
        }
        if (party == "LPA") {
          color = '#cedb85'
        }
        if (party == "NPA") {
          color = '#ff8000'
        }
        if (party == "GREENS") {
          color = '#78aede'
        }
          
        if (option[state]) {
          option[state].push({'name':party,'value':sentiment,itemStyle:{color:color}});
        } else {
          option[state] = [{'name':party, 'value':sentiment,itemStyle:{color:color}}];
        }
      })


      console.log('test',option[statename.toLowerCase()])
      setSentiment(option[statename.toLowerCase()])
      })

      axios.get('http://localhost:8080/api/migration/v1/all').then(res => {
        var index = state_code[state_to_code[statename]]
        var migration_all = res.data.data
        var migration_count = 0
        for (var i = 0; i < migration_all.length; i++){
          var state_migration = migration_all[i]
          migration_count = migration_count + state_migration["net_overseas_migration_2019_20"]
        }
        var migration_avg = migration_count / (migration_all.length)
        if (typeof migration_all[index] !== 'undefined'){
        var state_name = migration_all[index]["state_name_2021"]
        var option = [
          {
            name: state_name,  value: migration_all[index]['net_overseas_migration_2019_20'],itemStyle: { color: '466D1D' }

          },
          {
            name: "All State Avg",  value: migration_avg,itemStyle: { color: 'D6B85A' }

          },

        ]
        console.log('migration ',migration_all)
        if (option.length !== 0) {
          
            setMigration(option)

        }
      
        }
      })

      axios.get('http://localhost:8080/api/gdp/v1/all')
      .then(res=> {
        
        var gdp = res.data.data[0]
        gdp_input = [
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
        if (gdp_input.length !== 0) {
          setTimeout(() => {
            setGDPstate(gdp_input)
          }, 1000)
        }
      })
}, [statename])
    
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
               <Col span={10}>
                    {/* <MyComponent option={EmpChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} /> */}
                    <EChartsReact option={SentimentChartSetup} style={{ width: '340px', height: '250px', bottom: '40px' }} />

                </Col>

                <Col span={8}>
                  <EChartsReact option={VoteChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} />
                </Col>
                <Col span={6}>
                  <EChartsReact option={GDPChartSetup} style={{ width: '180px', height: '250px', bottom: '40px' }} />
                </Col>
              </Row>
              <Row>

                <Col span={10}>
                  <EChartsReact option={WeeklySalarySetup} style={{ width: '320px', height: '250px', bottom: '40px' }} />
                </Col>
                <Col span={8}>
                  <EChartsReact option={MigrationChartSetup} style={{ width: '300px', height: '250px', bottom: '40px' }} />
                </Col>
                <Col span={6}>
                    {/* <MyComponent option={EmpChartSetup} style={{ width: '250px', height: '250px', bottom: '40px' }} /> */}
                    <EChartsReact option={optionEmp} style={{ width: '180px', height: '250px', bottom: '40px' }} />

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