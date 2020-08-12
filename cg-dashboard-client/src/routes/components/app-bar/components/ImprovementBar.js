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

const  styles = {
   root: {
      width: '100%',
   },
   flex: {
      flex: 1,
   },
   menuButton: {
      marginLeft: -12,
      marginRight: 20,
   },
};



class CustomBar extends Component {

  

    onApplyingGrade(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/improvementWithGradeFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, grade : val})
    })
    .then((result) => result.json())
    .then((defaultImprove) => { 
       console.log("res");
      console.log(defaultImprove);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/improvement',
          state: {
            school : this.props.location.state.school,
            defaultImprove : defaultImprove,
            user: this.props.user
           }
        });
      })  
    
     
    }

    onApplyingSubject(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/improvementWithSubjectFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, subject : val})
    })
    .then((result) => result.json())
    .then((defaultImprove) => { 
       console.log("res");
   //   console.log(defaultScore);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/improvement',
          state: {
            school : this.props.location.state.school,
            defaultImprove : defaultImprove,
            user: this.props.user

           }
        });
      })  
  
    }

    onApplyingSchool(val){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/improvementWithSchoolFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : val})
    })
    .then((result) => result.json())
    .then((defaultImprove) => { 
       console.log("res");
      console.log(defaultImprove);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/improvement',
          state: {
            school : this.props.location.state.school,
            defaultImprove : defaultImprove,
            user: this.props.user

           }
        });
      })  
    
    }
   render(){
 
   return (
      <AppBar position="static" className="bg-primary">
         <Toolbar>
            <div>
               <ul className="ml-auto list-inline navbar-right mb-0">

               <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-white" >
                        School
                </DropdownToggle>
                     <DropdownMenu>
                     {this.props.filter[3].map(s=>
                        <DropdownItem onClick={() => this.onApplyingSchool(s)}>{s.school}</DropdownItem>
                       )}
                     </DropdownMenu>
                  </UncontrolledDropdown>
              
               <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-white">
                        Grade
                </DropdownToggle>
                     <DropdownMenu>
                       {this.props.filter[1].map(s=>
                        <DropdownItem onClick={() => this.onApplyingGrade(s,this.props.school)}>{s.grade}</DropdownItem>
                       )}
                     </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-white">
                        Subject
                </DropdownToggle>
                     <DropdownMenu>
                     {this.props.filter[2].map(s=>
                        <DropdownItem onClick={() => this.onApplyingSubject(s,this.props.school)}>{s.subject}</DropdownItem>
                       )}
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </ul>
            </div>
         </Toolbar>
      </AppBar>
   );
}
}

export default withRouter(withStyles(styles)(CustomBar));
