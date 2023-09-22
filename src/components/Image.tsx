import { PhotoCamera } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";


export const ComponentImage = (props: any) => {
    const {
        onChange,
        error,
        helperText,
    } = props;
    const [img, setImg] = useState(null);
    const webcamRef = useRef<any>(null);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current!.getScreenshot();
        setImg(imageSrc);
        onChange(imageSrc);
    }, [webcamRef]);

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        height: 400,
        width: 400,
        borderRadius: '10%',
        borderColor: error ? 'red' : 'initial', // Aplica el borde rojo si hay un error
    };
    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: error ? 'red' : 'gray', // Cambia el color a rojo si hay un error
    };

    return (
        <>
            <Card
                style={cardStyle}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {img === null ? (
                    <>
                        <Webcam
                            audio={false}
                            mirrored={true}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                        <IconButton style={iconStyle} onClick={capture}>
                            <PhotoCamera fontSize="small" />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <img src={img} alt="screenshot" />
                        <Button style={iconStyle} onClick={() => setImg(null)}>{'REINTENTAR'}</Button>
                    </>
                )}
            </Card>
            {error && <div style={{ color: 'red' }}>{helperText}</div>}
        </>
    );
}
