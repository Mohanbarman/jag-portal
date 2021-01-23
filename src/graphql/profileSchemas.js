// Graphql for authentication
import {gql} from "@apollo/client";

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

export {LOGIN, LOGOUT, CURRENT_USER, EDIT_USER};