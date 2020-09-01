/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Feed, Icon } from 'semantic-ui-react';
import {
  useFormik, Form, Formik, Field, ErrorMessage,
} from 'formik';

function Userpoemfeed() {
  const [poems, setPoems] = useState([]);
  // const { state: authState } = React.useContext(AuthContext);
  const bearerToken = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    fetch('/users/me/poems', {
      headers: {
        Authorization: bearerToken,
      },
    }).then((res) => res.json()).then((data) => {
      setPoems(data);
      console.log(data);
    });
  }, [bearerToken]);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch('/users/me', {
      headers: {
        Authorization: bearerToken,
      },
    }).then((res) => res.json()).then((data) => {
      setUserData(data);
      console.log(data);
    });
  }, [bearerToken]);
  console.log(userData.id);

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: '',
      text: '',
      upvotes: 0,
      downvotes: 0,
      poem_type: 'free_verse',
    },
    async onSubmit(values) {
      console.log(values.poem_type);
      await fetch('/users/me/post', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: bearerToken,
        },
        body: JSON.stringify(
          {
            title: values.title,
            text: values.text,
            upvotes: values.upvotes,
            downvotes: values.downvotes,
            poem_type: values.poem_type,
            author_id: userData.id,
          },
        ),
      });
    },
  });

  return (
    <>
      <Feed>
        {poems.map((poem) => (
          <Feed.Event>
            <Feed.Content>
              <br />
              <Feed.Summary content={poem.title} />
              <Feed.Date content={poem.created_at} />
              <Feed.Extra text content={poem.text} />
              <Feed.Extra text content={poem.poem_type} />
              <Feed.Meta>
                <Feed.Like>
                  <Icon name='like' />
                  {poem.upvotes}
                  {' '}
                  Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        ))}
        ,
      </Feed>

      <Formik>
        {({ isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Field type="text" name="title" onChange={handleChange} />
            <br />
            <ErrorMessage name="title" component="div" />
            <br />
            <Field type="text" name="text" onChange={handleChange} />
            <br />
            <ErrorMessage name="text" component="div" />
            <br />
            <Field name="upvotes" onChange={handleChange} />
            <br />
            <ErrorMessage name="upvotes" component="div" />
            <br />
            <Field name="downvotes" onChange={handleChange} />
            <br />
            <ErrorMessage name="downvotes" component="div" />
            <br />
            <Field as="select" name="poem_type" onChange={handleChange}>
              <option value="free_verse">Free Verse</option>
              <option value="rhymed">Rhymed</option>
              <option value="epic">Epic</option>
              <option value="narrative">Narrative</option>
              <option value="haiku">Haiku</option>
              <option value="sonnet">Sonnet</option>
              <option value="elegie">Elegie</option>
              <option value="ode">Ode</option>
              <option value="limerick">Limerick</option>
              <option value="lyric">Lyric</option>
              <option value="ballad">Ballad</option>
              <option value="soliloquy">Soliloquy</option>
              <option value="villanelle">Villanelle</option>
            </Field>
            <br />
            <ErrorMessage name="poem_type" component="div" />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Userpoemfeed;
