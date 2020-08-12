/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  useFormik, Form, Formik, Field, ErrorMessage,
} from 'formik';

export const Userform = () => {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      username: '',
      hashed_password: '',
    },
    async onSubmit(values) {
      console.log(values);
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(response.json());
      if (response.ok) {
        console.log('response worked!');
      } else {
        console.log('response did not work');
      }
    },
  });
  return (
    <Formik>
      {({ isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Field type="text" name="email" onChange={handleChange} />
          <br />
          <ErrorMessage name="email" component="div" />
          <br />
          <Field type="text" name="username" onChange={handleChange} />
          <br />
          <ErrorMessage name="username" component="div" />
          <br />
          <Field type="text" name="hashed_password" onChange={handleChange} />
          <br />
          <ErrorMessage name="hashed_password" component="div" />
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
