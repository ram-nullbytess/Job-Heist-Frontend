import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});



class Rejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rejectedResumes:[],
      TotalRejectedResumes:'',
      status:''
    };
  }

  

  componentDidMount = async () => {
    try {
      const response = await axios.get(`/api/applied-jobs/${this.props.jobId}`, 
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });
      
      if(response.data.length){
        this.setState({TotalRejectedResumes:response.data.length})

        response.data.map( async (job)=> {
          
          if(job.status === 'rejected'){
          // 
            const response = await axios.get(`/api/resumes/${job.applier_id}`,
            {
                headers: {
                    'auth_token': this.props.auth_token,
                }
            });
            
            response.data.appliedJobId = job._id;
            this.setState({rejectedResumes:[...this.state.rejectedResumes,response.data]});
          //
          } 
        })
      }
      this.setState({status:'done'});

    } catch (error) {
      
    }
  }

  updateAppliersResumes = async () => {
    try {
      const response = await axios.get(`/api/applied-jobs/${this.props.jobId}`, 
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });
      
      if(response.data.length){
        this.setState({TotalRejectedResumes:response.data.length})

        response.data.map( async (job)=> {
         
          if(job.status === 'rejected'){
          // 
            const response = await axios.get(`/api/resumes/${job.applier_id}`,
            {
                headers: {
                    'auth_token': this.props.auth_token,
                }
            });
                
                response.data.appliedJobId = job._id;
                this.setState({rejectedResumes:[...this.state.rejectedResumes,response.data]});
          //
          } 
        })
      }
      this.setState({status:'done'});

    } catch (error) {
      
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.jobId !== this.props.jobId) {
      this.setState({ status :'' , rejectedResumes : [] , TotalRejectedResumes:''},()=>{this.updateAppliersResumes()})
    }
  }

  // handleClick = async (appliedJobId,status,index) => {
  //   try {
  //     const response = await axios.put(`http://localhost:3001/api/applied-jobs/${appliedJobId}/${status}`,
  //     {
  //       headers: {
  //           'auth_token': this.props.auth_token,
  //       }
  //     });
  //     let copyOfAppliersResumes = this.state.rejectedResumes;
  //         copyOfAppliersResumes[index].status = status;
  //     this.setState({rejectedResumes:copyOfAppliersResumes})
      
  //   }catch(error){
  //     console.log(error.response)
  //   }
  // }

  render() {
    return (
      <div className="p-5">
        {this.props.jobId ? 
        (this.state.status === 'done' && this.state.rejectedResumes.length) ?
        this.state.rejectedResumes.map((resume,index) => {
  return <div key={index} className="mb-5 pl-5  border border-dark shadow-lg rounded bg-white">
            <div>
              <h3 className="font-weight-bold">Profile</h3>
              <p className="font-weight-bold text-uppercase">
                {resume.first_name} {resume.last_name}
              </p>
              <p>
              <span className="text-muted text-monospace">{resume.resume_headline}</span>{" "}
              </p>
              <p>
                <span className="text-muted">Location : </span>{" "}
                {resume.location}
              </p>
              <p>
                {" "}
                <span className="text-muted">Total Experience : </span>{" "}
                {resume.experience} Years
              </p>
              <p>
                {" "}
                <span className="text-muted">Current Salary : </span>{" "}
                {resume.current_salary}
              </p>
            </div>

            <div className="mt-5 ">
              <h4 className="font-weight-bold">Contact Information</h4>
              <p>
                {" "}
                <span className="text-muted">Email : </span>{" "}
                {resume.email}
              </p>
              <p>
                {" "}
                <span className="text-muted">Mobile : </span>{" "}
                {resume.phone_number}
              </p>
            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Education Information</h3>
              <p>
                {" "}
                <span className="text-muted">Education : </span>{" "}
                {resume.course}
              </p>
              <p>
                {" "}
                <span className="text-muted">College or University : </span>{" "}
                {resume.college_university}
              </p>
              <p>
                {" "}
                <span className="text-muted">College or University Location : </span>{" "}
                {resume.college_university_location}
               
              </p>
              <p>
                <span className="text-muted">Duration of Study : </span>{" "}
              </p>
              <p>
                {" "}
                <span className="text-muted">FROM :-</span>{" "}
                {resume.education_from_month} {resume.education_from_year }
                <span className="text-muted"> - TO :-</span>{" "}
                {resume.education_to_month} {resume.education_to_year}
              </p>

            </div>

            <div className="mt-5 ">
              <h3 className="font-weight-bold">Skills</h3>
              <div>
                <ul>
                  {resume.skills.map((skill, index) => {
                    return <li key={index}>{skill}</li>;
                  })}
                </ul>
              </div>
            </div>

            <div className='text-right p-4'>
              <span className='text-danger font-weight-bold'> REJECTED RESUME </span>
            </div>
            
          </div>
        }) 
        : (this.state.status === 'done' && this.state.Totalappliers)?
        <div name='noMorePendingResume'>
          <div  className="card text-center  shadow-lg p-1  rounded-pill border border-danger " >
              <div className="card-body">
                <h4 className="card-title">SORRY</h4>
                <p className="card-text m-1">No More Pending Resumes Found.</p>
              </div>
          </div>
        </div>
        :
        <div name='noAppliersFound'>
           <div  className="card text-center  shadow-lg p-1  rounded-pill border border-danger " >
              <div className="card-body">
                <h4 className="card-title">SORRY</h4>
                <p className="card-text m-1">No Resumes Found.</p>
              </div>
          </div>
        </div>
        : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { _id:state._id , auth_token : state.auth_token };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Rejected);
