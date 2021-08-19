import React, { lazy, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CButton,
  CCardBody,
} from '@coreui/react'
import TextField from '@material-ui/core/TextField';
import {
    alpha,
    makeStyles,
  } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
  
  const DropdownCurrency = lazy(() => import('./DropdownCurrency'));

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

const WidgetsDashboard = () => {
    
 const history = useHistory()
 const [inputSend, setInputSend] = useState(0.1);
 const [inputReceive, setInputReceive] = useState(3000.98);

 const [bankAccountName, setBankAccountName] = useState('Juan Luna')
 const [bankAccountNo, setBankAccountNo] = useState('02132654689898')
 const [bankName] = useState('BPI')
 const [mobileNo, setMobileNo] = useState('0965235641')

 const onChangeOnSend = e => {
    const inputValue = e.target.value;
    if (inputValue === '' || inputValue === '0' || inputValue === '0.' || Number(inputValue)) {
        setInputSend(inputValue)
    }
  };
  const onChangeOnReceive = e => {
    const inputValue = e.target.value;
    if (inputValue === '' ||inputValue === '0' || inputValue === '0.' || Number(inputValue)) {
        setInputReceive(inputValue)
    }
  };

  const onClickToPayment = () => {
      history.push('/payment')
  }
  // render
  return (
    <CRow color="transparent" className="d-box-shadow1">
        <CCol className="p-2 d-box-shadow1 d-border">
            <CCard color="transparent" className="d-box-shadow1 d-border pl-3 pr-3">
                <CCardBody className="card-exchange">
                    <div className="d-flex mt-2">
                        <div className="flex-grow-1">
                            <RedditTextField
                                id="you-send"
                                label="You send"
                                placeholder="You send"
                                value={inputSend}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                style={{borderRight: "1px solid lightgray"}}
                                onChange={onChangeOnSend}
                                />
                        </div>
                        <div className="mr-auto">
                            <DropdownCurrency listType="yousend" />
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
                                value={inputReceive}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                style={{borderRight: "1px solid lightgray"}}
                                onChange={onChangeOnReceive}
                                />
                        </div>
                        <div className="mr-auto">
                            <DropdownCurrency listType="youreceive"  />
                        </div>
                    </div>
                    <div className="d-flex mt-0 float-right">
                        <div><p className="card-exchange-bank-method-ask" onClick={onClickToPayment}>Set payment method?</p></div>
                    </div>
                    <div className="d-flex mt-2">
                        <RedditTextField
                                id="bank-account-name"
                                label="Bank account name"
                                placeholder="Bank account name"
                                fullWidth
                                value={bankAccountName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setBankAccountName(e.target.value)}
                                variant="filled"
                            />
                    </div>
                    <div className="d-flex mt-2">
                        <RedditTextField
                                id="bank-account-no"
                                label="Bank account no."
                                placeholder="Bank account no."
                                fullWidth
                                value={bankAccountNo}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setBankAccountNo(e.target.value)}
                                variant="filled"
                            />
                    </div>
                    <div className="d-flex mt-2">
                        <RedditTextField
                                id="bank-name"
                                label="Bank name"
                                placeholder="Bank name"
                                fullWidth
                                value={bankName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // onChange={(e) => setBankName(e.target.value)}
                                variant="filled"
                            />
                    </div>
                    <div className="d-flex mt-2">
                        <RedditTextField
                                id="mobile-no"
                                label="Mobile no."
                                placeholder="Mobile no."
                                fullWidth
                                value={mobileNo}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setMobileNo(e.target.value)}
                                variant="filled"
                            />
                    </div>
                    
                    <div className="d-flex mt-3">
                        <CButton block className="button-exchange">
                            Next
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    )
}

export default WidgetsDashboard
