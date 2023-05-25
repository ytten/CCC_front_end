import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts";
import "echarts-wordcloud";
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Table, Tag  } from 'antd';
import axios from 'axios';
import AUdata from '../wordcloud_data_au.json'
import map from './map'

// '../wordcloud_data.json'

// const { createRoot } = ReactDOM;
// const {  Space, Table, Tag  } = antd;

class Wordcloud extends React.Component{
    constructor(props){
        // console.log(props)
        super(props)
        this.state =  {
            selectedWord: '',
            associatedtweet: [],
            top3Document: [],
            currentstate: [this.props.stateName],
            data: [AUdata],
            myChart: [],
            documentId: [],
            stateNames: ['New South Wales', 'Victoria', 'Queensland', 'South Australia', 'Western Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'],
            savedState: null
          };
    }
    

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.currentstate !== prevProps.stateName) {
            console.log('aaasdnjakdkjwkejlnj')
            this.forceUpdate();
            this.handleStateChange();
            
        }
    }
    componentDidMount() {

      var data = this.state.data
      
      var myChart = echarts.init(document.getElementById('wordcloudl'));
         
      var maskImage = new Image();
      maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';

      maskImage.onload = function(){
        // console.log('var data: ', typeof(data[0]))
        // console.log('var data: ', typeof(data[0][0]["value"]))
          myChart.setOption( {
              backgroundColor:'#fff',
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              series: [{
                  type: 'wordCloud',
                          gridSize: 1,
                          // Text size range which the value in data will be mapped to.
                          // Default to have minimum 12px and maximum 60px size.
                          sizeRange: [6, 32],
                          // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
                          rotationRange: [0, 0, 0, 90],
                          maskImage: maskImage,
                          textStyle: {
                              normal: {
                                  color: function() {
                                      return 'rgb(' +
                                          Math.round(Math.random() * 255) +
                                          ', ' + Math.round(Math.random() * 255) +
                                          ', ' + Math.round(Math.random() * 255) + ')'
                                  }
                              }
                          },
                          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                          // Default to be put in the center and has 75% x 80% size.
                          left: 'center',
                          top: 'center',
                          right: null,
                          bottom: null,
                          width:'90%',
                        //   height:'0%',
                  data: data[0]
              }]
          })
      }
      this.setState({ myChart: myChart });
      myChart.getZr().on('click', (event) => {

        if (typeof event.target === "undefined"){
            return
        }
        const selectedWord = event.target.style.text;
        // const savedState = localStorage.getItem('MapState');
        const savedState = this.state.currentstate;
        // const currentstate = JSON.parse(savedState);
        console.log('selectedWord:', selectedWord);
        // console.log('current state: ', currentstate);
        this.state.selectedWord = selectedWord
    
    
        axios.get('http://localhost:8080/api/twitter/v1/keyword/by_state?keyword='+selectedWord+'&geo='+savedState, {       
        }).then(res => {
            // console.log('api selected word data: ', res.data.data[0].documentMetricsPairs)
            const doc = res.data.data[0]['documentMetricsPairs'];
            console.log(res.data.data[0]['documentMetricsPairs'])
            if (doc && Array.isArray(doc) && doc.length > 0) {
                // Iterate over each item in documentMetricsPairs and calculate the sum of public metrics
                const documentId = doc.map((pair) => pair.documentId) 
                const associatedtweet = []
                this.state.documentId = documentId
                // console.log('I am here, :', this.state.documentId)
                this.state.documentId.forEach((documentId) => {
                    axios.get('http://localhost:8080/api/twitter/v1/'+documentId).then(res => {
                        // console.log('current document id fetch: ', res.data.data.raw_text)
                        associatedtweet.push(res.data.data)
                        this.state.associatedtweet=associatedtweet
                        // console.log('associatedtweet', this.state.associatedtweet)
                        if (associatedtweet.length === 3){
                            // this.rendertweet()
                        }           
                })
                            })
            
            } else {
                console.log('No data found');
            }
            })
            .catch((error) => {
            console.log('API request failed:', error);
            });     
    }

    );
    }

    handleStateChange = () => {
        const savedState = localStorage.getItem('MapState');
        const currentstate = JSON.parse(savedState);

        if (currentstate !== []){
            this.state.currentstate = currentstate.toLowerCase();
            axios.get('http://localhost:8080/api/twitter/v1/keyword/count', {       
            }).then(res => {
                console.log('111')
                const cloud = res.data.data[this.state.currentstate]
                // console.log('current state: ', currentstate.toLowerCase());
                // console.log('api data state: ', cloud);
                const data = cloud.map(item => ({
                    name: item.keyword,
                    value: item.count
                  }));
                this.state.data = data
                // console.log('My state is: ', this.state.currentstate, 'and keywords are: ', this.state.data)
                 // const data = this.state.data
                console.log('My state is: ', this.state.currentstate, 'and keywords are: ', this.state.data)
            
                var myChart = echarts.init(document.getElementById('wordcloudl'));
                
                var maskImage = new Image();
                maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
        
                maskImage.onload = function(){
                // console.log('var data: ', typeof(data[0]))
                // console.log('var data: ', typeof(data[0][0]["value"]))
                    myChart.setOption( {
                        backgroundColor:'#fff',
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        series: [{
                            type: 'wordCloud',
                                    gridSize: 1,
                                    // Text size range which the value in data will be mapped to.
                                    // Default to have minimum 12px and maximum 60px size.
                                    sizeRange: [6, 32],
                                    // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
                                    rotationRange: [0, 0, 0, 90],
                                    maskImage: maskImage,
                                    textStyle: {
                                        normal: {
                                            color: function() {
                                                return 'rgb(' +
                                                    Math.round(Math.random() * 255) +
                                                    ', ' + Math.round(Math.random() * 255) +
                                                    ', ' + Math.round(Math.random() * 255) + ')'
                                            }
                                        }
                                    },
                                    // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                                    // Default to be put in the center and has 75% x 80% size.
                                    left: 'center',
                                    top: 'center',
                                    right: null,
                                    bottom: null,
                                    width:'90%',
                                //   height:'0%',
                            data: data
                        }]
                    })
                }
                this.setState({ myChart: myChart });

            })
        }
        // this.rendertweet()
       

    }

    rendertweet = () => {
        // console.log('associatedtweet: ', this.state.associatedtweet[0])
        // update sample tweet to associated tweet
        const associatedtweet = this.state.associatedtweet;
        // const selectedWord = this.state.selectedWord
        if (typeof associatedtweet !== "undefined" && associatedtweet !== [] ){   
            // console.log('selected word is: ', selectedWord) 
            // associatedtweet.map((tweet, index) => {
            //     console.log('in each tweet, tweet is: ', tweet['author_id'])
            // }) 
            return(
                
                <div className="tweet-container">
                <ul>
                {associatedtweet.map((tweet, index) => (
                    <li key={index} style={{width: '600px'}}>
                    <p><b>Author: </b>{tweet['author_id']}, <b>Posted At: </b>{tweet['geo'].charAt(0).toUpperCase() + tweet['geo'].slice(1)}, <b>Party: </b>{tweet['party']}</p>
                    <p><b>Content: </b>{tweet['raw_text']}</p>
                    </li>
                ))} 
                </ul>
                </div>
            )
            
        }
            
        return (<p>No associated tweet</p>)
        
           
    }
  
  render = () => {

      return(
          <div>
              <div id='wordcloudl' style={{ height: '250px',top: '-20px', width: '600px'}} onClick={this.handleStateChange}> </div>
              <div>
                <h3>Tweets for {this.state.selectedWord}</h3>
                {this.rendertweet()} 
                {/* <div className="tweet-container">
                <ul>
                {this.state.associatedtweet.map((tweet, index) => {
                    <li key={index} style={{width: '600px'}}>
                    <p>Author: {tweet['author_id']}, Posted At: {tweet['geo']}</p>
                    <p>{tweet['raw_text']}</p>
                    </li>
                })} 
                </ul>
                </div> */}
              </div>
          </div>
      )
  }
}
export default Wordcloud;

