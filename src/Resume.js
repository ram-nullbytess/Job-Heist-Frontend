import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {saveResume} from "./redux/actions";

import Moment from "react-moment";
import "moment-timezone";

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleAddClick = (ResumeId , index) => {
    this.props.saveResume(ResumeId,this.props._id,this.props.auth_token , index);
   }

  render() {
    return (
      <div className="container pl-5 pr-5 pb-5 pt-5 ">
        <div className="">
          <div className="card text-center mt-5 shadow p-1  rounded border border-dark bg-light ">
            <div  className="" >
              <div className="card-body btn" >
                <h4 className="card-title m-0 p-0 text-capitalize" > {this.props.resume.first_name} {this.props.resume.last_name} </h4>
                <p className="card-text  m-1 text-monospace">
                  {this.props.resume.resume_headline}
                </p>
                <p className="card-text m-1 text-monospace ">
                  <span className="mr-4">
                    <span className="glyphicon glyphicon-briefcase"></span>
                    <span className="font-weight-bold"> Experience :</span>
                    <span className="ml-2">{this.props.resume.experience} Years</span>                
                  </span>
                  <span className="ml-4">
                    <i className="fa fa-inr"></i>
                    <span className="font-weight-bold"> Current Salary :</span>
                    <span className="ml-2">{this.props.resume.show_salary ? this.props.resume.current_salary:'*******'}</span>
                  </span>
                </p>
                <p>
                  <span className="">
                    <i className='fas fa-map-marker-alt'></i>
                    <span className="font-weight-bold"> Location :</span>
                    <span className="ml-2">{this.props.resume.location}</span>
                  </span>
                </p>
                <p className="card-text m-1 text-monospace ">
                  <span className="ml-4 mr-4">
                    <span className="glyphicon glyphicon-education"></span>
                    <span className="font-weight-bold"> Education :</span>
                    <span className="ml-2">{this.props.resume.course}</span>
                  </span>
                </p>
                <p className="card-text m-1 text-monospace ">
                  <span className="ml-4 mr-4">
                    <i className="fa fa-mobile-phone" style={{"fontSize":"18px"}}></i>
                    <span className="font-weight-bold"> Email :</span>
                    <span className="ml-2">{this.props.resume.email}</span>
                  </span>
                </p>
                
              </div>
              <div className="">
                <span className='float-left ml-5 text-muted pt-1' >
                   <span className="glyphicon glyphicon-time"></span>
                   <span className="font-weight-bold"> Resume created :</span>
                   <span className="ml-1"> <Moment fromNow>{this.props.resume.date}</Moment> </span>
                </span>
                { this.props.resume.status ? this.props.resume.status === 'ADDED SUCCESSFULLY' ?
                <span className='float-right mr-5 text-success font-weight-bold'> SAVED SUCCESSFULLY </span>
                : 
                <span className='float-right mr-5 text-warning font-weight-bold '> ALREADY SAVED </span> : 
                <span className='float-right mr-5 text-info font-weight-bold btn ' onClick={()=>{this.handleAddClick(this.props.resume._id , this.props.resume.index)}}> SAVE </span>
                }
              </div>
            </div>
          </div>
        </div>

        <br/>

        <div className="mt-5">
          <div className="pl-5 pr-5 pb-5  border border-dark shadow-lg rounded bg-white">
            <div>
              <h3 className="font-weight-bold">Profile</h3>
              <p className="font-weight-bold text-uppercase">
                {this.props.resume.first_name} {this.props.resume.last_name}
              </p>
              <p>
              <span className="text-muted text-monospace">{this.props.resume.resume_headline}</span>{" "}
              </p>
              <p>
                <span className="text-muted">Location : </span>{" "}
                {this.props.resume.location}
              </p>
              <p>
                {" "}
                <span className="text-muted">Total Experience : </span>{" "}
                {this.props.resume.experience} Years
              </p>
              <p>
                {" "}
                <span className="text-muted">Current Salary : </span>{" "}
                {this.props.resume.show_salary ? this.props.resume.current_salary:'*******'}
              </p>
            </div>

            <div className="mt-5 ">
              <h4 className="font-weight-bold">Contact Information</h4>
              <p>
                {" "}
                <span className="text-muted">Email : </span>{" "}
                {this.props.resume.email}
              </p>
              <p>
                {" "}
                <span className="text-muted">Mobile : </span>{" "}
                {this.props.resume.show_phone ? this.props.resume.phone_number:'*******'}
              </p>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Education Information</h3>
              <p>
                {" "}
                <span className="text-muted">Education : </span>{" "}
                {this.props.resume.course}
              </p>
              <p>
                {" "}
                <span className="text-muted">College or University : </span>{" "}
                {this.props.resume.college_university}
              </p>
              <p>
                {" "}
                <span className="text-muted">College or University Location : </span>{" "}
                {this.props.resume.college_university_location}
               
              </p>
              <p>
                <span className="text-muted">Duration of Study : </span>{" "}
              </p>
              <p>
                {" "}
                <span className="text-muted">FROM :-</span>{" "}
                {this.props.resume.education_from_month} {this.props.resume.education_from_year }
                <span className="text-muted"> - TO :-</span>{" "}
                {this.props.resume.education_to_month} {this.props.resume.education_to_year}
              </p>

            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Skills</h3>
              <div>
                <ul>
                  {this.props.resume.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>;
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { resume:state.resume,_id:state._id , auth_token : state.auth_token};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveResume}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Resume);
