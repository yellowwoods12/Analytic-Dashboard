// Date Picker
import React, { Fragment, Component } from 'react';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import {withRouter} from 'react-router-dom';

 class FromDatePickers extends Component {

	state = {
		selectedDate: moment(),
	};

	handleDateChangeFrom = (date) => {
		console.log(date._d);
		this.setState({ selectedDateFrom: date });
	};

    handleDateChangeTo = (date) => {
		console.log(date._d);
        this.setState({ selectedDateTo: date });
        var fromdate = this.state.selectedDateFrom;
       console.log(fromdate);
         var dd = String(fromdate._d.getDate()).padStart(2, '0');
         var mm = String(fromdate._d.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = fromdate._d.getFullYear();
         
         fromdate = yyyy + '-' + mm + '-' +dd ;
         console.log(fromdate);

         var todate = date;
         console.log(todate);

         var dd = String(todate._d.getDate()).padStart(2, '0');
         var mm = String(todate._d.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = todate._d.getFullYear();
         todate = yyyy + '-' + mm + '-' +dd ;
   
        
         console.log(todate);
         fetch('https://impact-api.convegenius.com/api/utilisationWithWeekFilter' , {
            mode :"cors",
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({from: fromdate, to: todate, school: this.props.school})
           })
           .then((result) => result.json())
           .then((utilise) => { 
              console.log("res");
             //console.log(regularity);
           //  if(info.success == "login sucessfull"){
              this.props.history.push({
                 pathname: '/app/ui-components/utilisation',
                 state: {
                   school : this.props.location.state.school,
                   utilise: utilise,
                  user: this.props.user
                  }
               });
             }) 
    };
    
	render() {
		const { selectedDateFrom, selectedDateTo } = this.state;
		return (
			<Fragment>
				<div className="rct-picker list-inline-item vr-super">
					<DatePicker
						label="From"
						value={selectedDateFrom}
						onChange={this.handleDateChangeFrom}
						animateYearScrolling={true}
						leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
						rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
						fullWidth
					/>
				</div>
            <div className="rct-picker list-inline-item vr-super">
                <DatePicker
                    label="To"
                    value={selectedDateTo}
                    onChange={this.handleDateChangeTo}
                    animateYearScrolling={true}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    fullWidth
                />
            </div>
        </Fragment>
		)

	}
}

export default withRouter(FromDatePickers);