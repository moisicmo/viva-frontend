import { FormImageModel, FormImageValidations } from "@/models";
import { Grid } from "@mui/material";
import { useForm, useImageStore } from "@/hooks";
import { ComponentImage } from "@/components/Image";
import { ComponentButton } from "@/components";
import './styles.css';
import { useState } from "react";

const formFields: FormImageModel = {
    photo: ''
};
const formValidations: FormImageValidations = {
    photo: [(value: any) => value.length >= 1, 'Debe capturar la foto'],
};

export const CaptureView = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [imageCapture, setImageCapture] = useState<any>(null);
    const {
        photo,
        onImage64Change, isFormValid, photoValid } = useForm(formFields, formValidations);
    const { postSendImage } = useImageStore();
    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        postSendImage({ photo }).then(() => setImageCapture(null))
    }
    return (
        <>
            <div className="centered-form">
                <form>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <ComponentImage
                                onChange={(file: string) => {
                                    onImage64Change('photo', file);
                                    setImageCapture(file);
                                }}
                                error={!!photoValid && formSubmitted}
                                helperText={formSubmitted ? photoValid : ''}
                                isImage={imageCapture}
                                reloadCamera={() => setImageCapture(null)}
                            />
                        </Grid>
                    </Grid>
                    {
                        imageCapture &&
                        <ComponentButton
                            type="button"
                            onClick={sendSubmit}
                            text="ENVIAR"
                            width={400}
                        />
                    }
                </form>
            </div>

        </>
    )
}
