/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Feed } from 'semantic-ui-react';

function Userpoemfeed() {
  const tempdata = [
    {
      downvotes: 0,
      id: 'ac867a1a-2008-4272-9e05-2d6f610ec62e',
      author_id: '6eeebc6e-4970-4b5c-af08-bf6199357ef6',
      title: 'sonnet #1',
      written_date: '2020-08-12T21:52:21.436000',
      text: 'this here is the epic sonnet i\'ve written praise me.',
      created_at: '2020-08-12T21:53:18.145726',
      poem_type: 'sonnet',
      upvotes: 0,
      updated_at: '2020-08-12T21:53:18.145726',
    },
    {
      downvotes: 0,
      id: '6281a3a1-5d68-450b-a3ee-114e94187b78',
      author_id: '6eeebc6e-4970-4b5c-af08-bf6199357ef6',
      title: 'string1',
      written_date: '2020-08-12T22:08:07.756000',
      text: 'string1',
      created_at: '2020-08-12T22:08:29.289775',
      poem_type: 'epic',
      upvotes: 1,
      updated_at: '2020-08-12T22:08:29.289775',
    },
  ];
  // const bearer = '';
  fetch('/item', {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((dataWrappedByPromise) => dataWrappedByPromise.json())
    .then((data) => {
      console.log(data);
    });
  /*
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    fetch('/users/me/poems').then((res) => res.json()).then((data) => {
      setPoems(data);
      console.log(data);
    });
  }, []);
  */

  return (
    <Feed>
      <Feed.Event>
        {tempdata.map((poem) => (
          <Feed.Content>
            <Feed.Date content={poem.written_date} />
            <Feed.Summary content={poem.title} />
            <Feed.Extra text content={poem.text} />
            <Feed.Extra text content={poem.poem_type} />
          </Feed.Content>
        ))}
      </Feed.Event>
    </Feed>
  );
}

export default Userpoemfeed;
