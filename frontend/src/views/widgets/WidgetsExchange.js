import React, { lazy } from 'react'
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
import TextField from '@material-ui/core/TextField';

import {
    alpha,
    makeStyles,
  } from '@material-ui/core/styles';

const Desc = lazy(() => import('./Desc'))

const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: 'none',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      fontWeight: '700',
      lineHeight: '24px',
      fontSize: '24px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${alpha("#24242f", 0.25)} 0 0 0 2px`,
        borderColor: "#24242f",
        borderBottom: "3px solid black",
        color: "#24242f"
      },
    },
    focused: {},
  }));

function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }
const WidgetsExchange = () => {
  // render
  return (
    <>
        <CRow>
            <CCol sm="12" lg="5">
                <CCard color="transparent">
                    <CCardBody className="card-exchange">
                        <CRow>
                            <CCol sm="8" lg="8">
                                <RedditTextField
                                    id="you-send"
                                    label="YOU SEND"
                                    placeholder="YOU SEND"
                                    defaultValue="0.1"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    />
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
                                <RedditTextField
                                    id="you-receive"
                                    label="YOU RECEIVE"
                                    placeholder="YOU RECEIVE"
                                    defaultValue="3000.98"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    />
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
                                <CButton block className="button-exchange">
                                    Exchange now
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol sm="12" lg="7">
                <Desc />
            </CCol>
        </CRow>
    </>
    )
}

export default WidgetsExchange
