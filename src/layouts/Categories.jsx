import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from 'semantic-ui-react'

export default function Categories() {
  return (
    <div>
      <Menu fluid compact icon="labeled" vertical>
        <Menu.Item as={Link} to={"/jobads"}>
            <Icon name="list" />
            İş ilanları        
        </Menu.Item>

        <Menu.Item as={Link} to={"/employers"}>
            <Icon name="factory" />
            İş verenler       
        </Menu.Item>

        <Menu.Item as={Link} to={"/candidates"}>
          <Icon name="user" />
          Kullanıcılar
        </Menu.Item>

        <Menu.Item as={Link} to={"/cvs"}>
          <Icon name="wordpress forms" />
          Cvler
        </Menu.Item>
      </Menu>
    </div>
  );
}
