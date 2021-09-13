import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'
import UserService from "../services/UserService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/authActions";
import { toast } from "react-toastify";

export default function Login() {

  const dispatch = useDispatch()
  const {authItem} = useSelector(state => state.auth)

  const handleLogin=(user)=>{
    dispatch(userLogin(user))
  }

  const history = useHistory();

  let userService = new UserService();
  const userLoginSchema = Yup.object().shape({
    email: Yup.string().required("Bu alan doldurulmak zorundadır").email("Geçerli bir email adresi giriniz"),
    password: Yup.string().required("Bu alan doldurulmak zorundadır")
  })

  const formik = useFormik({
    initialValues: {
      email:"",
      password:""
    },
    validationSchema: userLoginSchema,
    onSubmit:(values) => {
      userService.login(values).then((result) => {
        handleLogin(result.data.data)
        localStorage.setItem("user",JSON.stringify(result.data.data))
        history.push("/")
      }).catch((result) => {
        toast.error(result.response.data.message)
      })
    }
  })

  return (
    <div>
      {authItem[0].loggedIn === true &&
        <div>
          <Message negative>
            <Message.Header>Zaten giriş yapmış durumdasınız.</Message.Header>
            <p>İsterseniz çıkış yapıp tekrar giriş yapmayı deneyebilirsiniz.</p>
          </Message>
        </div>
      }
      {authItem[0].loggedIn === false &&
      <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Giriş Yap
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div>
          <label><b>Email</b></label>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail adresi"
            type="email"
            name="email"
            value={formik.values.email}
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

          <Button color="teal" fluid size="large" type="submit" style={{marginTop:"1em"}}>
            Giriş Yap
          </Button>
        </Segment>
      </Form>
      <Message info>
        Kayıtlı değilmisin? <b><Link to={"/register"}>Şimdi Kaydol</Link></b>
      </Message>
      </div>
      }
    </div>
  );
}
