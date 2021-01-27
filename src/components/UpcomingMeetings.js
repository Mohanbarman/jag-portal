import React, {useContext, useEffect, useRef} from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";
import {utilsContext} from "../context/UtilsContext";
import {useQuery} from "@apollo/client";
import {MEETINGS} from "../graphql/meetingSchemas";


const UpcomingMeetings = () => {
  const upcomingMeetingsRef = useRef(null);
  const {upcomingMeetings, setUpcomingMeetings} = useContext(utilsContext);
  const {data, error, refetch} = useQuery(MEETINGS)

  const _handleScroll = () => {
    upcomingMeetingsRef.current?.scrollBy(0, 100);
  }

  useEffect(() => {
    if (data && !error) {
      setUpcomingMeetings(data?.meetings?.docs);
    }
  }, [data, error])

  return (
    <section className='upcoming-meetings-section'>
      <h3 className='dashboard-subheading'>Upcoming meetings</h3>
      {upcomingMeetings ? (
        <>
          <List className='upcoming-meetings-list' ref={upcomingMeetingsRef}
                style={{maxHeight: '40vh', overflow: 'auto'}}>
            {upcomingMeetings?.map((meeting) => (
              <div key={meeting._id}>
                <ListItem alignItems={'flex-start'}>
                  <ListItemText
                    primary={meeting?.title}
                    secondary={`${new Date(Number(meeting?.scheduledTime)).toLocaleString()} • ${meeting?.platform}`}
                  />
                  <ListItemSecondaryAction>
                    <Button variant='text' color='primary' onClick={() => window.open(meeting?.link)}>
                      Open link
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li"/>
              </div>
            ))}
          </List>
          <div className='icon-btn-container'>
            <IconButton onClick={_handleScroll} className='upcoming-meetings-scroll-btn' color='primary'
                        variant='filled'>
              <ArrowDownwardRounded/>
            </IconButton>
          </div>
        </>
      ) : <CircularProgress className='circular-progress' color='primary'/>}
    </section>
  )
}

export default UpcomingMeetings;
