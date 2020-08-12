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

// intl messages
import IntlMessages from 'Util/IntlMessages';

import Bar from '../app-bar/components/headerBar';

import { Typography } from '@material-ui/core';

import StackedBarChart from '../../../container/enrollment';

import StackedBar from '../../charts/react-chartjs2/enrollmentStackedBar';

export default class Cards extends Component {

	onHealth(){
		console.log("k");
		this.props.history.push({
			pathname: '/app/ui-components/health',
			state: {
				school : this.props.location.state.school,
				user : this.props.location.state.user
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
	
	onSyncing(){
		console.log(this.props.location.state);
	fetch('https://impact-api.convegenius.com/api/syncingMax' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify(this.props.location.state)
   })
   .then((result) => result.json())
   .then((sync) => { 
	  console.log(sync);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/syncing',
		 state: {
			school : this.props.location.state.school,
			sync : sync,
			user : this.props.location.state.user

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
			user : this.props.location.state.user

		 }
	  }); 
     }) 	 
	}
	onUtilisation(){
		console.log(this.props.location.state);
	fetch('https://impact-api.convegenius.com/api/utilisationMax' , {
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
			user : this.props.location.state.user

		 }
	  }); 
     }) 	 
	}
	render() {
		var created = 0;
		var not_created = 0;
		for(var i=0;i<this.props.location.state.enroll.enroll.length;i++){
			created = created + this.props.location.state.enroll.enroll[i].created;
			not_created = not_created + this.props.location.state.enroll.enroll[i].not_created;
		}
		console.log(created);
		return (
			<div className="card-wrapper">
		  <Bar email={this.props.location.state.user} />

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
			<div className= "row">
				  <div className="col-lg-4 col-md-2 mb-20">
					<MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" size="lg" onClick={() => this.onSyncing()}>Syncing</MatButton>
			    </div>
			    <div className="col-lg-4 col-md-2 mb-20">
				   <MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" onClick={() => this.onEnroll()} >Enrollment</MatButton>
                </div>
			     <div className="col-lg-4 col-md-2 mb-20">
				  <MatButton variant="contained" color="danger" className="btn-danger mr-10 mb-10 text-white" onClick={() => this.onUtilisation()}>Device Utilisation</MatButton>
			     </div>
			  </div>
			</RctCollapsibleCard>
			</div>

            <RctCollapsibleCard>
			
			<Typography variant="h5" component="h5" style={{marginBottom: 30}} >Total Profiles Created : {created}</Typography>
              <Typography variant="h5" component="h5" style={{marginBottom: 30}} >Total Profiles Not Yet Created : {not_created}</Typography>
			        
					<StackedBar data={this.props.location.state.enroll.enroll}/>
				
			</RctCollapsibleCard>
	
        </div>
	
		);
	}
}
