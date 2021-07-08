import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CvService from "../services/CvService";
import { Card, Image, Table, Header, Button, Icon } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";
import UptadeGithub from "./popups/cvUpdate/UptadeGithub";
import UpdateLinkedin from "./popups/cvUpdate/UpdateLinkedin";
import UpdateBiography from "./popups/cvUpdate/UpdateBiography";
import UpdateSchools from "./popups/cvUpdate/UpdateSchools";
import UpdateLanguage from "./popups/cvUpdate/UpdateLanguage";
import UpdateTechnology from "./popups/cvUpdate/UpdateTechnology";
import UpdateExperiance from "./popups/cvUpdate/UpdateExperiance";
import UpdateImage from "./popups/cvUpdate/UpdateImage";
import { toast } from "react-toastify";

export default function CvDetail() {

  const {authItem} = useSelector(state => state.auth)

  let { id } = useParams();

  let [cv, setCv] = useState({});

  let cvService = new CvService();
  useEffect(() => { 
    let cvService = new CvService();   
    cvService.getByCandidateId(id).then((result) => setCv(result.data.data));
  }, [id]);

  let myProfile = false;
  if(authItem[0].loggedIn === false){
    myProfile=false
  }else if(authItem[0].loggedIn === true){
    myProfile = parseInt(authItem[0].user.id) === parseInt(id);
  }

  const handleGithubDelete = (cvId) => {
    cvService.deleteGithub(cvId).then((result) => {
      toast.success(result.data.message)
      updateCvValues();
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }

  const handleLinkedinDelete = (cvId) => {
    cvService.deleteLinkedin(cvId).then((result) => {
      toast.success(result.data.message)
      updateCvValues();
    }).catch((result) => {
      alert(result.response.data.message)
      toast.error(result.response.data.message)
    })
  }

  const updateCvValues = () => {
    cvService.getByCandidateId(id).then((result) => {
      setCv(result.data.data)
    })
  }

  return (
    <div>
      <Card.Group>
        <Card fluid color={"black"}>
          <Card.Content>
            {cv.images?.map((image) => (
              <Image
                floated="left"
                size="small"
                src={image?.imageUrl}
                circular
                key={image?.id}
              />
            ))}
            {myProfile && <Popup trigger={<button className="ui button">Resim Yükle</button>} modal>
                            <UpdateImage cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>}

            <Card.Header style={{marginTop:"0.3em"}}>
              {cv.candidate?.firstName + " " + cv.candidate?.lastName}
            </Card.Header>
            <Card.Meta>
              <strong>{cv.biography}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
                    <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Ad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.firstName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Soyad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.lastName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Doğum Tarihi</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.dateOfBirth}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Email</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.github}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary disabled={!cv.github}>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                          {myProfile && <Popup trigger={<button className="ui button"> Güncelle </button>} modal>
                            <UptadeGithub cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>}
                          {myProfile && <Button color="red" circular icon="x" onClick={() => handleGithubDelete(cv.id)} disabled={!cv.github}>
                            </Button>}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.github}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.linkedin}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin" disabled={!cv.linkedin}>
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                          </a>
                          {myProfile && <Popup trigger={<button className="ui button"> Güncelle </button>} modal>
                            <UpdateLinkedin cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>}
                          {myProfile && <Button color="red" icon="x" circular disabled={!cv.linkedin} onClick={() => handleLinkedinDelete(cv.id)}>
                            </Button>}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.linkedin}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Biyografi 
            {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateBiography cvId={cv.id} updateCvValues={updateCvValues} curentBiography={cv.biography}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Card.Content description={cv.biography} />
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Okuduğu Okullar
          {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateSchools cvId={cv.id} updateCvValues={updateCvValues}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.name}</Table.Cell>
                <Table.Cell>{school.department}</Table.Cell>
                <Table.Cell>{school.startDate}</Table.Cell>
                <Table.Cell>{school.endDate ? school.endDate:<p>Devam Ediyor</p>}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            Tecrübeler
            {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateExperiance cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>}
          </Card.Header>
        </Card.Content>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                <Table.HeaderCell>Başalngıç Tarihi</Table.HeaderCell>
                <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {cv.experiances?.map((experiance) => (
              <Table.Row key={experiance.id}>
                <Table.Cell>{experiance.companyName}</Table.Cell>
                <Table.Cell>{experiance.position}</Table.Cell>
                <Table.Cell>{experiance.startDate}</Table.Cell>
                <Table.Cell>{experiance.endDate ? experiance.endDate:<p>Devam Ediyor</p>}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Yabancı Diller
            {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateLanguage cvId={cv.id} updateCvValues={updateCvValues}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil Adı</Table.HeaderCell>
              <Table.HeaderCell>Seviye min:1 max:5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.name}</Table.Cell>
                <Table.Cell>{language.level}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Yazılım Teknolojileri
          {myProfile && <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateTechnology cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.technologies?.map((technology) => (
              <Table.Row key={technology.id}>
                <Table.Cell>{technology.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
