import React from "react";
import { useSelector } from "react-redux";
import EmployerService from "../../../services/EmployerService";
import {
  Card,
  Grid,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function EmployerUpdate() {
  let employerService = new EmployerService();
  const { authItem } = useSelector((state) => state.auth);

  let [employer, setEmployer] = useState([]);

  const employerUpdateShema= Yup.object().shape({
    companyName: Yup.string().required("Bu alan boş birakılamaz").min(2,"En az 2 karakter uzunlugunda olmalıdır"),
    email: Yup.string().required("Bu alan zorunludur").email("Hatalı email girdiniz"),
    phoneNumber: Yup.string().required("Bu alan zorunludur").min(11,"Telegon numarası 11 haneli olmalıdır").max(11,"Telegon numarası 11 haneli olmalıdır"),
    webSite: Yup.string().required("Bu alan zorunludur")
  })

  let formik;

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getEmployerById(authItem[0].user.id).then((result) => {
      formik.values.companyName=result.data.data.companyName
      formik.values.email=result.data.data.email
      formik.values.phoneNumber=result.data.data.phoneNumber
      formik.values.webSite=result.data.data.webSite
      setEmployer(result.data.data);
    });
  }, [authItem,formik]);

  formik = useFormik({
    initialValues:{
      companyName:"",
      email:"",
      phoneNumber:"",
      webSite:"",
    },
    validationSchema:employerUpdateShema,
    onSubmit:(values) => {
        formik.values.employerId=authItem[0].user.id;
        employerService.update(values).then((result) => {
            toast.success(result.data.message)
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }
})

  return (
    <div>
      {employer.waitingUpdate === true && (
        <Message positive>
          <Message.Header>Son güncelleme isteginiz onay bekliyor</Message.Header>
          <p>
            En son yaptıgınız güncelleme isteği onaylanana kadar yeni günceleme yapamazsınız personelimiz en kısa sürede isteğinizi onaylayacaktır
          </p>
        </Message>
      )}
      {employer.waitingUpdate === false && (
          <Card fluid color={"black"}>
              <Card.Content header={"Şirket Bilgilerini Güncelle"}/>
              <Card.Content>
                  <Form onSubmit={formik.handleSubmit}>
                    <Grid>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Şirket Adı</b></label>
                            <Form.Input
                                fluid
                                placeholder="Şirket Adı"
                                type="text"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.companyName && formik.touched.companyName && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.companyName}
                                </div>
                            )}
                            </div>
                            <label><b>Email</b></label>
                            <Form.Input
                                fluid
                                placeholder="Şirket Adı"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.email}
                                </div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Web Site</b></label>
                            <Form.Input
                                fluid
                                placeholder="Web Sitesi"
                                type="text"
                                name="webSite"
                                value={formik.values.webSite}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.webSite && formik.touched.webSite && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.webSite}
                                </div>
                            )}
                            </div>
                            <label><b>Telefon</b></label>
                            <Form.Input
                                fluid
                                placeholder="Telefon"
                                type="text"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.phoneNumber}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop:"1em"}}>
                    <Button fluid color="green" type="submit">Güncelle</Button>
                    </div>
                  </Form>
              </Card.Content>
          </Card>
      )}
    </div>
  );
}
