import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Moment from "react-moment";
import "moment-timezone";

class JobDetails extends Component {
  handleClick = () => {};

  render() {
    return (
    <div>
      {this.props.job ? 
      <div className="pl-5 pr-5 pb-5 pt-5 ">
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
        :
        null
      }
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
