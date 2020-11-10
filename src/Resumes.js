import React, { Component } from "react";
import {Link , Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { resumeIndex , saveResume } from "./redux/actions";

import Moment from 'react-moment';
import 'moment-timezone';

class Resumes extends Component {
  constructor(props){
  super(props);
  this.state = {
    redirect : false
  }
  }

  handleClick =  (resumeIndex) => {
    this.props.resumeIndex(resumeIndex);
    this.setState({redirect:true});
  }

  handleAddClick = (ResumeId , index) => {
    this.props.saveResume(ResumeId,this.props._id,this.props.auth_token , index);
   }

  render() {
    return (
      <div className='container'>
        {this.state.redirect ?  <Redirect push  to="/resume-details" /> : null}
        <div className='row'>
        <div className='col-3'></div>
        <div className='col-6 mb-5'>
          {!this.props.resumes.length ?
          <div  className="card text-center mt-5 shadow-lg p-1  rounded-pill border border-danger " >
            <div className="card-body">
              <h4 className="card-title">We could not find Resumes matching your search criteria.</h4>
              <p className="card-text m-1">Did you enter wrong spelling of any word?</p>
              <Link to="/" className="btn btn-secondary mt-2">Search Again</Link>
            </div>
          </div>
          : 
          this.props.resumes.map((resume,index)=> {
            if( resume.privacy === 'public' )    
    return  <div key={index} className="card text-center mt-5 shadow p-1  rounded border border-dark" >
              <div className="card-body btn" onClick={()=>{this.handleClick(index)}}>
                <h4 className="card-title m-0 p-0 text-capitalize" > {resume.first_name} {resume.last_name} </h4>
                <p className="card-text  m-1 text-monospace">
                  {resume.resume_headline}
                </p>
                <p className="card-text m-1 text-monospace ">
                  <span className="mr-4">
                    <span className="glyphicon glyphicon-briefcase"></span>
                    <span className="font-weight-bold"> Experience :</span>
                    <span className="ml-2">{resume.experience} Years</span>                
                  </span>
                  <span className="ml-4">
                    <i className="fa fa-inr"></i>
                    <span className="font-weight-bold"> Current Salary :</span>
                    <span className="ml-2">{resume.show_salary ? resume.current_salary:'*******'}</span>
                  </span>
                </p>
                <p>
                  <span className="">
                    <i className='fas fa-map-marker-alt'></i>
                    <span className="font-weight-bold"> Location :</span>
                    <span className="ml-2">{resume.location}</span>
                  </span>
                </p>
                <p className="card-text m-1 text-monospace ">
                  <span className="ml-4 mr-4">
                    <span className="glyphicon glyphicon-education"></span>
                    <span className="font-weight-bold"> Education :</span>
                    <span className="ml-2">{resume.course}</span>
                  </span>
                </p>
                <p className="card-text m-1 text-monospace ">
                  <span className="ml-4 mr-4">
                    <i className="fa fa-mobile-phone" style={{"fontSize":"18px"}}></i>
                    <span className="font-weight-bold"> Email :</span>
                    <span className="ml-2">{resume.email}</span>
                  </span>
                </p>
                
              </div>
              <div className="card-footer p-1">
                <span className='float-left ml-5 text-muted pt-2' >
                   <span className="glyphicon glyphicon-time"></span>
                   <span className="font-weight-bold"> Resume created :</span>
                   <span className="ml-1"> <Moment fromNow>{resume.date}</Moment> </span>
                </span>
                { resume.status ? resume.status === 'ADDED SUCCESSFULLY' ?
                <span className='float-right mr-5 text-success font-weight-bold'> SAVED SUCCESSFULLY </span>
                : 
                <span className='float-right mr-5 text-warning font-weight-bold '> ALREADY SAVED </span>
                : 
                <span className='float-right mr-5 text-info font-weight-bold btn ' onClick={()=>{this.handleAddClick(resume._id , index)}} > SAVE </span>
                }
              </div>
            </div>
            else 
            return null;
          }
          )}
        </div>        
        <div className='col-3'></div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {resumes:state.resumes,_id:state._id , auth_token : state.auth_token };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resumeIndex,
      saveResume
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Resumes);