import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormSchema from './RegisterSchema';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/user/user.actions';

export default function RegisterForm() {
  let [submitError, setSubtmitError] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    user.isAuthenticated && history.push('/profile');
  }, [user, history]);

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <div data-testid="register-form" style={{ marginBottom: '25px' }}>
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
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
              helperText={touched.name && errors['name']}
              error={touched.name && Boolean(errors['name'])}
              inputProps={{ 'data-testid': 'name-input' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={values.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
              helperText={touched.password && errors['password']}
              error={touched.password && Boolean(errors['password'])}
              inputProps={{ 'data-testid': 'password-input' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <TextField
              label="Confirm password"
              variant="outlined"
              fullWidth
              name="passwordConfirm"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => setFieldValue('passwordConfirm', e.target.value)}
              helperText={touched.confirmPassword && errors['passwordConfirm']}
              error={touched.confirmPassword && Boolean(errors['passwordConfirm'])}
              inputProps={{ 'data-testid': 'confirm-password-input' }}
            />
          </div>

          {submitError && (
            <div>
              <p style={{ color: 'red', fontWeight: 'bold' }}>{submitError}</p>
            </div>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign up
          </Button>
          <p>
            Have an account? <Link to="/login">Sign In</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
