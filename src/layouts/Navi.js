import React from "react";
import { Container,Button, Menu, Icon } from 'semantic-ui-react';
import "../App.css";

export default function Navi() {
  return (
    <div>
      <Menu size="large" inverted fixed="top">
        <Container>
          <Menu.Item name="Ana Sayfa">
          <Icon name="home" />Ana Sayfa
          </Menu.Item>
          <Menu.Item name="İş ilanları" />
          <Menu.Item name="Cvler" />

          <Menu.Menu position="right">
            <Button.Group>
              <Button>Giriş yap</Button>
              <Button.Or />
              <Button positive>Kaydol</Button>
            </Button.Group>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
