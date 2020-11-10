import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  resumeCreated } from "./redux/actions";
const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});


class ResumeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      location:"",
      experience:"",
      resume_headline:"",
      current_salary:"",
      show_salary:true,
      email: this.props.email,
      phone_number: "",
      show_phone:true,
      privacy: "public",
      course:"",
      college_university:"",
      college_university_location:"",
      education_to_year:"",
      education_from_month:"",
      education_from_year:"",
      education_to_month:"",
      // skill
      skill:"",
      skills:[],
      // alert
      alert: false,
      alertMessage: "minimum one skill is required",
      //redirecting
      redirect:''

    };
  }



  handleChange = (e) => {
    switch (e.target.name) {
      case "first_name": {
        this.setState({ first_name: e.target.value });
        break;
      }
      case "last_name": {
        this.setState({ last_name: e.target.value });
        break;
      }
      case "location": {
        this.setState({ location: e.target.value });
        break;
      }
      case "experience": {
        this.setState({ experience: e.target.value });
        break;
      }
      case "resume_headline": {
        this.setState({ resume_headline: e.target.value });
        break;
      }
      case "current_salary": {
        this.setState({ current_salary: e.target.value });
        break;
      }
      case "current_salary_check": {
        this.setState({ show_salary: !this.state.show_salary });
        break;
      }
      case "phone_number": {
        this.setState({ phone_number: e.target.value });
        break;
      }
      case "phone_check": {
        this.setState({ show_phone: !this.state.show_phone });
        break;
      }
      case "privacy": {
        this.setState({ privacy: e.target.value });
        break;
      }
      case "course": {
        this.setState({ course: e.target.value });
        break;
      }
      case "college_university": {
        this.setState({ college_university: e.target.value });
        break;
      }
      case "college_university_location": {
        this.setState({ college_university_location: e.target.value });
        break;
      }
      case "education_from_month": {
        this.setState({ education_from_month: e.target.value });
        break;
      }
      case "education_from_year": {
        this.setState({ education_from_year: e.target.value });
        break;
      }

      case "education_to_month": {
        this.setState({ education_to_month: e.target.value });
        break;
      }
      case "education_to_year": {
        this.setState({ education_to_year: e.target.value });
        break;
      }
      case "skill": {
        this.setState({ skill: e.target.value });
        break;
      }
      default:
        return;
     }
  };


  handleClick = () => {
   if(this.state.skill)
   this.setState({skills: [ this.state.skill , ...this.state.skills ]},()=>{this.setState({skill : '' })})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.skills.length) {
        this.setState({alert: true})
        return;
    }


    
    // resume OBJ
    let resume = {
         // user_id included
         user_id:this.props._id,
         first_name: this.state.first_name,
         last_name: this.state.last_name,
         location: this.state.location,
         experience: this.state.experience,
         resume_headline: this.state.resume_headline,
         current_salary: this.state.current_salary,
         show_salary: this.state.show_salary,
         email: this.state.email,
         phone_number: this.state.phone_number,
         show_phone: this.state.show_phone,
         privacy: this.state.privacy,
         course: this.state.course,
         college_university: this.state.college_university,
         college_university_location: this.state.college_university_location,
         education_to_year: this.state.education_to_year,
         education_from_month: this.state.education_from_month,
         education_from_year: this.state.education_from_year,
         education_to_month: this.state.education_to_month,
         skills: this.state.skills
    };

    this.saveResume(resume, e.target);
  };

  //  API call
  saveResume = async(resume, target) => {
    
      try {
          await axios.post("/api/resumes", resume , 
          {
              headers: {
                  'auth_token': this.props.auth_token,
              }
          });
          this.props.resumeCreated();
          this.setState({redirect : '/'});
      } catch (error) {
          alert('SORRY , there is a problem while Submiting.')
      }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container pl-5 pr-5 pb-5 pt-5 ">
        <div className="pl-5 pr-5 pb-5  border border-info shadow-lg rounded">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            {/*  */}
            <div>
              <h3 className="text-info text-center">Profile</h3>
              <hr/>
              <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name *</label>
                    <input
                      id="firstname"
                      type="text"
                      maxLength="255"
                      className="form-control valid"
                      name="first_name"
                      required={true}
                      onChange={(e)=>{this.handleChange(e)}}
                     
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name *</label>
                    <input
                     id="lastname"
                      type="text"
                      maxLength="255"
                      className="form-control valid"
                      name="last_name"
                      required={true}
                      onChange={(e)=>{this.handleChange(e)}}
 
                    />
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="city">Location *</label>
                <input
                  id="city"
                  name="location"
                  type="text"
                  className="form-control  valid"
                  placeholder="ex. Pune, Maharastra, Mumbai"
                  required={true}
                  onChange={(e)=>{this.handleChange(e)}}         
                />
              </div>
              </div>
              <div className="col-md-6">
              <div className="form-group">
                <label>Total Experience *</label>
                <select
                  name="experience"
                  className="form-control "
                  required={true}
                  onChange={(e)=>{this.handleChange(e)}}
                
                >
                  <option value="">Select Experience</option>
                  <option value="0">Fresher</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Year</option>
                    <option value="3">3 Year</option>
                    <option value="4">4 Year</option>
                    <option value="5">5 Year</option>
                    <option value="6">6 Year</option>
                    <option value="7">7 Year</option>
                    <option value="8">8 Year</option>
                    <option value="9">9 Year</option>
                    <option value="10">10 Year</option>
                    <option value="11">11 Year</option>
                    <option value="12">12 Year</option>
                    <option value="13">13 Year</option>
                    <option value="14">14 Year</option>
                    <option value="15">15 Year</option>
                    <option value="16">16 Year</option>
                    <option value="17">17 Year</option>
                    <option value="18">18 Year</option>
                    <option value="19">19 Year</option>
                    <option value="20">20 Year</option>
                    <option value="21">21 Year</option>
                    <option value="22">22 Year</option>
                    <option value="23">23 Year</option>
                    <option value="24">24 Year</option>
                    <option value="25">25 Year</option>
                </select>
              </div>
              </div>
              </div>

              <div className="form-group">
                <label htmlFor="resume_headline">Resume Headline *</label>
                <input
                  
                  type="text"
                  className="form-control"
                  name="resume_headline"
                  id="resume_headline"
                  required={true}
                  placeholder="Enter your Resume Headline"
                  onChange={(e)=>{this.handleChange(e)}}
                 
                />
                <label
                  className="text-muted"
                  htmlFor="resume_headline"
                >
                  This field is required.
                </label>
                <small className="text-muted">
                  (Example. Top Ranked Sales Manager with 7 years' experience.
                  <b>
                    <u>OR</u>
                  </b>
                  Sales Executive with Experience in Technology Industry)
                </small>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="current_salary">Current salary</label>
                    <input
                      type="text"
                      className="form-control "
                      name="current_salary"
                      id="current_salary"
                      required={true}
                      placeholder="Rs"
                      onChange={(e)=>{this.handleChange(e)}}
                     
                    />
                  </div>
                  <input
                    className=""
                    type="checkbox"
                    id="current_salary-check"
                    name="current_salary_check"
                    onChange={(e)=>{this.handleChange(e)}}
                  />
                  <small
                    className="ml-3 text-muted"
                    htmlFor="current_salary-check"
                  >
                    Do not Show Current salary
                  </small>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                   <label htmlFor="email">Email Address *</label>
                   <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="email"
                    value={this.state.email}
                    readOnly
                   
                  />
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phone_number">Mobile Number *</label>
                    <input
                      id="phone_number"
                      type="text"
                      className="form-control valid"
                      name="phone_number"
                      maxLength="10"
                      required={true}
                      onChange={(e)=>{this.handleChange(e)}}
                    />
                    
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="phone-number-check"
                      name="phone_check"
                      onChange={(e)=>{this.handleChange(e)}}
                     
                    />

                    <small
                      className="text-muted ml-4"
                      htmlFor="phone-number-check"
                    >
                      Do not Show my phone number
                    </small>
                  </div>
                </div>
              </div>

              <h3 className="text-info text-center">Resume Privacy Settings</h3>
              <div className="">
                <div className="form-check">
                <input className="form-check-input" type="radio" name="privacy" onChange={(e)=>{this.handleChange(e)}} id="exampleRadios1" value="public" defaultChecked />
                <label className="form-check-label ml-4" htmlFor="exampleRadios1">
                  Public
                </label>
              </div>
                <p className='ml-4'>
                  Your resume will be visible to anyone, in accordance with our
                  terms.
                </p>
              </div>
              <div className="">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="privacy" onChange={(e)=>{this.handleChange(e)}} id="exampleRadios2" value="private" />
                <label className="form-check-label ml-4" htmlFor="exampleRadios2">
                  Private
                </label>
              </div>
                <p className="ml-4">
                  Your resume will not be visible to anyone, in accordance with
                  our terms. However you can still apply for any job with this
                  resume.
                </p>
              </div>
            </div>
            {/*  */}
            <div className="">
              <h3 className="mt-5 text-info text-center">Education Information</h3>

              <div className="form-group">
                <label htmlFor="degree">Course *</label>
                <div className="">  
                  <select
                    className="form-control "
                    id="course"
                    name="course"
                    required={true}
                    data-live-search="true"
                    style={{ width: "100%" }}
                    onChange={(e)=>{this.handleChange(e)}}

                  >
                    <option value="">Select Course</option>
                    <option value="Bachelor in Journalism and Mass Communication (Bachelor in
                      Journalism and Mass Communication)">
                      Bachelor in Journalism and Mass Communication (Bachelor in
                      Journalism and Mass Communication)
                    </option>
                    <option value="12th pass (12th pass)">12th pass (12th pass)</option>
                    <option value="10 + 2 or Below (10 + 2 or Below)">
                      10 + 2 or Below (10 + 2 or Below)
                    </option>
                    <option value="Associates of Science (Associates of Science)">
                      Associates of Science (Associates of Science)
                    </option>
                    <option value="Diploma (Diploma)">Diploma (Diploma)</option>
                    <option value="Industrial Training Institutes (I.T.I. / ITI)">
                      Industrial Training Institutes (I.T.I. / ITI)
                    </option>
                    <option value="Bachelor of Arts (B.A. / BA)">Bachelor of Arts (B.A. / BA)</option>
                    <option value="Bachelor of Business Administration (BBA / B.B.A.)">
                      Bachelor of Business Administration (BBA / B.B.A.)
                    </option>
                    <option value="ICWA / CMA (ICWA / CMA)">ICWA / CMA (ICWA / CMA)</option>
                    <option value="Advanced Diploma (AD / Advanced Diploma)">
                      Advanced Diploma (AD / Advanced Diploma)
                    </option>
                    <option value="Bachlor of Veterinary Science and Animal Husbandary
                      (B.V.Sc. and AH)">
                      Bachlor of Veterinary Science and Animal Husbandary
                      (B.V.Sc. and AH)
                    </option>
                    <option value="Bachelor of Management Studies (B.M.S / BMS)">
                      Bachelor of Management Studies (B.M.S / BMS)
                    </option>
                    <option value="Bachelor of Business Management (BBM / B.B.M.)">
                      Bachelor of Business Management (BBM / B.B.M.)
                    </option>
                    <option value="Bachelor in Design (Bachelor in Design)">
                      Bachelor in Design (Bachelor in Design)
                    </option>
                    <option value="Bachelor of Mass Media Management (BMM / B.M.M)">
                      Bachelor of Mass Media Management (BMM / B.M.M)
                    </option>
                    <option value="Bachelor of Physiotherapy (B. Physio / BPT / B PT)">
                      Bachelor of Physiotherapy (B. Physio / BPT / B PT)
                    </option>
                    <option value="Bachelor of Vocational Education (B. Voc / B Voc / BVoc)">
                      Bachelor of Vocational Education (B. Voc / B Voc / BVoc)
                    </option>
                    <option value="Bachelor of Legislative Law (LLB / L.L.B.)">
                      Bachelor of Legislative Law (LLB / L.L.B.)
                    </option>
                    <option value="Bachelor of Education (B. Ed. / B Ed)">
                      Bachelor of Education (B. Ed. / B Ed)
                    </option>
                    <option value="Bachelor of Computer Application (BCA / B.C.A.)">
                      Bachelor of Computer Application (BCA / B.C.A.)
                    </option>
                    <option value="Bachelor of Hotel Management (B.H.M. / BHM)">
                      Bachelor of Hotel Management (B.H.M. / BHM)
                    </option>
                    <option value="Bachelor of Commerce (B.Com / B Com)">
                      Bachelor of Commerce (B.Com / B Com)
                    </option>
                    <option value="Bachelor of Science (B.Sc. / B Sc)">
                      Bachelor of Science (B.Sc. / B Sc)
                    </option>
                    <option value="Chartered Accountant Intermediate (CA Inter / C.A. Inter.)">
                      Chartered Accountant Intermediate (CA Inter / C.A. Inter.)
                    </option>
                    <option value="Bachelor of Pharmacy (B.Pharm)">Bachelor of Pharmacy (B.Pharm)</option>
                    <option value="Bachelor of Architecture (B.Arch / B Arch)">
                      Bachelor of Architecture (B.Arch / B Arch)
                    </option>
                  
                   
                   
                   
                 
                    <option value="Bachelor of Engineering / Bachelor of Technology (B.Tech /
                      B.E , B Tech / BE)">
                      Bachelor of Engineering / Bachelor of Technology (B.Tech /
                      B.E , B Tech / BE)
                    </option>
                   
                    <option value="Company Secretary (CS / C.S.)">Company Secretary (CS / C.S.)</option>
                    <option value="Master of Education (M ED / M.Ed.)">
                      Master of Education (M ED / M.Ed.)
                    </option>
                    
                   
                    <option value="Master of Arts (M.A. / MA)">Master of Arts (M.A. / MA)</option>
                   
                    <option value="Post Graduation Diploma (PG Diploma / P.G. Diploma)">
                      Post Graduation Diploma (PG Diploma / P.G. Diploma)
                    </option>
                    
                    <option value="Master of Technology Management (MTM / M.T.M.)">
                      Master of Technology Management (MTM / M.T.M.)
                    </option>
                    
                    <option value="Masters Of International Business (MIB / M.I.B.)">
                      Masters Of International Business (MIB / M.I.B.)
                    </option>
                    
                    
                    
                    <option value="Masters in Multimedia (Masters in Multimedia)">
                      Masters in Multimedia (Masters in Multimedia)
                    </option>
                   
                   
                    <option value="Chartered Accountant (CA / C.A.)">Chartered Accountant (CA / C.A.)</option>
                    
                    <option value="Master of Business Administration (M.B.A. / MBA)">
                      Master of Business Administration (M.B.A. / MBA)
                    </option>
                    
                    <option value="Master in Computer Application (M. C. A. / MCA / M.C.A)">
                      Master in Computer Application (M. C. A. / MCA / M.C.A)
                    </option>
                   
                    <option value="other">Other</option>
                  </select>
                </div>
                <br />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="collegeoruniversity">College or University *</label>
              <input
                type="text"
                maxLength="200"
                className="form-control"
                name="college_university"
                required={true}
                onChange={(e)=>{this.handleChange(e)}}
               
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">College or University Location *</label>
              <input
                type="text"
                className="form-control "
                name="college_university_location"
                placeholder="ex. Pune, Maharastra, Mumbai"
                id="college_university_location"
                required={true}
                onChange={(e)=>{this.handleChange(e)}}     
              />
            </div>
            <label htmlFor="durationofstudy">Duration of Study *</label>
            <div className="row">
              <div className="col-md-6">FROM :-</div>
              <div className="col-md-6">TO :-</div>
            </div>
            <div className="row">
              <div className="col-xs-3 col-sm-3 col-md-3">
                <div className="form-group">
                  <select
                    className="form-control "
                    name="education_from_month"
                    required={true}
                    onChange={(e)=>{this.handleChange(e)}}
                  >
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 todivider">
                <div className="form-group">
                  <select
                    className="form-control "
                    name="education_from_year"
                    required={true}
                    onChange={(e)=>{this.handleChange(e)}}
                  >
                    <option value="">Year</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3">
                <div className="form-group">
                    <select className="form-control" name="education_to_month" required={true} onChange={(e)=>{this.handleChange(e)}}>
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3">
                <div className="form-group">
                  <select
                    className="form-control education_to_year"
                    name="education_to_year"
                    required={true} 
                    onChange={(e)=>{this.handleChange(e)}}
                  >
                    <option value="">Year</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>
            </div>
            {/*  */}
            <h3 className="text-info ml-5  text-left mb-4" >Skill</h3>
                <div className="form-row mb-1">
                  <div className="col-5">
                    <input type="text" onChange={(e)=>{this.handleChange(e)}}   value={this.state.skill} name="skill" className="form-control" placeholder="Type your Skill then press Add Button"/>
                  </div>
                  <div className="col-2">
                    <button type="button" className="form-control btn btn-info "  onClick={()=>{this.handleClick()}}> + ADD SKILL </button>
                  </div>
                  <div className="col-5 pl-5 pr-5">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn"
                      >
                      Save
                    </button>
                  </div>
                </div>
                {/*  */}
                {this.state.alert && !this.state.skills.length
                            ? <span className="mt-2 p-1 border border-danger">{this.state.alertMessage}</span>
                            : null}
                {/*  */}
                <div className="row mt-3 ml-5 mr-5">
                  <div className="col-12 ml-5 mr-5">
                  {this.state.skills.map((skill,index)=>{
                      return <span key={index}  style={{wordWrap:"break-word"}} className="m-2 p-1 border border-success rounded-pill ">{skill}</span>
                    })}
                  </div>
                </div>
                

            {/*  */}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {auth_token:state.auth_token,_id:state._id,email:state.email};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resumeCreated
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);
