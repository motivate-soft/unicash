import React from 'react'
import {
  CRow,
  CCol,
  CWidgetSimple,
  CImg
} from '@coreui/react'

const WidgetsAdvantage = () => {
  // render
  return (
    <CRow>
        <CCol sm="6" lg="3">
            <CWidgetSimple header="" text="" className="p-0">
                <CImg
                    src={'img/icons8-star-80.png'}
                    alt="Best exchange"
                    height="40"
                />
                <p className="font-20 mt-1">Best exchange</p>
            </CWidgetSimple>
        </CCol>
        <CCol sm="6" lg="3">
            <CWidgetSimple header="" text="" className="p-0">
                <CImg
                    src={'img/icons8-flash-on-50.png'}
                    alt="Fast transaction"
                    height="40"
                />
                <p className="font-20 mt-1">Fast transaction</p>
            </CWidgetSimple>
        </CCol>
        <CCol sm="6" lg="3">
            <CWidgetSimple header="" text="" className="p-0">
                <CImg
                    src={'img/icons8-peso-symbol-50.png'}
                    alt="Lowest fees"
                    height="40"
                />
                <p className="font-20 mt-1">Lowest fees</p>
            </CWidgetSimple>
        </CCol>
        <CCol sm="6" lg="3">
            <CWidgetSimple header="" text="" className="p-0">
                <CImg
                    src={'img/icons8-bank-building-64.png'}
                    alt="Regulated by SEC"
                    height="40"
                />
                <p className="font-20 mt-1">Regulated by SEC</p>
            </CWidgetSimple>
        </CCol>
    </CRow>

    )
}

export default WidgetsAdvantage
