import { CameraAltTwoTone, Cameraswitch } from "@mui/icons-material";
import { Button, Card, CardMedia, IconButton } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export const ComponentImage = (props: any) => {
    const {
        onChange,
        error,
        helperText,
        reloadCamera,
        isImage,
        height,
        width,
    } = props;

    const webcamRef = useRef<any>(null);
    const [facingMode, setFacingMode] = useState("user");

    const toggleCamera = () => {
        setFacingMode((prevFacingMode) =>
            prevFacingMode === "user" ? "environment" : "user"
        );
    };

    const videoConstraints = {
        height: width > height ? height - 150 : width - 50,
        width: width > height ? height - 20 : width - 20,
        facingMode: facingMode,
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current!.getScreenshot();
        onChange(imageSrc);
    }, [webcamRef, onChange]);

    const cardStyle: React.CSSProperties = {
        height: width > height ? height - 150 : width - 50,
        width: width > height ? height - 20 : width - 20,
        borderRadius: '5%',
        borderColor: error ? 'red' : 'initial',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    };

    const buttonsContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    };

    const iconButtonStyle: React.CSSProperties = {
        backgroundColor: 'white',
        borderRadius: '50%',
    };

    const iconStyle: React.CSSProperties = {
        color: error ? 'red' : 'black',
        fontSize: '2.5rem',
    };

    const videoStyle: React.CSSProperties = {
        transform: facingMode === "user" ? "scaleX(-1)" : "scaleX(1)",
    };

    const mediaStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    return (
        <>
            <Card style={cardStyle}>
                {isImage === null ? (
                    <Webcam
                        audio={false}
                        mirrored={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        style={videoStyle}
                    />
                ) : (
                    <CardMedia component="img" image={isImage} style={mediaStyle} />
                )}
            </Card>
            <div style={buttonsContainerStyle}>
                <IconButton style={iconButtonStyle} onClick={toggleCamera}>
                    <Cameraswitch style={iconStyle} />
                </IconButton>
                {isImage === null ? (
                    <IconButton style={iconButtonStyle} onClick={capture}>
                        <CameraAltTwoTone style={iconStyle} />
                    </IconButton>
                ) : (
                    <Button style={iconButtonStyle} onClick={() => reloadCamera()}>
                        {'REINTENTAR'}
                    </Button>
                )}
            </div>

            {error && <div style={{ color: 'red' }}>{helperText}</div>}
        </>
    );
}
