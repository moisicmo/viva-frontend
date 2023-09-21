import { PhotoCamera } from '@mui/icons-material';
import { Card, CardMedia, IconButton } from '@mui/material';
import React, { useRef } from 'react';
import Webcam from 'react-webcam';

export const ComponentImage = (props: any) => {
    const {
        onChange,
        fileImage,
        accept,
        error,
        helperText,
    } = props;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const webcamRef = useRef<any>(null); // Referencia a la webcam

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        height: 300,
        width: 300,
        borderRadius: '10%',
        borderColor: error ? 'red' : 'initial', // Aplica el borde rojo si hay un error
    };

    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: error ? 'red' : 'gray', // Cambia el color a rojo si hay un error
    };

    const onFileInputChange = async ({ target }: { target: any }) => {
        onChange(target.files[0]);
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onChange(imageSrc);
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                // onChange={onFileInputChange}
                style={{ display: 'none' }}
                accept={accept}
            />
            <Card
                style={cardStyle}
                onClick={() => fileInputRef.current?.click()}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {fileImage ? (
                    <CardMedia component="img" src={fileImage} alt="No Image" />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                    />
                )}
                <IconButton style={iconStyle} onClick={fileImage ? undefined : capturePhoto}>
                    <PhotoCamera fontSize="small" />
                </IconButton>
            </Card>
            {error && <div style={{ color: 'red' }}>{helperText}</div>}
        </>
    );
};
