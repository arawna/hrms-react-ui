import React from 'react'
import CvService from '../../../services/CvService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Form } from "semantic-ui-react";

export default function UpdateLinkedin({cvId,updateCvValues}) {

    let cvService = new CvService();
    const updateGithubSchema = Yup.object().shape({
        linkedin: Yup.string().required("Zorunlu")
    })

    const formik = useFormik({
        initialValues:{
            linkedin:""
        },
        validationSchema: updateGithubSchema,
        onSubmit:(values) =>{
            cvService.updateLinkedin(cvId,values.linkedin).then((result) =>{
                alert(result.data.message)
                updateCvValues();
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