import React, { useState } from 'react'
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
import { useHistory } from 'react-router-dom';
import { userService } from '../controllers/_services/user.service';

const TheHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  // const darkMode = useSelector(state => state.darkMode)
  const sidebarShow = useSelector(state => state.sidebarShow)
  const isAdmin = useSelector(state => state.isAdmin)
  const isLogin = useSelector(state => state.isLogin)
  const currPath = history.location.pathname

  const [fullName, setFullName] = useState('')

  const localUser = localStorage.getItem('user')
  
  if (localUser && JSON.parse(localUser).id) {
    userService.getById(JSON.parse(localUser).id)
      .then(
        user => {
          if (user.id && user.id === JSON.parse(localUser).id) {
            dispatch({type: 'set', isLogin: true})
            dispatch({type: 'set', user: user})
            setFullName(user.fullName);
          }
        },
        error => {
          logout()
        }
      )
  }

  const logout = () => {
    userService.logout();
    dispatch({type: 'set', isLogin: false})
    dispatch({type: 'set', isAdmin: false})
    history.replace('/home')
  }

  const handleSignupClickOpen = () => {
    dispatch({type: 'set', openSignup: true})
  };

  const handleSigninClickOpen = () => {
    dispatch({type: 'set', openSignin: true})
  };

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <>
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

      <CHeaderNav className={isAdmin ? '' : ' mr-auto'}>
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/home">
            <CImg
              src={'img/Unicash.png'}
              alt="Company Logo"
              height="40"
            />
          </CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch({type: 'set', darkMode: !darkMode})}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler> */}
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/> */}

        <CHeaderNavLink className={isLogin ? 'd-none' : undefined}>
            <CButton block onClick={handleSignupClickOpen} className={currPath === '/signup' ? 'button-sign-active' : 'button-sign'}>
              <strong>Sign up</strong>
            </CButton>
        </CHeaderNavLink>

        <CHeaderNavLink className={isLogin ? 'd-none' : undefined}>
            <CButton block onClick={handleSigninClickOpen} className={currPath === '/signin' ? 'button-sign-active' : 'button-sign'}>
              <strong>Sign in</strong>
            </CButton>
        </CHeaderNavLink>
        
        <CDropdown variant="btn-group" className={isLogin ? 'm-0 pt-0' : 'd-none'}>
            <CDropdownToggle className="m-0 pt-0 p-0 dropdown-toggle-exchange" color="success" caret={false}>
                {fullName}
            </CDropdownToggle>
            <CDropdownMenu className="pt-1 dropdown-toggle-menu" placement="bottom-end">
                <CDropdownItem className="dropdown-toggle-menuitem">Payment method</CDropdownItem>
                <CDropdownItem className="dropdown-toggle-menuitem">Settings</CDropdownItem>
                <CDropdownItem className="dropdown-toggle-menuitem" onClick={logout}>Log out</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
      </CHeaderNav>
      
      <div className="header-border"></div>
    </CHeader>
    </>
  )
}

export default TheHeader
