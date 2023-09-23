import { FormImageModel, FormImageValidations } from "@/models";
import { useForm, useImageStore } from "@/hooks";
import { ComponentImage } from "@/components/Image";
import { ComponentButton } from "@/components";
import { useEffect, useState } from "react";

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
        onImage64Change,
        isFormValid,
        photoValid
    } = useForm(formFields, formValidations);
    const { postSendImage } = useImageStore();

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        postSendImage({ photo }).then(() => setImageCapture(null))
    };

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [formularioHeight, setFormularioHeight] = useState(0);

    useEffect(() => {
        // Obtén la altura real del formulario después de que se renderice
        const formElement = document.querySelector("form");
        if (formElement) {
            const height = formElement.clientHeight;
            setFormularioHeight(height);
        }
    }, []); // Se ejecuta solo una vez después del montaje del componente

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: `${screenHeight}px`, width: `${screenWidth}px` }}>
            <form style={{ marginTop: `${(screenHeight - formularioHeight) / 14}px` }}>
                <ComponentImage
                    onChange={(file: string) => {
                        onImage64Change('photo', file);
                        setImageCapture(file);
                    }}
                    error={!!photoValid && formSubmitted}
                    helperText={formSubmitted ? photoValid : ''}
                    isImage={imageCapture}
                    reloadCamera={() => setImageCapture(null)}
                    height={screenHeight}
                    width={screenWidth}
                />
                {imageCapture && (
                    <ComponentButton
                        type="button"
                        onClick={sendSubmit}
                        text="ENVIAR"
                        width={screenWidth > screenHeight ? screenHeight - 140 : screenWidth - 140}
                    />
                )}
            </form>
        </div>

    );
}
