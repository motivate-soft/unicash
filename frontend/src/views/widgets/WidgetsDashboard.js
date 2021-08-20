import React, { lazy, useState, useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paymentService } from '../../controllers/_services/payment.service';
import { currencyConstants } from '../../controllers/_constants';

const DropdownCurrency = lazy(() => import('./DropdownCurrency'));

  const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: 'none',
      overflow: 'hidden',
      backgroundColor: '#fcfcfb',
      fontWeight: '700',
      lineHeight: '24px',
      fontSize: '24px',
      color: "green",
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
        color: "green"
      }
    },
    focused: {},
  }));

  const useStylesRedditNoEdit = makeStyles((theme) => ({
    root: {
        border: 'none',
        overflow: 'hidden',
        backgroundColor: '#fcfcfb',
        fontWeight: '500',
        lineHeight: '20px',
        fontSize: '20px',
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

function RedditTextFieldNoEdit(props) {
    const classes = useStylesRedditNoEdit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

const WidgetsDashboard = () => {
 const dispatch = useDispatch()
 const history = useHistory()

 const user = useSelector(state => state.user)

 const [inputSend, setInputSend] = useState(0.1);
 const [inputReceive, setInputReceive] = useState();

 const [yousend, setYousend] = useState();
 const [youreceive, setYoureceive] = useState();
 const [pricePerUnit, setPricePerUnit] = useState();
 const [conversionRateBetweenUSDPHP, setConversionRateBetweenUSDPHP] = useState();

 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState()
 const [isSubmitting, setIsSubmitting] = useState(false)

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
  useEffect(() => {
        if (yousend)
        paymentService.getConversionPrice(yousend.label + 'USDT')
        .then(
            price => {
                if (price.status) {
                    setConversionRateBetweenUSDPHP(Number(price.conversionRate));
                    const priceRate = Number(JSON.parse(price.data)['price'])
                    if (!isNaN(priceRate)) {
                        setPricePerUnit(priceRate)
                        setInputReceive(Math.floor((Number(inputSend) * priceRate * Number(price.conversionRate)) * 10000) / 10000)
                    }
                    else {
                        setPricePerUnit(null);
                        setInputReceive('');
                    }
                }
            },
            error => {
                console.log(error);
            }
        )
    }, [yousend, inputSend]);

  useEffect(() => {
    if (user && youreceive)
        paymentService.getPaymentMethodsById(user.id)
        .then(
            paymentMethods => {
                const arr = Object.assign([], paymentMethods).filter(
                    item => item.name === youreceive.label 
                  );
                if (arr && arr.length)
                    setSelectedPaymentMethod(arr[0])
            },
            error => {}
        )
  }, [youreceive]);
  
  const onSubmit = () => {
      if ( user && yousend && youreceive && pricePerUnit && conversionRateBetweenUSDPHP && inputSend && inputReceive) {
        const obj = {
            userId: user.id,
            from: yousend.label,
            to: youreceive.label,
            sendAmount: inputSend,
            pricePerUnit: pricePerUnit,
            conversionBetweenUSDPHP: conversionRateBetweenUSDPHP,
            amount: inputReceive,
            image: '',
            status: '',
            startTime: 300
        }
        dispatch({type: 'set', transaction: obj})
        history.push('/exchange')
      }
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
                            <DropdownCurrency listType="yousend" passDropListData={setYousend}/>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div>
                            <p className="card-exchange-rate">
                                { yousend && 
                                    <span className="card-exchange-rate">
                                        1 {yousend.label} ~
                                    </span>
                                }
                                <span className="card-exchange-rate">
                                    { pricePerUnit ? Math.floor(pricePerUnit * conversionRateBetweenUSDPHP * 10000) / 10000 : '...' }
                                </span>
                                { youreceive && 
                                    <span className="card-exchange-rate">
                                        PHP
                                    </span>
                                }
                            </p>
                        </div>
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
                            <DropdownCurrency listType="youreceive" passDropListData={setYoureceive} />
                        </div>
                    </div>
                    <div className="d-flex mt-0 float-right mb-2">
                        <div><p className="card-exchange-bank-method-ask" onClick={onClickToPayment}>Set payment method?</p></div>
                    </div>

                    <div className="d-flex mt-3">
                        { selectedPaymentMethod && selectedPaymentMethod.bankAccountName && selectedPaymentMethod.bankAccountName !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 1 && 
                          <RedditTextFieldNoEdit
                            id="bank-account-name"
                            label="Bank account name"
                            placeholder="Bank account name"
                            value={selectedPaymentMethod.bankAccountName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.bankAccountNo && selectedPaymentMethod.bankAccountNo !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 1 && 
                          <RedditTextFieldNoEdit
                            id="bank-account-no"
                            label="Bank account number"
                            placeholder="Bank account number"
                            value={selectedPaymentMethod.bankAccountNo}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.bankBranch && selectedPaymentMethod.bankBranch !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 1 && 
                          <RedditTextFieldNoEdit
                            id="bank-branch"
                            label="Bank branch"
                            placeholder="Bank branch"
                            value={selectedPaymentMethod.bankBranch}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.mobileNo && selectedPaymentMethod.mobileNo !== '' &&
                          <RedditTextFieldNoEdit
                            id="mobile-no"
                            label="Mobile number"
                            placeholder="Mobile number"
                            value={selectedPaymentMethod.mobileNo}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.firstName && selectedPaymentMethod.firstName !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 3 && 
                          <RedditTextFieldNoEdit
                            id="first-name"
                            label="First Name"
                            placeholder="First Name"
                            value={selectedPaymentMethod.firstName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.middleName && selectedPaymentMethod.middleName !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 3 && 
                          <RedditTextFieldNoEdit
                            id="middle-name"
                            label="Middle Name"
                            placeholder="Middle Name"
                            value={selectedPaymentMethod.middleName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.lastName && selectedPaymentMethod.lastName !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 3 && 
                          <RedditTextFieldNoEdit
                            id="last-name"
                            label="Last Name"
                            placeholder="Last Name"
                            value={selectedPaymentMethod.lastName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>
                    <div className="d-flex mt-2">
                        { selectedPaymentMethod && selectedPaymentMethod.completeAddress && selectedPaymentMethod.completeAddress !== '' && currencyConstants[selectedPaymentMethod.selectedCurrency].kind === 3 && 
                          <RedditTextFieldNoEdit
                            id="complete-address"
                            label="Complete address"
                            placeholder="Complete address"
                            value={selectedPaymentMethod.completeAddress}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            variant="filled"
                          />
                        }
                    </div>

                    <div className="d-flex mt-0">
                        <CButton block className="button-exchange" onClick={() => onSubmit()} disabled={isSubmitting || !yousend || !youreceive || !inputSend || !inputReceive}>
                            {isSubmitting ? 'Wait...' : 'Next'}
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    )
}

export default WidgetsDashboard
