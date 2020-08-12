import React, { Component } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import ChartConfig, { tooltipStyle, tooltipTextStyle } from 'Constants/chart-config';
import { Container } from '@material-ui/core';

const data = [
  { name: 'Page A', seriesA: 6000, seriesB: 8000 },
  { name: 'Page B', seriesA: 3000, seriesB: 1398 },
  { name: 'Page C', seriesA: 2000, seriesB: 9800 },
  { name: 'Page D', seriesA: 2780, seriesB: 3908 },
  { name: 'Page E', seriesA: 1890, seriesB: 4800 },
  { name: 'Page F', seriesA: 2390, seriesB: 5500 },
  { name: 'Page G', seriesA: 3490, seriesB: 8800 },
];

class SimpleBarChartComponent extends Component {
  render() {
      console.log(this.props.data);
    return (
      <Container align ="self-align-center">
      <ResponsiveContainer width='60%' height={600} align="center">
        <BarChart data={this.props.data}>
          <XAxis dataKey="grade" stroke={ChartConfig.axesColor} />
          <YAxis stroke={ChartConfig.axesColor} />
          <CartesianGrid vertical={false} stroke={ChartConfig.chartGridColor} />
          <Tooltip  />
          <Legend verticalAlign="top" height={36}/>
          <Bar dataKey="actualUsage" fill={ChartConfig.color.purple} />
        </BarChart>
      </ResponsiveContainer>
      </Container>
    );
  }
}

export default SimpleBarChartComponent;
