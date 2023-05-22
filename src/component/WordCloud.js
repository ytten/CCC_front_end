import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts";
import "echarts-wordcloud";
import * as React from 'react';
import AUdata from '../wordcloud_data_au.json'
import axios from 'axios';
import { useState, useEffect } from 'react';



function Wordcloudl() {

    const [selectedWord, setSelectedWord] = useState('');
    const [associatedtweet, setAssociatedtweet] = useState([]);
    const [data, setData] = useState([AUdata]);
    const [currentstate, setCurrentstate] = useState('');

    useEffect(()=>{
        if (typeof localStorage !== 'undefined') {
            var savedState = localStorage.getItem('MapState');
            var currentstate = JSON.parse(savedState);
            console.log('current state: ', currentstate.toLowerCase());
            setCurrentstate(currentstate.toLowerCase())

            // if currentstate changes, fetch wordcloud data
            if (currentstate != ''){
                axios.get('http://localhost:8080/api/twitter/v1/keyword/count', {       
                }).then(res => {
                    console.log('api data state: ', res.data.data)
                    setData(res.data.currentstate)
                })
            }
        }
        
    }, [currentstate, data])

    useEffect(()=>{
        var myChart = echarts.init(document.getElementById('wordcloudl'));
         
        var maskImage = new Image();
        maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
        maskImage.onload = function(){    
            if (maskImage && maskImage.complete) {
                myChart.setOption({
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
                            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45

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
                myChart.getZr().on('click', (event) => {
                    // update data according to state   
                    setSelectedWord(event.target.style.text)            
                    console.log('selectedWord:', selectedWord);
                    if (selectedWord != ''){
                        axios.get('http://localhost:8080/api/twitter/v1/keyword?keyword='+selectedWord, {       
                        }).then(res => {
                            console.log('api selected word data: ', res.data.documentMetricsPairs)
                            const doc = res.data;
                            if (doc && Array.isArray(doc) && doc.length > 0) {
                                // Iterate over each item in documentMetricsPairs and calculate the sum of public metrics
                                const documentsWithSumMetrics = doc.flatMap((item) =>
                                item.documentMetricsPairs.map((pair) => ({
                                    documentId: pair.documentId,
                                    sumMetrics: Object.values(pair.publicMetrics).reduce(
                                    (sum, value) => sum + value,
                                    0
                                    ),
                                }))
                                );
                        
                                // Sort the documents based on the sum of public metrics in descending order
                                documentsWithSumMetrics.sort(
                                (a, b) => b.sumMetrics - a.sumMetrics
                                );
                        
                                // Get the top 3 documents
                                const top3Documents = documentsWithSumMetrics.slice(0, 3);
                        
                                console.log('Top 3 documents:', top3Documents);
                            } else {
                                const top3Documents = []
                                console.log('No data found');
                            }
                            })
                            .catch((error) => {
                            console.log('API request failed:', error);
                            });
                        }
        
                        // if (top3Documents === []){
                        //     return <p>No associated tweet, pick another word!</p>
                        // }
                        // return (
                        //     <div className="tweet-container">
                        //     <ul>  
                        //         {top3Documents.map((tweet) => (
                        //         <li key={tweet.data.author_id} style={{width: '600px'}}>
                        //             <p>Author: {tweet.data.author_id}, Posted At: {tweet.data.geo}</p>
                        //             <p>{tweet.data.raw_text}</p>
                        //         </li>
                        //         ))}
                        //     </ul>
                        //     </div>
                        // );
        
                });
            }
        }

        

        return () => {
            myChart.dispose();
        };
    }, [])

    
    // const handleWordClick = () => {

    //     // console.log('associatedtweet', matchedtweet)
    //     // will update associated tweet here
    //     setSelectedWord(selectedWord)
    //     setAssociatedtweet(associatedtweet)

    // };

    // const rendertweet = () => {
    //     // update sample tweet to associated tweet
    //     const {sampletweet} = this.state;
        
    //     if (sampletweet === []){
    //         return <p>No associated tweet, pick another word!</p>
    //     }
    //     return (
    //         <div className="tweet-container">
    //         <ul>
                
    //             {sampletweet.map((tweet) => (
    //             <li key={tweet.data.author_id} style={{width: '600px'}}>
    //                 <p>Author: {tweet.data.author_id}, Posted At: {tweet.data.geo}</p>
    //                 <p>{tweet.data.raw_text}</p>
    //             </li>
    //             ))}
    //         </ul>
    //         </div>
    //     );
    // }
    
    return(
        <div>
            <div id='wordcloudl' style={{ height: '250px',top: '-20px', width: '600px'}}> </div>
            <div>
            <h3>Tweets for {selectedWord}</h3>
            </div>
        </div>
    )
}
export default Wordcloudl;