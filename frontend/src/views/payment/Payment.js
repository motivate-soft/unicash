import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCollapse
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { paymentService } from '../../controllers/_services/payment.service';

const AddPayment = React.lazy(() => import('./AddPayment'));

const useStylesReddit = makeStyles((theme) => ({
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

const Payment = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [accordion, setAccordion] = useState(0)
  const user = useSelector(state => state.user)
  dispatch({type: 'set', darkMode: false})

  if (!localStorage.getItem('user')) {
    dispatch({type: 'set', darkMode: true})
    history.replace('/home')
  } else {
    
  }

  const savedPaymentMethods = useSelector(state => state.paymentMethods)
  const openingPopup = useSelector(state => state.openAddPayment)

  useEffect(() => {
    if (user)
      paymentService.getPaymentMethodsById(user.id)
      .then(
          paymentMethods => {
            dispatch({type: 'set', paymentMethods: paymentMethods})
          },
          error => {}
      )
  }, [dispatch, user, openingPopup])

  return (
    <>
     
      <CCard color="transparent" className="transaction-table d-box-shadow1 d-border p-0 m-0">
        <CCardHeader color="transparent d-border p-0" className="header-title">
          PAYMENT
          <div className="d-flex mt-0 float-right">
              <div>
                  <CButton block className="button-exchange" onClick={() => dispatch({type: 'set', openAddPayment: true})}>
                      + Add payment method
                  </CButton>
              </div>
          </div>
        </CCardHeader>
        <CCardBody className="p-0" color="default">
          { savedPaymentMethods && 
            <div className="mt-3" id="accordion">
              { savedPaymentMethods.map((paymentMethod, index) => (
                  <CCard className="mb-1">
                    <CCardHeader id="headingOne">
                      <CButton 
                        color="link"
                        className="text-left m-0 p-0" 
                        onClick={() => setAccordion(accordion === index ? null : index)}
                      >
                        <h5 className="m-0 p-0">{paymentMethod.name}</h5>
                      </CButton>
                    </CCardHeader>
                    <CCollapse show={accordion === index}>
                      <CCardBody>
                        { paymentMethod.bankAccountName && paymentMethod.bankAccountName !== '' &&
                          <RedditTextField
                            id="bank-account-name"
                            label="Bank account name"
                            placeholder="Bank account name"
                            value={paymentMethod.bankAccountName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.bankAccountNo && paymentMethod.bankAccountNo !== '' &&
                          <RedditTextField
                            id="bank-account-no"
                            label="Bank account number"
                            placeholder="Bank account number"
                            value={paymentMethod.bankAccountNo}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.bankBranch && paymentMethod.bankBranch !== '' &&
                          <RedditTextField
                            id="bank-branch"
                            label="Bank branch"
                            placeholder="Bank branch"
                            value={paymentMethod.bankBranch}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.mobileNo && paymentMethod.mobileNo !== '' &&
                          <RedditTextField
                            id="mobile-no"
                            label="Mobile number"
                            placeholder="Mobile number"
                            value={paymentMethod.mobileNo}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.firstName && paymentMethod.firstName !== '' &&
                          <RedditTextField
                            id="first-name"
                            label="First Name"
                            placeholder="First Name"
                            value={paymentMethod.firstName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.middleName && paymentMethod.middleName !== '' &&
                          <RedditTextField
                            id="middle-name"
                            label="Middle Name"
                            placeholder="Middle Name"
                            value={paymentMethod.middleName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.lastName && paymentMethod.lastName !== '' &&
                          <RedditTextField
                            id="last-name"
                            label="Last Name"
                            placeholder="Last Name"
                            value={paymentMethod.lastName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                        { paymentMethod.completeAddress && paymentMethod.completeAddress !== '' &&
                          <RedditTextField
                            id="complete-address"
                            label="Complete address"
                            placeholder="Complete address"
                            value={paymentMethod.completeAddress}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                          />
                        }
                      </CCardBody>
                    </CCollapse>
                  </CCard>
                ))
              }
            </div>
          }
        </CCardBody>
      </CCard>
      <AddPayment />
    </>
  )
}

export default Payment
