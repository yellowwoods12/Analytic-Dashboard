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

import {withRouter} from 'react-router-dom';

 class UtiliseList extends Component{


	render(){
    console.log(this.max);
	const {utilise, max,min, history} = this.props;
    return(
         <div>
			 <div className="row">
		{this.props.utilise.map((s,index) =>
		
		
			<div className="col-md-3 col-md-2 mb-20">
			  
              <Card body inverse style={{ backgroundColor: s.usage == this.props.max ? '#00f':(s.usage == this.props.min? '#f00': '#7e00e6') , borderColor: '#333' }}>
              <CardTitle>DEVICE ID: {s.code}</CardTitle>
              <Button color="light" >Usage : {s.usage} hours, {s.logins} logins</Button>
              </Card>
		  

	    </div>
         )}
		 </div>
		 </div>
		
	);
}
}

export default withRouter(UtiliseList);