import React from 'react'
import CvService from '../../../services/CvService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from "semantic-ui-react";

export default function UpdateBiography() {

    let cvService = new CvService();
    const updateBiographySchema = Yup.object().shape({
        biography: Yup.string().required("Zorunlu")
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            biography:""
        },
        validationSchema: updateBiographySchema,
        onSubmit:(values) =>{
            cvService.updateBiography(authItem[0].user.id,values.biography).then((result) =>{
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
                <label><b>Biyografi</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.TextArea
                    placeholder="Biyografi..."
                    type="text"
                    value={formik.values.biography}
                    name="biography"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ minHeight: 200 }}
                />
                {
                formik.errors.biography && formik.touched.biography && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.biography}
                  </div>
                )
              }
              </div>
              <Button color="green" fluid size="large" type="submit">Güncelle</Button>
            </Form>
        </div>
    )
}