import React, {useState, useEffect} from 'react';
import {demoUpcomingMeetings} from "../Content";
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
} from "@material-ui/core";


const UpcomingMeetings = () => {
  const [meetings, setMeetings] = useState(demoUpcomingMeetings);


  useEffect(() => {
    const t = setInterval(() => {
      setMeetings(p => [...p, {
        id: Date.now(),
        name: 'Sem amet massa vel morbi at posuerevel morbi at posuere',
        date: Date.now(),
        platform: 'zoom',
        link: 'https://exmple.com/meeting',
      }])
    }, 1000 * 10)
    return () => clearInterval(t);
  }, [])

  return(
      <section className='upcoming-meetings-section'>
        <h3 className='dashboard-subheading'>Upcoming meetings</h3>
        <List className='upcoming-meetings-list' style={{maxHeight: '500px', overflow: 'auto'}}>

          {meetings.map((meeting) => (
            <div key={meeting.id}>
              <ListItem alignItems={'flex-start'} >
                <ListItemText
                  primary={meeting.name}
                  secondary={`${new Date(meeting.date).toLocaleString()} • ${meeting.platform}`}
                />
                <ListItemSecondaryAction>
                  <Button variant='text' color='primary' onClick={() => window.open(meeting.link)}>
                    Open link
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            )).reverse()}

        </List>
      </section>
  )
}

export default UpcomingMeetings;
