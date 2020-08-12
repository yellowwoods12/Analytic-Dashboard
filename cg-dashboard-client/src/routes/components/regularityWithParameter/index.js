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

import RegularityListWithParameter from '../../../container/regularityListWithParameter';

import CustomBar from '../app-bar/components/regularityWithParameterBar';

import StackedBarChart from '../../../container/regularity'

import Bar from '../app-bar/components/headerBar';

import StackedBar from '../../charts/react-chartjs2/regularityStackedBar';

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
		fetch('https://impact-api.convegenius.com/api/regularity' , {
			mode :"cors",
			method: "POST",
			headers: {
			  'Content-type': 'application/json'
			},
			body: JSON.stringify(this.props.location.state.school)
		  })
		  .then((result) => result.json())
		  .then((regularity) => { 
			 console.log(regularity);
		   //  if(info.success == "login sucessfull"){
			 this.props.history.push({
				pathname: '/app/ui-components/regularity',
				state: {
				   school : this.props.location.state.school,
				   user : this.props.location.state.user,
				   regularity : regularity

				}
			 }); 
		  
		  //}
			}) 
	}

	onUsage(){
		console.log(this.props.location.state.parameter_list);
		this.props.history.push({
			pathname: '/app/ui-components/usageFromRegularity',
			state: {
				school : this.props.location.state.school,
				parameter_list : this.props.location.state.parameter_list,
				user : this.props.location.state.user

			 }
		 }); 
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
								<Button color="light" onClick={() => this.onUsage()}> Button</Button>
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
				<CustomBar school={this.props.location.state.school}  regularity = {this.props.location.state.regularity} parameter_list = {this.props.location.state.parameter_list} user={this.props.location.state.user} />
			</RctCollapsibleCard>
                <RctCollapsibleCard>
                
                <RegularityListWithParameter regularity = {this.props.location.state.regularity[0]} school={this.props.location.state.school} />
            
            </RctCollapsibleCard>
            <RctCollapsibleCard>
			        <StackedBar data={this.props.location.state.regularity[1]}/>					
			</RctCollapsibleCard>
			</div>       
		);
	}
}
