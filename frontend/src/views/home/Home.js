import React, { lazy } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetSimple,
  CImg
} from '@coreui/react'
import { useDispatch } from 'react-redux'

const WidgetsExchange = lazy(() => import('../widgets/WidgetsExchange.js'))
const WidgetsAdvantage = lazy(() => import('../widgets/WidgetsAdvantage.js'))

const Home = () => {
  const dispatch = useDispatch()
  
  dispatch({type: 'set', darkMode: true})

  return (
    <>
      <WidgetsExchange/>

      <CRow>
        <CCol>
          <CCard color="transparent" className="transaction-table d-box-shadow1 d-border mt-0">
            <CCardHeader color="transparent d-border pl-0" className="header-title">
              Live Transaction
            </CCardHeader>
            <CCardBody className="p-0" color="default">
              
              <table className="table table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Username</th>
                    <th className="text-center">From</th>
                    <th className="text-center">To</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Date Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      recbon***
                    </td>
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
                    <td>
                      recbon***
                    </td>
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
                    <td>
                      recbon***
                    </td>
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

      <WidgetsAdvantage />

      <CRow>
        <CCol>
          <CCard color="transparent" className="widget-feedbacks d-box-shadow1 d-border">
            <CCardHeader color="transparent pl-0" className="header-title d-border">
              Trusted by million users
            </CCardHeader>
            <CCardBody className="p-0" color="default">
              <CRow color="transparent d-border">
                <CCol sm="12" md="12" lg="6">
                  <CWidgetSimple className="widget-feedback p-0">
                    <div className="d-flex p-0">
                      <div><CImg src={'img/icons8-male-user-50.png'} height={64} width={64}></CImg></div>
                      <div className="feedback">
                        <div className="align-items-start text-left feedback-auth">kicka***</div>
                        <div className="align-items-end small text-muted text-left feedback-content">
                            It was a pure pleasure to use this service, Also.
                            I want to pay attention to the greatest support team ever
                        </div>
                      </div>
                    </div>
                  </CWidgetSimple>
                </CCol>
                <CCol sm="12" md="12" lg="6">
                  <CWidgetSimple className="widget-feedback p-0">
                    <div className="d-flex p-0">
                      <div><CImg src={'img/icons8-male-user-50.png'} height={64} width={64}></CImg></div>
                      <div className="feedback">
                        <div className="align-items-start text-left feedback-auth">Loyd***</div>
                        <div className="align-items-end small text-muted text-left feedback-content">
                            It was a pure pleasure to use this service, Also.
                            I want to pay attention to the greatest support team ever
                        </div>
                      </div>
                    </div>
                  </CWidgetSimple>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Home
