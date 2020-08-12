/**
 * Cards
 */
import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	CardLink,
	CardGroup,
	CardImgOverlay
} from 'reactstrap';

import MatButton from '@material-ui/core/Button';

import { sizing } from '@material-ui/system';

import RaisedButtons from '../../components/buttons';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import Doughnut from '../../charts/react-chartjs2/doughnut';

import Bar from '../app-bar/components/headerBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import CustomBar from '../app-bar/components/ImprovementBar';

import DataTable from '../../tables/improvement-table';


import ApexChart from '../../charts/react-chartjs2/timelineProjectLevel';


export default class Cards extends Component {

	
	render() {
        console.log(this.props.location.state.defaultImprove[0][0].series)
		return (
			<div className="card-wrapper">
			<Bar email={this.props.location.state.user}/>
             <div className="row">
             <div className="col-sm-12 col-md-8 col-xl-4">

             <RctCollapsibleCard>
                 <CardText style={{fontSize: 20}}>OVERALL STUDENT IMPROVEMENT</CardText>
                 <ApexChart series={this.props.location.state.defaultImprove[0][0].series}/>
                 </RctCollapsibleCard>
            </div>
            <div className="col-sm-10 col-md-4 col-xl-8">
            <RctCollapsibleCard>
                 <DataTable data = {this.props.location.state.defaultImprove[0][0].improvement} height= "100%" />
                 
             </RctCollapsibleCard>
             </div>
             </div>
        </div>
		);
	}
}
