import React, { lazy, useEffect, useState } from 'react'
import {
  CRow,
  CCol
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const AdminSetting = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  dispatch({type: 'set', darkMode: false})

  const user = useSelector(state => state.user)

  if (!localStorage.getItem('user') || !user || !user.role) {
    dispatch({type: 'set', darkMode: true})
    history.push('/home')
  }

  return (
    <>
      <CRow color="transparent" className="d-box-shadow1">
        <CCol className="pr-lg-1 pr-md-1 d-box-shadow1 d-border" sm="12" lg="12" md="12">
          <h3>Admin Setting</h3>
        </CCol>
      </CRow>
    </>
  )
}

export default AdminSetting
