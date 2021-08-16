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
    fullName: Yup.string()
    .min(2, `Full name has to be at least 2 characters`)
    .required('Full name is required'),
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
    password: Yup.string()
    .min(6, `Password has to be at least ${6} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([values.password], 'Passwords must match')
    .required('Password confirmation is required')
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
  fullName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Signup = () => {
  const dispatch = useDispatch()

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    userService.register(values)
        .then(
            user => { 
              if (user && user.status) {
                successNotification(user.message, 3000);
                dispatch({type: 'set', openSignup: false})
                dispatch({type: 'set', openSignin: true})
              }
              setSubmitting(false)
            },
            error => {
                console.log("error: ", error)
                warningNotification(error, 3000);
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
                        <CLabel htmlFor="fullName">Full Name</CLabel>
                        <CInput type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Full Name"
                                autoComplete="given-name"
                                valid={!errors.fullName}
                                invalid={touched.fullName && !!errors.fullName}
                                autoFocus={true}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullName} />
                        <CInvalidFeedback>{errors.fullName}</CInvalidFeedback>
                      </CFormGroup>
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
                          <CLabel htmlFor="confirmPassword">Password</CLabel>
                          <CInput type="password"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  placeholder="Confirm password"
                                  autoComplete="new-password"
                                  valid={!errors.confirmPassword}
                                  invalid={touched.confirmPassword && !!errors.confirmPassword}
                                  required
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirmPassword} />
                          <CInvalidFeedback>{errors.confirmPassword}</CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CButton type="submit" color="primary" className="signin-button mt-3 mb-0" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Wait...' : 'Sign up'}</CButton>
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

export default Signup
