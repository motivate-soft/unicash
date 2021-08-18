import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CModal,
    CModalBody
  } from '@coreui/react'

const Signup = React.lazy(() => import('./Signup'));
const Signin = React.lazy(() => import('./Signin'));

const AuthDialog = () => {
  const dispatch = useDispatch()

  const openSignup = useSelector(state => state.openSignup)
  const openSignin = useSelector(state => state.openSignin)

  const handleClose = () => {
    dispatch({type: 'set', openSignup: false})
    dispatch({type: 'set', openSignin: false})
  };

  return (
    // <Dialog transitionDuration={0} open={openSignup || openSignin} onClose={handleClose} aria-labelledby="signup-form-dialog" className="p-0 ">
    //     <DialogContent className="p-0 m-0">
    //         {openSignin ? <Signin /> : <Signup />} 
    //     </DialogContent>
    // </Dialog>

    <CModal 
        show={openSignup || openSignin} 
        onClose={handleClose}
        className="p-0 auth-modal"
        centered
        size="sm"
        >
        <CModalBody className="p-0">
            {openSignin ? <Signin /> : <Signup />} 
        </CModalBody>
    </CModal>
  )
}

export default AuthDialog
