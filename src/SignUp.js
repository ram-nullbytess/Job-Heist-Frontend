import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux"; 
import {signedUp} from "./redux/actions";
import "./SignUp.css";
const Axios = require('axios');
let axios = Axios.create({baseURL: 'https://job-heist1.herokuapp.com/'});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      alert: false,
      alertMessage: ""
    };
  }

  // signup API call
  signupUser = async (user,target) => {
    try {
      const response = await axios.post(
        "/api/users/sign-up",
        user
      );

      this.setState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        alertMessage: "You have signed up successfully",
        alert: true
      },()=>{target.reset()});
      this.props.signedUp(response.data);
      this.props.history.push('/sign-in')

    } catch (error) {
      this.setState({ alert: true, alertMessage: error.response.data });
    }
  };

  handleChange = e => {
    switch (e.target.name) {
      case "username": {
        this.setState({ username: e.target.value });
        break;
      }
      case "email": {
        this.setState({ email: e.target.value });
        break;
      }
      case "password": {
        this.setState({ password: e.target.value });
        break;
      }
      case "confirm_password": {
        this.setState({ confirm_password: e.target.value });
        break;
      }
      default:
        return;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.username.length < 3) {
      if (!this.state.alert)
        this.setState({
          alert: true,
          alertMessage: "Name must be at least 3 characters long"
        });
      else
        this.setState({
          alertMessage: "Name must be at least 3 characters long"
        });
      return;
    } else if (this.state.password.length < 6) {
      if (!this.state.alert)
        this.setState({
          alert: true,
          alertMessage: "Password must be at least 6 characters long"
        });
      else
        this.setState({
          alertMessage: "Password must be at least 6 characters long"
        });
      return;
    } else if (this.state.confirm_password !== this.state.password) {
      if (!this.state.alert)
        this.setState({
          alert: true,
          alertMessage: "Password and Confirm Password does not match"
        });
      else
        this.setState({
          alertMessage: "Password and Confirm Password does not match"
        });
      return;
    }
    // user OBJ
    let user = {
      email: this.state.email,
      name: this.state.username,
      password: this.state.password
    };
    this.signupUser(user,e.target);
  };

  render() {
    return (
      <div className="bg">
        <div className="signup-form mt-5">
          {/* Alert */}
          {this.state.alert ? (
            <div className = {(this.state.alertMessage === "You have signed up successfully") ? "alert alert-success  fade in show" : "alert alert-warning  fade in show" }>
              <strong>Warning! </strong> {this.state.alertMessage}
            </div>
          ) : null}
          {/* Alert */}
          <form onSubmit={e => this.handleSubmit(e)}>
            <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            <hr />
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  required="required"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-paper-plane"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  required="required"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock"></i>
                  <i className="fa fa-check"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required="required"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-inline">
                <input type="checkbox" required="required" />I accept the
                <a href="/sign-up">Terms of Use</a>
                &amp;
                <a href="/sign-up">Privacy Policy</a>
              </label>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-success btn-lg btn-block">
                Sign Up
              </button>
            </div>
            <hr/>
            <div className="text-center">
            Already have an account ?
            <Link to="/sign-in">  Sign-in here</Link>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signedUp},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (SignUp);
