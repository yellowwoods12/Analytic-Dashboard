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
import ChartConfig, { tooltipStyle, tooltipTextStyle } from '../constants/chart-config';
import { Container } from '@material-ui/core';


const data = [
	{ name: 'Page A', seriesA: 1000, seriesB: 2400 },
	{ name: 'Page B', seriesA: 3000, seriesB: 1398 },
	{ name: 'Page C', seriesA: 1500, seriesB: 4000 },
	{ name: 'Page D', seriesA: 2780, seriesB: 3908 },
	{ name: 'Page E', seriesA: 1890, seriesB: 4800 },
	{ name: 'Page F', seriesA: 2390, seriesB: 3800 },
	{ name: 'Page G', seriesA: 3490, seriesB: 4300 },
];


class StackedBarChart extends Component {

	
	
	render() {
		 
	  const {data} = this.props;
	 // console.log(strarr[0].grade)
		return (
               <Container align ="self-align-center">
                 <ResponsiveContainer align="center" width='60%' height={600}>
				<BarChart data={data}>
					<XAxis dataKey="grade" stroke={ChartConfig.axesColor} />
					<YAxis stroke={ChartConfig.axesColor} />
					<CartesianGrid vertical={false} stroke={ChartConfig.chartGridColor} />
					<Tooltip   />
					<Legend verticalAlign="top" height={36} />
                    
					<Bar dataKey="created" stackId="a" fill={ChartConfig.color.sunny} />
					<Bar dataKey="not_created" stackId="a" fill={ChartConfig.color.primary} />
                </BarChart>
                </ResponsiveContainer>
				</Container>
           
		);
	}
}

export default StackedBarChart;
