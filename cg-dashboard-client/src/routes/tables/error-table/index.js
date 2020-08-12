/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import {withRouter} from 'react-router-dom';


class DataTable extends React.Component {

  table(){
    console.log("hi");
  }

  questionClick(rowData){

	fetch('https://impact-api.convegenius.com/api/questionDetails' , {
			mode :"cors",
			method: "POST",
			headers: {
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({school : this.props.location.state.school, question_id: rowData[0]})
		  })
		  .then((result) => result.json())
		  .then((details) => { 
			 console.log(details);
		   //  if(info.success == "login sucessfull"){
			this.props.history.push({
				pathname: '/app/ui-components/questionDetails',
				state: {
				 school : this.props.school,
				 details : details,
				 question : rowData[1],
				 user: this.props.user 
		   
				}
			   });
		  
		  //}
			})  
    
    console.log(rowData);
  }
	render() {
		const columns = ["Question_Id","Question"];
		const data = this.props.data;
		/*[
			["Simplify the following equations which have one variable."],
			["A factory can manufacture 525 cars in a day. How many cars can be manufactured in 123 days?"],
			["If the circumference of the circle is 22 cm, what is the radius of the circle?"],
			["Count the total no. of circles in the picture shown below and click the correct answer."],
			["Find the number of squares in the figure."]
		
		];*/
		const options = {
			filterType: 'dropdown',
      responsive: 'stacked',
      onRowClick: rowData => this.questionClick(rowData)
		};
		return (
			<div className="data-table-wrapper">
		
				<RctCollapsibleCard  fullBlock>
					<MUIDataTable
						title={"Common Errors"}
						data={data}
						columns={columns}
            options={options}
           
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default withRouter(DataTable);
