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

import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import Icon from  '@material-ui/core/Icon';

import {withRouter} from 'react-router-dom';

 class SyncList extends Component{


	render(){
    console.log(this.props.min);
	const {sync, max, history} = this.props;
    return(
         <div>
			 <div className="row">
		{this.props.sync.map((s,index) =>
		
		
			<div className="col-md-3 col-md-2 mb-20">
			  
              <Card body inverse style={{ backgroundColor: s.last_sync == this.props.max ? '#00f':(s.last_sync == this.props.min ?'#f00':'#05b336') , borderColor: '#333' }}>
              <CardTitle>DEVICE ID: {s.device_id}</CardTitle>
              <Button color="light" >Last Sync:{s.last_sync}</Button>
              </Card>
		  

	    </div>
         )}
		 </div>
		 </div>
		
	);
}
}

export default withRouter(SyncList);