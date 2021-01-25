import { gql } from "@apollo/client";

const SUBMIT_CONTACT = gql`
    mutation SUBMIT_CONTACT($firstName:String!, $lastName:String, $email:String!, $message:String!) {
        submitContact(firstName:$firstName, lastName:$lastName, email:$email, message:$message) {
            email
        }
    }
`

export { SUBMIT_CONTACT }