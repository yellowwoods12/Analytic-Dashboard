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
	CardImgOverlay,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';

import Typography from '@material-ui/core/Typography';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import ReactDataGrid from "react-data-grid";


import { withStyles } from '@material-ui/core/styles';

import { Box } from '@material-ui/core'

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import RegularityDefaultList from '../../../container/regularityDefaultList';

import CustomBar from '../app-bar/components/regularityBar';

import Bar from '../app-bar/components/headerBar';

import {withRouter} from 'react-router-dom';

import DataGrid from '../../tables/data-grid';



const  styles = {
	root: {
	   width: '100%',
	},
	flex: {
	   flex: 1,
	},
	menuButton: {
	   backgroundColor: '#f00',
	   marginLeft: 700,
	   marginRight: 20,
	   width : 300,
	},
	bar: {
	   marginLeft : '20'
 
	},
	form: {
		marginLeft : '20'
  
	 },
 

	button: {

		marginLeft : '300',
		justifyContent : 'center',
		alignItems : 'center'
	}
 };

 const columns = [
	{ key: "id", name: "ID", editable: false },
	{ key: "title", name: "Title", editable: true },
	{ key: "complete", name: "Complete", editable: true }
  ];
  
  const rows = [
	{ id: 0, title: "Task 1", complete: 20 },
	{ id: 1, title: "Task 2", complete: 40 },
	{ id: 2, title: "Task 3", complete: 60 }
  ];

 class Cards extends Component {

	state = {
		classesInMonth_10 : '0',
		classesInWeek_10: '0',
		minDuration_10 : '0',
		minStrength_10 : '0',
		classesInMonth_9 : '0',
		classesInWeek_9: '0',
		minDuration_9 : '0',
		minStrength_9 : '0',
		classesInMonth_8 : '0',
		classesInWeek_8: '0',
		minDuration_8 : '0',
		minStrength_8 : '0',
		classesInMonth_7 : '0',
		classesInWeek_7: '0',
		minDuration_7 : '0',
		minStrength_7 : '0',
		classesInMonth_6 : '0',
		classesInWeek_6: '0',
		minDuration_6 : '0',
		minStrength_6 : '0',
		classesInMonth_5 : '0',
		classesInWeek_5: '0',
		minDuration_5 : '0',
		minStrength_5 : '0',
		classesInMonth_4 : '0',
		classesInWeek_4: '0',
		minDuration_4 : '0',
		minStrength_4 : '0',
		classesInMonth_3 : '0',
		classesInWeek_3: '0',
		minDuration_3 : '0',
		minStrength_3 : '0',
		classesInMonth_2 : '0',
		classesInWeek_2: '0',
		minDuration_2 : '0',
		minStrength_2 : '0',
		classesInMonth_1 : '0',
		classesInWeek_1: '0',
		minDuration_1 : '0',
		minStrength_1 : '0',
		classesInMonth_UKG : '0',
		classesInWeek_UKG: '0',
		minDuration_UKG : '0',
		minStrength_UKG : '0',
		classesInMonth_LKG : '0',
		classesInWeek_LKG: '0',
		minDuration_LKG : '0',
		minStrength_LKG : '0',
		
	
	};



  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

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
			// console.log(sync);
		   //  if(info.success == "login sucessfull"){
			 this.props.history.push({
				pathname: '/app/ui-components/regularity',
				state: {
				   school : this.props.location.state.school,
				   user: this.props.location.state.user,
                   regularity: regularity
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
				user: this.props.location.state.user

			 }
		 }); 
	}

	onUsage(){
		console.log(this.state);
		this.props.history.push({
			pathname: '/app/ui-components/usageFromRegularity',
			state: {
				school : this.props.location.state.school,
				parameter_list : this.state,
				user : this.props.location.state.user

			 }
		 }); 
	}
	

	onEntering(){
		console.log(this.state);
		fetch('https://impact-api.convegenius.com/api/regularityWithParameters' , {
	 mode :"cors",
	 method: "POST",
	 headers: {
	   'Content-type': 'application/json'
	 },
	 body: JSON.stringify({state: this.state, school:this.props.location.state.school})
   })
   .then((result) => result.json())
   .then((regularity) => { 
	  console.log(regularity);
	//  if(info.success == "login sucessfull"){
	  this.props.history.push({
		 pathname: '/app/ui-components/regularityWithParameter',
		 state: {
			school : this.props.location.state.school,
			regularity : regularity,
			parameter_list : this.state,
			user: this.props.location.state.user


		 }
	  }); 
   
   //}
     }) 
	}
	handleSubmit(values){
		console.log(values);
	}
	render() {
	
			

		const {classes} = this.props;
		const {classesInMonth_10,classesInWeek_10,minDuration_10,minStrength_10,classesInMonth_9,classesInWeek_9,minDuration_9,minStrength_9,classesInMonth_8,classesInWeek_8,minDuration_8,minStrength_8,classesInMonth_7,classesInWeek_7,minDuration_7,minStrength_7,classesInMonth_6,classesInWeek_6,minDuration_6,minStrength_6,classesInMonth_5,classesInWeek_5,minDuration_5,minStrength_5,classesInMonth_4,classesInWeek_4,minDuration_4,minStrength_4,
			classesInMonth_3,classesInWeek_3,minDuration_3,minStrength_3,classesInMonth_2,classesInWeek_2,minDuration_2,minStrength_2,classesInMonth_1,classesInWeek_1,minDuration_1,minStrength_1,
			classesInMonth_UKG,classesInWeek_UKG,minDuration_UKG,minStrength_UKG,classesInMonth_LKG,classesInWeek_LKG,minDuration_LKG,minStrength_LKG} = this.state;
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
								<Button color="light" onClick={()=> this.onUsage()}>Button</Button>
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
				<CustomBar school={this.props.location.state.school} user={this.props.location.state.user} regularity = {this.props.location.state.regularity}/>
			</RctCollapsibleCard>
                <RctCollapsibleCard>
                
                <RegularityDefaultList regularity = {this.props.location.state.regularity} school={this.props.location.state.school} user={this.props.location.state.user}/>
            
            </RctCollapsibleCard>
		
			
			<RctCollapsibleCard alignContent="center">
							<Form inline className={classes.form} style={{alignContent: "center"}}>

							<div className={classes.bar}>
							<div className="row " marginLeft={100}>
							<Box display="flex"  marginLeft={40} width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Label for="Email-2" className="mr-sm-20">No of Classes (Month)</Label>
				
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Label for="Password-2" className="mr-sm-10">No of Classes (Week)</Label>
									
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >

								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Label for="Password-2" className="mr-sm-10">Class Duration</Label>
								
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Label for="Password-2" className="mr-sm-10">Min. Class Strength</Label>
								
								</FormGroup>
								</Box>
								</div>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >

							<Typography variant="h6" component="h5">
                                   LKG
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="lkg" id="lkg" placeholder="0" value={classesInMonth_LKG}
									 onChange={(event) => this.setState({ classesInMonth_LKG : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_LKG}
									onChange={(event) => this.setState({ classesInWeek_LKG : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >

								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_LKG}
									onChange={(event) => this.setState({ minDuration_LKG : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >

								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_LKG}
									onChange={(event) => this.setState({ minStrength_LKG : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
						
							<div className={classes.bar}>
							<div className="row" id="margin-dense">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >

							<Typography variant="h6" component="h5">
                                   UKG
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="ukg" placeholder="0" value={classesInMonth_UKG}
									 onChange={(event) => this.setState({ classesInMonth_UKG : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_UKG}
									onChange={(event) => this.setState({ classesInWeek_UKG : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_UKG}
									onChange={(event) => this.setState({ minDuration_UKG : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_UKG}
									onChange={(event) => this.setState({ minStrength_UKG : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
							
							<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 1
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_1}
									 onChange={(event) => this.setState({ classesInMonth_1 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_1}
									onChange={(event) => this.setState({ classesInWeek_1 : event.target.value })} />
								</FormGroup>
								</Box>					
					     		<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_1}
									onChange={(event) => this.setState({ minDuration_1 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_1}
									onChange={(event) => this.setState({ minStrength_1 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
						
							<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 2
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_2}
									 onChange={(event) => this.setState({ classesInMonth_2 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_2}
									onChange={(event) => this.setState({ classesInWeek_2 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_2}
									onChange={(event) => this.setState({ minDuration_2 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_2}
									onChange={(event) => this.setState({ minStrength_2 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
						
							<div className={classes.bar}>
							<div className="row ">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 3
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_3}
									 onChange={(event) => this.setState({ classesInMonth_3 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_3}
									onChange={(event) => this.setState({ classesInWeek_3 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_3}
									onChange={(event) => this.setState({ minDuration_3 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >

								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_3}
									onChange={(event) => this.setState({ minStrength_3 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
						
							<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 4
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_4}
									 onChange={(event) => this.setState({ classesInMonth_4 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_4}
									onChange={(event) => this.setState({ classesInWeek_4 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_4}
									onChange={(event) => this.setState({ minDuration_4 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_4}
									onChange={(event) => this.setState({ minStrength_4 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
							
							<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 5
                            </Typography>
							</Box>
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_5}
									 onChange={(event) => this.setState({ classesInMonth_5 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_5}
									onChange={(event) => this.setState({ classesInWeek_5 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_5}
									onChange={(event) => this.setState({ minDuration_5 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_5}
									onChange={(event) => this.setState({ minStrength_5 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
						
							<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 6
                            </Typography>
							</Box>
						
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_6}
									 onChange={(event) => this.setState({ classesInMonth_6 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_6}
									onChange={(event) => this.setState({ classesInWeek_6 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_6}
									onChange={(event) => this.setState({ minDuration_6 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_6}
									onChange={(event) => this.setState({ minStrength_6 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>

								<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 7
                            </Typography>
							</Box>
						
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_7}
									 onChange={(event) => this.setState({ classesInMonth_7 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_7}
									onChange={(event) => this.setState({ classesInWeek_7 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_7}
									onChange={(event) => this.setState({ minDuration_7 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_7}
									onChange={(event) => this.setState({ minStrength_7 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>

								<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 8
                            </Typography>
							</Box>
						
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_8}
									 onChange={(event) => this.setState({ classesInMonth_8 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_8}
									onChange={(event) => this.setState({ classesInWeek_8 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_8}
									onChange={(event) => this.setState({ minDuration_8 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_8}
									onChange={(event) => this.setState({ minStrength_8 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
								
								<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 9
                            </Typography>
							</Box>
						
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_9}
									 onChange={(event) => this.setState({ classesInMonth_9 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_9}
									onChange={(event) => this.setState({ classesInWeek_9 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_9}
									onChange={(event) => this.setState({ minDuration_9 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_9}
									onChange={(event) => this.setState({ minStrength_9 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>

								<div className={classes.bar}>
							<div className="row">
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
							<Typography variant="h6" component="h5">
                                   Grade 10
                            </Typography>
							</Box>
						
							<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-20 mr-sm-3 mb-sm-0">
									<Input type="text" name="email" id="Email-2" placeholder="0" value={classesInMonth_10}
									 onChange={(event) => this.setState({ classesInMonth_10 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={classesInWeek_10}
									onChange={(event) => this.setState({ classesInWeek_10 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minDuration_10}
									onChange={(event) => this.setState({ minDuration_10 : event.target.value })} />
								</FormGroup>
								</Box>
								<Box display="flex"  width={300} height={80}   alignItems="center"  justifyContent="center" >
								<FormGroup className="mb-10 mr-sm-3 mb-sm-0">
									<Input type="text" name="password" id="Password-2" placeholder="0" value={minStrength_10}
									onChange={(event) => this.setState({ minStrength_10 : event.target.value })} />
								</FormGroup>
								</Box>
								</div>
								</div>
								<Button  color="danger" onClick={() => this.onEntering()} block >Submit</Button>
								
							</Form>
						</RctCollapsibleCard>
			</div>
		);
	}
}


export default withRouter(withStyles(styles)(Cards));