import React, { lazy } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import { useDispatch } from 'react-redux'

const WidgetsDashboard = lazy(() => import('../widgets/WidgetsDashboard.js'))

const Dashboard = () => {
  const dispatch = useDispatch()
  dispatch({type: 'set', darkMode: false})

  return (
    <>
      <WidgetsDashboard />

      <CRow>
        <CCol>
          <CCard color="transparent" className="transaction-table d-box-shadow1 d-border">
            <CCardHeader color="transparent d-border pl-0" className="header-title">
              Transaction History
            </CCardHeader>
            <CCardBody className="p-0" color="default">
              
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">From</th>
                    <th className="text-center">To</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Date Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      USDT
                    </td>
                    <td className="text-center">
                      GCash
                    </td>
                    <td className="text-center">
                      245.09
                    </td>
                    <td className="text-center">
                      2021-7-27 07:45 am
                    </td>
                    <td>
                      Completed
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      USDT
                    </td>
                    <td className="text-center">
                      GCash
                    </td>
                    <td className="text-center">
                      245.09
                    </td>
                    <td className="text-center">
                      2021-7-27 07:45 am
                    </td>
                    <td>
                      Completed
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      USDT
                    </td>
                    <td className="text-center">
                      GCash
                    </td>
                    <td className="text-center">
                      245.09
                    </td>
                    <td className="text-center">
                      2021-7-27 07:45 am
                    </td>
                    <td>
                      Completed
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      USDT
                    </td>
                    <td className="text-center">
                      GCash
                    </td>
                    <td className="text-center">
                      245.09
                    </td>
                    <td className="text-center">
                      2021-7-27 07:45 am
                    </td>
                    <td>
                      Completed
                    </td>
                  </tr>
                  
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Dashboard