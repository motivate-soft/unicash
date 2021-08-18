import React, { useState } from 'react'
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react'
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(0),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
      display: 'none'
    },
    textField: {
      width: '100%',
      minWidth: '370px',
      backgroundColor: 'white',
      color: 'black'
    },
  }));

const DropdownCurrency = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  return (
    <CDropdown
      className="c-header-nav-item mx-0 px-0"
      toggle={toggle}
    >
      <CDropdownToggle className="d-box-shadow1 mx-0 px-0" caret={false}>
        <CButton className="d-box-shadow1 mr-0 pr-0"onClick={()=>setToggle(!toggle)}>
            <div className="d-flex mt-0 button-currency">
                <div className="flex-grow-1">
                    <div className="align-self-start small-full-currency">
                        <span>Bitcoin</span>
                    </div>
                    <div className="align-self-end currency-name">
                        <span>BTC</span>
                    </div>
                </div>
                <div className="status-icon">
                    { !toggle ? 
                        <CImg src={'img/icons8-expand-arrow-24.png'} alt="Search" height={24}></CImg>
                    :
                        <CImg src={'img/icons8-collapse-arrow-24.png'} alt="Search" height={24}></CImg>
                    }
                </div>
            </div>
        </CButton>
      </CDropdownToggle>
      <CDropdownMenu className="p-0 mt-1 currency-dropdown-menu" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="transparent"
          className="search-dropdown"
        >
          <TextField
            label=""
            id="standard-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
                startAdornment: 
                <InputAdornment position="start">
                    <CImg src={'img/icons8-search-96.png'} alt="Search" height={20}></CImg>
                </InputAdornment>,
            }}
            />
        </CDropdownItem>

        <CDropdownItem className="currency-dropdown">
            <CImg src={'img/btc.png'} alt="BTC Logo" height={25}></CImg>
            <span className="stands-of-currency">BTC</span>
            <span className="full-currency">Bitcoin</span>
        </CDropdownItem>

        <CDropdownItem className="currency-dropdown">
            <CImg src={'img/eth.png'} alt="ETH Logo" height={25}></CImg>
            <span className="stands-of-currency">ETH</span>
            <span className="full-currency">Ethereum</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default DropdownCurrency