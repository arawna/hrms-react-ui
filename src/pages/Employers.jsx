import React, { useEffect, useState } from "react";
import { Button, Card } from "semantic-ui-react";
import EmployerService from "../services/EmployerService";

export default function Employers() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group fluid>
        {employers.map((employer) => (
          <Card fluid>
            <Card.Content>
              <Card.Header>{employer.companyName}</Card.Header>
              <Card.Meta>{employer.webSite}</Card.Meta>
              <Card.Description>
                <p><b>Eposta: </b>{employer.email}</p>
                <p><b>Telefon: </b>{employer.phoneNumber}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Detaylar
                </Button>
                <Button basic color="blue">
                  Web Sitesi
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
