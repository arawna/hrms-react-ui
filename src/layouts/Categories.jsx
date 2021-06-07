import React from "react";
import { Icon, Menu } from 'semantic-ui-react'

export default function Categories() {
  return (
    <div>
      <Menu compact icon="labeled" vertical fluid>
        <Menu.Item name="gamepad">
          <Icon name="list" />
          İş ilanları
        </Menu.Item>

        <Menu.Item name="video camera">
          <Icon name="factory" />
          İş verenler
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="user" />
          Kullanıcılar
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="wordpress forms" />
          Cvler
        </Menu.Item>
      </Menu>
    </div>
  );
}
