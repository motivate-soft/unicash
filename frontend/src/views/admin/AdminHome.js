import React, { lazy, useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { paymentService } from '../../controllers/_services/payment.service';

const AdminHome = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  dispatch({type: 'set', darkMode: false})

  const user = useSelector(state => state.user)

  if (!localStorage.getItem('user') || !user || !user.role) {
    dispatch({type: 'set', darkMode: true})
    history.push('/home')
  }

  const [mytransactions, setMytransactions] = useState()

  useEffect(() => {
    paymentService.getAllTransactions()
    .then(
      transactions => {
        setMytransactions(transactions)
      },
      error => {}
    )
  }, []);

  return (
    <>
      <CRow color="transparent" className="d-box-shadow1">
        <CCol className="pr-lg-1 pr-md-1 d-box-shadow1 d-border" sm="12" lg="12" md="12">
          <h3>Admin Home</h3>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard color="transparent" className="transaction-table d-box-shadow1 d-border mt-0">
            <CCardHeader color="transparent d-border pl-0" className="header-title">
              Pending Transaction
            </CCardHeader>
            <CCardBody className="p-0" color="default">
            { mytransactions && 
              <table className="table table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Username</th>
                    <th className="text-center">From</th>
                    <th className="text-center">To</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Date Time</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  mytransactions.map((transaction, index) => (
                    <tr>
                      <td>
                        { transaction.userName }
                      </td>
                      <td className="text-center">
                        {transaction.from}
                      </td>
                      <td className="text-center">
                        {transaction.to}
                      </td>
                      <td className="text-center">
                        {transaction.amount}
                      </td>
                      <td className="text-center">
                        { format(new Date(transaction.createdAt), 'yyyy-MM-dd kk:mm') }
                      </td>
                      <td className="text-center">
                        {transaction.status}
                      </td>
                      <td className="text-center">
                          <CButton color="success">Process</CButton>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            }
            { Object.assign([], mytransactions).length === 0 && 
              <h3 className="text-muted m-3 pt-3 text-center">NO TRANSACTION</h3>
            }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AdminHome
