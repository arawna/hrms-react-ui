import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import CandidateService from "../services/CandidateService";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidates()
      .then((result) => setCandidates(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
          {
              candidates.map(candidate =>(
                <Card key={candidate.id} fluid>
                <Card.Content>
                  <Card.Header>{candidate.firstName+" "+candidate.lastName}</Card.Header>
                  <Card.Meta>{candidate.dateOfBirth}</Card.Meta>
                  <Card.Description>
                    {candidate.email}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green" as={Link} to={`/cvs/${candidate.id}`}>
                      Cvsini Gör
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              ))
          }
        
        
      </Card.Group>
    </div>
  );
}
