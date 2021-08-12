import React from 'react'
import { 
    CFooter,
    CNav,
    CNavItem,
    CNavLink,
    CImg
 } from '@coreui/react'

const TheSubFooter = () => {
  return (
    <CFooter fixed={false} color="transparent" className="d-box-shadow1 d-border ml-0 pl-1 mr-0 pr-2">
      <div>
        <CNav variant="pills">
            <CNavItem>
                <CNavLink>About</CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink>Reviews</CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink>Support</CNavLink>
            </CNavItem>
            <CNavItem>
                <CNavLink>Supported currencies</CNavLink>
            </CNavItem>
        </CNav>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">
            <CImg src={'img/icons8-telegram-app-50.png'} alt="Telegram" height={20}></CImg>
            <CImg src={'img/icons8-twitter-50.png'} alt="Twitter" height={20} className="ml-2"></CImg>
            <CImg src={'img/icons8-facebook-50.png'} alt="Facebook" height={20} className="ml-2"></CImg>
            <CImg src={'img/icons8-send-email-50.png'} alt="Send email" height={20} className="ml-2"></CImg>
        </span>
        
      </div>
    </CFooter>
  )
}

export default React.memo(TheSubFooter)
