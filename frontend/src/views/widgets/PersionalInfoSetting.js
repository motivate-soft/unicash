import React, { lazy, useState, useEffect } from 'react'
import {
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
import { userService } from '../../controllers/_services';

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

function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

const WidgetsDashboard = () => {
 const dispatch = useDispatch()
 const history = useHistory()

 const user = useSelector(state => state.user)

 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState()
 const [isSubmitting, setIsSubmitting] = useState(false)
  
  const onSubmit = () => {
      
  }
  // render
  return (

    <CCard color="transparent" className="d-box-shadow1 d-border">
        <CCardBody className="card-exchange m-0">

            <div className="d-flex mt-3">
                { selectedPaymentMethod && 
                <RedditTextField
                    id="bank-account-name"
                    label="Bank account name"
                    placeholder="Bank account name"
                    value=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="filled"
                />
                }
            </div>

            <div className="d-flex mt-0">
                <CButton className="button-exchange" onClick={() => onSubmit()} disabled={isSubmitting}>
                    {isSubmitting ? 'Wait...' : 'Save'}
                </CButton>
            </div>
        </CCardBody>
    </CCard>

    )
}

export default WidgetsDashboard
