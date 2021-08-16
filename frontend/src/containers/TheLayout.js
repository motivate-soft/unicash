import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const AuthDialog = React.lazy(() => import('../views/auth/AuthDialog'));

const TheLayout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  return (
    <div className={classes}>
      <TheHeader/>
      <TheSidebar/>
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
      <AuthDialog />
    </div>
  )
}

export default TheLayout
