import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	CardLink,
	CardGroup,
	CardImgOverlay
} from 'reactstrap';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';



import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class SchoolList extends Component{

	Options(){
		const {history} = this.props;
		console.log(this.props.school);
		history.push({
			pathname: '/app/ui-components/card',
			state: {
				school : this.props.school
			 }
		 }); 
	}

	render(){

	const {school, max, history} = this.props;
    return(
         <div>
			 <div className="row">
		{this.props.school.map(s=>
		
		
			<div className="col-md-3 col-md-2 mb-20">
			  
              <Card body inverse style={{ backgroundColor: s.cgscore >= this.props.max/2 ? '#00f': '#f00' , borderColor: '#333' }}>
              <CardTitle>{s.school_name}</CardTitle>
              <CardText>{s.cgscore}</CardText>
              <Button color="light" onClick ={() => this.Options()} >Statistics</Button>
              </Card>
		  
	    </div>
         )}
		 </div>
		 </div>
		
	);
}
}

export default withRouter(SchoolList);
