import React, {useState} from "react"
import { Link } from "react-router-dom"
import { Formik, Form } from "formik"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import {get} from 'lodash';

import FormSchema from "./RegisterSchema" 

import { sendFormData } from '../../api/api';

export default function RegisterForm() {

  let [submitError, setSubtmitError] = useState('');

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      validationSchema={FormSchema}
      onSubmit={values => {
        // same shape as initial values

        sendFormData('/auth/', {
            "user[provider]": 'email',
            "user[email]": values.email,
            "user[password]": values.password,
            "user[username]": values.email,
            "user[uid]": values.email,
            "user[name]": values.name,
            confirm_success_url: 'http://app.thecompanytool.com/step2',
            subscription: '318f1533-8dd9-4a7d-8b36-9b04a7c2363f'
        }).then((success) => {
          console.log(success)
        }).catch((error) => {
          setSubtmitError(get(error,'errorDetail', 'Please try again.'));
        })
        
      }}
    >
      {({ values, errors, handleChange }) => (
        <Form>
          <div data-testid="register-form" style={{ marginBottom: "25px" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleChange}
              helperText={errors['email']}
              error={errors['email']}
              inputProps={{ "data-testid": "email-input" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={values.name}
              onChange={handleChange}
              helperText={errors['name']}
              error={errors['name']}
              inputProps={{ "data-testid": "name-input" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              helperText={errors['password']}
              error={errors['password']}
              inputProps={{ "data-testid": "password-input" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <TextField
              label="Confirm password"
              variant="outlined"
              fullWidth
              name="passwordConfirm"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              helperText={errors['passwordConfirm']}
              error={errors['passwordConfirm']}
              inputProps={{ "data-testid": "confirm-password-input" }}
            />
          </div>

          {submitError && <div>
            <p style={{color: 'red', fontWeight: 'bold'}}>{submitError}</p>
          </div>}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign up
          </Button>
          <p>
            Have an account? <Link to="/login">Sign In</Link>
          </p>
        </Form>
      )}
    </Formik>
  )
}
