import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";
import {SEVERITY, utilsContext} from "../context/UtilsContext";
import {useQuery} from "@apollo/client";
import {MEETINGS} from "../graphql/meetingSchemas";
import InfiniteScroll from 'react-infinite-scroll-component';


const UpcomingMeetings = () => {
  const upcomingMeetingsRef = useRef(null);
  const {upcomingMeetings, setUpcomingMeetings, displayModal} = useContext(utilsContext);
  const {data, error, refetch} = useQuery(MEETINGS)

  // for handling pagination
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  // const _handleScroll = () => {
  //   upcomingMeetingsRef.current?.scrollBy(0, 100);
  // }

  useEffect(() => {
    if (data && !error) {
      setUpcomingMeetings(data?.meetings?.docs);
    }
  }, [])

  const loadMoreMeetings = (event) => {
    refetch({page: page + 1})
      .then(r => {
        setPage(r.data?.meetings?.page);
        setHasNextPage(r.data?.meetings?.hasNextPage);
        setUpcomingMeetings(p => [...p, ...r.data?.meetings?.docs]);
      })
      .catch(e => displayModal(e.message, SEVERITY.ERROR))
  }


  useEffect(() => {
    console.log(upcomingMeetings);
    console.log()
  }, [upcomingMeetings])

  return (
    <section className='upcoming-meetings-section'>
      <h3 className='dashboard-subheading'>Upcoming meetings</h3>
      {upcomingMeetings ? (
        <>
          <List
            className='upcoming-meetings-list'
            // onScroll={loadMoreMeetings}
          >
            <InfiniteScroll
              next={loadMoreMeetings}
              hasMore={hasNextPage}
              loader={<LinearProgress color={'primary'}/>}
              height={'60vh'}
              ref={upcomingMeetingsRef}
              dataLength={upcomingMeetings.length}>
              {upcomingMeetings?.map((meeting) => (
                <ListItem>
                  <div key={meeting._id}>
                    <ListItemText
                      primary={meeting?.title}
                      secondary={`${new Date(Number(meeting?.scheduledTime)).toLocaleString()} • ${meeting?.platform}`}
                    />
                    <ListItemSecondaryAction>
                      <Button variant='text' color='primary' onClick={() => window.open(meeting?.link)}>
                        Open link
                      </Button>
                    </ListItemSecondaryAction>
                  </div>
                </ListItem>
              ))}
            </InfiniteScroll>
          </List>
          {/*<div className='icon-btn-container'>*/}
          {/*  <IconButton onClick={_handleScroll} className='upcoming-meetings-scroll-btn' color='primary'*/}
          {/*              variant='filled'>*/}
          {/*    <ArrowDownwardRounded/>*/}
          {/*  </IconButton>*/}
          {/*</div>*/}
        </>
      ) : <CircularProgress className='circular-progress' color='primary'/>}
    </section>
  )
};

export default UpcomingMeetings;
