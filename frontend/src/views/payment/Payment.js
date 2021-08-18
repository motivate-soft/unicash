import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  dispatch({type: 'set', darkMode: false})

  if (!localStorage.getItem('user')) {
    history.replace('/home')
  }

  return (
    <>
     
      <CCard color="transparent" className="transaction-table d-box-shadow1 d-border p-0 m-0">
        <CCardHeader color="transparent d-border p-0" className="header-title">
          PAYMENT
        </CCardHeader>
        <CCardBody className="p-0" color="default">
          
          
          
        </CCardBody>
      </CCard>

    </>
  )
}

export default Payment
