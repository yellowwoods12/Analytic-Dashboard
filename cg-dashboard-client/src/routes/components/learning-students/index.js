/**
 * Cards
 */
import React, { Component } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

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

import RaisedButtons from '../buttons';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import Bar from '../app-bar/components/headerBar';

import { Doughnut } from 'react-chartjs-2';

import ChartConfig from 'Constants/chart-config';

import CustomBar from '../app-bar/components/LearningBar';

import  DataTable  from '../../tables/learning-table';

import PreDonut from '../../charts/react-chartjs2/PrelearningDonut';

import PostDonut from '../../charts/react-chartjs2/PostlearningDonut';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import {Typography} from '@material-ui/core';

import MUIDataTable from "mui-datatables";
import { typography } from '@material-ui/system';



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
	
	onLearning(){
		console.log(this.props.location.state);
		fetch('https://impact-api.convegenius.com/api/learning' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify(this.props.location.state)
   })
   .then((result) => result.json())
   .then((defaultScore) => { 
	  console.log(defaultScore);
	//  if(info.success == "login sucessfull"){
		this.props.history.push({
			pathname: '/app/ui-components/learning',
			state: {
				school : this.props.location.state.school,
				defaultScore : defaultScore,
				user: this.props.location.state.user

			 }
		 });
     })  
	}

	onImprovement(){
		console.log(this.props.location.state);
		fetch('https://impact-api.convegenius.com/api/improvement' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify(this.props.location.state)
   })
   .then((result) => result.json())
   .then((defaultImprove) => { 
	  console.log(defaultImprove);
	//  if(info.success == "login sucessfull"){
		this.props.history.push({
			pathname: '/app/ui-components/improvement',
			state: {
				school : this.props.location.state.school,
				defaultImprove : defaultImprove,
				user: this.props.location.state.user

			 }
		 });
     })  
	}

	
	onEnroll(){
		console.log(this.props.location.state);
	fetch('https://impact-api.convegenius.com/api/enrollment' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify(this.props.location.state)
   })
   .then((result) => result.json())
   .then((enroll) => { 
	  console.log(enroll);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/enrollment',
		 state: {
			school : this.props.location.state.school,
			enroll : enroll,
			user: this.props.location.state.user

		 }
	  }); 
     }) 	 
	}
	onUtilisation(){
		console.log(this.props.location.state);
	fetch('https://impact-api.convegenius.com/api/utilisation' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify(this.props.location.state)
   })
   .then((result) => result.json())
   .then((utilise) => { 
	  console.log(utilise);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/utilisation',
		 state: {
			school : this.props.location.state.school,
			utilise : utilise,
			user: this.props.location.state.user

		 }
	  }); 
     }) 	 
	}

	pretestStudent(val){
		//	var point = getElementsAtEvent(evt);12
		//struggling - 0, remedial - 1 , intermediate - 2, advanced - 3
		if (val[0]._index!=null) {
			fetch('https://impact-api.convegenius.com/api/pretestStudents' , {
			mode :"cors",
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({school : this.props.location.state.school,index : val[0]._index, score: this.props.location.state.defaultScore[0]})
		})
	.then((result) => result.json())
	.then((info) => { 
	  console.log(info);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/learning-students',
		 state: {
			info : info,
			defaultScore: this.props.location.state.defaultScore,
			school : this.props.location.state.school,
			user: this.props.location.state.user

		 }
	  }); 
	
	//}
	})
		 }
		 
			console.log(val[0]._index);
		}
	
		posttestStudent(val){
			//	var point = getElementsAtEvent(evt);
			//struggling - 0, remedial - 1 , intermediate - 2, advanced - 3
			if (val[0]._index!=null) {
				fetch('https://impact-api.convegenius.com/api/posttestStudents' , {
				mode :"cors",
				method: "POST",
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({school : this.props.location.state.school,index : val[0]._index, score: this.props.location.state.defaultScore[0]})
			})
		.then((result) => result.json())
		.then((info) => { 
		  console.log(info);
		//  if(info.success == "login sucessfull"){
		  this.props.history.push({
			 pathname: '/app/ui-components/learning-students',
			 state: {
				info : info,
				defaultScore : this.props.location.state.defaultScore,
				school : this.props.location.state.school,
				user: this.props.location.state.user

	
			 }
		  }); 
		
		//}
		})
			 }
			 
				console.log(val[0]._index);
			}
	render() {
        console.log("hi");
        console.log(this.props.location.state.defaultScore[0]);
		var score = this.props.location.state.defaultScore[0];
		console.log(score);
		var total = score.length;
	//	console.log(score[1].pre_test_score);
		var pretest = [];
		var posttest = [];
		var struggling = 0, remedial= 0, intermediate =0, advanced =0;
		for(var i=0; i< score.length; i++){
             if(score[i].pre_test_score < 15 && score[i].pre_test_score>=0){
				 struggling++;
			 }
			 else if(score[i].pre_test_score>=15 && score[i].pre_test_score < 40){
				 remedial++;
			 }
			 else if(score[i].pre_test_score>=40 && score[i].pre_test_score <70){
				 intermediate++;
			 }
			 else{
				 advanced++;
			 }
			
		}
		pretest.push(struggling);
		pretest.push(remedial);
		pretest.push(intermediate);
		pretest.push(advanced);

		const predata = {
			labels: [
				'Struggling',
				'Remedial',	
				'Intermediate',
				'Advanced'
				
			],
			datasets: [{
				data: pretest,
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
					fontColor: ChartConfig.legendFontColor,
					fontSize: ChartConfig.legendFontSize
				}
			}
		};
		
		 struggling = 0, remedial= 0, intermediate =0, advanced =0;
		for(var i=0; i< score.length; i++){
             if(score[i].post_test_score < 15 && score[i].post_test_score>=0){
				 struggling++;
			 }
			 else if(score[i].post_test_score>=15 && score[i].post_test_score < 40){
				 remedial++;
			 }
			 else if(score[i].post_test_score>=40 && score[i].post_test_score <70){
				 intermediate++;
			 }
			 else{
				 advanced++;
			 }
		}
		posttest.push(struggling);
		posttest.push(remedial);
		posttest.push(intermediate);
		posttest.push(advanced);
 
		const postdata = {
			labels: [
				'Struggling',
				'Remedial',	
				'Intermediate',
				'Advanced'
				
			],
			datasets: [{
				data: posttest,
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
		
	
        console.log("dd");
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
								<Button color="light" onClick={() => this.onRegularity()}>Button</Button>
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
								<CardTitle>ACHIEVEMENT</CardTitle>
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
					<MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" size="lg" onClick={() => this.onLearning()}>Learning Statistics</MatButton>
			    </div>
			    <div className="col-lg-6 col-md-2 mb-20">
				   <MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" onClick={() => this.onImprovement()} >Student Improvement</MatButton>
                </div>
			
			  </div>
			</RctCollapsibleCard>
				
			 </div>
			 <RctCollapsibleCard>
		      	 <CustomBar filter={this.props.location.state.defaultScore} school={this.props.location.state.school} user={this.props.location.state.user} />
			</RctCollapsibleCard>
			<RctCollapsibleCard >
				<CardText style={{fontSize : 30}}>Total number of students:  {total}</CardText>
				
            </RctCollapsibleCard>
             <div className="row">
					<div className="col-sm-12 col-md-6 col-xl-6">
					
						<RctCollapsibleCard >
						<Typography style={{fontSize : 20}}>STUDENT DISTRIBUTION - BASELINE</Typography>
							<CardText style={{fontSize : 20}}>Number of Students (PRE-TEST):  {total}</CardText>
						<PreDonut data={predata} progress={pretest}  onElementsClick ={(val) => this.progressClick(val)} school={this.props.location.state.school}  user={this.props.location.state.user} defaultScore={this.props.location.state.defaultScore} />
                       </RctCollapsibleCard>
					   
					   </div>
					   <div className="col-sm-12 col-md-6 col-xl-6">
					   <RctCollapsibleCard >
					   <Typography style={{fontSize : 20}}>STUDENT DISTRIBUTION - ENDLINE</Typography>
					   <CardText style={{fontSize : 20}}>Number of Students (POST-TEST): {total}</CardText>
					   <PostDonut data={postdata} progress={posttest}  onElementsClick ={(val) => this.progressClick(val)} school={this.props.location.state.school}  user={this.props.location.state.user} defaultScore={this.props.location.state.defaultScore} />
                       </RctCollapsibleCard>
					   </div> 
                </div>
               

          <div ><RctCollapsibleCard>
			  <DataTable data = {this.props.location.state.info}/>
				</RctCollapsibleCard>
			</div>
			
              
        </div>
		);
	}
}
