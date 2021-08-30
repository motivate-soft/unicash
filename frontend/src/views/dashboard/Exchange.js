import React, { lazy, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CImg
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// import { useLocation } from 'react-router';
// import queryString from 'query-string';
import { paymentService } from '../../controllers/_services/payment.service';
import { warningNotification, successNotification } from '../../controllers/_helpers';

const useStylesReddit = makeStyles((theme) => ({
    root: {
        border: 'none',
        overflow: 'hidden',
        backgroundColor: '#fcfcfb',
        fontWeight: '300',
        lineHeight: '20px',
        fontSize: '18px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
          backgroundColor: '#fff',
          border: 'none',
          borderColor: 'transparent'
        },
        '&$focused': {
          backgroundColor: '#fff',
          boxShadow: 'none',
          color: "#24242f",
          borderColor: "#fff",
          border: 'none',
        }
    },
    focused: {
      border: 'none',
    },
}));
  
function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const Exchange = () => {
  const dispatch = useDispatch()
  const history = useHistory()
//   const location = useLocation();

  dispatch({type: 'set', darkMode: false})

  const user = useSelector(state => state.user)
  const transaction = useSelector(state => state.transaction)

  if (!localStorage.getItem('user') || !user) {
    dispatch({type: 'set', darkMode: true})
    history.push('/home')
  }
  if (!transaction) {
     history.push('/dashboard')
  }
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);
  const [qrCodeImageSrc, setQrCodeImageSrc] = useState();
  const [BTCAddress, setBTCAddress] = useState()
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    let timerId;
    if (runTimer) {
      if (transaction && transaction.from === 'BTC')
        setCountDown(60 * 30);
      else {setCountDown(60 * 5);}
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      transaction['status'] = "Canceled"
      paymentService.createTransaction(transaction)
      .then(
          result => {
              warningNotification("The transaction calceled.", 3000);
              history.push('/dashboard')
          },
          error => {
            warningNotification(error, 3000)
            history.push('/dashboard')
          }
      )
      setRunTimer(false);
      setCountDown(0);
    }
    if (user && JSON.stringify(user) !== '{}' && transaction) {
      if (transaction.from === 'BTC') {
        setBTCAddress(user.BTC_ADDRESS)
        setQrCodeImageSrc('https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl= '+BTCAddress+' &choe=UTF-8')
      } else {
        setBTCAddress(user.ETH_ADDRESS)
        setQrCodeImageSrc('https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl= '+BTCAddress+' &choe=UTF-8')
      }
    }
  }, [countDown, runTimer]);

  useEffect(() => {
    if (Number(seconds) === 0) { // per min
      if (transaction && transaction.from === 'BTC') {
        paymentService.getBTCDetect(user.BTC_ADDRESS).then(
          result => {
            const valanceJSON = result[user.BTC_ADDRESS];
            if (!isSubmit && valanceJSON.final_balance / 100000000 >= Number(transaction.sendAmount)) {
              transaction['status'] = "Processing"
              setIsSubmit(true)
              paymentService.createTransaction(transaction)
              .then(
                  result => {
                      successNotification("The transaction is processing.", 3000);
                      history.push('/dashboard')
                  },
                  error => {
                    warningNotification(error, 3000)
                    history.push('/dashboard')
                  }
              )
              setRunTimer(false);
              setCountDown(0);
            }
          },
          err => {
            console.log(err)
          }
        )
      }
      else if (transaction && transaction.from === 'ETH') {
        paymentService.postETHDetect({address: user.ETH_ADDRESS}).then(
          result => {
            if (!result.error) {
              if (!isSubmit && result.balance >= Number(transaction.sendAmount)) {
                setIsSubmit(true)
                transaction['status'] = "Processing"
                paymentService.createTransaction(transaction)
                .then(
                    result => {
                        successNotification("The transaction is processing.", 3000);
                        history.push('/dashboard')
                    },
                    error => {
                      warningNotification(error, 3000)
                      history.push('/dashboard')
                    }
                )
                setRunTimer(false);
                setCountDown(0);
              }
            }
          },
          err => console.log(err)
        )
      }
      else if (transaction) {
        paymentService.postETHDetect({address: user.ETH_ADDRESS, contract: '0xdac17f958d2ee523a2206206994597c13d831ec7'}).then(
          result => {
            if (!result.error) {
              if (!isSubmit && result.balance >= Number(transaction.sendAmount)) {
                setIsSubmit(true)
                transaction['status'] = "Processing"
                paymentService.createTransaction(transaction)
                .then(
                    result => {
                        successNotification("The transaction is processing.", 3000);
                        history.push('/dashboard')
                    },
                    error => {
                      warningNotification(error, 3000)
                      history.push('/dashboard')
                    }
                )
                setRunTimer(false);
                setCountDown(0);
              }
            }
          },
          err => console.log(err)
        )
      }
    }
  }, [countDown])

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  
  const [isCopied, setIsCopied] = useState(false);
  const onCopyClicked = () => {
    navigator.clipboard.writeText(BTCAddress);
    setIsCopied(true)
  }
//   if (!queryString.parse(location.search) || !queryString.parse(location.search).id || isNaN(Number(queryString.parse(location.search).id))) {
//     history.push('/dashboard')
//   }

  return (
    <>
    { transaction &&
      <CRow color="transparent" className="d-box-shadow1">
        <CCol className="p-0 d-box-shadow1 d-border">
            <CCard color="transparent" className="d-box-shadow1 d-border p-0">
                <CCardBody className="card-exchange p-4">
                    <div className="d-flex">
                        <h3>Exchange</h3>
                    </div>
                    <div className="text-center mt-3 mb-3">
                        <h4 className="text-center">EXPIRES IN {minutes}:{seconds}</h4>
                    </div>
                    <div className="d-flex mb-1">
                        <div className="flex-grow-1">
                            <RedditTextField
                                id="btc-address"
                                label="BTC ADDRESS"
                                placeholder="..."
                                value={BTCAddress}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                fullWidth
                            />
                        </div>
                        <div className="mr-auto pt-2">
                          { !isCopied && 
                            <CButton className="copy-button mt-3" onClick={() => onCopyClicked()}>Copy</CButton>
                          }
                          { isCopied && 
                            <CButton className="copied-button mt-3">Copied</CButton>
                          }
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div>
                            {/* <CImg src={'img/qr_btc.png'} alt="QR for BTC" height={200} style={{marginLeft: "-15px"}}></CImg> */}
                            <CImg src={qrCodeImageSrc} alt="QR for BTC" height={200} style={{marginLeft: "-15px"}}></CImg> 
                            <p className="text-center note-in-exchange scan-desc-in-exchange">SCAN QRCODE</p>
                        </div>
                        <div className="pt-2 text-center flex-grow-1 m-auto">
                            <p className="text-center pay-exact-amount-in-exchange">PAY EXACT AMOUNT</p>
                            <p className="text-center amount-in-exchange mt-1">{transaction.sendAmount} {transaction.from}</p>
                        </div>
                    </div>
                    <div className="pl-2">
                        <p className="note-in-exchange">NOTE: Payment will be process in 3 confirmation</p>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    }
    </>
  )
}

export default Exchange
