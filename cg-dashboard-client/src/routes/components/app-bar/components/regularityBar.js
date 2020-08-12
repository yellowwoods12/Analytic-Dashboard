/**
 * Custom Bar With Button
 */
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MatButton from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';
import FromDatePickers from '../../../advance-ui-components/dateTime-picker/components/RegularityDatePicker';
import ToDatePickers from '../../../advance-ui-components/dateTime-picker/components/ToDate';
import moment from 'moment';


//import DatePicker from '../../../calendar/DateRange';

const  styles = {
   root: {
      width: '100%',
   },
   flex: {
      flex: 1,
   },
   menuButton: {
      backgroundColor: '#f00',
     
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
      fetch('https://impact-api.convegenius.com/api/regularityWithMonthFilter' , {
         mode :"cors",
         method: "POST",
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({from: fromdate, to: todate, school: this.props.school})
        })
        .then((result) => result.json())
        .then((regularity) => { 
           console.log("res");
          console.log(regularity);
        //  if(info.success == "login sucessfull"){
           this.props.history.push({
              pathname: '/app/ui-components/regularity',
              state: {
                school : this.props.location.state.school,
                regularity : regularity,
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
      fetch('https://impact-api.convegenius.com/api/regularityWithWeekFilter' , {
         mode :"cors",
         method: "POST",
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({from: monday, to: sunday, school: this.props.school})
        })
        .then((result) => result.json())
        .then((regularity) => { 
           console.log("res");
          console.log(regularity);
        //  if(info.success == "login sucessfull"){
           this.props.history.push({
              pathname: '/app/ui-components/regularity',
              state: {
                school : this.props.location.state.school,
                regularity : regularity,
                user: this.props.user
               }
            });
          })  
        
    }
    onRegularityClick(){
       console.log(this.props.user);
   
           console.log("res");
        //  console.log(grade);
        //  if(info.success == "login sucessfull"){
           this.props.history.push({
            pathname: '/app/ui-components/regularityWithParameterInput',
            state: {
              school : this.props.location.state.school,
              regularity: this.props.regularity,
              user : this.props.user
             }
            });
            
    }
   render(){
     
      const {classes} = this.props;
   return (
      <AppBar position="static" className="bg-warning">
         <Toolbar>
            <div>
               <ul className="ml-auto list-inline navbar-right mb-0">

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

                        <FromDatePickers school={this.props.school}/>
                        </DropdownToggle>
                  </UncontrolledDropdown>
                  <Button className={classes.menuButton} onClick={() => this.onRegularityClick()}>Enter Regularity Parameters</Button>

               </ul>

            </div>
         </Toolbar>

      </AppBar>
   ); 
}
}

export default withRouter(withStyles(styles)(CustomBar));