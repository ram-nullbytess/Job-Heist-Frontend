import React, { Component } from "react";
import { Switch,Link,  Route } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import JobDetails from './JobDetails';
import Appliers from './Appliers';
import Accepted from './Accepted';
import Rejected from './Rejected';

import Moment from 'react-moment';
import 'moment-timezone';

const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});

class MyPostedJobs extends Component {
  constructor(props){
  super(props);
  this.state = {
    jobs : [],
    job:null, 
    status:'',
    root:'',
    applier:'',
    accepted:'',
    rejected:'',
    style:{'maxHeight': '100vh','overflowY': 'scroll'},
    jobId:null
  }
  }

  
  componentDidMount = async () => {
    
    try {
      const response = await axios.get(`/api/jobs?recruiter_Id=${this.props._id}`, 
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });

      if(response.data.length) {
        this.setState({jobs:response.data,status:'done'});      
      }else{
        this.setState({status:'done'});
      } 
    } catch(error) { 
      
    }     
  }

  handleClick =  (jobIndex) => {
   this.setState({job:this.state.jobs[jobIndex]},()=>{this.setState({jobId:this.state.job._id})})
   if(!this.state.root && !this.state.applier && !this.state.accepted && !this.state.rejected)
   this.setState({root:'active'})

  }

  render() {
    return (    
      <div className='container-fluid'>
      {(!this.state.jobs.length && this.state.status === 'done' ) ?
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4'>
            <div  className="card text-center mt-5 shadow-lg p-1  rounded-pill border border-danger " >
              <div className="card-body">
                <h4 className="card-title">SORRY</h4>
                <p className="card-text m-1">You did not Posted any job.</p>
                <Link to="/post-job" className="btn btn-secondary mt-2">Post a Job</Link>
              </div>
            </div>
            </div>
            <div className='col-4'></div>
          </div>
        :
        <div className='row ' >
          <div className='col-4  pt-4' style={this.state.style}>
            {this.state.jobs.map((job,index)=>{   
            return <div key={index} className="card text-center  shadow p-1 mb-5  rounded border border-dark" >
                <div className="card-body btn" onClick={()=>{this.handleClick(index)}}>
                  <h4 className="card-title m-0 p-0 text-capitalize d-inline-block text-truncate" style={{"maxWidth": "350px"}} >{job.jobtitle}</h4>
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
                  <span className='float-left ml-5 text-muted mt-2' >
                    <span className="glyphicon glyphicon-time"></span>
                    Posted-Date
                    <span className="ml-1"> <Moment format="YYYY/MM/DD">{job.date}</Moment> </span>
                  </span>
                
                  <span className='float-right mr-5 text-info font-weight-bold btn ' onClick={()=>{this.handleClick(index)}}> More </span>
              
                </div>
              </div>
            }
            )}
          </div>        
          <div className='col-8' style={{'maxHeight': '100vh','overflowY': 'scroll'}}>
            <div className='row p-1 ml-2 mr-1 bg-dark shadow-lg  sticky-top '>
             
              <div className='col-3 m-0 p-1'><Link to="/my-posted-jobs/"> <button type="button" className={this.state.root ? "btn btn-warning btn-lg btn-block" : "btn btn-info btn-lg btn-block" } onClick={()=>{this.setState({root:'active',applier:'',accepted:'',rejected:''})}}>Job Details</button> </Link></div>
              <div className='col-3 m-0 p-1'><Link to="/my-posted-jobs/appliers"> <button type="button" className={this.state.applier ? "btn btn-warning btn-lg btn-block" : "btn btn-info btn-lg btn-block" } onClick={()=>{this.setState({root:'',applier:'active',accepted:'',rejected:''})}}>Appliers</button> </Link></div>
              <div className='col-3 m-0 p-1'><Link to="/my-posted-jobs/accepted"> <button type="button" className={this.state.accepted ? "btn btn-warning btn-lg btn-block" : "btn btn-info btn-lg btn-block" } onClick={()=>{this.setState({root:'',applier:'',accepted:'active',rejected:''})}}>Accepted Resumes</button> </Link></div>
              <div className='col-3 m-0 p-1'><Link to="/my-posted-jobs/rejected"> <button type="button" className={this.state.rejected ? "btn btn-warning btn-lg btn-block" : "btn btn-info btn-lg btn-block" } onClick={()=>{this.setState({root:'',applier:'',accepted:'',rejected:'active'})}}>Rejected Resumes</button> </Link></div>
            
            </div>
            <Switch>
              <Route exact path='/my-posted-jobs/'><JobDetails job={this.state.job}/></Route>
              <Route path='/my-posted-jobs/appliers'><Appliers jobId={this.state.jobId}/></Route>
              <Route path='/my-posted-jobs/accepted'><Accepted jobId={this.state.jobId}/></Route>
              <Route path='/my-posted-jobs/rejected'><Rejected jobId={this.state.jobId}/></Route>
            </Switch>
            
          </div>
      </div>
  }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {_id:state._id , auth_token : state.auth_token };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
       
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MyPostedJobs);