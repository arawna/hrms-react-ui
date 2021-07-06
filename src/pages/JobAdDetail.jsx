import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobAdService from "../services/JobAdService";
import { Header, Icon, Table, Button, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteService from "../services/FavoriteService";
import { toast } from "react-toastify";

export default function JobAdDetail() {
  let { id } = useParams();

  const {authItem} = useSelector(state => state.auth)

  const [jobAd, setJobAd] = useState({});
  let [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let jobAdService = new JobAdService();
    let favoriteService = new FavoriteService();
    jobAdService.getByJobAdId(id).then((result) => setJobAd(result.data.data));
    if(authItem[0].loggedIn===true && authItem[0].user.userType===1){
      favoriteService.getByCandidateId(authItem[0].user.id).then((result) => {
        setFavorites(result.data.data.map((favoriteAd) => (
          favoriteAd.jobAd.id
        )))
      })
    }
  }, [id,authItem]);

  const handleAddFavorites = (jobAdId) => {
    let favoriteService = new FavoriteService();
    favoriteService.addFavorite(authItem[0].user.id,jobAdId).then((result) => {
      toast.success(result.data.message)
      favorites.push(jobAdId)
      setFavorites([...favorites])
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }

  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Açıklama" />
        <Card.Content>
            {jobAd.description}
        </Card.Content>
      </Card>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Table celled color={"black"} stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>İş veren</Table.HeaderCell>
                  <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="building" />
                        Şirket Adı
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.companyName}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="mail" />
                        Email
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.email}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="phone" />
                        Telefon
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.phoneNumber}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="world" />
                        Web Sitesi
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.webSite}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="list ul" />
                        Detaylar
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Button animated as={Link} to={`/employers/${jobAd.employer?.id}`}>
                      <Button.Content visible>Detaylara Git</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            {authItem[0].loggedIn && authItem[0].user.userType===1 && 
              <Button fluid color={favorites.includes(jobAd.id)?"red":"green"} onClick={() => handleAddFavorites(jobAd.id)}>
                <Icon name={favorites.includes(jobAd.id)?"heart":"heart outline"} />{favorites.includes(jobAd.id)?"İlan Favorilerinizde":"İlanı Favorilerine Ekle"}
              </Button>
            }
          </Grid.Column>
          <Grid.Column width={10}>
            <Table celled fixed singleLine color={"black"}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>İş İlanı</Table.HeaderCell>
                  <Table.HeaderCell>Detaylar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>İş Pozisyonu</Table.Cell>
                  <Table.Cell>{jobAd.jobPosition?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Şehir</Table.Cell>
                  <Table.Cell>{jobAd.city?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Çalışma Yeri</Table.Cell>
                  <Table.Cell>{jobAd.workPlace?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Çalışma Zamanı</Table.Cell>
                  <Table.Cell>{jobAd.workTime?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Minimum Maaş</Table.Cell>
                  <Table.Cell>{jobAd.minSalary}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Maksimum Maaş</Table.Cell>
                  <Table.Cell>{jobAd.maxSalary}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Açık Pozisyonlar</Table.Cell>
                  <Table.Cell>{jobAd.openPositions}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Yayınlanma Tarihi</Table.Cell>
                  <Table.Cell>{jobAd.createDate}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Son Başvuru Tarihi</Table.Cell>
                  <Table.Cell>{jobAd.lastDate}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      
    </div>
  );
}
