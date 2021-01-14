import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Formik, Form } from 'formik';

import FormSchema from './LoginSchema';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/user/user.actions';
import { selectIsUserAuth } from '../../redux/user/user.selectors';

export default function LoginForm() {
  let [submitError, setSubtmitError] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsUserAuth);

  useEffect(() => {
    isAuth && history.push('/profile');
  }, [isAuth, history]);

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, setFieldValue, touched }) => (
        <Form>
          <div data-testid="login-form" style={{ marginBottom: '25px' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
              helperText={touched.email && errors['email']}
              error={touched.email && Boolean(errors['email'])}
              inputProps={{ 'data-testid': 'email-input' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={values.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
              helperText={touched.password && errors['password']}
              error={touched.password && Boolean(errors['password'])}
              type="password"
              inputProps={{ 'data-testid': 'password-input' }}
            />
          </div>

          {submitError && (
            <div>
              <p style={{ color: 'red', fontWeight: 'bold' }}>{submitError}</p>
            </div>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign in
          </Button>
          <p>
            Don't have an account yet? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
