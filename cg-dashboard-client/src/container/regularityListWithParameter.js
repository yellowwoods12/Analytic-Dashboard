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

import Typography from '@material-ui/core/Typography';


import {withRouter} from 'react-router-dom';

 class RegularityListWithParameter extends Component{


	render(){
    console.log(this.max);
	const {sync, max, history} = this.props;
    return(
         <div>
			 <div className="row">
		{this.props.regularity.map((s,index) =>
		
		
			<div className="col-md-3 col-md-2 mb-20">
			  
              <Card body inverse style={{ backgroundColor: '#f00' , borderColor: '#333' }}>
			  <Typography variant="h6" component="h5" align= "center">{s.grade} </Typography>
			  <Typography variant="h6" component="h5" align= "center">{s.avglogin.toFixed(2)}</Typography>
			  <CardText  className="text-center"> Avg Logins Per Student</CardText>

			                <Button color="light" >{s.activepercent.toFixed(2)}% Active Students</Button>
			  <Typography variant="h6" component="h5" align= "center">{s.missedclasses} Missed Classes</Typography>

              </Card>
		  

	    </div>
         )}
		 </div>
		 </div>
		
	);
}
}

export default withRouter(RegularityListWithParameter);