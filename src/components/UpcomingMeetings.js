import React, {useState, useEffect, useRef} from 'react';
import {demoUpcomingMeetings} from "../Content";
import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider, IconButton,
} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";


const UpcomingMeetings = () => {
  const [meetings, setMeetings] = useState(demoUpcomingMeetings);
  const upcomingMeetingsRef = useRef(null);

  // useEffect(() => {
  //   const t = setInterval(() => {
  //     setMeetings(p => [...p, {
  //       id: Date.now(),
  //       name: 'Sem amet massa vel morbi at posuerevel morbi at posuere',
  //       date: Date.now(),
  //       platform: 'zoom',
  //       link: 'https://exmple.com/meeting',
  //     }])
  //   }, 1000 * 10)
  //   return () => clearInterval(t);
  // }, [])

  const _handleScroll = () => {
    upcomingMeetingsRef.current?.scrollBy(0, 100);
  }

  return(
      <section className='upcoming-meetings-section'>
        <h3 className='dashboard-subheading'>Upcoming meetings</h3>
        <List className='upcoming-meetings-list' ref={upcomingMeetingsRef} style={{maxHeight: '40vh', overflow: 'auto'}}>

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
        <div className='icon-btn-container'>
          <IconButton onClick={_handleScroll} className='upcoming-meetings-scroll-btn' color='primary' variant='filled'>
            <ArrowDownwardRounded/>
          </IconButton>
        </div>
      </section>
  )
}

export default UpcomingMeetings;
