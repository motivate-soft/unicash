import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

// import {
//     CButton,
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
//     CModal,
//     CModalBody
//   } from '@coreui/react'

const Signup = React.lazy(() => import('./Signup'));
const Signin = React.lazy(() => import('./Signin'));

const TheHeader = () => {
  const dispatch = useDispatch()

  const openSignup = useSelector(state => state.openSignup)
  const openSignin = useSelector(state => state.openSignin)

  const handleClose = () => {
    dispatch({type: 'set', openSignup: false})
    dispatch({type: 'set', openSignin: false})
  };

  return (
    <>
        <Dialog open={openSignup || openSignin} onClose={handleClose} aria-labelledby="signup-form-dialog" className="p-0 ">
            <DialogContent className="p-0 m-0">
                {openSignin ? <Signin /> : <Signup />} 
            </DialogContent>
        </Dialog>
    </>

    // <CModal 
    //     color="transparent"
    //     show={openSignup || openSignin} 
    //     onClose={handleClose}
    //     className="p-0 m-0 auth-modal d-box-shadow1 d-border"
    //     >
    //     <CModalBody color="transparent" className="p-0 m-0">
    //         {openSignin ? <Signin /> : <Signup />} 
    //     </CModalBody>
    // </CModal>
  )
}

export default TheHeader
