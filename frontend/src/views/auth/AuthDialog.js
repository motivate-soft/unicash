import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

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
  )
}

export default TheHeader
