import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function SingedOut() {
    return (
        <div>
            <Button.Group>
              <Button as={Link} to={"/login"}>Giriş yap</Button>
              <Button.Or />
              <Button positive as={Link} to={"/register"}>Kaydol</Button>
            </Button.Group>
        </div>
    )
}
