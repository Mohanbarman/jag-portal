import {gql} from '@apollo/client';

const MEETINGS = gql`
  query MEETINGS($page:Int, $limit:Int, $orderBy:String) {
      meetings(page:$page, limit:$limit, orderBy:$orderBy) {
          docs {
              _id
              title
              description
              scheduledTime
              platform
              link
          }
      }
  }
`

const CREATE_MEETING = gql`
    mutation CREATE_MEETING($title:String, $description:String, $scheduledTime:String, $platform:String, $link:String) {
        createMeeting(input: {
            title: $title, 
            description: $description, 
            scheduledTime: $scheduledTime, 
            platform: $platform, 
            link: $link   
        }) {
            title
            description
            scheduledTime
            platform
            link
        }
    }
`

export {CREATE_MEETING, MEETINGS};
