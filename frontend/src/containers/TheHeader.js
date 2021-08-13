import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CImg,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom';

const TheHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const darkMode = useSelector(state => state.darkMode)
  const sidebarShow = useSelector(state => state.sidebarShow)
  const isAdmin = useSelector(state => state.isAdmin)
  const isLogin = useSelector(state => state.isLogin)
  const currPath = history.location.pathname

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader colorScheme="dark" className="header">
      <CToggler
        inHeader
        className={isAdmin && isLogin ? 'ml-md-3 d-lg-none' : 'ml-md-3 d-none'}
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className={isAdmin && isLogin ? 'ml-3 d-md-down-none' : 'ml-3 d-none'}
        onClick={toggleSidebar}
      />

      <CHeaderNav className={isAdmin ? 'invisible' : 'd-md-down-none mr-auto invisible'}>
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/home">
            <CImg
              src={'img/logo.png'}
              alt="Company Logo"
              height="40"
            />
          </CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch({type: 'set', darkMode: !darkMode})}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/> */}

        <CHeaderNavLink to="/signup" className={isLogin ? 'd-none' : undefined}>
            <CButton block className={currPath === '/signup' ? 'button-sign-active' : 'button-sign'}>
              <strong>Sign up</strong>
            </CButton>
        </CHeaderNavLink>

        <CHeaderNavLink to="/signin" className={isLogin ? 'd-none' : undefined}>
            <CButton block className={currPath === '/signin' ? 'button-sign-active' : 'button-sign'}>
              <strong>Sign in</strong>
            </CButton>
        </CHeaderNavLink>
        
        <CDropdown variant="btn-group" className={isLogin ? 'm-0 pt-0' : 'd-none'}>
            <CDropdownToggle className="m-0 pt-0 p-0 dropdown-toggle-exchange" color="success">
                Account
            </CDropdownToggle>
            <CDropdownMenu className="pt-1 dropdown-toggle-menu" placement="bottom-end">
                <CDropdownItem className="dropdown-toggle-menuitem">Payment method</CDropdownItem>
                <CDropdownItem className="dropdown-toggle-menuitem">Settings</CDropdownItem>
                <CDropdownItem className="dropdown-toggle-menuitem">Log out</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
      </CHeaderNav>
      
      <div className="header-border"></div>
    </CHeader>
  )
}

export default TheHeader
