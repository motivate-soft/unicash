import React, { lazy, useEffect, useState } from 'react'
import {
  CRow,
  CCol
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const PersionalInfoSetting = lazy(() => import('../widgets/PersionalInfoSetting'))

const PersionalSetting = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  dispatch({type: 'set', darkMode: false})

  const user = useSelector(state => state.user)

  if (!localStorage.getItem('user') || !user) {
    dispatch({type: 'set', darkMode: true})
    history.push('/home')
  }

  return (
    <>
      <CRow color="transparent" className="d-box-shadow1">
        <CCol className="p-0 d-box-shadow1 d-border" sm="12" lg="6" md="6">
            <h3>Persional Information</h3>
            <PersionalInfoSetting />
        </CCol>
        <CCol className="p-0 d-box-shadow1 d-border" sm="12" lg="6" md="6"></CCol>
      </CRow>
    </>
  )
}

export default PersionalSetting
