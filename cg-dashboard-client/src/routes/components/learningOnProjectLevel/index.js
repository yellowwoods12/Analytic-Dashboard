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

import RaisedButtons from '../../components/buttons';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import Bar from '../app-bar/components/headerBar';

import { Doughnut } from 'react-chartjs-2';
import ChartConfig from 'Constants/chart-config';

import CustomBar from '../app-bar/components/LearningBarProjectLevel';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import PreDonut from '../../charts/react-chartjs2/PrelearningDonutProjectLevel';

import PostDonut from '../../charts/react-chartjs2/PostlearningDonutProjectLevel';

import {Typography} from '@material-ui/core';

export default class Cards extends Component {

	onHealth(){
		console.log("k");
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
		console.log(this.props.location.state.defaultScore);
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
		
	
		
		return (
			<div className="card-wrapper">
			<Bar email={this.props.location.state.user}/>
			
			
			<div className="button-wrapper">
			
				
			 </div>
			
			
             <div className="row">
					<div className="col-sm-12 col-md-6 col-xl-6">
					
						<RctCollapsibleCard >
							<Typography style={{fontSize : 20}}>STUDENT DISTRIBUTION - BASELINE</Typography>
							<CardText style={{fontSize : 20}}>Number of Students (PRE-TEST):  {total}</CardText>
						<PreDonut data={predata} progress={pretest}  onElementsClick ={(val) => this.progressClick(val)}   user={this.props.location.state.user} defaultScore={this.props.location.state.defaultScore} />

                       </RctCollapsibleCard>
					   
					   </div>
					   <div className="col-sm-12 col-md-6 col-xl-6">
					   <RctCollapsibleCard >
					   <Typography style={{fontSize : 20}}>STUDENT DISTRIBUTION - ENDLINE</Typography>
					   <CardText style={{fontSize : 20}}>Number of Students (POST-TEST): {total}</CardText>
					   <PostDonut data={postdata} progress={posttest}  onElementsClick ={(val) => this.progressClick(val)}   user={this.props.location.state.user} defaultScore={this.props.location.state.defaultScore} />

                       </RctCollapsibleCard>
					   </div> 
                </div>
        </div>
		);
	}
}
