import { ComponentImage } from "@/components"
import noimage from "@/assets/images/no-image.webp";
import { FormImageModel, FormImageValidations } from "@/models";
import { isFile } from "@/helpers";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import { useForm } from "@/hooks";
import { useState } from "react";
import './styles.css';

const formFields: FormImageModel = {
    photo: null
};
const formValidations: FormImageValidations = {
    photo: [(value) => isFile("image/jpeg, image/png, image/gif", value), 'Debe seleccionar una imagen'],
};

export const CaptureView = () => {


    const [newImage, setNewImage] = useState<string>(noimage);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        photo,
        onInputChange, onFileChange, isFormValid, onResetForm,
        photoValid } = useForm(formFields, formValidations);
    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        var bodyFormData = new FormData();
        bodyFormData.append('photo', photo);
        // postCreatePropertie(bodyFormData);
        onResetForm();
    }
    return (
        <>
            <div className="centered-form">
                <form onSubmit={sendSubmit}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <ComponentImage
                                onChange={(file: File) => {
                                    onFileChange("photo", file);
                                    setNewImage(URL.createObjectURL(file))
                                }}
                                fileImage={newImage}
                                accept={"image/png, image/gif, image/jpeg"}
                                error={!!photoValid && formSubmitted}
                                helperText={formSubmitted ? photoValid : ''}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit">{'ENVIAR'}</Button>
                </form>
            </div>
        </>
    )
}
