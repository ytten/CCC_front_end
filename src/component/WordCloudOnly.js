import * as echarts from "echarts";
import "echarts-wordcloud";
import * as React from 'react';
import axios from 'axios';
import AUdata from '../wordcloud_data_au.json'

// '../wordcloud_data.json'

// const { createRoot } = ReactDOM;
// const {  Space, Table, Tag  } = antd;

class WordcloudT extends React.Component{
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
  
  render = () => {

      return(
          <div>
              <div id='wordcloudl' style={{ height: '250px',top: '0px', width: '700px'}} > </div>
          </div>
      )
  }
}
export default WordcloudT;

