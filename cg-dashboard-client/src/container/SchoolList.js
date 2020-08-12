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

import Grid from '@material-ui/core/Grid';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import {withRouter} from 'react-router-dom';

 class SchoolList extends Component{

	Options(index){
		console.log(this.props.school);
		this.props.history.push({
			pathname: '/app/ui-components/card',
			state: {
				school : this.props.school[index].school_name,
				user : this.props.user
			 }
		 }); 
	}

	render(){
		console.log(this.props.school);
	const {school, max, history} = this.props;
    return(
         <div>
			 <div className="row">
		{this.props.school.map((s,index) =>
		
		
			<div className="col-md-3 col-md-2 mb-20">
  
              
              <Card body inverse style={{ align: 'center',backgroundColor: s.cgscore >= 50 ?(s.cgscore< 90 ? '#0f0': '#00f'): '#f00' , borderColor: '#333' }}>
             <CardTitle style={{alignItems: "center", 'margin-left': '10%', width: "90%"}}>School Name : {s.school_name}</CardTitle>
			  
          <CardText style={{alignItems: "center", 'margin-left': '3	0%', width: "90%"}}>Score : {Math.floor(s.cgscore)}</CardText>
              <Button color="light" onClick ={() => this.Options(index)} >Statistics</Button>
              </Card>
			  

	    </div>
         )}
		 </div>
		 </div>
		
	);
}
}

export default withRouter(SchoolList);