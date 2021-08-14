import React from 'react'
import {
  CRow,
  CCol,
  CImg,
  CButton,
  CCard,
  CCardBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Desc = () => {
  return (
    <CCard color="transparent" className="d-box-shadow1 d-border pr-0">
      <CCardBody color="transparent" className="pt-4 pr-0 card-desc">
        <CRow color="transparent" className="d-box-shadow1 d-border pr-0">
          <CCol sm="12" lg="12">
              <p className="h1 intro-title">Fast and secure crypto exchange<span className="text-success">.</span></p>
              <p className="h6 intro-desc">Instant exchange to local currency.</p>
          </CCol>
          <CCol sm="12" lg="12" style={{marginTop: "24px"}}>
              <div>
                <CImg
                  src={'img/play.png'}
                  alt="Google play"
                  height="40"
                />
                <CImg
                  src={'img/app-store.png'}
                  alt="App Store"
                  height="40"
                  className="pl-2"
                />
              </div>
          </CCol>
          <CCol sm="12" lg="12" className="pb-1" style={{marginTop: "24px"}}>
              <div>
                <CImg
                  src={'img/btc.png'}
                  alt="Bitcoin"
                  height="50"
                />
                <CImg
                  src={'img/bnb.png'}
                  alt="BNB"
                  height="50"
                  className="ml-3"
                />
                <CImg
                  src={'img/usdt.png'}
                  alt="USDT"
                  height="50"
                  className="ml-3"
                />
                <CImg
                  src={'img/eth.png'}
                  alt="ETH"
                  height="50"
                  className="ml-3"
                />
                <CImg
                  src={'img/USD_Coin_icon.png'}
                  alt="USD Coin"
                  height="50"
                  className="ml-3"
                />
              </div>
          </CCol>
          <CCol sm="12" lg="12" className="pl-0 pt-0">
              <div className="d-flex">
                <div className="pl-0">
                  <CImg
                      src={'img/Unicash logo red.png'}
                      alt="Union Bank"
                      height="80"
                    />
                </div>
                <div className="pl-2 flex-grow-1 pt-3">
                    <div className="align-self-start">
                      <CImg
                        src={'img/GCash-Logo-Transparent-PNG-1.png'}
                        alt="GCash"
                        height="40"
                      />
                      <small className="text-muted ml-1 pt-2 font-weight-bold font-xs">& more...</small>
                    </div>
                    <div className="align-self-end">
                      <small className="ml-3 mt-1 font-weight-bold unicash-url" color="secondary">unicash.ph</small>
                    </div>
                </div>
                <div className="pl-2 align-self-end pb-0">
                    <CButton className="ml-5 mt-1 float-right" color="secondary">
                      <CIcon name="cil-circle" alt="online status" color="success" className="online-status"></CIcon> &nbsp; Chat with us
                    </CButton>
                </div>
              </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    )
}

export default Desc