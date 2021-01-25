// Graphql for authentication
import { gql } from "@apollo/client";

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id,
            firstName,
            lastName,
            email,
            username,
            role,
            profilePic,
        }
    }
`
const CURRENT_USER = gql`
    query CURRENT_USER {
        currentUser {
            _id,
            firstName,
            lastName,
            email,
            username,
            role,
            profilePic,
        }
    }
`
const LOGOUT = gql`
    mutation LOGOUT {
        logout
    }
`
const EDIT_USER = gql`
    mutation EDIT_USER($firstName:String!, $lastName:String, $profilePic:String) {
        editUser(firstName: $firstName, lastName: $lastName, profilePic: $profilePic) {
            _id,
            firstName,
            lastName,
            email,
            username,
            role,
            profilePic, 
        }
    }
`
const REGISTER_USER = gql`
    mutation REGISTER_USER($firstName:String!, $lastName:String, $email:String!, $password:String!, $empId:String!) {
        registerUser(input: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            password: $password,
            empId: $empId,
        }) {
            _id,
            firstName,
            lastName,
            email,
            username,
            role,
            profilePic,
        }
    }
`

const RESET_PASS = gql`
    mutation RESET_PASS($email:String!, $otp:Int, $password:String) {
        resetPass(email:$email, otp:$otp, password:$password)
    }
`

export {
    LOGIN,
    LOGOUT,
    CURRENT_USER,
    EDIT_USER,
    REGISTER_USER,
    RESET_PASS,
};
