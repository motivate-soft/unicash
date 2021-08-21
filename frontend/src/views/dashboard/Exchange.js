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
import { warningNotification } from '../../controllers/_helpers';

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

  const [displayExpiredTime, setDisplayExpiredTime] = useState()

  if (!localStorage.getItem('user') || !user) {
    dispatch({type: 'set', darkMode: true})
    history.push('/home')
  }
  if (!transaction) {
     history.push('/dashboard')
  }

  const [counter, setCounter] = useState(299);
  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
    if(!isSubmitting) {
      setIsSubmitting(true)
      setTimeout(() => {
        let timer = setInterval(() => {
          setCounter(counter => {
              const updatedCounter = counter - 1;
              if (updatedCounter === 0) {
                clearInterval(timer)
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
                return 300
              } else {
                setDisplayExpiredTime(Math.floor(counter / 60) + ':' + Math.floor(counter % 60));
                return updatedCounter;
              }
          }); // use callback function to set the state

        }, 1000);
        return () => clearInterval(timer); // cleanup the timer
      }, 1000);
    }
}, []);

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
                        <h4 className="text-center">EXPIRES IN {displayExpiredTime}</h4>
                    </div>
                    <div className="d-flex mb-1">
                        <div className="flex-grow-1">
                            <RedditTextField
                                id="btc-address"
                                label="BTC ADDRESS"
                                placeholder="..."
                                value="3LdaJwE9ashRRTvTqhauu8VzkF83"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                fullWidth
                            />
                        </div>
                        <div className="mr-auto pt-2">
                            <CButton className="copy-button mt-3">Copy</CButton>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div>
                            <CImg src={'img/qr_btc.png'} alt="QR for BTC" height={200} style={{marginLeft: "-15px"}}></CImg>
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
