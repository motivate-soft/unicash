import React from 'react'
import {
  CWidgetSimple,
  CButton,
  CCol,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CRow
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { userService } from '../../controllers/_services/user.service';
import { successNotification, warningNotification } from '../../controllers/_helpers';

const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
    password: Yup.string()
    .required('Password is required!')
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

const initialValues = {
  email: "",
  password: ""
}

const Signin = () => {
  const dispatch = useDispatch()
  
  const onSubmit = (values, { setSubmitting, setErrors }) => {
    userService.login(values.email, values.password)
      .then(
          user => {
            console.log(user)
            dispatch({type: 'set', user: user})
            dispatch({type: 'set', openSignin: false})
            dispatch({type: 'set', openSignup: false})
            dispatch({type: 'set', isLogin: true})
            // dispatch({type: 'set', isAdmin: true})
            successNotification('Welcome to Unicach.', 3000)
            setSubmitting(false)
          },
          error => {
            warningNotification(error, 3000)
            setSubmitting(false)
          }
      );
  }

  return (
    <>
      <CWidgetSimple className="signin-widget text-left p-3 pt-0 pb-0 mx-auto">
        <h3 className="text-center mb-2">Welcome to Unicash<span className="text-success">.</span></h3>
        <Formik
            initialValues={initialValues}
            validate={validate(validationSchema)}
            onSubmit={onSubmit}
          >
            {
              ({
                values,
                errors,
                touched,
                status,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                handleReset,
                setTouched
              }) => (
                <CRow>
                  <CCol>
                    <CForm onSubmit={handleSubmit} noValidate name='loginForm' className="text-left">
                      <CFormGroup>
                        <CLabel htmlFor="email">Email</CLabel>
                        <CInput type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                autoComplete="email"
                                valid={!errors.email}
                                invalid={touched.email && !!errors.email}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} />
                        <CInvalidFeedback>{errors.email}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                            <CLabel htmlFor="password">Password</CLabel>
                            <CInput type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    valid={!errors.password}
                                    invalid={touched.password && !!errors.password}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}/>
                            {/*<CInvalidFeedback>Required password containing at least: number, uppercase and lowercase letter, 8 characters</CInvalidFeedback>*/}
                            <CInvalidFeedback>{errors.password}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CButton type="submit" color="primary" className="signin-button mt-3 mb-0" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Sign in'}</CButton>
                      </CFormGroup>
                    </CForm>
                  </CCol>
                </CRow>
              )}
          </Formik>
      </CWidgetSimple>
    </>
  )
}

export default Signin
