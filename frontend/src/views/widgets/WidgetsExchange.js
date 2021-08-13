import React, { lazy } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CCardBody
} from '@coreui/react'
import TextField from '@material-ui/core/TextField';

import {
    alpha,
    makeStyles,
  } from '@material-ui/core/styles';
import CIcon from '@coreui/icons-react';

const Desc = lazy(() => import('./Desc'))

const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: 'none',
      overflow: 'hidden',
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
        boxShadow: `${alpha("#24242f", 0.25)} 0 0 0 1px`,
        borderRadius: 4,
        borderColor: "#24242f",
        borderBottom: "2px solid black",
        color: "#24242f"
      }
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
                        <div className="d-flex mt-2">
                            <div className="flex-grow-1">
                                <RedditTextField
                                    id="you-send"
                                    label="You send"
                                    placeholder="You send"
                                    defaultValue="0.1"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    style={{borderRight: "1px solid lightgray"}}
                                    />
                            </div>
                            <div className="mr-auto">
                                <CButton className="d-box-shadow1 mr-0 pr-0">
                                    <div className="d-flex mt-2 button-currency">
                                        <div className="flex-grow-1">
                                            <div className="align-self-start small-full-currency">
                                                <span>Bitcoin</span>
                                            </div>
                                            <div className="align-self-end currency-name">
                                                <span>BTC</span>
                                            </div>
                                        </div>
                                        <div className="status-icon">
                                            <CIcon name="cil-chevron-bottom" alt="" />
                                        </div>
                                    </div>
                                </CButton>
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            <div><p className="card-exchange-rate">1BTC = $ 30,000 USDT</p></div>
                        </div>
                        <div className="d-flex mt-2">
                            <div className="flex-grow-1">
                                <RedditTextField
                                    id="you-receive"
                                    label="You receive"
                                    placeholder="You receive"
                                    defaultValue="3000.98"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    style={{borderRight: "1px solid lightgray"}}
                                    />
                            </div>
                            <div className="mr-auto">
                                <CButton className="d-box-shadow1 mr-0 pr-0">
                                    <div className="d-flex mt-2 button-currency">
                                        <div className="flex-grow-1">
                                            <div className="align-self-start small-full-currency">
                                                <span>Cash</span>
                                            </div>
                                            <div className="align-self-end currency-name">
                                                <span>GCash</span>
                                            </div>
                                        </div>
                                        <div className="status-icon">
                                            <CIcon name="cil-chevron-bottom" alt="" />
                                        </div>
                                    </div>
                                </CButton>
                            </div>
                        </div>
                        <div className="d-flex mt-3">
                            <CButton block className="button-exchange">
                                Exchange now
                            </CButton>
                        </div>
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
