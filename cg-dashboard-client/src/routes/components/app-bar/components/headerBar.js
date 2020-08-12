/**
 * Custom Bar With Button
 */
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';



const styles = {
    root: {
       width: '100%',
    },
    flex: {
       flex: 1,
    },
    menuButton: {
       marginLeft: -12,
       marginRight: 20   
    },
 };
 class Bar extends Component {
     
    render(){
    const { classes } = this.props;
    console.log(this.props.email);
    return (
       
       <AppBar position="static" className="bg-primary">
          <Toolbar>
 
                    <div className="text-white" style={{fontSize: 20}}>

                        Hi, {this.props.email} !

             </div>
          </Toolbar>
       </AppBar>
    );
 }
}

export default withRouter(withStyles(styles)(Bar));
 