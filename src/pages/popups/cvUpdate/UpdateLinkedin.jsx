import React from 'react'
import CvService from '../../../services/CvService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from "semantic-ui-react";

export default function UpdateLinkedin({cvId}) {

    let cvService = new CvService();
    const updateGithubSchema = Yup.object().shape({
        linkedin: Yup.string().required("Zorunlu")
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            linkedin:""
        },
        validationSchema: updateGithubSchema,
        onSubmit:(values) =>{
            cvService.updateLinkedin(cvId,values.linkedin).then((result) =>{
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
                <label><b>Linkedin Link</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.Input
                    fluid
                    placeholder="Linkedin Link"
                    type="text"
                    value={formik.values.linkedin}
                    name="linkedin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.linkedin && formik.touched.linkedin && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.linkedin}
                  </div>
                )
              }
              </div>
              <Button color="green" fluid size="large" type="submit">Güncelle</Button>
            </Form>
        </div>
    )
}