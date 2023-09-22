// import { ComponentImage } from "@/components"
import noimage from "@/assets/images/no-image.webp";
import { FormImageModel, FormImageValidations } from "@/models";
import { Button, Grid } from "@mui/material";
import { useForm, useImageStore } from "@/hooks";
import { useState } from "react";
import './styles.css';
import { ComponentImage } from "@/components/Image";

const formFields: FormImageModel = {
    photo: ''
};
const formValidations: FormImageValidations = {
    photo: [(value: any) => value.length >= 1, 'Debe ingresar el nombre'],
};

export const CaptureView = () => {


    const [newImage, setNewImage] = useState<string>(noimage);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        photo,
        onImage64Change, isFormValid, onResetForm,
        photoValid } = useForm(formFields, formValidations);
    const { postSendImage } = useImageStore();
    const sendSubmit = () => {
        // event.preventDefault();
        // setFormSubmitted(true);
        // if (!isFormValid) return;
        postSendImage({ photo });
    }
    return (
        <>
            {/* <div className="centered-form"> */}
            <form>
                <Grid container>
                    <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                        <ComponentImage
                            onChange={(file: string) => {
                                onImage64Change('photo', file);
                                // setNewImage(URL.createObjectURL(file))
                            }}
                            fileImage={newImage}
                            error={!!photoValid && formSubmitted}
                            helperText={formSubmitted ? photoValid : ''}
                        />
                    </Grid>
                </Grid>
            </form>
            <Button onClick={sendSubmit} type="submit">{'ENVIAsdR'}</Button>
            {/* </div> */}
        </>
    )
}
