import React, { Component } from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { setUserType } from "./redux/actions";
import "./UserType.css";

class UserType extends Component {
  
  handleClick = (e) => {
    this.props.setUserType(e.target.value,this.props._id);
  } 

  render() {
    return ( 
      <div className="row m-5 text-center">
        <div className="col-6 p-5 ">
          <div className="card bg-dark text-warning shadow-lg ">
            <img src="https://cdn.pixabay.com/photo/2019/09/05/04/39/dream-job-4453054_1280.jpg" style={{height:"40rem"}} className="card-img " alt="a" />
            <div className="card-img-overlay ">
              <h3 className="card-text font-weight-bolder shadow bg-secondary">
                Heist the job of your interest by uploading Resume.
              </h3>
              <button onClick={(e)=>{this.handleClick(e)}} value="jobSeeker" type="button" className="btn btn-warning btn-lg shadow-lg">Job Seeker</button>
            </div>
          </div>
        </div>
        <div className="col-6 p-5">
          <div className="card bg-dark text-warning shadow-lg ">
            <img src="https://cdn.pixabay.com/photo/2015/06/10/07/03/building-804526_1280.jpg" style={{height:"40rem"}} className="card-img" alt="b" />
            <div className="card-img-overlay">
            <h3 className="card-text font-weight-bolder shadow bg-secondary">
                Find The Right student for your work/Tasks.
              </h3>
              <button onClick={(e)=>{this.handleClick(e)}} value="recruiter" type="button" className="btn btn-warning btn-lg shadow-lg"> Recruiter </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {_id : state._id};
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUserType }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserType);

