import React, { Component } from "react";
import {Link , Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { appliedJob  } from "./redux/actions";
import Moment from 'react-moment';
import 'moment-timezone';
const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});

class MyAppliedJobs extends Component {
  constructor(props){
  super(props);
  this.state = {
    appliedJobs : [],
    status:'',
    redirect:false
  }
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get(`/api/applied-jobs/${this.props._id}`, 
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });
      if(response.data.length){
        response.data.map( async (job)=> {
          // 
            const response = await axios.get(`/api/jobs?jobId=${job.job_id}`,
            {
                headers: {
                    'auth_token': this.props.auth_token,
                }
            });
            let obj = response.data;
                obj.status = job.status;
                obj.applied_date = job.date;
                this.setState({appliedJobs:[...this.state.appliedJobs,obj]});
          // 
        })
      }
      this.setState({status:'done'});
    } catch (error) {
      
    }

  }

  handleClick =  (jobIndex) => {
   this.props.appliedJob(this.state.appliedJobs[jobIndex]);
   this.setState({redirect:true});
  }

  render() {
    return (
      <div className='container'>
        {this.state.redirect ?  <Redirect push  to="/my-applied-job" /> : null }
        <div className='row'>
        <div className='col-3'></div>
        <div className='col-6 mb-5'>
          { this.state.status === 'done' && this.state.appliedJobs.length === 0  ?
          <div  className="card text-center mt-5 shadow-lg p-1  rounded-pill border border-danger" >
            <div className="card-body">
              <h4 className="card-title">SORRY</h4>
              <p className="card-text m-1">You did not applied any job.</p>
              <Link to="/" className="btn btn-secondary mt-2">Let's find a job</Link>
            </div>
          </div>
          : 
          this.state.appliedJobs.map((job,index)=>{   
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
                   <span className="font-weight-bold">Applied Date :</span>
                   <span className="ml-1"><Moment format="YYYY/MM/DD">{job.applied_date}</Moment></span>
                   <span className="">( <Moment fromNow>{job.applied_date}</Moment> )</span>
                </span>
                <span className='float-right mr-5 text-muted'>
                <span className="font-weight-bold">Status : </span>
                {job.status === 'pending' ?
                <span className='text-warning font-weight-bold badge bg-white border border-warning'> Pending </span>
                : 
                job.status === 'accepted' ?
                <span className='text-success font-weight-bold badge bg-white border border-success'> Accepted </span>
                :
                <span className='text-danger font-weight-bold badge bg-white border border-danger'> Rejected </span>
                }
                </span>
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
      appliedJob 
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAppliedJobs);