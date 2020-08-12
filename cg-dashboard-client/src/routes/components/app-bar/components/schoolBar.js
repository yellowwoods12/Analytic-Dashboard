/**
 * Custom Bar With Button
 */
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';



const styles = {
    root: {
       width: '100%',
    },
    flex: {
       flex: 1,
    },
    menuButton: {
       marginLeft: -12,
       marginRight: 20   
    },
 };
 class CustomBar extends Component {
     
   onLearningClick(){
		console.log(this.props.location.state.user);
		fetch('https://impact-api.convegenius.com/api/learningOnProjectLevel' , {
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
			pathname: '/app/ui-components/learningOnProjectLevel',
			state: {
				defaultScore : defaultScore,
				user: this.props.location.state.user

			 }
		 });
     })  
   }
   
   onImprovementClick(){
		fetch('https://impact-api.convegenius.com/api/improvementOnProjectLevel' , {
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
			pathname: '/app/ui-components/improvementOnProjectLevel',
			state: {
				
				defaultImprove : defaultImprove,
				user: this.props.location.state.user

			 }
		 });
     })  
	}


    render(){
    const { classes } = this.props;
    console.log(this.props.email);
    return (
       
       <AppBar position="static" className="bg-primary">
          <Toolbar>
            
          <Button className="text-white" style={{fontSize: 20}} onClick={() => this.onLearningClick()}>Learning</Button>
          <Button className="text-white" style={{fontSize: 20}} onClick={() => this.onImprovementClick()}>Achievements</Button>

         
                   <div className="ml-auto list-inline navbar-right mb-0" style={{fontSize: 20}}>

                        Hi, {this.props.email} !
              
                
             </div>
          </Toolbar>
       </AppBar>
    );
 }
}

export default withRouter(withStyles(styles)(CustomBar));
 