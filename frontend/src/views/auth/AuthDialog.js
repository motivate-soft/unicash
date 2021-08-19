import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CModal,
    CModalBody
  } from '@coreui/react'

const Signup = React.lazy(() => import('./Signup'));
const Signin = React.lazy(() => import('./Signin'));
const EmailVerify = React.lazy(() => import('./EmailVerify'));

const AuthDialog = () => {
  const dispatch = useDispatch()

  const openSignup = useSelector(state => state.openSignup)
  const openSignin = useSelector(state => state.openSignin)
  const openEmailVerification = useSelector(state => state.openEmailVerification)

  const handleClose = () => {
    dispatch({type: 'set', openSignup: false})
    dispatch({type: 'set', openSignin: false})
    dispatch({type: 'set', openEmailVerification: false})
  };

  return (
    <CModal 
        show={openSignup || openSignin || openEmailVerification} 
        onClose={handleClose}
        className="p-0 auth-modal"
        centered
        size="sm"
        >
        <CModalBody className="p-0">
            {openSignin ? <Signin /> : (openEmailVerification ? <EmailVerify /> : <Signup /> )} 
        </CModalBody>
    </CModal>
  )
}

export default AuthDialog
