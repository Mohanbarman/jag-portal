import {gql} from '@apollo/client'

const SUBMIT_LEAD = gql`
  mutation SUBMIT_LEAD(
      $firstName:String, 
      $lastName:String, 
      $email:String, 
      $phone:String, 
      $city:String, 
      $state:String, 
      $user:String) {
      submitLead(input: {
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          phone: $phone,
          city: $city,
          state: $state,
          userId: $user,
      }) {
          email
      }
  }
`

export {SUBMIT_LEAD};
