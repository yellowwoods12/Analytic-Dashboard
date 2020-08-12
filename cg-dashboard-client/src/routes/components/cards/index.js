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

export default class Cards extends Component {
	render() {
		return (
			<div className="card-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.cards" />} match={this.props.match} />
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.backgroundVarient" />}
				>
					<div className="row">
						<div className="col-sm-12 col-md-4 mb-30">
							<Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light">Button</Button>
							</Card>
						</div>
						<div className="col-sm-12 col-md-4 mb-30">
							<Card body inverse color="primary">
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light">Button</Button>
							</Card>
						</div>
						<div className="col-sm-12 col-md-4 mb-30">
							<Card body inverse color="success">
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light">Button</Button>
							</Card>
						</div>
						<div className="col-sm-12 col-md-4 mb-30">
							<Card body inverse color="info">
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light">Button</Button>
							</Card>
						</div>
						<div className="col-sm-12 col-md-4 mb-30">
							<Card body inverse color="warning">
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light">Button</Button>
							</Card>
						</div>
						<div className="col-sm-12 col-md-4 mb-30">
							<Card body inverse color="danger">
								<CardTitle>Special Title Treatment</CardTitle>
								<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
								<Button color="light">Button</Button>
							</Card>
						</div>
					</div>
				</RctCollapsibleCard>
				
			</div>
		);
	}
}
