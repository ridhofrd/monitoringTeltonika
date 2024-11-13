import ReactEcharts from "echarts-for-react";
import { useTheme } from "@mui/material/styles";

export default function ChartSuhu({ height, color = [], chartData }) {
  const theme = useTheme();

  // Extract time and temperature values from chartData
  const timeStamp = chartData.map(item => item.time);
  const temperatures = chartData.map(item => item.value);

  // Function to determine line color based on temperature
  const getLineColor = (temp) => {
    return temp > 28 ? '#FF0000' : '#00FF00'; // Red for temperatures above 28, Green for others
  };

  // Create the line color array based on temperature data
  const lineColors = temperatures.map(temp => getLineColor(temp));

  const option = {
    grid: { top: "10%", bottom: "10%", left: "5%", right: "5%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    label: {
      fontSize: 13,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily
    },
    xAxis: {
      type: "category",
      data: timeStamp, // Use timestamps from chartData
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: theme.palette.background.paper
        }
      },
      formatter: function (params) {
        let tooltipHtml = '';
        params.forEach(param => {
          tooltipHtml += `<div><strong>${param.seriesName}:</strong> ${param.data}°C at ${param.axisValue}</div>`;
        });
        return tooltipHtml;
      }
    },
    series: [
      {
        data: temperatures, // Use temperature values from chartData
        type: "line",
        stack: "Suhu",
        name: "Suhu",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
        itemStyle: {
          color: function(params) {
            // Return color dynamically based on the data value
            return lineColors[params.dataIndex]; // Use the lineColors array
          }
        }
      }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
}
