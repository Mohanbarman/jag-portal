import React, {createContext, useState} from 'react';


const utilsContext = createContext();

const _defaultModalState = {
  isOpen: false,
  content: '',
  severity: ''
}

const UtilsProvider = (props) => {
  const [modalState, setModalState] = useState(_defaultModalState)

  const hideModal = () => {
    setModalState(_defaultModalState)
  }

  return (
    <utilsContext.Provider
      value={{
        modalState,
        setModalState,
        hideModal,
      }} {...props}/>
  )
}

export {utilsContext, UtilsProvider}
