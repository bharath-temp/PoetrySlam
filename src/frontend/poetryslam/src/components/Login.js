/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import React from 'react';
import {
  useFormik, Formik, Field, ErrorMessage,
} from 'formik';
import {
  Button, Form, Grid, Header,
} from 'semantic-ui-react';
import Navbar from './Navbar';
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
    <>
      <Navbar />
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Welcome To PoetrySlam
          </Header>
          <Header as="h3" color="teal" textAlign="center">
            Do You Have An Account With Us?
          </Header>
          <Formik>
            {({ isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Field type="text" placeholder="Username" name="username" onChange={handleChange} />
                <br />
                <ErrorMessage name="username" component="div" />
                <br />
                <Field
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  name="password"
                />
                <br />
                <ErrorMessage name="password" component="div" />
                <br />
                <Button color="teal" fluid size="large" type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </>
  );

  /*
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Formik>
          {({ isSubmitting }) => (
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left'
                placeholder='Username' name='username' onChange={handleChange}/>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                />
                <Button color='teal' fluid size='large' type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Segment>
            </Form>
          )}
        </Formik>
      </Grid.Column>
    </Grid>
  )
  */
}

export default Login;
