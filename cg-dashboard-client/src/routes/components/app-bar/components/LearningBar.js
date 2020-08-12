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
       fetch('https://impact-api.convegenius.com/api/learningWithGradeFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, grade : val})
    })
    .then((result) => result.json())
    .then((defaultScore) => { 
       console.log("res");
      console.log(defaultScore);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/learning',
          state: {
             school : school,
             defaultScore : defaultScore,
             flag : 1,
             user: this.props.user
           }
        });
      })  
    
       console.log("fg");
       console.log(val);
    }

    onApplyingGrade(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/learningWithGradeFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, grade : val})
    })
    .then((result) => result.json())
    .then((defaultScore) => { 
       console.log("res");
      console.log(defaultScore);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/learning',
          state: {
             school : school,
             defaultScore : defaultScore,
             flag : 1,
             user: this.props.user
           }
        });
      })  
    
    //   console.log(val);
    }

    onApplyingSubject(val,school){
      console.log(this.props.user);
       fetch('https://impact-api.convegenius.com/api/learningWithSubjectFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, subject : val})
    })
    .then((result) => result.json())
    .then((defaultScore) => { 
       console.log("res");
      console.log(defaultScore);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/learning',
          state: {
             school : school,
             defaultScore : defaultScore,
             flag : 1,
             user: this.props.user
           }
        });
      })  
    
       console.log("fg");
       console.log(val);
    }

    onApplyingChapter(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/learningWithChapterFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, chapter : val})
    })
    .then((result) => result.json())
    .then((defaultScore) => { 
       console.log("res");
      console.log(defaultScore);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/learning',
          state: {
             school : school,
             defaultScore : defaultScore,
             flag : 1,
             user: this.props.user
           }
        });
      })  
    
       console.log("fg");
       console.log(val);
    }
   render(){
 
   return (
      <AppBar position="static" className="bg-primary">
         <Toolbar>
            <div>
               <ul className="ml-auto list-inline navbar-right mb-0">
              
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
                  <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-white" >
                        Chapter
                </DropdownToggle>
                     <DropdownMenu>
                     {this.props.filter[3].map(s=>
                        <DropdownItem onClick={() => this.onApplyingChapter(s,this.props.school)}>{s.chapter}</DropdownItem>
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
