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
import FromDatePickers from '../../../advance-ui-components/dateTime-picker/components/UsageDatePicker';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';
import moment from 'moment';


const  styles = {
   root: {
      width: '100%',
   },
   flex: {
      flex: 1,
   },
   menuButton: {
      color : 'white',
      marginLeft: 1000,
      marginRight: 20,
      width : 700,
      marginTop: -45
   },
   bar: {
      color: 'black'

   }
};


class CustomBar extends Component {

   lastMonth(){

      var fromdate = new Date();
     // console.log(fromdate);
      var dd = String(fromdate.getDate()).padStart(2, '0');
      var mm = String(fromdate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = fromdate.getFullYear();
      
      fromdate = yyyy + '-' + mm + '-' +dd ;
      var todate = new Date();
      todate = moment().subtract(30, 'days'); 
      var dd = String(todate._d.getDate()).padStart(2, '0');
      var mm = String(todate._d.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = todate._d.getFullYear();
      todate = yyyy + '-' + mm + '-' +dd ;

      console.log(fromdate);
      console.log(todate);
      fetch('https://impact-api.convegenius.com/api/usageWithWeekFilter' , {
         mode :"cors",
         method: "POST",
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({from: fromdate, to: todate, school: this.props.school})
        })
        .then((result) => result.json())
        .then((usageStats) => { 
           console.log("res");
         // console.log(regularity);
        //  if(info.success == "login sucessfull"){
           this.props.history.push({
              pathname: '/app/ui-components/usageStatsGradeWise',
              state: {
                school : this.props.location.state.school,
                usageStats: usageStats,
                user: this.props.user
               }
            });
          })  
        
    }
    lastWeek(){

     var monday = new Date();
     monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
     monday.setDate(monday.getDate() - 7);

     var sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
     console.log(monday);
     console.log(sunday);
      var dd = String(monday.getDate()).padStart(2, '0');
      var mm = String(monday.getMonth() + 1).padStart(2, '0'); 
      var yyyy = monday.getFullYear();
      
     monday = yyyy + '-' + mm + '-' +dd ;

     
      var dd = String(sunday.getDate()).padStart(2, '0');
      var mm = String(sunday.getMonth() + 1).padStart(2, '0'); 
      var yyyy = sunday.getFullYear();
      sunday = yyyy + '-' + mm + '-' +dd ;

      console.log(sunday);
      console.log(monday);
      fetch('https://impact-api.convegenius.com/api/usageWithWeekFilter' , {
         mode :"cors",
         method: "POST",
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({from: monday, to: sunday, school: this.props.school})
        })
        .then((result) => result.json())
        .then((usageStats) => { 
           console.log("res");
        //  console.log(regularity);
        //  if(info.success == "login sucessfull"){
           this.props.history.push({
              pathname: '/app/ui-components/usageStatsGradeWise',
              state: {
                school : this.props.location.state.school,
                usageStats: usageStats,
                user: this.props.user
               }
            });
          })  
        
    }

   onApplyingGrade(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/subjectCompletionWithGradeFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, grade : val})
    })
    .then((result) => result.json())
    .then((usageStats) => { 
       console.log("res");
      console.log(usageStats);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/subjectCompletionWithGradeFilter',
          state: {
            school : school,
            usageStats : usageStats,
            user: this.props.user

           }
        });
      })  
    
       console.log("fg");
       console.log(val);
    }

   

    onApplyingSubject(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/chapterCompletionWithSubjectFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, subject : val})
    })
    .then((result) => result.json())
    .then((usageStats) => { 
      console.log("res");
     console.log(usageStats);
   //  if(info.success == "login sucessfull"){
      this.props.history.push({
         pathname: '/app/ui-components/chapterCompletionWithSubjectFilter',
         state: {
           school : school,
           usageStats : usageStats,
           user: this.props.user

          }
       });
     })  
   
      console.log("fg");
      console.log(val);
   }
    onApplyingChapter(val,school){
      // console.log(this.props.location.state);
       fetch('https://impact-api.convegenius.com/api/chapterProgressWithChapterFilter' , {
     mode :"cors",
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify({school : school, chapter : val})
    })
    .then((result) => result.json())
    .then((usageStats) => { 
       console.log("res");
      console.log(usageStats);
    //  if(info.success == "login sucessfull"){
       this.props.history.push({
          pathname: '/app/ui-components/chapterProgressWithChapterFilter',
          state: {
            school : school,
            usageStats : usageStats,
            chapter: val,
            user: this.props.user
 
           }
        });
      })  
    
       console.log("fg");
       console.log(val);
    }
   render(){

      const {classes} = this.props;
   return (
      <AppBar position="static" className="bg-success">
         <Toolbar>
            <div>
               <ul className="ml-auto list-inline navbar-right mb-0">
              
               <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-github">
                        Grade
                </DropdownToggle>
                     <DropdownMenu>
                       {this.props.usageStats[1].map(s=>
                        <DropdownItem onClick={() => this.onApplyingGrade(s,this.props.school)}>{s.grade}</DropdownItem>
                       )}
                     </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-github">
                        Subject
                </DropdownToggle>
                     <DropdownMenu>
                     {this.props.usageStats[2].map(s=>
                        <DropdownItem onClick={() => this.onApplyingSubject(s,this.props.school)}>{s.subject}</DropdownItem>
                       )}
                     </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav className="list-inline-item vr-super">
                     <DropdownToggle nav caret className="text-github" >
                        Chapter
                </DropdownToggle>
                     <DropdownMenu>
                     {this.props.usageStats[3].map(s=>
                        <DropdownItem onClick={() => this.onApplyingChapter(s,this.props.school)}>{s.chapter}</DropdownItem>
                       )}
                     </DropdownMenu>
                  </UncontrolledDropdown>
                 <div className={classes.menuButton}>
                  <UncontrolledDropdown nav className="list-inline-item vr-super">
                  <DropdownToggle nav caret className="text-github" >
                          Month
                  </DropdownToggle>
                  <DropdownMenu>
  
                  <DropdownItem onClick={()=>this.lastMonth(this.props.school)}>Last Month</DropdownItem>
 
                 </DropdownMenu>
                 </UncontrolledDropdown>

                <UncontrolledDropdown nav className="list-inline-item vr-super">
                  <DropdownToggle nav caret className="text-github" >
                        Week
                  </DropdownToggle>
                  <DropdownMenu>
   
                 <DropdownItem onClick={()=>this.lastWeek(this.props.school)}>Last Week</DropdownItem>
      
                </DropdownMenu>
                </UncontrolledDropdown>
               <UncontrolledDropdown nav className="list-inline-item vr-super">
               <DropdownToggle nav >

               <FromDatePickers school={this.props.school} user={this.props.user}/>
               </DropdownToggle>
              </UncontrolledDropdown>
              </div>
               </ul>
               
            </div>
         </Toolbar>
      </AppBar>
   );
}
}

export default withRouter(withStyles(styles)(CustomBar));
