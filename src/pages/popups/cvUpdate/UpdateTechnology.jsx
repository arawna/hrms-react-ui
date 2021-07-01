import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TechnologyService from "../../../services/TechnologyService";
import { Card, Table, Button, Icon, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function UpdateTechnology({ cvId, updateCvValues }) {
  let [technologies, setTechnologies] = useState([]);

  let technologyService = new TechnologyService();
  useEffect(() => {
    let technologyService = new TechnologyService();
    technologyService.getByCvId(cvId).then((result) => {
      setTechnologies(result.data.data);
    });
  },[cvId]);

  let technologyAddSchema = Yup.object().shape({
    name: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "Minimum 2 karakter uzunlugunda olmalıdır"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: technologyAddSchema,
    onSubmit: (values) => {
      values.cvId = cvId;
      technologyService
        .addScholl(values)
        .then((result) => {
          alert(result.data.message);
          technologyService.getByCvId(cvId).then((result) => {
            setTechnologies(result.data.data)
          })
          updateCvValues();
        })
        .catch((result) => {
          alert(result.response.data.message);
        });
    },
  });

  const handleDeleteTechnology = (technologyId) => {
      technologyService.deleteSchool(technologyId).then((result) => {
          alert(result.data.message)
          technologyService.getByCvId(cvId).then((result) => {
            setTechnologies(result.data.data)
          })
          updateCvValues();
      }).catch((result) => {
          alert(result.response.message)
      })
  }

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={8}>
          <Card fluid color={"black"}>
            <Card.Content header={"Teknoloji Ekle"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <label>
                  <b>Teknoloji Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Teknoloji Adı Adı"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.name}
                  </div>
                )}
                <Button fluid color="green" type="submit">Ekle</Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Teknoloji</Table.HeaderCell>
                <Table.HeaderCell>Sil</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {technologies?.map((technology) => (
                <Table.Row key={technology.id}>
                  <Table.Cell>{technology.name}</Table.Cell>
                  <Table.Cell>
                    <Button color="red" onClick={() => handleDeleteTechnology(technology.id)}>
                      <Icon name="x" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}
