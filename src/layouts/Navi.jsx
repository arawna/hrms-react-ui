import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container,Button, Menu, Icon } from 'semantic-ui-react';
import "../App.css";
import SingedIn from "./SingedIn";
import SingedOut from "./SingedOut";

export default function Navi() {

  const {authItem} = useSelector(state => state.auth)

  return (
    <div>
      <Menu size="large" inverted stackable>
        <Container>
          <Menu.Item name="Ana Sayfa" as={Link} to={"/"}>
          <Icon name="home" />Ana Sayfa
          </Menu.Item>
          <Menu.Item name="İş ilanları" as={Link} to={"/jobads"} />
          <Menu.Item name="Cvler" as={Link} to={"/cvs"} />

          <Menu.Menu position="right" style={{ margin: '0.5em' }}>
            {authItem[0].loggedIn && authItem[0].user.userType===2 &&  <Button primary as={Link} to={"/jobAdCreate"}>
              İlan Ekle
            </Button>}
            {authItem[0].loggedIn && authItem[0].user.userType===1 &&  <Button color="red" as={Link} to={`/jobAdFavorites`}>
              <Icon name='heart' />
              Favori İlanlar
            </Button>}
            
            {authItem[0].loggedIn?<SingedIn/>:<SingedOut/>}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
