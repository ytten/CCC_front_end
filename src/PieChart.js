import EChartsReact from "echarts-for-react";
import { useMemo } from "react";
// import "./styles.css";

export default function PieChart() {
    
  const chartOptions = useMemo(
    () => ({
      title: {
        text: "Test",
        // subtext: "Fake Data",
        left: "center"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: 'bottom'
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "60%",
          label: null,
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    }),
    []
  );

  return (
    <div className="App">
      <EChartsReact option={chartOptions} style={{width:'250px', top:'40px', right:'50px'}}/>
    </div>
  );
}
