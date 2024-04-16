import { template } from "lodash";
import axios from "../axios"

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    // template String
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log("check data from service", data)
    return axios.post(`/api/create-new-user`, data);
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    });
}
export { handleLoginAPI, getAllUsers, createNewUserService, deleteUserService }