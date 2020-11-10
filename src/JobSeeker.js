import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import "./JobSeeker.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { resumeNotCreated , jobSearchResult , logOut } from "./redux/actions";
const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});

class JobSeeker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      location: "",
      resumePrivacy:'',
      redirect:false
    }
  }

  // check resume created or not
  componentDidMount = async () => {
    try {
      const response = await axios.get(`/api/resumes/${this.props._id}`, {
        headers: {
            'auth_token': this.props.auth_token
        }
    });

      if(!response.data)
      this.props.resumeNotCreated();
      
      this.setState({resumePrivacy:response.data})
    } catch (error) {
      
    }
  } 

  // handle input change
  handleChange = (e) => {
    switch (e.target.name) {
      case "jobTitle": {
        this.setState({ jobTitle: e.target.value });
        break;
      }
      case "location": {
        this.setState({ location: e.target.value });
        break;
      }
      default:
        return;
     }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.jobTitle && !this.state.location) {
        alert("both fields can't be empty")
        return;
    }

    this.searchJob(this.state.jobTitle,this.state.location);
    
  };


  //  API call
  searchJob = async (jobTitle, location) => {
      try {
          const response = await axios.get(`/api/jobs?jobTitle=${jobTitle}&location=${location}`,
          {
              headers: {
                  'auth_token': this.props.auth_token,
              }
          });
          
          this.props.jobSearchResult(response.data);
          // this.props.history.push('/find-jobs')
          this.setState({redirect:true})
         
         
          
      } catch (error) {
          
      }
      
  };

  handleRegionClick = async (region) => {
    try {
      const response = await axios.get(`/api/jobs?location=${region}`,
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });
      
      this.props.jobSearchResult(response.data);
      // this.props.history.push('/find-jobs')
      this.setState({redirect:true})
     
      
  } catch (error) {
      
  }
  } 

  handleCompanyClick = async (company) => {
    try {
      const response = await axios.get(`/api/jobs?company_name=${company}`,
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });
      
      this.props.jobSearchResult(response.data);
      // this.props.history.push('/find-jobs')
      this.setState({redirect:true})
     
      
  } catch (error) {
      
  }
  }

  handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`/api/jobs?role=${category}`,
      {
          headers: {
              'auth_token': this.props.auth_token,
          }
      });
      
      this.props.jobSearchResult(response.data);
      // this.props.history.push('/find-jobs')
      this.setState({redirect:true})
     
      
  } catch (error) {
     
  }
  }

  //  API call for my-jobs
  myJobs = async () => {
    try {
        const response = await axios.get(`/api/jobs/my-jobs`,
        {
            headers: {
                'auth_token': this.props.auth_token,
            }
        });
        
        this.props.jobSearchResult(response.data);
        this.setState({redirect:true})
          
    } catch (error) {
        
    }
  }

  resumePrivacyChange = async () => {
    let privacy ;
    if(this.state.resumePrivacy === 'private')
    privacy = 'public';
    else
    privacy = 'private';
    
    try {
      const response = await axios.put(`/api/resumes/resume-privacy`,{ privacy:privacy , user_id : this.props._id }
      // {
      //     headers: {
      //       "Content-Type": "text/plain",
      //        'auth_token': this.props.auth_token
      //     }
      // }
      );
      if(response.data.nModified)
      this.setState({resumePrivacy:privacy})
           
    } catch (error) {
      
    }
  }

  render() {
    return (
      <div>
        {this.state.redirect?  <Redirect push  to="/find-jobs" /> : null }
        <nav className="navbar navbar-default navbar-expand-xl navbar-light">
          <div className="navbar-header d-flex col">
            <Link className="navbar-brand" to="/">
              Job<b style={{ color: "#19aa8d" }}>Heist!</b>
            </Link>
          </div>
          {/*  Collection of nav links, forms, and other content for toggling  */}
          <div
            id="navbarCollapse"
            className="collapse navbar-collapse justify-content-start"
          >
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item ml-5">
                <span onClick={ this.props.isResumeCreated ? ()=>{this.myJobs()} : null } className=" pt-4 nav-link "  style={ this.props.isResumeCreated ? { cursor: 'pointer'} : { cursor: 'pointer', color : '#CCCCCC'} }>
                  My Jobs
                </span>
              </li>
              {!this.props.isResumeCreated ? <li className="nav-item ml-5">
                <Link to="/create-resume" className="nav-link">
                  Create-Resume
                </Link>
              </li> : null }
              <li className="nav-item ml-5">
                <Link to="/my-applied-jobs" className="nav-link">
                  My Applied Jobs
                </Link>
              </li>
              {/* <li className="nav-item ml-5">
                <Link to="/" className="nav-link">
                 Create Alert
                </Link>
              </li> */}
            </ul>

            <ul className="nav navbar-nav navbar-right ml-auto">
              { this.props.isResumeCreated ?<li className="nav-item mr-5">
                  <span className="custom-control custom-switch pt-4" >
                    <input  checked={this.state.resumePrivacy === 'private' ? true : false } onChange={()=>{this.resumePrivacyChange()}} type="checkbox" className="custom-control-input " id="customSwitch1" style={{ cursor: 'pointer'}}/>
                    <label className="custom-control-label" htmlFor="customSwitch1" style={{ cursor: 'pointer'}}>{this.state.resumePrivacy === 'private' ? 'Resume Private' : 'Resume Public' }</label>
                  </span>
              </li> : null }
              {/* <li className="nav-item mr-5">
                <Link to="/" className="nav-link notifications">
                  <i className="fa fa-bell-o"></i>
                  <span className="badge">1</span>
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <a href="/" className="nav-link messages">
                  <i className="fa fa-envelope-o"></i>
                  <span className="badge">10</span>
                </a>
              </li> */}
              <li className="nav-item dropdown">
                <span
                  data-toggle="dropdown"
                  className="nav-link dropdown-toggle user-action pt-4"
                  style={{ cursor: 'pointer'}}
                >
                  <img
                    src={process.env.PUBLIC_URL + '/profile.jpg'}
                    className="avatar"
                    alt="Avatar"
                  />
                  {this.props.name}
                </span>
                <ul className="dropdown-menu">
                  {/* <li>
                    <a href="/" className="dropdown-item">
                      <i className="fa fa-user-o"></i> Profile
                    </a>
                  </li>
                  <li className="divider dropdown-divider"></li> */}
                  <li>
                    <button  className="dropdown-item" onClick={()=>{this.props.logOut()}}>
                      <i className="material-icons">&#xE8AC;</i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        {/*  */}
        <div className="jumbotron  pt-1">
          <h2 className=" text-center text-white">Let Us Heist a Job For You</h2>
          <form className="text-white" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-row">
              <div className="form-group col-md-5">
                <input
                  type="text"
                  name="jobTitle"
                  className="form-control"
                  placeholder="Job Title ,Skill , Keyword , Company"
                  onChange={(e)=>{this.handleChange(e)}}
                />
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Location"
                  onChange={(e)=>{this.handleChange(e)}}
                />
              </div>
              <div className="form-group col-md-2">
                <button className="form-control btn btn-warning">Search Jobs</button>
              </div>
            </div>
          </form>
        </div>
        {/*  */}
        { !this.props.isResumeCreated ? <div className="text-center pl-2 pr-2 mmt">
          <span className="bold-text">Let us connect with Recruiters </span>{" "}
          <Link to="/create-resume" >
          <button
            type="button"
            className="btn btn-outline-info info border-info ml-4"
          >
            Create Your Resume
          </button>
          </Link>
        </div> : null }
        {/*  */}
        
          <div className='pl-5 pr-5 mt-3'>
            <li className="list-group-item list-group-item-warning p-1"><h4 className="m-1 ml-4"> Job vacancies by Region :- </h4></li>
            <div className="pl-5 pr-5 pb-5">
            {this.props.region.map((region,index)=>{
              return <button type="button" key={index} onClick={()=>{this.handleRegionClick(region)}} className="btn  btn-outline-secondary m-2">{region}</button>
            })}
            </div>
          </div>
          {/*  */}
          <div className='pl-5 pr-5 mt-3'>
            <li className="list-group-item list-group-item-warning p-1"><h4 className="m-1 ml-4"> Job vacancies by Companies :- </h4></li>
            <div className="pl-5 pr-5 pb-5">
            {this.props.companies.map((company,index)=>{
              return <button type="button" key={index} onClick={()=>{this.handleCompanyClick(company)}} className="btn  btn-outline-secondary m-2">{company}</button>
            })}
            </div>
          </div>
          {/*  */}
          <div className='pl-5 pr-5 mt-3'>
            <li className="list-group-item list-group-item-warning p-1"><h4 className="m-1 ml-4"> Job vacancies by Category/Role :- </h4></li>
            <div className="pl-5 pr-5 pb-5">
            {this.props.category.map((category,index)=>{
              return <button type="button" key={index} onClick={()=>{this.handleCategoryClick(category)}} className="btn  btn-outline-secondary m-2">{category}</button>
            })}
            </div>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {region:state.region,companies:state.companies,category:state.category,_id:state._id,auth_token:state.auth_token,isResumeCreated:state.isResumeCreated , name: state.name};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resumeNotCreated,
      jobSearchResult,
      logOut
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (JobSeeker);