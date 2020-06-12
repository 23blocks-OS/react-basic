import React, {useState} from "react"
import { Link } from "react-router-dom"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import { Formik, Form } from "formik";

import { get } from 'lodash';

import FormSchema from './LoginSchema';
import { sendFormData } from '../../api/api';

export default function LoginForm() {

  let [submitError, setSubtmitError] = useState('');

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        // same shape as initial values
        sendFormData('/auth/sign_in', values)
        .then((success) => {
          console.log(success)
        })
        .catch((error) => {
          setSubtmitError(get(error,'errorDetail', 'Please try again.'));
        });
      }}
    >
      {({ values, errors, handleChange }) => (
        <Form>
          <div data-testid="login-form" style={{ marginBottom: "25px" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleChange}
              helperText={errors["email"]}
              error={errors["email"]}
              inputProps={{ "data-testid": "email-input" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={values.password}
              onChange={handleChange}
              helperText={errors["password"]}
              error={errors["password"]}
              type="password"
              inputProps={{ "data-testid": "password-input" }}
            />
          </div>

          {submitError && <div>
            <p style={{color: 'red', fontWeight: 'bold'}}>{submitError}</p>
          </div>}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign in
          </Button>
          <p>
            Don't have an account yet? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      )}
    </Formik>
  )
}
