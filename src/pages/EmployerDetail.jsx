import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmployerService from "../services/EmployerService";
import { Header, Table, Icon, Card, Button } from "semantic-ui-react";
import JobAdService from "../services/JobAdService";
import { Link } from "react-router-dom";

export default function EmployerDetail() {
  let { id } = useParams();

  const [employer, setEmployer] = useState({});
  const [jobAds, setJobAds] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    let jobAdService = new JobAdService();
    employerService
      .getEmployerById(id)
      .then((result) => setEmployer(result.data.data));
    jobAdService
      .getActiveAdsByCompanyId(id)
      .then((result) => setJobAds(result.data.data));
  },[id]);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İş veren</Table.HeaderCell>
            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="building" />
                  Şirket Adı
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.companyName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="world" />
                  Web Sitesi
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.webSite}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="mail" />
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.email}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="phone" />
                  Telefon
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.phoneNumber}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Card fluid>
        <Card.Content header="Bu Şirkete Ait İş İlanları" />
        <Card.Content>
          <Table color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                <Table.HeaderCell>Şehir</Table.HeaderCell>
                <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                <Table.HeaderCell>Detaylar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {jobAds.map((jobAd) => (
                <Table.Row key={jobAd.id}>
                  <Table.Cell>{jobAd.jobPosition?.name}</Table.Cell>
                  <Table.Cell>{jobAd.city?.name}</Table.Cell>
                  <Table.Cell>{jobAd.openPositions}</Table.Cell>
                  <Table.Cell>{jobAd.workPlace?.name}</Table.Cell>
                  <Table.Cell>{jobAd.workTime?.name}</Table.Cell>
                  <Table.Cell>
                    <Button animated as={Link} to={`/jobads/${jobAd.id}`}>
                      <Button.Content visible>Detayları Gör</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Content extra>
          <Icon name="list" />
          {jobAds?.length} Adet İş ilanı mevcut
        </Card.Content>
      </Card>
    </div>
  );
}
