import React from 'react'
import CvService from '../../../services/CvService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from "semantic-ui-react";

export default function UptadeGithub({cvId}) {

    let cvService = new CvService();
    const updateGithubSchema = Yup.object().shape({
        github: Yup.string().required("Zorunlu")
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            github:""
        },
        validationSchema: updateGithubSchema,
        onSubmit:(values) =>{
            cvService.updateGithub(cvId,values.github).then((result) =>{
                alert(result.data.message)
                history.push(`/cvs/${authItem[0].user.id}`)
            }).catch((result) => {
                alert(result.response.data.message)
            })
        }
    })

    return (
        <div>
            <Form size="large" onSubmit={formik.handleSubmit}>
                <label><b>GitHub Link</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.Input
                    fluid
                    placeholder="Github Link"
                    type="text"
                    value={formik.values.github}
                    name="github"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.github && formik.touched.github && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.github}
                  </div>
                )
              }
              </div>
              <Button color="green" fluid size="large" type="submit">Güncelle</Button>
            </Form>
        </div>
    )
}
