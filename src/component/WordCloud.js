import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts";
import "echarts-wordcloud";
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Table, Tag  } from 'antd';
import AUdata from '../wordcloud_data_au.json'
import map from './map'

// '../wordcloud_data.json'

// const { createRoot } = ReactDOM;
// const {  Space, Table, Tag  } = antd;

class Wordcloudl extends React.Component{
    state = {
        selectedWord: null,
        associatedtweet: [],
        sampletweet: [
            {"code":0,"data":{"sentiment":0.1111111111111111,"lang":"en","mentions":["1039446506619596800","20559705"],"location":"South Australia, Australia","tags":"CrimesAgainstHumanity|CrimesAgainstChildren|auspol|Australia","party":"LPA","geo":"south australia","keywords":["Integrity question","Integrity","boy"],"_id":"05b5aa1e0d84a8d6156f9d038ec9ea12","_rev":"1-cd393646cfaf4271de56b32cac41d1d2","tweet_id":"1491718722104721412","created_at":"2022-02-10T10:20:32.000Z","tokenized_content":["Here","Integrity","question","for","boy"],"author_id":"1457239558244892674","public_metrics":{"retweet_count":0,"reply_count":0,"like_count":0,"quote_count":0},"raw_text":"1@Mia__Kennedy Here's an Integrity question\nfor #CrimesAgainstHumanity\n#CrimesAgainstChildren \nboy, @PeterDutton_MP \n\n#auspol #Australia https://t.co/dtPhujFhWi","weighted_sentiment":0.1111111111111111},"msg":""},
            {"code":0,"data":{"sentiment":0.1111111111111111,"lang":"en","mentions":["1039446506619596800","20559705"],"location":"Victoria, Australia","tags":"CrimesAgainstHumanity|CrimesAgainstChildren|auspol|Australia","party":"ALP","geo":"victoria","keywords":["Integrity question","Integrity","boy"],"_id":"05b5aa1e0d84a8d6156f9d038ec9ea12","_rev":"1-cd393646cfaf4271de56b32cac41d1d2","tweet_id":"1491718722104721412","created_at":"2022-02-10T10:20:32.000Z","tokenized_content":["Here","Integrity","question","for","boy"],"author_id":"1457239558244892674","public_metrics":{"retweet_count":0,"reply_count":0,"like_count":0,"quote_count":0},"raw_text":"2@Mia__Kennedy Here's an Integrity question\nfor #CrimesAgainstHumanity\n#CrimesAgainstChildren \nboy, @PeterDutton_MP \n\n#auspol #Australia https://t.co/dtPhujFhWi","weighted_sentiment":0.1111111111111111},"msg":""},
            {"code":0,"data":{"sentiment":0.1111111111111111,"lang":"en","mentions":["1039446506619596800","20559705"],"location":"New South Wales, Australia","tags":"CrimesAgainstHumanity|CrimesAgainstChildren|auspol|Australia","party":"GREEN","geo":"new south wales","keywords":["Integrity question","Integrity","boy"],"_id":"05b5aa1e0d84a8d6156f9d038ec9ea12","_rev":"1-cd393646cfaf4271de56b32cac41d1d2","tweet_id":"1491718722104721412","created_at":"2022-02-10T10:20:32.000Z","tokenized_content":["Here","Integrity","question","for","boy"],"author_id":"1457239558244892674","public_metrics":{"retweet_count":0,"reply_count":0,"like_count":0,"quote_count":0},"raw_text":"3@Mia__Kennedy Here's an Integrity question\nfor #CrimesAgainstHumanity\n#CrimesAgainstChildren \nboy, @PeterDutton_MP \n\n#auspol #Australia https://t.co/dtPhujFhWi","weighted_sentiment":0.1111111111111111},"msg":""},
        ],
        top3Document: [],
        currentstate: [],
        data: [AUdata],
      };
    componentDidMount() {
      var myChart = echarts.init(document.getElementById('wordcloudl'));
      
      var maskImage = new Image();
      maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';

      maskImage.onload = function(){
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
                  data: AUdata
              }]
          })

      }
      myChart.getZr().on('click', (event) => {

        const selectedWord = event.target.style.text;
        const savedState = localStorage.getItem('MapState');
        const currentstate = JSON.parse(savedState);
        console.log('selectedWord:', selectedWord);
        console.log('current state: ', currentstate);
        // if (typeof selectedWord  === "undefined"){
        //     selectedWord = 'select words in the cloud'
        // }
        this.setState({selectedWord})

    });
}


    handleWordClick = () => {
        const {sampletweet} = this.state;
        const {selectedWord} = this.state;
        const {associatedtweet} = this.state
        // const {matchedtweet} = {}
        // for (let i = 0; i < sampletweet.length; i++){
        //     const tweet = sampletweet[i]
        //     if (tweet.text.includes(selectedWord)){
        //         matchedtweet.push(tweet)

        //     }
        // }
        
        // console.log('associatedtweet', matchedtweet)
        // will update associated tweet here
        this.setState({selectedWord:selectedWord, associatedtweet:associatedtweet})
    };

    rendertweet() {
        // update sample tweet to associated tweet
        const {sampletweet} = this.state;
        
        if (sampletweet === []){
            return <p>No associated tweet, pick another word!</p>
        }
        return (
            <div className="tweet-container">
            <ul>
                
                {sampletweet.map((tweet) => (
                <li key={tweet.data.author_id} style={{width: '600px'}}>
                    <p>Author: {tweet.data.author_id}, Posted At: {tweet.data.geo}</p>
                    <p>{tweet.data.raw_text}</p>
                </li>
                ))}
            </ul>
            </div>
        );
    }
  
  render () {

    const {selectedWord} = this.state;
    
      return(
          <div>
              <div id='wordcloudl' style={{ height: '250px',top: '-20px', width: '600px'}} onClick={this.handleWordClick}> </div>
              <div>
                <h3>Tweets for {selectedWord}</h3>
                {this.rendertweet()}
              </div>
          </div>
      )
  }
}
export default Wordcloudl;