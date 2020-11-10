import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {applyJob} from "./redux/actions";

import Moment from "react-moment";
import "moment-timezone";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleClick = () => {};

  handleApplyClick = (jobId , index) => {
    this.props.applyJob(jobId,this.props._id,this.props.auth_token , index);
  }

  render() {
    return (
      <div className="container pl-5 pr-5 pb-5 pt-5 ">
        <div className="">
          <div className="card text-center mt-5 shadow p-1  rounded border border-dark bg-light ">
            <div
              className="card-body"
            >
              <h4 className="card-title m-0 p-0 text-capitalize">
                {this.props.job.jobtitle}
              </h4>
              <p className="card-text  m-1 text-uppercase">
                {this.props.job.company_name}
              </p>
              <p className="card-text m-1 text-monospace text-lowercase">
                <span className="mr-4">
                  <span className="glyphicon glyphicon-briefcase"></span>
                  <span className="ml-2">
                    {this.props.job.min_experience}-{this.props.job.max_experience} Yrs
                  </span>
                </span>
                <span className="ml-4 mr-4">
                  <i className="fa fa-inr"></i>
                  <span className="ml-2">
                    {this.props.job.max_salary}-{this.props.job.min_salary}
                  </span>
                </span>
                <span className="ml-4 ">
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="ml-2">{this.props.job.location}</span>
                </span>
              </p>
              <p className="card-text m-1 text-monospace text-lowercase">
                <span className="ml-4 mr-4">
                  <span className="glyphicon glyphicon-time"></span>
                  <span className="ml-2">{this.props.job.job_type}</span>
                </span>
                <span className="ml-4 mr-4">
                  <span className="font-weight-bold">Vacancy:</span>
                  <span className="ml-2">{this.props.job.maximum_hires}</span>
                </span>
              </p>
            </div>
            <div className="card-footer  p-1">
              <span className="float-left ml-5 text-muted">
                <span className="glyphicon glyphicon-time"></span>
                <span className="ml-1">
                  <Moment fromNow>{this.props.job.date}</Moment>
                </span>
              </span>
              { this.props.job.status ? this.props.job.status === 'APPLIED SUCCESSFULLY' ?
                <span className='float-right mr-5 text-success font-weight-bold'> APPLIED SUCCESSFULLY </span>
                : 
                <span className='float-right mr-5 text-warning font-weight-bold '> ALREADY-APPLIED </span> : 
                <span className='float-right mr-5 text-info font-weight-bold btn ' onClick={()=>{this.handleApplyClick(this.props.job._id , this.props.job.index)}}> APPLY NOW </span>
              }
            </div>
          </div>
        </div>
        <br/>
        <div className="mt-5">
          <div className="pl-5 pr-5 pb-5  border border-dark shadow-lg rounded bg-white">
            <div>
              <h3 className="font-weight-bold">About Company</h3>
              <p className="font-weight-bold text-uppercase">
                {this.props.job.company_name}
              </p>
              <p>
                <span className="text-muted">Posted : </span>{" "}
                <Moment fromNow>{this.props.job.date}</Moment>
              </p>
              <p>
                {" "}
                <span className="text-muted">Location : </span>{" "}
                {this.props.job.location}
              </p>
              <p>
                {" "}
                <span className="text-muted">Total Employees : </span>{" "}
                {this.props.job.total_employee}
              </p>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Job Description</h3>
              <p className="font-weight-bold text-uppercase">
                {this.props.job.jobtitle}
              </p>
              <p>
                {" "}
                <span className="text-muted">Location : </span>{" "}
                {this.props.job.location}
              </p>
              <p>
                {" "}
                <span className="text-muted">Role : </span>{" "}
                {this.props.job.role}
              </p>
              <p>
                {" "}
                <span className="text-muted">Job Type : </span>{" "}
                {this.props.job.job_type}
              </p>
              <p>
                {" "}
                <span className="text-muted">Experience : </span>{" "}
                {this.props.job.min_experience} -{" "}
                {this.props.job.max_experience} Years
              </p>
              <p>
                {" "}
                <span className="text-muted">Salary (IN INR) : </span>{" "}
                {this.props.job.max_salary} - {this.props.job.min_salary}
              </p>
              <p>
                {" "}
                <span className="text-muted">Vacancy : </span>{" "}
                {this.props.job.maximum_hires}
              </p>
              <p>
                {" "}
                <span className="text-muted">Role Category : </span>{" "}
                {this.props.job.job_type}
              </p>

              <div>
                <p className="font-weight-bold">Required Skills</p>
                <ul>
                  {this.props.job.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>;
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Job Summary</h3>
              <p>{this.props.job.description}</p>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Contact Person</h3>
              <p className="font-weight-bold text-uppercase mb-0">
                {this.props.job.your_name}
              </p>
              <p className="text-muted text-monospace ">
                HR at {this.props.job.company_name}
              </p>
              <p>
                {" "}
                <span className="text-muted">Email : </span> example@gmail.com
              </p>
              <p>
                {" "}
                <span className="text-muted">Phone : </span>{" "}
                {this.props.job.phone_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { job: state.job , _id: state._id , auth_token : state.auth_token};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({applyJob}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Job);
