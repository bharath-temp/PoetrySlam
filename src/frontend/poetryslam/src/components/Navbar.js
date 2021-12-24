import React from 'react';
import { Menu } from 'semantic-ui-react';

function Navbar() {
  return (
    <Menu pointing secondary>
      <Menu.Item name="Login" href="/login" />
      <Menu.Item name="My Poems" href="/me/poems" />
      <Menu.Item name="Users" href="/users" />
    </Menu>
  );
}

export default Navbar;
