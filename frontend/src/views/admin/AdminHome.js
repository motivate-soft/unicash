import React, { lazy, useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CWidgetSimple,
    CImg
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { paymentService } from '../../controllers/_services/payment.service';

const AdminHome = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  dispatch({type: 'set', darkMode: false})

  const user = useSelector(state => state.user)

  if (!localStorage.getItem('user') || !user || !user.role) {
    dispatch({type: 'set', darkMode: true})
    history.push('/home')
  }

  const [mytransactions, setMytransactions] = useState();

  const [numberOfProcessing, setNumberOfProcessing] = useState(0);
  const [numberOfCompleted, setNumberOfCompleted] = useState(0);
  
  const [amountOfUSDT, setAmountOfUSDT] = useState(0);
  const [amountOfETH, setAmountOfETH] = useState(0);
  const [amountOfBTC, setAmountOfBTC] = useState(0);
  const [amountOfUSDC, setAmountOfUSDC] = useState(0);
  const [amountOfBUSD, setAmountOfBUSD] = useState(0);
  const [amountOfBNB, setAmountOfBNB] = useState(0);

  useEffect(() => {
    paymentService.getAllTransactions()
    .then(
      transactions => {
        let processingTransaction = [];
        let completedTransaction = [];
        let tempUSDT = 0;
        let tempETH = 0;
        let tempBTC = 0;
        let tempUSDC = 0;
        let tempBUSD = 0;
        let tempBNB = 0;
        transactions.forEach(element => {
            if (element.status === 'Processing') {
                processingTransaction.push(element);
                if (element.from === 'USDT') tempUSDT = tempUSDT + Number(element.amount);
                if (element.from === 'ETH') tempETH = tempETH + Number(element.amount);
                if (element.from === 'BTC') tempBTC = tempBTC + Number(element.amount);
                if (element.from === 'USDC') tempUSDC = tempUSDC + Number(element.amount);
                if (element.from === 'BUSD') tempBUSD = tempBUSD + Number(element.amount);
                if (element.from === 'BNB') tempBNB = tempBNB + Number(element.amount);
            }
            if (element.status === 'Completed') {
                completedTransaction.push(element);
            }
                
        });
        setNumberOfProcessing(processingTransaction.length);
        setNumberOfCompleted(completedTransaction.length);
        setAmountOfUSDT(Math.round(tempUSDT * 100) / 100)
        setAmountOfETH(Math.round(tempETH * 100) / 100)
        setAmountOfBTC(Math.round(tempBTC * 100) / 100)
        setAmountOfUSDC(Math.round(tempUSDC * 100) / 100)
        setAmountOfBUSD(Math.round(tempBUSD * 100) / 100)
        setAmountOfBNB(Math.round(tempBNB * 100) / 100)
        setMytransactions(processingTransaction);
      },
      error => {}
    )
  }, []);

  return (
    <>
      <CRow color="transparent" className="d-box-shadow1">
        <CCol className="pr-lg-1 pr-md-1 d-box-shadow1 d-border" sm="12" lg="12" md="12">
            <div className="d-flex bg-light border admin-home-widget-dive">
                <div>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget1-number">
                            <span>{numberOfProcessing}</span>
                        </div>
                        <p>Processing Transaction</p>
                    </CWidgetSimple>
                </div>
                <div>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget1-number">
                            <span>{numberOfCompleted}</span>
                        </div>
                        <p>Completed Transaction</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfUSDT > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfUSDT}</span>
                        </div>
                        <p>USDT Reserve</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfETH > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfETH}</span>
                        </div>
                        <p>ETH Reserve</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfBTC > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfBTC}</span>
                        </div>
                        <p>BTC Reserve</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfUSDT > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfUSDT}</span>
                        </div>
                        <p>USDC Reserve</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfUSDC > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfUSDC}</span>
                        </div>
                        <p>USDC Reserve</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfBUSD > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfBUSD}</span>
                        </div>
                        <p>BUSD Reserve</p>
                    </CWidgetSimple>
                </div>
                <div className={amountOfBNB > 0 ? undefined : 'd-none'}>
                    <CWidgetSimple header="" text="" className="admin-home-widget1 d-box-shadow1 d-border mb-0" color="transparent">
                        <div className="widget2-number">
                            <span>{amountOfBNB}</span>
                        </div>
                        <p>BNB Reserve</p>
                    </CWidgetSimple>
                </div>
            </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol className="pr-lg-1 pr-md-1 d-box-shadow1 d-border" sm="12" lg="12" md="12">
          <CCard color="transparent" className="transaction-table d-box-shadow1 d-border mt-3">
            <CCardHeader color="transparent d-border pl-0" className="header-title">
              Pending Transaction
            </CCardHeader>
            <CCardBody className="p-0" color="default">
            { mytransactions && 
              <table className="table table-hover table-outline mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>Username</th>
                    <th className="text-center">Order ID</th>
                    <th className="text-center">From</th>
                    <th className="text-center">To</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Date Time</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  mytransactions.map((transaction, index) => (
                    <tr>
                      <td>
                        { transaction.userName }
                      </td>
                      <td className="text-center">
                        {transaction.orderId}
                      </td>
                      <td className="text-center">
                        {transaction.from}
                      </td>
                      <td className="text-center">
                        {transaction.to}
                      </td>
                      <td className="text-center">
                        {transaction.amount}
                      </td>
                      <td className="text-center">
                        { format(new Date(transaction.createdAt), 'yyyy-MM-dd kk:mm') }
                      </td>
                      <td className="text-center">
                        {transaction.status}
                      </td>
                      <td className="text-center">
                          <CButton color="success">Process</CButton>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            }
            { Object.assign([], mytransactions).length === 0 && 
              <h3 className="text-muted m-3 pt-3 text-center">NO TRANSACTION</h3>
            }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AdminHome
