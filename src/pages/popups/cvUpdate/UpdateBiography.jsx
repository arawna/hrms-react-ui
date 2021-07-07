import React from 'react'
import CvService from '../../../services/CvService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Form } from "semantic-ui-react";
import { toast } from 'react-toastify';

export default function UpdateBiography({cvId,updateCvValues,curentBiography}) {

    let cvService = new CvService();
    const updateBiographySchema = Yup.object().shape({
        biography: Yup.string().required("Zorunlu")
    })


    const formik = useFormik({
        initialValues:{
            biography:curentBiography
        },
        validationSchema: updateBiographySchema,
        onSubmit:(values) =>{
            cvService.updateBiography(cvId,values.biography).then((result) =>{
                toast.success(result.data.message)
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
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