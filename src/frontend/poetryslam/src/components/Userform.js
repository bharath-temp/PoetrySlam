import React from 'react';
import { useFormik } from 'formik';

// eslint-disable-next-line import/prefer-default-export
export const Userform = () => {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      id: 'id',
      email: 'email',
      user_name: 'user name',
      hashed_password: 'password',
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

      if (response.ok) {
        console.log('response worked!');
      } else {
        console.log('response did not work');
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <input name="id" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <input name="user_name" onChange={handleChange} />
      <input name="hashed_password" onChange={handleChange} />
      <button type="submit">Create User</button>
    </form>
  );
};
