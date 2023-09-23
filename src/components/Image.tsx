import { CameraAltTwoTone, Cameraswitch } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export const ComponentImage = (props: any) => {
    const {
        onChange,
        error,
        helperText,
        reloadCamera,
        isImage,
    } = props;

    const webcamRef = useRef<any>(null);
    const [facingMode, setFacingMode] = useState("user");

    const toggleCamera = () => {
        setFacingMode((prevFacingMode) =>
            prevFacingMode === "user" ? "environment" : "user"
        );
    };

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: facingMode,
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current!.getScreenshot();
        onChange(imageSrc);
    }, [webcamRef, onChange]);

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        height: 420,
        width: 420,
        borderRadius: '10%',
        borderColor: error ? 'red' : 'initial',
    };

    const iconButtonStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'white',
        borderRadius: '50%',
    };

    const iconStyle: React.CSSProperties = {
        color: error ? 'red' : 'blue',
        fontSize: '2.5rem',
    };

    const toggleButtonStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 5,
        left: 5,
        backgroundColor: 'white',
        borderRadius: '50%',
    };

    return (
        <>
            <Card
                style={cardStyle}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {isImage === null ? (
                    <>
                        <Webcam
                            audio={false}
                            mirrored={true}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                        <IconButton style={iconButtonStyle} onClick={capture}>
                            <CameraAltTwoTone style={iconStyle} />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <img src={isImage} alt="screenshot" />
                        <Button style={iconButtonStyle} onClick={() => reloadCamera()}>
                            {'REINTENTAR'}
                        </Button>
                    </>
                )}
                <IconButton style={toggleButtonStyle} onClick={toggleCamera}>
                    <Cameraswitch style={iconStyle} />
                </IconButton>
            </Card>
            {error && <div style={{ color: 'red' }}>{helperText}</div>}
        </>
    );
}
