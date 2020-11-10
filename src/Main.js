import React, { Component } from "react";
import { Switch, Route , Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {getUserByToken} from './redux/actions';
import "./Main.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import UserType from "./UserType";
import JobSeeker from "./JobSeeker";
import Recruiter from "./Recruiter";
import PostJob from './PostJob';
import ResumeForm from './ResumeForm';
import Jobs from "./Jobs";
import Job from "./Job"
import MyAppliedJobs from './MyAppliedJobs';
import MyAppliedJob from './MyAppliedJob';
import Resumes from './Resumes';
import Resume from './Resume';
import MySavedResumes from './MySavedResumes';
import MySavedResume from './MySavedResume';
import MyPostedJobs from  './MyPostedJobs';

class Main extends Component {
  constructor(props){
  super(props);
  this.state = {
    userStatus:''
  }
}

  isLoggedIn = async () => {
    if(!this.props.isLoggedIn && localStorage.getItem('jwtToken')){
    var actionRespose = await this.props.getUserByToken()
    if(actionRespose.type === 'SUCCESS-SIGNIN')
    this.setState({userStatus:'SIGNIN-WITH-TOKEN'}) 
    }else{
      this.setState({userStatus:'TOKEN-NOT-FOUND'})
    } 
  }

  componentDidMount = () => {
    this.isLoggedIn();
  }  

  render() {
    if(!this.state.userStatus)
    return null;
    return (
      <main>
        <Switch>
          <Route exact path="/" >
            { this.props.isLoggedIn ? this.props.role === "null" ? <UserType/> : this.props.role === "jobSeeker" ? <JobSeeker /> : <Recruiter/>  : <Redirect to="/sign-in" push={true}/>}
          </Route>
          <Route  path="/sign-up" component={SignUp} />
          <Route  path="/sign-in">
            {this.props.isLoggedIn ? <Redirect to='/' push={true}/>: <SignIn/> }
          </Route>
          <Route  path="/create-resume">
            {this.props.isLoggedIn && this.props.role === "jobSeeker" ? <ResumeForm/> : <Redirect to='/sign-in' /> }
          </Route>
          <Route  path="/post-job">
            {this.props.isLoggedIn && this.props.role === "recruiter" ? <PostJob/> : <Redirect to='/sign-in' /> }
          </Route>
          <Route  path="/find-jobs">
            {this.props.isLoggedIn && this.props.role === "jobSeeker" ? <Jobs/> : <Redirect to='/sign-in' /> }
          </Route>
          <Route  path="/job-details">
            {this.props.isLoggedIn && this.props.role === "jobSeeker" && this.props.job ? <Job/> : <Redirect to='/' push={true} /> }
          </Route>
          <Route  path="/my-applied-jobs">
            {this.props.isLoggedIn && this.props.role === "jobSeeker" ? <MyAppliedJobs/> : <Redirect to='/sign-in' /> }
          </Route>
          <Route  path="/my-applied-job">
            {this.props.isLoggedIn && this.props.role === "jobSeeker" ? <MyAppliedJob/> : <Redirect to='/sign-in' /> }
          </Route>
          <Route  path="/find-resumes">
            {this.props.isLoggedIn && this.props.role === "recruiter" ? <Resumes/> : <Redirect to='/sign-in' /> }
          </Route>
          <Route  path="/resume-details">
            {this.props.isLoggedIn && this.props.role === "recruiter" && this.props.resume ? <Resume/> : <Redirect to='/' push={true} /> }
          </Route>
          <Route  path="/my-saved-resumes">
            {this.props.isLoggedIn && this.props.role === "recruiter"  ? <MySavedResumes/> : <Redirect to='/' push={true} /> }
          </Route>
          <Route  path="/my-saved-resume">
            {this.props.isLoggedIn && this.props.role === "recruiter"  ? <MySavedResume/> : <Redirect to='/' push={true} /> }
          </Route>
          <Route  path="/my-posted-jobs">
            {this.props.isLoggedIn && this.props.role === "recruiter"  ? <MyPostedJobs/> : <Redirect to='/' push={true} /> }
          </Route>
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {isLoggedIn:state.isLoggedIn , role : state.role, job:state.job,resume:state.resume};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ getUserByToken } , dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Main);