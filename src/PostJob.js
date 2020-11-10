import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {signedUp} from "./redux/actions";
const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});

class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            company_name: "",
            total_employee: "",
            your_name: "",
            phone_number: "",
            jobtitle: "",
            role: "",
            job_type: "full-time",
            min_experience: "",
            max_experience: "",
            min_salary: "",
            max_salary: "",
            maximum_hires: "1 Hire",
            description: "",
            // skill
            skill: "",
            skills: [],
            //alert
            alert: false,
            alertMessage: "minimum one skill is required",
            //redirecting
            redirect:''
        };
    }

    handleChange = (e) => {
        switch (e.target.name) {
            case "location":
                {
                    this.setState({
                        location: e.target.value
                    });
                    break;
                }
            case "company_name":
                {
                    this.setState({
                        company_name: e.target.value
                    });
                    break;
                }
            case "total_employee":
                {
                    this.setState({
                        total_employee: e.target.value
                    });
                    break;
                }
            case "your_name":
                {
                    this.setState({
                        your_name: e.target.value
                    });
                    break;
                }
            case "phone_number":
                {
                    this.setState({
                        phone_number: e.target.value
                    });
                    break;
                }
            case "jobtitle":
                {
                    this.setState({
                        jobtitle: e.target.value
                    });
                    break;
                }
            case "role":
                {
                    this.setState({
                        role: e.target.value
                    });
                    break;
                }
            case "job_type":
                {
                    this.setState({
                        job_type: e.target.value
                    });
                    break;
                }
            case "min_experience":
                {
                    this.setState({
                        min_experience: e.target.value
                    });
                    break;
                }
            case "max_experience":
                {
                    this.setState({
                        max_experience: e.target.value
                    });
                    break;
                }
            case "min_salary":
                {
                    this.setState({
                        min_salary: e.target.value
                    });
                    break;
                }
            case "max_salary":
                {
                    this.setState({
                        max_salary: e.target.value
                    });
                    break;
                }
            case "maximum_hires":
                {
                    this.setState({
                        maximum_hires: e.target.value
                    });
                    break;
                }
            case "description":
                {
                    this.setState({
                        description: e.target.value
                    });
                    break;
                }
            case "skill":
                {
                    this.setState({
                        skill: e.target.value
                    });
                    break;
                }
            default:
                return;
        }
    };

    handleClick = () => {
        if (this.state.skill) 
            this.setState({
                skills: [
                    this.state.skill, ...this.state.skills
                ]
            },()=>{this.setState({skill : '' })})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.skills.length) {
            this.setState({alert: true})
            return;
        }

        // job OBJ
        let job = {
            // user_id included
            user_id:this.props._id,
            location: this.state.location,
            company_name: this.state.company_name,
            total_employee: this.state.total_employee,
            your_name: this.state.your_name,
            phone_number: this.state.phone_number,
            jobtitle: this.state.jobtitle,
            role: this.state.role,
            job_type: this.state.job_type,
            min_experience: this.state.min_experience,
            max_experience: this.state.max_experience,
            min_salary: this.state.min_salary,
            max_salary: this.state.max_salary,
            maximum_hires: this.state.maximum_hires,
            description: this.state.description,
            skills: this.state.skills
        };

        this.saveJob(job, e.target);
    };

    //  API call
    saveJob = async(job, target) => {
        try {
            await axios.post("/api/jobs", job , 
            {
                headers: {
                    'auth_token': this.props.auth_token,
                }
            }
            );
            alert('Job Posted Successfully')
            this.setState({redirect:'/'})
            
        } catch (error) {
            alert('SORRY , Unable to Post.')
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

                        <div className="row">
                            <div className="col">
                                <h3 className="text-info text-center">Company Information</h3>

                                <div className="form-group">
                                    <label htmlFor="Location">Location *</label>

                                    <input
                                        id="locSearch"
                                        name="location"
                                        type="text"
                                        className="form-control "
                                        placeholder="ex.Mumbai, Pune, Banglore"
                                        required={true}
                                        autoComplete='off'
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Company Name">Company Name *</label>
                                    <input type="hidden" id="location_search_value"/>
                                    <input
                                        type="text"
                                        name="company_name"
                                        id="company_name"
                                        className="form-control "
                                        autoComplete='off'
                                        placeholder="ex Google , Microsoft , Ola"
                                        required={true}
                                        maxLength="255"
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="totalemployees">Total Employees *</label>
                                    <select
                                        className="form-control error"
                                        id="totalemployees"
                                        name="total_employee"
                                        required={true}
                                        aria-invalid="true"
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}>
                                        <option value="">How many employees?</option>
                                        <option value="1-49">1 - 49</option>
                                        <option value="50-149">50 - 149</option>
                                        <option value="150-249">150 - 249</option>
                                        <option value="250-499">250 - 499</option>
                                        <option value="500-749">500 - 749</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="yourname">Your Name *</label>
                                    <input
                                        type="text"
                                        className="form-control valid"
                                        name="your_name"
                                        id="yourname"
                                        aria-describedby="emailHelp"
                                        placeholder=""
                                        autoComplete='off'
                                        required={true}
                                        maxLength="255"
                                        
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="example-tel-input">Mobile Number</label>
                                    <input
                                        className="form-control phone_number valid"
                                        type="text"
                                        name="phone_number"
                                        id="phone_number"
                                        maxLength="10"
                                        required={true}
                                        autoComplete='off'
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}/>

                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="row">
                            <div className="col">
                                <h3 className="text-info text-center">Job Details</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="jobtitle">Job Title *</label>
                                    <input
                                        type="text"
                                        name="jobtitle"
                                        placeholder=""
                                        className="form-control error"
                                        id="jobtitle"
                                        maxLength="255"
                                        autoComplete="off"
                                       
                                        required={true}
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Role *</label>
                                    <select
                                        className="form-control"
                                        id="categories_optgroup"
                                        style={{
                                        width: "100%"
                                    }}
                                        name="role"
                                        
                                        tabIndex="-1"
                                        aria-hidden="true"
                                        required={true}
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}>
                                        <option value="">Select</option>

                                        <optgroup label="Consultant">

                                            <option data_category_id="5" value="event management">
                                                event management
                                            </option>

                                            <option data_category_id="5" value="Operations Manager">
                                                Operations Manager  
                                            </option>

                                        </optgroup>
                                        <optgroup label="Cashier">
                                            <option data_category_id="6" value="Cashier">
                                                Cashier
                                            </option>

                                        </optgroup>
                                        <optgroup label="Computer">
                                            <option data_category_id="7" value="120">
                                               Computer Operator
                                            </option>

                                            <option data_category_id="7" value="Networking Manager">
                                               Networking Manager
                                            </option>

                                            <option data_category_id="7" value="Php Developer">
                                                Php Developer
                                            </option>

                                        </optgroup>

                                        <optgroup label="IT - Software">

                                            <option data_category_id="9" value="full stack web developer">
                                                full stack web developer
                                            </option>

                                            <option data_category_id="9" value="mean stack">
                                                mean stack
                                            </option>

                                            <option data_category_id="9" value="mern stack">
                                                mern stack
                                            </option>

                                            <option data_category_id="9" value="UI/UX Designer">
                                            UI/UX Designer
                                            </option>

                                            <option data_category_id="9" value="Web Application Developer">
                                            Web Application Developer
                                            </option>

                                            <option data_category_id="9" value="Unix Engineer">
                                                Unix Engineer
                                            </option>

                                            <option data_category_id="9" value="Web Application Developer">
                                                Web Application Developer
                                            </option>

                                            <option data_category_id="9" value="Web Designer">
                                                Web Designer
                                            </option>

                                            <option data_category_id="9" value="Web Designer - Trainee">
                                                Web Designer - Trainee
                                            </option>

                                            <option data_category_id="9" value="Web Developer">
                                                Web Developer
                                            </option>

                                            <option data_category_id="9" value="IT Software Fresher">
                                                IT Software Fresher
                                            </option>

                                            <option data_category_id="9" value="Networking Manager">
                                                Networking Manager
                                            </option>

                                            <option data_category_id="9" value="Webmaster">
                                                Webmaster
                                            </option>

                                            <option data_category_id="9" value="Computer Operator">
                                                Computer Operator
                                            </option>

                                            <option data_category_id="9" value="Banking">
                                                Banking
                                            </option>

                                            <option data_category_id="9" value="AngularJS Developer">
                                                AngularJS Developer
                                            </option>

                                            <option data_category_id="9" value="SQL SERVER">
                                                SQL SERVER
                                            </option>

                                            <option data_category_id="9" value="Photoshop">
                                                Photoshop
                                            </option>

                                            <option data_category_id="9" value="Corel Draw">
                                                Corel Draw
                                            </option>

                                            <option data_category_id="9" value="After Effects">
                                                After Effects
                                            </option>

                                            <option data_category_id="9" value="Core PHP">
                                                Core PHP
                                            </option>

                                            <option data_category_id="9" value="Jquery">
                                                Jquery Expert
                                            </option>

                                            <option data_category_id="9" value="Digital Marketing">
                                                Digital Marketing
                                            </option>

                                            <option data_category_id="9" value="Content Writing">
                                                Content Writing
                                            </option>

                                            <option data_category_id="9" value="Blog Posting">
                                                Blog Posting
                                            </option>

                                            <option data_category_id="9" value="19Social Media Marketing33">
                                                Social Media Marketing
                                            </option>

                                            <option data_category_id="9" value="Bootstrap">
                                                {" "}
                                                Bootstrap
                                            </option>

                                            <option data_category_id="9" value="Manual Testing">
                                                Manual Testing
                                            </option>

                                            <option data_category_id="9" value="Operations Manager">
                                                Operations Manager
                                            </option>

                                            <option data_category_id="9" value="Java Full Stack Developer">
                                                Java Full Stack Developer
                                            </option>

                                            <option data_category_id="9" value="MVC">
                                                MVC
                                            </option>

                                            <option data_category_id="9" value="Operations">
                                                Operations
                                            </option>

                                            <option data_category_id="9" value="Javascript">
                                                Javascript
                                            </option>

                                            <option data_category_id="9" value="Nodejs">
                                                {" "}
                                                Nodejs
                                            </option>

                                            <option data_category_id="9" value="Cloud Server Administrator">
                                                Cloud Server Administrator
                                            </option>

                                            <option data_category_id="9" value="Assistant Programmer">
                                                Assistant Programmer
                                            </option>

                                            <option data_category_id="9" value="Security Analyst">
                                                Security Analyst
                                            </option>

                                            <option data_category_id="9" value="IT Officer">
                                                IT Officer
                                            </option>

                                            <option data_category_id="9" value="Quality Assurance">
                                                Quality Assurance
                                            </option>

                                            <option data_category_id="9" value="Programmers">
                                                Programmers
                                            </option>

                                            <option data_category_id="9" value="Data Analyst">
                                                Data Analyst
                                            </option>

                                            <option data_category_id="9" value="Game Developer">
                                                Game Developer
                                            </option>

                                            <option data_category_id="9" value="Team Leader">
                                                Team Leader
                                            </option>

                                            <option data_category_id="9" value="Project Leader">
                                                Project Leader
                                            </option>

                                            <option data_category_id="9" value="Graphic Designer">
                                                Graphic Designer
                                            </option>

                                        </optgroup>

                                        <optgroup label="small tasks">
                                            <option data_category_id="10" value="small tasks">
                                                small tasks
                                            </option>

                                            <option data_category_id="10" value="cooking">
                                            cooking
                                            </option>

                                            <option data_category_id="10" value="Artist">
                                            Artist
                                            </option>

                                            <option data_category_id="10" value="surveys">
                                            surveys
                                            </option>

                                        </optgroup>

                                        <optgroup label="Automation">

                                            <option data_category_id="14" value="Automation">
                                                Automation
                                            </option>

                                            <option data_category_id="14" value="Automation Engineer">
                                                Automation Engineer
                                            </option>

                                            <option data_category_id="14" value="Automation Test Engineer">
                                                Automation Test Engineer
                                            </option>

                                            <option data_category_id="14" value="Automation Tester">
                                                Automation Tester
                                            </option>

                                            <option data_category_id="14" value="Automation Fresher">
                                                Automation Fresher
                                            </option>

                                            <option data_category_id="14" value="Trainee">
                                                Trainee
                                            </option>

                                            <option data_category_id="14" value="Sales">
                                                Sales
                                            </option>

                                            <option data_category_id="14" value="Machine Operator">
                                                Machine Operator
                                            </option>

                                            <option data_category_id="14" value="Technician Engineer">
                                                Technician Engineer
                                            </option>

                                        </optgroup>

                                        <optgroup label="Advertising">
                                            <option data_category_id="67" value="Content Writing">
                                            Content Writing
                                            </option>

                                            <option data_category_id="67" value="Blog Posting">
                                            Blog Posting
                                            </option>

                                            <option data_category_id="67" value="Social Media Marketing">
                                            Social Media Marketing
                                            </option>

                                            <option data_category_id="67" value="Trainee">
                                                Trainee
                                            </option>

                                            <option data_category_id="67" value="Product Executive">
                                                Product Executive
                                            </option>

                                            <option data_category_id="67" value="Graphic Designer">
                                                Graphic Designer
                                            </option>

                                            <option data_category_id="67" value="Computer Operator">
                                                Computer Operator
                                            </option>

                                            <option data_category_id="67" value="IT Software">
                                                IT Software
                                            </option>
                                        </optgroup>

                                    </select>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className=" form-group mt-4">
                            <label className="">Job type *</label>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="checkbox_container">
                                        Full-time
                                        <input
                                            className="form-check-input ml-2"
                                            type="radio"
                                            id="full-time"
                                            name="job_type"
                                            autoComplete="off"
                                            defaultChecked
                                            value="full-time"
                                            onChange={(e) => {
                                            this.handleChange(e)
                                        }}/>
                                        <span className="checkmark"></span>
                                    </label>

                                    <br/>

                                    <label className="checkbox_container">
                                        Part-time
                                        <input
                                            className="form-check-input ml-2"
                                            type="radio"
                                            value="Part-time"
                                            id="part-time"
                                            name="job_type"
                                            autoComplete="off"
                                            onChange={(e) => {
                                            this.handleChange(e)
                                        }}/>
                                        <span className="checkmark"></span>
                                    </label>

                                    <br/>

                                </div>
                                <div className="col-md-4 ">
                                    <label className="checkbox_container">
                                        Contract
                                        <input
                                            className="form-check-input ml-2"
                                            type="radio"
                                            value="Contract"
                                            id="contract"
                                            name="job_type"
                                            autoComplete="off"
                                            onChange={(e) => {
                                            this.handleChange(e)
                                        }}/>
                                        <span className="checkmark"></span>
                                    </label>

                                    <br/>

                                    <label className="checkbox_container">
                                        Internship
                                        <input
                                            className="form-check-input ml-2"
                                            type="radio"
                                            value="Internship"
                                            id="internship"
                                            name="job_type"
                                            autoComplete="off"
                                            onChange={(e) => {
                                            this.handleChange(e)
                                        }}/>
                                        <span className="checkmark"></span>
                                    </label>

                                    <br/>

                                </div>

                                <div className="col-md-4">

                                    <label className="checkbox_container">
                                        Work from Home
                                        <input
                                            className="form-check-input ml-2"
                                            type="radio"
                                            value="Work from Home"
                                            id="work-from-home"
                                            name="job_type"
                                            autoComplete="off"
                                            onChange={(e) => {
                                            this.handleChange(e)
                                        }}/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="row form-group mt-5">
                                <div className="col-12">
                                    <label>Experience *</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-5">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">Min</div>
                                            <select
                                                className="form-control minimum_experience"
                                                id="minimum_experience"
                                                name="min_experience"
                                                required={true}
                                                
                                                onChange={(e) => {
                                                this.handleChange(e)
                                            }}>
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

                                            </select>
                                        </div>
                                        <span className="minimum_experience_span"></span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-5">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">Max</div>
                                            <select
                                                className="form-control"
                                                id="maximum_experience"
                                                name="max_experience"
                                                
                                                required={true}
                                                onChange={(e) => {
                                                this.handleChange(e)
                                            }}>
                                                <option value="">Select Experience
                                                </option>
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
                                                <option value="26">26 Year</option>
                                                <option value="27">27 Year</option>
                                                <option value="28">28 Year</option>
                                                <option value="29">29 Year</option>
                                                <option value="30">30 Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 col-sm-8">
                                    <p className="text-muted">
                                        <b>What will be estimated salary offer to candidates?</b>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-5">
                                    <label htmlFor="salary">Salary (IN INR)</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-4">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">Min</div>
                                            <input
                                                className="form-control min_salary_input"
                                                type="number"
                                                id="min_salary"
                                                name="min_salary"
                                                placeholder="Rs."
                                                autoComplete="off"
                                                required={true}
                                                onChange={(e) => {
                                                this.handleChange(e)
                                            }}/>
                                        </div>
                                        <div className="current_salary_error"></div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-4">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">Max</div>
                                            <input
                                                className="form-control max_salary_input"
                                                type="number"
                                                id="max_salary"
                                                name="max_salary"
                                                placeholder="Rs."
                                                required={true}
                                                onChange={(e) => {
                                                this.handleChange(e)
                                            }}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-sm-12">
                                    {/* <label className="checkbox_container">
                      Hide this from the users
                      <input
                        className="form-check-input keyword_checkbox"
                        type="checkbox"
                        value="1"
                        name="salary_hide"
                        autoComplete="off"
                      />
                      <span className="checkmark"></span>
                    </label> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-8">
                                    <label htmlFor="salary">How many Hires</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-8">
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            id="maximum_hires"
                                            name="maximum_hires"
                                            required={true}
                                            onChange={(e) => {
                                            this.handleChange(e)
                                        }}>
                                            <option value="1 Hire">1 Hire</option>
                                            <option value="2 - 4 Hires">2 - 4 Hires</option>
                                            <option value="5 - 10 Hires">5 - 10 Hires</option>
                                            <option value="10+ Hires">10+ Hires</option>
                                            <option value="recurring_hire">
                                                I have an ongoing need to fill this role
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/*  */}
                        <label className="mt-4">Skills Required</label>
                        <div className="row mb-1">

                            <div className="col-4">
                                <input
                                    type="text"
                                    onChange={(e) => {
                                    this.handleChange(e)
                                    }}
                                    
                                    name="skill"
                                    className="form-control"
                                    placeholder="Type your Skill then press +ADD SKILL"
                                    value={this.state.skill}
                                    />
                            </div>
                            <div className="col-2">
                                <button
                                    type="button"
                                    className="form-control btn btn-info "
                                    onClick={() => {
                                    this.handleClick()
                                }}>
                                    + ADD SKILL
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
                                {this
                                    .state
                                    .skills
                                    .map((skill, index) => {
                                        return <span
                                            key={index}
                                            style={{
                                            wordWrap: "break-word"
                                        }}
                                            className="m-2 p-1 pl-2 pr-2 border border-warning rounded-pill ">{skill}</span>
                                    })}
                            </div>
                        </div>
                        {/*  */}
                        <div className="row mt-5">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Job Description *</label>
                                    <small className="text-muted">Describe the responsibilities of this job.</small>
                                    {/* ,required work experience, skills, or education */}
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        required={true}
                                        onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                        id="exampleFormControlTextarea1"
                                        rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-3">
                                <Link to='/'>
                                <button  className="btn btn-danger btn-block btn">
                                    Cancel
                                </button>
                                </Link>
                            </div>
                            <div className="col-3">
                                
                                <button type="submit" className="btn btn-success btn-block btn">
                                    Post
                                </button>
                                
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
    return {auth_token:state.auth_token,_id:state._id};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signedUp
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
