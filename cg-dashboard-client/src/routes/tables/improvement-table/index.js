/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import { sizing } from '@material-ui/system';


// intl messages
import IntlMessages from 'Util/IntlMessages';

class DataTable extends React.Component {
	render() {
		const columns = [ "Subject","Average_Improvement", "Average_Task_Score"];
        const data = [];
        for(var i=0;i<this.props.data.length;i++){
        data.push(this.props.data[i]);
        }
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
        };
        console.log("b");
        console.log(data);
		return (

			<div className="data-table-wrapper">
				<RctCollapsibleCard fullBlock>
					
					<MUIDataTable
						title={"Improvement Details"}
						data={data}
						columns={columns}
						options={options}
						height="50%"
					/>
					
				</RctCollapsibleCard>
			
			</div>
		);
	}
}

export default DataTable;
