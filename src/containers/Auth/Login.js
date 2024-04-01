import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container container' >
                    <div className='login-content'>
                        <form>
                            <div className='col-12 text-login'>Login</div>
                            <div className='form-group login-input col-12' >
                                <label>Username</label>
                                <input type='text' className='form-control' placeholder='Enter your username'></input>
                            </div>
                            <div className='form-group login-input col-12'>
                                <label>Password</label>
                                <input type='password' className='form-control' placeholder='Enter your password'></input>
                            </div>
                            <button type="submit" class="col-12 login-btn">Log in</button>
                            <div>forgot your password? </div>
                            <div className='col-12 text-center mt-3'>
                                <span >Or login with: </span>
                            </div>
                            <div className='col-12 social-login d-flex justify-content-center'>
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-twitter twitter"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
