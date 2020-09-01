/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  useFormik, Form, Formik, Field, ErrorMessage,
} from 'formik';
// eslint-disable-next-line import/no-cycle
import { AuthContext } from '../App';

function Login() {
  const { dispatch } = React.useContext(AuthContext);
  const bearer = '';
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    async onSubmit(values) {
      const grant = `grant_type=&username=${values.username}&password=${values.password}&scope=&client_id=&client_secret=`;
      await fetch('/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
        body: JSON.stringify(grant),
      }).then((dataWrappedByPromise) => dataWrappedByPromise.json())
        .then((data) => {
          // bearer = `Bearer ${data.access_token}`;
          console.log(data.access_token);
          dispatch({
            type: 'LOGIN',
            token: data.access_token,
          });
        });
      console.log(bearer);
      /*
      console.log('response worked!');
      await fetch('/users/me', {
        method: 'GET',
        headers: {
          Authorization: bearer,
          accept: 'application/json',
        },
      }).then((dataWrappedByPromise) => dataWrappedByPromise.json())
        .then((data) => {
          console.log(data);
        });
      */
    },
  });
  return (
    <Formik>
      {({ isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Field type="text" name="username" onChange={handleChange} />
          <br />
          <ErrorMessage name="username" component="div" />
          <br />
          <Field type="text" name="password" onChange={handleChange} />
          <br />
          <ErrorMessage name="password" component="div" />
          <br />
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
