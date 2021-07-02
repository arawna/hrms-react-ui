import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
  } from "semantic-ui-react";
  import * as Yup from "yup";
import EmployerService from "../services/EmployerService";

export default function RegisterEmployer() {

  let employerService = new EmployerService();
  const employerRegisterSchema = Yup.object().shape({
    companyName: Yup.string().required("Şirket adı zorunludur").min(2,"Şirket adı en az iki uzunlukta olmalıdır"),
    phoneNumber: Yup.string().required("Telefon numarası zorunludur").length(10,"Telefon numarası hatalı '0' olmadan yazınız").matches(/^[0-9]+$/, "Sadece rakam girilmelidir"),
    password: Yup.string().required("Şifre zorunludur").min(8,"Şifre en az 8 karakter uzunluğunda olmalıdır"),
    rePassword: Yup.string().required("Şifre tekrar zorunludur").oneOf([Yup.ref("password"),null], "Şifreler eşleşmiyor"),
    webSite: Yup.string().required("Web sitesi zorunludur").test("Http olmadan yazınız",function() {
      let site = this.parent["webSite"];
      if(site){
        return site.startsWith("http") ? false : true;
      }
    }),
    email: Yup.string().required("Email zorunludur").email("Geçerli bir email değil").test("Email domaini ile web sitesi domaini aynı olmalıdır",function() {
      let site = this.parent["webSite"];
      let email = this.parent["email"];
      if(site && email) {
        return email.endsWith(site) ? true : false;
      }
    }),
    reEmail: Yup.string().required("Email Tekrar zorunludur").oneOf([Yup.ref("email"),null],"Email bilgileri birbiri ile eşleşmıyor"),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      companyName:"",
      password:"",
      rePassword:"",
      webSite:"",
      email:"",
      phoneNumber:"",
    },
    validationSchema: employerRegisterSchema,
    onSubmit:(values) => {
      employerService.registerEmployer(values).then((result) => {
        toast.success(result.data.message)
        history.push("/login")
      }).catch((result) => {
        toast.error(result.response.data.message)
      })
    }
  });

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> İşveren Olarak Kayıt Ol
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
        <div style={{marginTop:"1em"}}>
              <label><b>Şirket Adı</b></label>
              <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Şirket Adı"
                type="text"
                value={formik.values.companyName}
                name="companyName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.errors.companyName && formik.touched.companyName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.companyName}
                  </div>
                )
              }
              </div>
          <Grid stackable>            
            <Grid.Column width={8}>
              <div style={{marginTop:"1em"}}>
                <label><b>Telefon Numarası</b> (Sıfır olmadan yazınız)</label>
                <Form.Input
                  fluid
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telefon Numarası"
                  type="text"
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {
                formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.phoneNumber}
                  </div>
                )
              }
              </div>
              
              <div style={{marginTop:"1em"}}>
              <label><b>Email</b> (Web sitesi domaini ile aynı domaine sahip olmalıdır)</label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )
              }
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Şifre</b></label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )
              }
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{marginTop:"1em"}}>
              <label><b>Web Sitesi</b> (http:// olmadan yazınız)</label>
              <Form.Input
                fluid
                icon="world"
                iconPosition="left"
                placeholder="Web Sitesi"
                type="text"
                name="webSite"
                value={formik.values.webSite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.errors.webSite && formik.touched.webSite && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.webSite}
                  </div>
                )
              }
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Email Tekrar</b></label>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail adresi tekrar"
                type="email"
                name="reEmail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>
              <div style={{marginTop:"1em"}}>
              <label><b>Şifre Tekrar</b></label>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre Tekrar"
                type="password"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>

          <br />
          <Button color="teal" fluid size="large" type="submit">
            Kayıt Ol
          </Button>
        </Segment>
      </Form>
      <Message warning>
        İşveren kayıtları sistem çalışanları tarafından onaylandıktan sonra aktif hale gelmektedir!
      </Message>
    </div>
  );
}
