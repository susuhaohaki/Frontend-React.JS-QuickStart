import React, { Component } from 'react';
import './UserManage.scss'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode != 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                // emitter.emit("EVENT_CLEAR_MODAL_DATA",{'id':'your id'})
                emitter.emit("EVENT_CLEAR_MODAL_DATA")
            }

        } catch (e) {
            console.log(e)
        }
        console.log("check data from child ", data)
    }
    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)

        }

    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='container'>
                <div className='title text-center'>Manage User With Admin</div>
                <div className='mt-3 mb-3'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddUser()}>
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='user-table'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th >Email</th>
                                <th >FirstName</th>
                                <th >LastName</th>
                                <th >Address</th>
                                <th >Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td scope="row" >{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}


                />
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
