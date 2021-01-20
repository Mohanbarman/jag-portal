import React, {createContext, useState} from 'react';
import {demoUpcomingMeetings} from "../Content";


const utilsContext = createContext();

const _defaultModalState = {
  isOpen: false,
  content: '',
  severity: ''
}

const UtilsProvider = (props) => {
  const [modalState, setModalState] = useState(_defaultModalState)
  const [upcomingMeetings, setUpcomingMeetings] = useState(demoUpcomingMeetings);

  const hideModal = () => {
    setModalState(_defaultModalState)
  }

  return (
    <utilsContext.Provider
      value={{
        modalState,
        setModalState,
        hideModal,
        upcomingMeetings,
        setUpcomingMeetings,
      }} {...props}/>
  )
}

export {utilsContext, UtilsProvider}
