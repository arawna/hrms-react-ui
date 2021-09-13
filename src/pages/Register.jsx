import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import CandidateService from "../services/CandidateService";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Register() {

  let candidateService = new CandidateService();
  const candidateRegisterSchema = Yup.object().shape({
    birthDate: Yup.date().required("Doğum Tarihi zorunludur"),
    email: Yup.string().required("Email alanı zorunludur").email("Geçerli bir email değil"),
    reEmail: Yup.string().oneOf([Yup.ref("email"),null],"Email bilgileri birbiri ile eşleşmıyor").required("Email Tekrar zorunludur"),
    firstName: Yup.string().required("İsim zorunludur"),
    lastName: Yup.string().required("Soy isim zorunludur"),
    nationalNumber: Yup.string().required("Kimlik numarası zorunludur").length(11,"Kımlık numarası hatalı").matches(/^[0-9]+$/, "Sadece rakam girilmelidir"),
    password: Yup.string().required("Şifre zorunludur").min(8,"Şifre en az 8 karakter uzunlugunda olmalıdır"),
    rePassword: Yup.string().oneOf([Yup.ref("password"),null], "Şifreler eşleşmiyor")
  });

  const history = useHistory();

  const formik= useFormik({
    initialValues: {
      birthDate:"",
      email:"",
      firstName:"",
      lastName:"",
      nationalNumber:"",
      password:"",
      rePassword:"",
    },
    validationSchema: candidateRegisterSchema,
    onSubmit:(values) => {
      candidateService.registerCandidate(values).then((result) => {
        toast.success(result.data.message)
        history.push("/login")
      })
      .catch((result) => {
        toast.error(result.response.data.message)
      })      
    }
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName,value);
  }

  const {authItem} = useSelector(state => state.auth)

  return (
    <div>
      {authItem[0].loggedIn === true &&
        <div>
          <Message negative>
            <Message.Header>Zaten giriş yapmış durumdasınız.</Message.Header>
            <p>İsterseniz çıkış yapıp tekrar deneyebilirsiniz.</p>
          </Message>
        </div>
      }
      {authItem[0].loggedIn === false && 
      <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Kayıt Ol
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <Grid stackable>
            <Grid.Column width={8}>
            <div style={{marginTop:"1em"}}>
              <label><b>İsim</b></label>
              
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="İsim"
                type="text"
                value={formik.values.firstName}
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.errors.firstName && formik.touched.firstName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.firstName}
                  </div>
                )
              }
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Soy İsim</b></label>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Soy isim"
                type="text"
                value={formik.values.lastName}
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Kimlik Numarası</b></label>
              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                placeholder="Kimlik numarası"
                type="text"
                value={formik.values.nationalNumber}
                name="nationalNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.nationalNumber && formik.touched.nationalNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.nationalNumber}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Doğum Tarihi</b></label>
              <Form.Input
                fluid
                icon="calendar times"
                iconPosition="left"
                placeholder="Dogum tarihi"
                type="date"
                error={Boolean(formik.errors.birthDate)}
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "birthDate")
                }
                value={formik.values.birthDate}
                onBlur={formik.handleBlur}
                name="birthDate"
              />
              {formik.errors.birthDate && formik.touched.birthDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.birthDate}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{marginTop:"1em"}}>
            <label><b>Email</b></label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail adresi"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Email Tekrar</b></label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail adresi tekrar"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="reEmail"
              />
              {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Şifre</b></label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
              />
               {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Şifre Tekrar</b></label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre tekrar"
                type="password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="rePassword"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>

            <br/>
          <Button color="teal" fluid size="large" type="submit">
            Kayıt Ol
          </Button>
        </Segment>
      </Form>
      <Message info><Link to={"/registerEmployer"}><b>İşveren olarak kaydolmak için buraya tıkla</b></Link></Message>
      </div>}
    </div>
  );
}
