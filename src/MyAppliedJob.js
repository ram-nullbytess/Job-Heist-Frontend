import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Moment from "react-moment";
import "moment-timezone";

class MyAppliedJob extends Component {

  render() {
    return (
      <div className="container pl-5 pr-5 pb-5 pt-5 ">
        <div className="">
            <div  className="card text-center mt-5 shadow p-1  rounded border border-dark" >
              <div className="card-body btn" >
                <h4 className="card-title m-0 p-0 text-capitalize" >{this.props.appliedJob.jobtitle}</h4>
                <p className="card-text  m-1 text-uppercase">{this.props.appliedJob.company_name}</p>
                <p className="card-text m-1 text-monospace text-lowercase">
                  <span className="mr-4">
                    <span className="glyphicon glyphicon-briefcase"></span>
                    <span className="ml-2">{this.props.appliedJob.min_experience}-{this.props.appliedJob.max_experience} Yrs</span>
                  </span>
                  <span className="ml-4 mr-4">
                  <i className="fa fa-inr"></i>
                    <span className="ml-2">{this.props.appliedJob.max_salary}-{this.props.appliedJob.min_salary}</span>
                  </span>
                  <span className="ml-4 ">
                    <i className='fas fa-map-marker-alt'></i>
                    <span className="ml-2">{this.props.appliedJob.location}</span>
                  </span>
                </p>
                <p className="card-text m-1 text-monospace text-lowercase">
                  <span className="ml-4 mr-4">
                     <span className="glyphicon glyphicon-time"></span>
                    <span className="ml-2">{this.props.appliedJob.job_type}</span>
                  </span>
                  <span className="ml-4 mr-4">
                    <span className="font-weight-bold">Vacancy:</span>
                    <span className="ml-2">{this.props.appliedJob.maximum_hires}</span>
                  </span>
                </p>
              </div>
              <div className="card-footer  p-1">
              <span className='float-left ml-5 text-muted' >
                   <span className="glyphicon glyphicon-time"></span>
                   <span className="font-weight-bold">Applied Date :</span>
                   <span className="ml-1"><Moment format="YYYY/MM/DD">{this.props.appliedJob.applied_date}</Moment></span>
                   <span className="">( <Moment fromNow>{this.props.appliedJob.applied_date}</Moment> )</span>
                </span>
                <span className='float-right mr-5 text-muted'>
                <span className="font-weight-bold">Status : </span>
                {this.props.appliedJob.status === 'pending' ?
                <span className='text-warning font-weight-bold badge bg-white border border-warning'> Pending </span>
                : 
                this.props.appliedJob.status === 'accepted' ?
                <span className='text-success font-weight-bold badge bg-white border border-success'> Accepted </span>
                :
                <span className='text-danger font-weight-bold badge bg-white border border-danger'> Rejected </span>
                }
                </span>
              </div>
            </div>
        </div>
        <br/>
        <div className="mt-5">
          <div className="pl-5 pr-5 pb-5  border border-dark shadow-lg rounded bg-white">
            <div>
              <h3 className="font-weight-bold">About Company</h3>
              <p className="font-weight-bold text-uppercase">
                {this.props.appliedJob.company_name}
              </p>
              <p>
                <span className="text-muted">Posted : </span>{" "}
                <Moment fromNow>{this.props.appliedJob.date}</Moment>
              </p>
              <p>
                {" "}
                <span className="text-muted">Location : </span>{" "}
                {this.props.appliedJob.location}
              </p>
              <p>
                {" "}
                <span className="text-muted">Total Employees : </span>{" "}
                {this.props.appliedJob.total_employee}
              </p>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Job Description</h3>
              <p className="font-weight-bold text-uppercase">
                {this.props.appliedJob.jobtitle}
              </p>
              <p>
                {" "}
                <span className="text-muted">Location : </span>{" "}
                {this.props.appliedJob.location}
              </p>
              <p>
                {" "}
                <span className="text-muted">Role : </span>{" "}
                {this.props.appliedJob.role}
              </p>
              <p>
                {" "}
                <span className="text-muted">Job Type : </span>{" "}
                {this.props.appliedJob.job_type}
              </p>
              <p>
                {" "}
                <span className="text-muted">Experience : </span>{" "}
                {this.props.appliedJob.min_experience} -{" "}
                {this.props.appliedJob.max_experience} Years
              </p>
              <p>
                {" "}
                <span className="text-muted">Salary (IN INR) : </span>{" "}
                {this.props.appliedJob.max_salary} - {this.props.appliedJob.min_salary}
              </p>
              <p>
                {" "}
                <span className="text-muted">Vacancy : </span>{" "}
                {this.props.appliedJob.maximum_hires}
              </p>
              <p>
                {" "}
                <span className="text-muted">Role Category : </span>{" "}
                {this.props.appliedJob.job_type}
              </p>

              <div>
                <p className="font-weight-bold">Required Skills</p>
                <ul>
                  {this.props.appliedJob.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>;
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Job Summary</h3>
              <p>{this.props.appliedJob.description}</p>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Contact Person</h3>
              <p className="font-weight-bold text-uppercase mb-0">
                {this.props.appliedJob.your_name}
              </p>
              <p className="text-muted text-monospace ">
                HR at {this.props.appliedJob.company_name}
              </p>
              <p>
                {" "}
                <span className="text-muted">Email : </span> example@gmail.com
              </p>
              <p>
                {" "}
                <span className="text-muted">Phone : </span>{" "}
                {this.props.appliedJob.phone_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {appliedJob:state.appliedJob};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAppliedJob);