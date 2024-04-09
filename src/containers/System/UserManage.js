import React, { Component } from 'react';
import './UserManage.scss'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    handleAddUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }


    render() {
        let arrUsers = this.state.arrUsers;
        console.log("tadatada", arrUsers);
        return (
            <div className='container'>
                <div className='title text-center'>Manage User With Admin</div>
                <div className='mt-3 mb-3'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddUser()}>
                        <i class="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='user-table'>
                    <table id="customers">
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td scope="row" >{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i class="fas fa-edit"></i></button>
                                            <button className='btn-delete'><i class="fas fa-trash"></i></button>
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
                    test={'abc'}


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
