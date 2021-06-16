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

export default function RegisterEmployer() {
  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> İşveren Olarak Kayıt Ol
      </Header>
      <Form size="large">
        <Segment stacked>
          <Grid stackable>
            <Grid.Column width={8}>
              <label>Şirket Adı</label>
              <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Şirket Adı"
              />
              <label>Email</label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email"
              />
              <label>Şifre</label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
              />
            </Grid.Column>

            <Grid.Column width={8}>
              <label>Web Sitesi</label>
              <Form.Input
                fluid
                icon="world"
                iconPosition="left"
                placeholder="Web Sitesi"
              />
              <label>Email Tekrar</label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail adresi tekrar"
              />
              <label>Şifre Tekrar</label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre Tekrar"
                type="password"
              />
            </Grid.Column>
          </Grid>

          <br />
          <Button color="teal" fluid size="large" disabled>
            Kayıt Ol
          </Button>
        </Segment>
      </Form>
      <Message warning>
        İşveren kayıtlarımız şimdilik aktif değildir
      </Message>
    </div>
  );
}
