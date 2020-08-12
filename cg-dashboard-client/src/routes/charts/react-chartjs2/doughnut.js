import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartConfig from 'Constants/chart-config';

const data = {
	labels: [
		'Struggling',
		'Remedial',	
		'Intermediate',
		'Advanced'
		
	],
	datasets: [{
		data: [300, 500, 10, 40],
		backgroundColor: [
			ChartConfig.color.primary,
			ChartConfig.color.warning,
			ChartConfig.color.info,
			ChartConfig.color.danger
		],
		hoverBackgroundColor: [
			ChartConfig.color.primary,
			ChartConfig.color.warning,
			ChartConfig.color.info,
			ChartConfig.color.danger
		]
	}]
};

const options = {
	legend: {
		labels: {
			fontColor: ChartConfig.legendFontColor
		}
	}
};

export default class DoughnutComponent extends Component {

	render() {
		return (
			<Doughnut data={data} options={options} />
		);
	}
}
