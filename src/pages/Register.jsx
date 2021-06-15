import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export default function Register() {
  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Kayıt Ol
      </Header>
      <Form size="large">
        <Segment stacked>
          <Grid stackable>
            <Grid.Column width={8}>
              <label>İsim</label>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="İsim"
              />
              <label>Soy İsim</label>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Soy isim"
              />
              <label>Kimlik Numarası</label>
              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                placeholder="Kimlik numarası"
              />
              <label>Doğum Tarihi</label>
              <Form.Input
                fluid
                icon="calendar times"
                iconPosition="left"
                placeholder="Dogum tarihi"
                type="date"
              />
            </Grid.Column>

            <Grid.Column width={8}>
            <label>Email</label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail adresi"
              />
              <label>Email Tekrar</label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail adresi tekrar"
              />
              <label>Şifre</label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
                type="password"
              />
              <label>Şifre Tekrar</label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre tekrar"
                type="password"
              />
            </Grid.Column>
          </Grid>

            <br/>
          <Button color="teal" fluid size="large" disabled>
            Kayıt Ol
          </Button>
        </Segment>
      </Form>
      <Message info>İşveren olarak kaydolmak için buraya tıkla</Message>
    </div>
  );
}
