import {Snackbar} from "@material-ui/core";
import React, {useContext} from "react";
import {utilsContext} from "./context/UtilsContext";
import MuiAlert from '@material-ui/lab/Alert';


const Modal = () => {
  const { modalState, hideModal } = useContext(utilsContext);

  return (
    <Snackbar
      open={modalState.isOpen}
      autoHideDuration={1000 * 5}
      onClose={hideModal}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <MuiAlert
        onClose={hideModal}
        elevation={20}
        variant='filled'
        severity={modalState.severity}
      >
        {modalState.content}
      </MuiAlert>
    </Snackbar>

  )
}

export default Modal;
