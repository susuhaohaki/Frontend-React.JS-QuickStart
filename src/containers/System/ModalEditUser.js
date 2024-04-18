import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: '',
            password: '',
            FirstName: '',
            LastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            // reset this.state
            this.setState({
                email: '',
                password: '',
                FirstName: '',
                LastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                FirstName: user.firstName,
                LastName: user.lastName,
                address: user.address

            })
        }
        console.log("didmount edit modal", this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState }, () => {
            console.log("check good state", this.state);
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'FirstName', 'LastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter :' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit user modal
            this.props.editUser(this.state);

        }

    }



    render() {
        // console.log("check child props", this.props);
        // console.log("check child open modal ", this.props.isOpen)
        // console.log("check props form parent", this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                                disabled />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input disabled type='password' onChange={(event) => { this.handleOnchangeInput(event, "password") }} value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "FirstName") }} value={this.state.FirstName} />
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "LastName") }} value={this.state.LastName} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "address") }} value={this.state.address} />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}
                    >
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




