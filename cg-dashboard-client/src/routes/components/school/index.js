/**
 * Cards
 */
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

import { Typography } from '@material-ui/core';

import CustomBar from '../app-bar/components/schoolBar';

import SchoolList from '../../../container/SchoolList';

export default class Cards extends Component {
    state={
        title: "JPS",
        children: "CGScore= 456"
    }
    
    displaySchools(){
        var len = this.props.location.state.info.length;
        console.log(len);
        for(var i=0; i<=len; i++){
            console.log(len);
            <div className="col-sm-12 col-md-4 mb-30">
							
                                {this.props.location.state.info.map ((title,children) =>
                                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle>{this.props.location.state.info.school_name}</CardTitle>
								<CardText>{this.props.location.state.info.cgscore}</CardText>
								<Button color="light">Button</Button>
							</Card>
                                    )}
								
						</div>
        }
    }
	render() {
		console.log(this.props.location.state.user);

		var maxval = Math.max.apply(Math, this.props.location.state.info.map(function(o) { return o.cgscore; }))
		return (
			<div className="card-wrapper">
		   <CustomBar email={this.props.location.state.user} />
				<RctCollapsibleCard heading={<IntlMessages id="SCHOOLS" />}>
					<SchoolList school = {this.props.location.state.info} max={maxval} user={this.props.location.state.user}/>
				</RctCollapsibleCard>
			</div>
		);
	}
}
