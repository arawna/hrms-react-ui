import React from "react";
import { Link } from "react-router-dom";
import { Container,Button, Menu, Icon } from 'semantic-ui-react';
import "../App.css";

export default function Navi() {
  return (
    <div>
      <Menu size="large" inverted fixed="top">
        <Container>
          <Menu.Item name="Ana Sayfa" as={Link} to={"/"}>
          <Icon name="home" />Ana Sayfa
          </Menu.Item>
          <Menu.Item name="İş ilanları" as={Link} to={"/jobads"} />
          <Menu.Item name="Cvler" as={Link} to={"/cvs"} />

          <Menu.Menu position="right" style={{ margin: '0.5em' }}>
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
