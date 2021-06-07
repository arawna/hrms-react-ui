import React, { useEffect, useState } from "react";
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import JobAdService from "../services/JobAdService";

export default function JobAds() {
  const [jobAds, setJobAds] = useState([]);

  useEffect(() => {
    let jobAdService = new JobAdService();
    jobAdService.getActiveJobAds().then((result) => setJobAds(result.data.data));
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Şehir</Table.HeaderCell>
            <Table.HeaderCell>Pozisyon</Table.HeaderCell>
            <Table.HeaderCell>Son Tarih</Table.HeaderCell>
            <Table.HeaderCell>Detaylar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            jobAds.map(jobAd => (
            <Table.Row key={jobAd.id}>
              <Table.Cell>{jobAd.employer.companyName}</Table.Cell>
              <Table.Cell>{jobAd.city.name}</Table.Cell>
              <Table.Cell>{jobAd.jobPosition.name}</Table.Cell>
              <Table.Cell>{jobAd.lastDate}</Table.Cell>
              <Table.Cell>
                <Button
                  content="Detayları Gör"
                  icon="right arrow"
                  labelPosition="right"
                />
              </Table.Cell>
            </Table.Row>
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
