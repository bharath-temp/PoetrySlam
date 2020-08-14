/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('users').then((res) => res.json()).then((data) => {
      setUsers(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Account Creation</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.username}>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.hashed_password}</Table.Cell>
            <Table.Cell>{user.created_at}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </div>
  );
}

export default Users;
