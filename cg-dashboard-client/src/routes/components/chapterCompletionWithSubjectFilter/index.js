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

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import MatButton from '@material-ui/core/Button';

import StackedBarChart from '../../../container/regularity';

import Bar from '../app-bar/components/headerBar';

import CustomBar from '../app-bar/components/usageDefaultBar';

import StackedBar from '../../charts/react-chartjs2/chapterCompletionWithSubjectStackedBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import { Typography } from '@material-ui/core';


import SimpleBarChartComponent from '../../../container/usageChapterWise';

export default class Cards extends Component {

	onHealth(){
		this.props.history.push({
			pathname: '/app/ui-components/health',
			state: {
				school : this.props.location.state.school,
				user: this.props.location.state.user

			 }
		 }); 
	}
	onRegularity(){
		console.log(this.props.location.state.school);
		fetch('https://impact-api.convegenius.com/api/regularity' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify({school : this.props.location.state.school})
   })
   .then((result) => result.json())
   .then((regularity) => { 
	  console.log(regularity);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/regularity',
		 state: {
			school : this.props.location.state.school,
			regularity : regularity	,
			user: this.props.location.state.user


		 }
	  }); 
   
   //}
     }) 
		
	}

	onUsage(){
		this.props.history.push({
			pathname: '/app/ui-components/usage',
			state: {
				school : this.props.location.state.school,
				user: this.props.location.state.user

			 }
		 }); 
	}

	onAchievement(){
		this.props.history.push({
			pathname: '/app/ui-components/achievement',
			state: {
				school : this.props.location.state.school,
				user: this.props.location.state.user

			 }
		 }); 
    }
    
    onUsageStats(){
		console.log(this.props.location.state.school);
		fetch('https://impact-api.convegenius.com/api/usageGradeWise' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify({school : this.props.location.state.school})
   })
   .then((result) => result.json())
   .then((usageStats) => { 
	  console.log(usageStats);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/usageStatsGradeWise',
		 state: {
			school : this.props.location.state.school,
			usageStats : usageStats,
			user: this.props.location.state.user


		 }
	  }); 
   
   //}
     }) 
		
	}

	Error(){	
			   //  if(info.success == "login sucessfull"){
				 this.props.history.push({
					pathname: '/app/ui-components/commonErrorReport',
					state: {
					   school : this.props.location.state.school,
					   
		   
					}
				 }); 	
	}

	ErrorReport(){
		fetch('https://impact-api.convegenius.com/api/commonErrorReport' , {
			mode :"cors",
			method: "POST",
			headers: {
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({school : this.props.location.state.school})
		  })
		  .then((result) => result.json())
		  .then((error) => { 
			 console.log(error);
		   //  if(info.success == "login sucessfull"){
			 this.props.history.push({
				pathname: '/app/ui-components/commonErrorReport',
				state: {
				   school : this.props.location.state.school,
				   error : error,
				   user: this.props.location.state.user

	   
				}
			 }); 
		  
		  //}
			}) 
	}
	render() {
		console.log(this.props.location.state.parameter_list);
		return (
			<div className="card-wrapper">
			  <Bar email={this.props.location.state.user}/>	
				<RctCollapsibleCard
					heading={<IntlMessages id={this.props.location.state.school} />}
				>
					<div className="row">
						<div className="col-md-3 col-md-2 mb-20">
							<Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
								<CardTitle>HEALTH</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light" onClick={() => this.onHealth()}>Button</Button>
							</Card>
						</div>
						<div className="col-md-3 col-md-2 mb-20">
							<Card body inverse color="primary">
								<CardTitle>REGULARITY</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light"   onClick={()=> this.onRegularity()}>Button</Button>
							</Card>
						</div>
						<div className="col-md-3 col-md-2 mb-20">
							<Card body inverse color="success">
								<CardTitle>USAGE</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light" onClick={() => this.onUsage()}>Button</Button>
							</Card>
						</div>
						<div className="col-md-3 col-md-2 mb-20">
							<Card body inverse color="info">
								<CardTitle>ACHIEVEMENTS</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light" onClick={() => this.onAchievement()}>Button</Button>
							</Card>
						</div>
						
					</div>
				</RctCollapsibleCard>
                <div className="button-wrapper">
			<RctCollapsibleCard>
			<div className= "row" style ={{flex:2}}>
				  <div className="col-lg-6 col-md-2 mb-20">
					<MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" size="lg" onClick={() => this.onUsageStats()}>Usage Statistics</MatButton>
			    </div>
			    <div className="col-lg-6 col-md-2 mb-20">
				<MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" onClick={() => this.ErrorReport()} >Common Error Report</MatButton>
                </div>
			
			  </div>
			</RctCollapsibleCard>
            <RctCollapsibleCard>
				<CustomBar usageStats={this.props.location.state.usageStats} school={this.props.location.state.school} user={this.props.location.state.user} />
			</RctCollapsibleCard>
			 </div>
             <RctCollapsibleCard>
			 <Typography>CHAPTER COMPLETION (SUBJECT-WISE)</Typography>

				 <StackedBar data={this.props.location.state.usageStats[0]}/>
               
             </RctCollapsibleCard>
			
			</div>
		);
	}

}