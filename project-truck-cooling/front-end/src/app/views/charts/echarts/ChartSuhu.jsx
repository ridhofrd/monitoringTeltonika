import ReactEcharts from "echarts-for-react";
import { useTheme } from "@mui/material/styles";

<<<<<<< HEAD
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
=======
export default function ChartSuhu({ height, color = [], chartData, suhulimit }) {
  const theme = useTheme();

  const timeStamp = chartData.map((item) => item.time);
  const temperatures = chartData.map((item) => item.value);

  // Ensure suhulimit is defined and is a valid number
  if (suhulimit === undefined || isNaN(suhulimit)) {
    console.error("Invalid suhulimit value:", suhulimit);
    suhulimit = 28; // Fallback to 28 if invalid
  }

  const getLineColor = (temp) => {
    return temp > suhulimit ? "#FF0000" : "#00FF00"; // Red if above limit, Green otherwise
  };

  const lineColors = temperatures.map((temp) => getLineColor(temp));
>>>>>>> 65bba7e2c1cf37b98b093fc4b1d81335389f9404

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
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: theme.palette.background.paper
        }
      },
      formatter: function (params) {
        let tooltipHtml = "";
        params.forEach((param) => {
          tooltipHtml += `<div><strong>${param.seriesName}:</strong> ${param.data}°C at ${param.axisValue}</div>`;
        });
        return tooltipHtml;
      }
    },
    series: [
      {
<<<<<<< HEAD
        data: temperatures, // Use temperature values from chartData
=======
        data: temperatures,
>>>>>>> 65bba7e2c1cf37b98b093fc4b1d81335389f9404
        type: "line",
        stack: "Suhu",
        name: "Suhu",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
        itemStyle: {
<<<<<<< HEAD
          color: function(params) {
            // Return color dynamically based on the data value
            return lineColors[params.dataIndex]; // Use the lineColors array
          }
        }
=======
          color: function (params) {
            const currentLimit = suhulimit !== undefined ? suhulimit : 28; // Gunakan suhulimit atau fallback ke 28
            return temperatures[params.dataIndex] > currentLimit ? "#FF0000" : "#00FF00";
          }
        }
      },
      {
        type: "line",
        data: Array(timeStamp.length).fill(suhulimit || 28), // Gunakan suhulimit atau fallback ke 28
        lineStyle: {
          color: "#FF4500",
          type: "dashed",
          width: 2
        },
        name: "Batas Atas Suhu",
        markLine: {
          symbol: "none",
          data: [{ yAxis: suhulimit || 28 }]
        }
>>>>>>> 65bba7e2c1cf37b98b093fc4b1d81335389f9404
      }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
}
