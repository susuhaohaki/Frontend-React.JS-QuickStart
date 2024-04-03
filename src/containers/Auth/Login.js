import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errorMessage: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState(
            {
                username: event.target.value
            }
        )
    }
    handleOnChangePassword = (event) => {
        this.setState(
            {
                password: event.target.value
            }
        )
    }
    handleLogin = async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLoginAPI(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            else if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })

                }
            }
        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container container' >
                    <div className='login-content'>
                        <div>
                            <div className='col-12 text-login'>Login</div>
                            <div className='form-group login-input col-12' >
                                <label>Username</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)} />
                            </div>
                            <div className='form-group login-input col-12'>
                                <label>Password</label>
                                <div className='custom-input-password'>
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control'
                                        placeholder='Enter your password'
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                    />
                                    <span
                                        onClick={() => this.handleShowHidePassword()}
                                    >
                                        <i class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>

                                </div>

                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errorMessage}
                            </div>
                            <button
                                class="col-12 login-btn"
                                onClick={() => { this.handleLogin() }}
                            >Log in</button>
                            <div>forgot your password? </div>
                            <div className='col-12 text-center mt-3'>
                                <span >Or login with: </span>
                            </div>
                            <div className='col-12 social-login d-flex justify-content-center'>
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-twitter twitter"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
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
        //        userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
