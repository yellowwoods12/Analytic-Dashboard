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

import { Typography } from '@material-ui/core';


class DataTable extends React.Component {

 
	render() {
		const columns = ["Option","Response Percentage"];
		const data = [];
		for(var i=0;i<this.props.data.length-2;i++){
			data.push(this.props.data[i]);
		}
	
		const options = {
			filterType: 'dropdown',
           responsive: 'stacked',

		};
		return (
			<div className="data-table-wrapper">
		     <Typography variant="h5" component="h5" style={{marginBottom: 20}} >Correct Answer : {this.props.data[this.props.data.length-2]}</Typography>
              <Typography variant="h5" component="h5" style={{marginBottom: 30}} >Maximum wrong responses : {this.props.data[this.props.data.length-1]}</Typography>
				<RctCollapsibleCard  fullBlock>
					
					<MUIDataTable
						title={"Answer Percentage"}
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
