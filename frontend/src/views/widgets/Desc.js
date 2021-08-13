import React from 'react'
import {
  CRow,
  CCol,
  CImg,
  CNav,
  CNavLink,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Desc = () => {
  return (
    <CRow color="transparent" className="p-4 card-desc">
        <CCol sm="12" lg="12" className="pb-3">
            <p className="h1 intro-title">Fast and secure crypto exchange.</p>
            <p className="h6 intro-desc">Instant exchange to local currency.</p>
        </CCol>
        <CCol sm="12" lg="12" className="pb-4">
            <CImg
              src={'img/play.png'}
              alt="Google play"
              height="40"
            />
            <CImg
              src={'img/app-store.png'}
              alt="App Store"
              height="40"
              className="ml-4"
            />
        </CCol>
        <CCol sm="12" lg="12" className="pb-1">
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
        </CCol>
        <CCol sm="12" lg="12" className="pl-0 pt-0">
            <CNav variant="pills" className="flex-sm-row">
              <CImg
                  src={'img/Union-Bank.png'}
                  alt="Union Bank"
                  height="110"
                />
              <CNavLink className="flex-sm-fill text-sm-left">
                <CImg
                  src={'img/GCash-Logo-Transparent-PNG-1.png'}
                  alt="GCash"
                  height="40"
                />
                <small className="text-muted ml-1 pt-2 font-weight-bold font-xs">& more...</small>
                <br />
                <small className="ml-3 mt-1 font-weight-bold unicash-url" color="secondary">unicash.ph</small>
                <CButton className="ml-5 mt-1 float-right" color="secondary">
                  <CIcon name="cil-circle" alt="online status" color="success" className="online-status"></CIcon> &nbsp; Chat with us
                </CButton>
              </CNavLink>
            </CNav>
        </CCol>
    </CRow>

    )
}

export default Desc
