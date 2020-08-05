import React from 'react';
import { Table } from 'semantic-ui-react';

export const Users = ({ users }) =>
/*
    const userItems = users.map((user, index) => (
        <p key={user.user_name}> {user.user_name}!</p>
    ));
    */
  (

    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
            <Table.HeaderCell>Account Creation</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.user_name}>
            <Table.Cell>{user.user_name}</Table.Cell>
            <Table.Cell>{user.is_active}</Table.Cell>
            <Table.Cell>{user.account_created}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </div>
  );
