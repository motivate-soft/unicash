import React, { lazy, useState, useEffect } from 'react'
import {
  CCard,
  CButton,
  CCardBody
} from '@coreui/react'
import TextField from '@material-ui/core/TextField';
import {
    alpha,
    makeStyles,
  } from '@material-ui/core/styles';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
//   } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { userService } from '../../controllers/_services';
import InputMask from 'react-input-mask';
import { successNotification, warningNotification } from '../../controllers/_helpers';

const TFAVerification = () => {
 const dispatch = useDispatch()
 const history = useHistory()
 
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [fullName, setFullName] = useState()
 const [is2FA, setIs2FA] = useState()

 const user = useSelector(state => state.user)
 
 useEffect(() => {
    if (localStorage.getItem('user') && user) {
        setIs2FA(user.is2FA)
    }
 }, [user]);
  
  const onSubmit = () => {
      if (user && fullName !== '') {
          const newUser = {
              ...user,
              "is2FA": !is2FA
          }
          userService.update(newUser).then(
              result => {
                  dispatch({type: 'set', user: result})
                  successNotification("Updated your profile successfully", 3000)
              },
              error => {
                  warningNotification(error, 3000)
              }
          )
      }
  }
  // render
  return (

    <CCard color="transparent" className="d-box-shadow1 d-border" style={{height: "222.5px"}}>
        <CCardBody className="card-setting m-0" style={{height: "222.5px"}}>

            <div className="d-flex mt-3">
                <h5>
                    With 2-step verification, you protect your account with both your password and your phone. To log in into account or withdraw funds you will require a separate code that you will get in the Google Authenticator app
                </h5>
            </div>
            
            <div className="d-flex mt-0 float-right">
                <CButton className="button-exchange" onClick={() => onSubmit()} disabled={isSubmitting}>
                    {is2FA ? 'Disable' : 'Enable'}
                </CButton>
            </div>
        </CCardBody>
    </CCard>

    )
}

export default TFAVerification
