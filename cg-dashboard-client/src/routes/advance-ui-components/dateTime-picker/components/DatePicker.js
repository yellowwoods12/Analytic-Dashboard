// Date Picker
import React, { Fragment, PureComponent } from 'react';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';

export default class DatePickers extends PureComponent {

	state = {
		selectedDate: moment(),
	};

	handleDateChange = (date) => {
		console.log(date._d);
		this.setState({ selectedDate: date });
	};

	render() {
		const { selectedDate } = this.state;
		return (
			<Fragment>
				<div className="rct-picker">
					<DatePicker
						label="From"
						value={selectedDate}
						onChange={this.handleDateChange}
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
