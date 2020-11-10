import React, { Component } from "react";
import {Link , Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { jobIndex , applyJob} from "./redux/actions";

import Moment from 'react-moment';
import 'moment-timezone';

class Jobs extends Component {
constructor(props){
super(props);
this.state = {
  redirect : false
}
}

  handleClick =  (jobIndex) => {
    console.log(jobIndex);
   this.props.jobIndex(jobIndex);
   this.setState({redirect:true});
  }

  handleApplyClick = (jobId , index) => {
   this.props.applyJob(jobId,this.props._id,this.props.auth_token , index);
  }

  render() {
    return (
      <div className='container'>
        {this.state.redirect ?  <Redirect push  to="/job-details" /> : null }
        <div className='row'>
        <div className='col-3'></div>
        <div className='col-6 mb-5'>
          {!this.props.jobs.length ?
          <div  className="card text-center mt-5 shadow-lg p-1  rounded-pill border border-danger " >
            <div className="card-body">
              <h4 className="card-title">We could not find jobs matching your search criteria.</h4>
              <p className="card-text m-1">Did you enter wrong spelling of any word?</p>
              <Link to="/" className="btn btn-secondary mt-2">Try Again</Link>
            </div>
            
          </div>
          : 
          this.props.jobs.map((job,index)=>{   
          return <div key={index} className="card text-center mt-5 shadow p-1  rounded border border-dark" >
              <div className="card-body btn" onClick={()=>{this.handleClick(index)}}>
                <h4 className="card-title m-0 p-0 text-capitalize" >{job.jobtitle}</h4>
                <p className="card-text  m-1 text-uppercase">{job.company_name}</p>
                <p className="card-text m-1 text-monospace text-lowercase">
                  <span className="mr-4">
                    <span className="glyphicon glyphicon-briefcase"></span>
                    <span className="ml-2">{job.min_experience}-{job.max_experience} Yrs</span>
                  </span>
                  <span className="ml-4 mr-4">
                  <i className="fa fa-inr"></i>
                    <span className="ml-2">{job.max_salary}-{job.min_salary}</span>
                  </span>
                  <span className="ml-4 ">
                    <i className='fas fa-map-marker-alt'></i>
                    <span className="ml-2">{job.location}</span>
                  </span>
                </p>
                <p className="card-text m-1 text-monospace text-lowercase">
                  <span className="ml-4 mr-4">
                     <span className="glyphicon glyphicon-time"></span>
                    <span className="ml-2">{job.job_type}</span>
                  </span>
                  <span className="ml-4 mr-4">
                    <span className="font-weight-bold">Vacancy:</span>
                    <span className="ml-2">{job.maximum_hires}</span>
                  </span>
                </p>
              </div>
              <div className="card-footer  p-1">
                <span className='float-left ml-5 text-muted' >
                   <span className="glyphicon glyphicon-time"></span>
                   <span className="ml-1"> <Moment fromNow>{job.date}</Moment> </span>
                </span>
                { job.status ? job.status === 'APPLIED SUCCESSFULLY' ?
                <span className='float-right mr-5 text-success font-weight-bold'> APPLIED SUCCESSFULLY </span>
                : 
                <span className='float-right mr-5 text-warning font-weight-bold '> ALREADY-APPLIED </span> : 
                <span className='float-right mr-5 text-info font-weight-bold btn ' onClick={()=>{this.handleApplyClick(job._id , index)}}> APPLY NOW </span>
                }
              </div>
            </div>
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
  return {jobs:state.jobs,_id:state._id , auth_token : state.auth_token };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      jobIndex,
      applyJob
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Jobs);