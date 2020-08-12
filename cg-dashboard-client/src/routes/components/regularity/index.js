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

// intl messages
import IntlMessages from 'Util/IntlMessages';

import RegularityDefaultList from '../../../container/regularityDefaultList';

import CustomBar from '../app-bar/components/regularityBar';

import Bar from '../app-bar/components/headerBar';

export default class Cards extends Component {

	onHealth(){
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
			regularity : regularity,
			user: this.props.location.state.user


		 }
	  }); 
   
   //}
     }) 
		
	}
	onAchievement(){
		this.props.history.push({
			pathname: '/app/ui-components/achievement',
			state: {
				school : this.props.location.state.school,
				user : this.props.location.state.user

			 }
		 }); 
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
	
	render() {
	//	console.log(this.props.location.state.school.school_name);
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
								<Button color="light" onClick={()=> this.onRegularity()}>Button</Button>
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
                <RctCollapsibleCard>
				<CustomBar school={this.props.location.state.school}  regularity = {this.props.location.state.regularity} user={this.props.location.state.user} />
			</RctCollapsibleCard>
                <RctCollapsibleCard>
                
                <RegularityDefaultList regularity = {this.props.location.state.regularity} school={this.props.location.state.school} />
            
            </RctCollapsibleCard>
			</div>
		);
	}
}
