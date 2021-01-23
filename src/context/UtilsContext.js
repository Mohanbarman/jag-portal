import React, {createContext, useEffect, useState} from 'react';
import {MEETINGS} from "../graphql/meetingSchemas";
import {useQuery} from "@apollo/client";


const utilsContext = createContext();

const SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

const _defaultModalState = {
  isOpen: false,
  content: '',
  severity: ''
}

const UtilsProvider = (props) => {
  const [modalState, setModalState] = useState(_defaultModalState)
  const [upcomingMeetings, setUpcomingMeetings] = useState(undefined);
  const upcomingMeetingsQuery = useQuery(MEETINGS);

  const hideModal = () => {
    setModalState(_defaultModalState)
  }

  useEffect(() => {
    if (!upcomingMeetingsQuery.loading) {
      setUpcomingMeetings(upcomingMeetingsQuery.data?.meetings?.docs);
    }
  }, [upcomingMeetingsQuery])

  const displayModal = (content, severity) => {
    setModalState({
      isOpen: true,
      severity: severity,
      content: content
    })
  }

  return (
    <utilsContext.Provider
      value={{
        modalState,
        setModalState,
        hideModal,
        upcomingMeetings,
        setUpcomingMeetings,
        displayModal,
      }} {...props}/>
  )
}

export {utilsContext, UtilsProvider, SEVERITY}
