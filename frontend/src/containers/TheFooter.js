import React, { lazy } from 'react'
import { CFooter } from '@coreui/react'

const TheSubFooter = lazy(() => import('./TheSubFooter.js'))

const TheFooter = () => {
  return (
    <>
      <TheSubFooter />
      <CFooter fixed={false} className="footer">
        <div>
          <span className="ml-1">Operated by ifastbit Foreign Exchange Services</span>
        </div>
        <div className="mfs-auto">
          <span className="mr-1">all rights reserved &copy; 2021</span>
        </div>
      </CFooter>
    </>
  )
}

export default React.memo(TheFooter)
