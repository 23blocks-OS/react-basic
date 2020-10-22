import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { LoginContext } from '../../context';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Formik, Form } from 'formik';

import { get } from 'lodash';

import FormSchema from './LoginSchema';
import { sendFormData } from '../../api/api';

import normalize from 'json-api-normalizer';
import build from 'redux-object';

export default function LoginForm() {
  let [submitError, setSubtmitError] = useState('');
  const [loginData, setLoginData] = useContext(LoginContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        // same shape as initial values
        sendFormData('/auth/sign_in', values)
          .then((response) => {
            console.log(response);
            const normalizedDataObject = normalize(response.data);
            const serializedData = build(normalizedDataObject, 'user');
            console.log(serializedData[0]);

            setLoginData(serializedData[0]);
            history.push('/profile');
          })
          .catch((error) => {
            setSubtmitError(get(error, 'errorDetail', 'Please try again.'));
          });
      }}
    >
      {({ values, errors, handleChange }) => (
        <Form>
          <div data-testid="login-form" style={{ marginBottom: '25px' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleChange}
              helperText={errors['email']}
              error={errors['email']?.length > 0}
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
              onChange={handleChange}
              helperText={errors['password']}
              error={errors['password']?.length > 0}
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
