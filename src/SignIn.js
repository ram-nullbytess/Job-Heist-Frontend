import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { bindActionCreators } from "redux";
import "./SignIn.css";
import { login } from "./redux/actions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email :"" ,
      password: "",
      alert: false
    };
  }

  handleChange = e => {
    switch (e.target.name) {
      case "email": {
        this.setState({ email: e.target.value });
        break;
      }
      case "password": {
        this.setState({ password: e.target.value });
        break;
      }
      default:
        return;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password.length < 6 ) {
      if(!this.state.alert)
      this.setState({ alert: true });
      return;
    }else if(this.state.alert){
      this.setState({ alert: false });
    }

    const user = { email: this.state.email, password: this.state.password };
    this.props.login(user);
  };

  render() {
    return (
      <div className='bg'>
        <div className="signup-form mt-5">
          {/* Alert */}
          {this.state.alert || this.props.alert ? (
            <div className="alert alert-warning alert-dismissible fade in show">
              <strong>Warning!</strong> Invalid Login Credencials. Try again
            </div>
          ) : null}
          {/* Alert */}

          <form onSubmit={e => this.handleSubmit(e)}>
            <h2>Sign In</h2>
            <p></p>
            <hr />
            <div className="form-group"></div>
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
                  value={this.state.email}
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

            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-success btn-block btn-lg"
              >
                Sign In
              </button>
            </div>

            <div className="form-group text-center ">
              <p className="hint-text">
                <a href="/">Forgot Password?</a>
              </p>
              <hr />
            </div>

            <div className="text-center">
              Don't have an account ?
              <Link to="/sign-up"> Sign-up here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {alert:state.alert,email:state.email};
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
