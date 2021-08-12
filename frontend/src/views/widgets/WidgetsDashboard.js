import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CCallout,
  CCardBody,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'

const WidgetsDashboard = () => {
  // render
  return (
    <CRow color="transparent" className="d-box-shadow1">
        <CCol sm="0" md="2" lg="3"></CCol>
        <CCol sm="12" md="8" lg="6" className="p-2 d-box-shadow1 d-border">
            <CCard color="transparent" className="d-box-shadow1 d-border pl-3 pr-3">
                <CCardBody className="card-exchange ml-20 mr-20">
                    <CRow>
                        <CCol sm="8" lg="8">
                            <p className="card-exchange-title">you send</p>
                            <p className="card-exchange-value">0.1</p>
                        </CCol>
                        <CCol sm="4" lg="4">
                            <CCallout>
                                <CDropdown className="m-0 pt-0" variant="btn-group">
                                    <CDropdownToggle className="m-0 pt-0 p-0 dropdown-toggle-exchange">
                                        Bitcoin
                                    </CDropdownToggle>
                                    <CDropdownMenu className="pt-1 dropdown-toggle-menu" placement="bottom-end">
                                        <CDropdownItem className="dropdown-toggle-menuitem">BTC</CDropdownItem>
                                        <CDropdownItem className="dropdown-toggle-menuitem">BNB</CDropdownItem>
                                        <CDropdownItem className="dropdown-toggle-menuitem">USDT</CDropdownItem>
                                        <CDropdownItem className="dropdown-toggle-menuitem">ETH</CDropdownItem>
                                        <CDropdownItem className="dropdown-toggle-menuitem">USD Coin</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                                <p className="dropdown-toggle-currency">BTC</p>
                            </CCallout>
                        </CCol>
                        
                        <CCol sm="12" lg="12">
                            <p className="card-exchange-rate">1BTC = $ 30,000 USDT</p>
                        </CCol>
                        
                        <CCol sm="8" lg="8">
                            <p className="card-exchange-title">you receive</p>
                            <p className="card-exchange-value">3000.98</p>
                        </CCol>
                        <CCol sm="4" lg="4">
                            <CCallout>
                                <CDropdown className="m-0 pt-0" variant="btn-group">
                                    <CDropdownToggle className="m-0 pt-0 p-0 dropdown-toggle-exchange">
                                        Cash
                                    </CDropdownToggle>
                                    <CDropdownMenu className="pt-1 dropdown-toggle-menu" placement="bottom-end">
                                        <CDropdownItem className="dropdown-toggle-menuitem">GCash</CDropdownItem>
                                        <CDropdownItem className="dropdown-toggle-menuitem">Union Bank</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                                <p className="dropdown-toggle-currency">GCash</p>
                            </CCallout>
                        </CCol>
                        
                        <CCol sm="12" lg="12">
                            <p className="card-exchange-title">bank account name</p>
                            <p className="card-exchange-value">Juan Luna</p>
                        </CCol>

                        <CCol sm="12" lg="12">
                            <p className="card-exchange-title">bank account no.</p>
                            <p className="card-exchange-value">02132654689898</p>
                        </CCol>

                        <CCol sm="12" lg="12">
                            <p className="card-exchange-title">bank name</p>
                            <p className="card-exchange-value">BPI</p>
                        </CCol>

                        <CCol sm="12" lg="12">
                            <p className="card-exchange-title">mobile no.</p>
                            <p className="card-exchange-value">0965235641631321</p>
                        </CCol>

                        <CCol sm="12" lg="12">
                            <CButton block className="button-exchange">
                                Next
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol sm="0" md="2" lg="3"></CCol>
    </CRow>

    )
}

export default WidgetsDashboard
