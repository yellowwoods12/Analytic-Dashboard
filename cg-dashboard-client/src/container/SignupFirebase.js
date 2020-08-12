/**
 * Sign Up With Firebase
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { Fab } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormDialog from './formDialog';
// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
   signupUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
} from 'Actions';

class SignupFirebase extends Component {


    handleClickOpen = () => {
     this.setState({open: true})
    }
   handleClose = () => {
      this.setState({open: false})

   };

   handleAlertOpen = () => {
      this.setState({alertopen: true})

   };

   handleAlertClose = () => {
      this.setState({alertopen: false})

   };

   handlePassword =() => {
       if(this.state.adminpass === 'cgtestadmin'){
         fetch('https://impact-api.convegenius.com/api/feed' , {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
          })
          this.setState({open: false})
         
       }
       else{
         this.setState({open: false})
         this.setState({alertopen: true})
       }
   };

   state = {
      name: '',
      password: '',
      school_code: '',
      school_name: '',
      open : false,
      adminpass : '',
      alertopen : false
   }

	/**
	 * On User Signup
	 */
   onUserSignUp() {
      if (this.state.name !== '' && this.state.password !== '') {
            fetch('https://impact-api.convegenius.com/api/register' , {
     method: "POST",
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify(this.state)
   })
   .then((result) => result.json())
   .then((info) => { console.log(info);
                     if( info == "user registered sucessfully"){
                   this.props.history.push('/app/ui-componemts/cards');
                   }})
      }
   }

   render() {
      const { name, password,school_code,school_name } = this.state;
      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" width="50" height="50" />
                              </Link>
                           </div>
                           <div>
                              <Link to="/signin" className="mr-15 text-white">Login using credentials?</Link>
                              <Button
                                 component={Link}
                                 to="/signin"
                                 variant="contained"
                                 className="btn-light"
                              >
                                 Sign In
										</Button>
                           </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-7 col-md-7 col-lg-8">
                           <div className="session-body text-center">
                              <div className="session-head mb-15">
                              <h2 className="font-weight-bold">ConveGenius</h2>
                                 <p className="mb-0">CG Dashboard</p>                             
                                  </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="text"
                                       value={name}
                                       name="user-name"
                                       id="user-name"
                                       className="has-input input-lg"
                                       placeholder="Enter Your Name"
                                       onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                    <span className="has-icon"><i className="ti-user"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={password}
                                       type="Password"
                                       name="user-pwd"
                                       id="pwd"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       onChange={(e) => this.setState({ password: e.target.value })}
                                    />
                                    <span className="has-icon"><i className="ti-lock"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={school_code}
                                       type="test"
                                       name="user-schoolcode"
                                       id="pwd"
                                       className="has-input input-lg"
                                       placeholder="School Code"
                                       onChange={(e) => this.setState({ school_code: e.target.value })}
                                    />
                                  <span className="has-icon"><i className="ti-lock"></i></span>
                                    </FormGroup>
                                     <FormGroup className="has-wrapper">
                                    <Input
                                       value={school_name}
                                       type="test"
                                       name="user-schoolname"
                                       id="pwd"
                                       className="has-input input-lg"
                                       placeholder="School Name"
                                       onChange={(e) => this.setState({ school_name: e.target.value })}
                                    />
                                    <span className="has-icon"><i className="ti-user"></i></span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                   
                              
                                    <Button  className="btn-info text-white btn-block w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={() => this.handleClickOpen()}>
                                       Feed Fellow Details
     
                                     </Button>
                                     <Dialog open={this.state.open} onClose={()=> this.handleClose()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Admin Only</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter admin password to feed fellow details into the DB.
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => this.setState({ adminpass: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>this.handlePassword()} color="primary">
            Submit Details
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={this.state.alertopen}
        onClose={()=> this.state.handleAlertClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Wrong Password !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={() => this.handleAlertClose()} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
                                 </FormGroup>
                              </Form>
                              
                              <p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
                              <p><Link to="/terms-condition" className="text-muted">Terms of Service</Link></p>
                           </div>
                        </div>
                       
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { loading } = authUser;
   return { loading };
};

export default connect(mapStateToProps, {
   signupUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
})(SignupFirebase);
