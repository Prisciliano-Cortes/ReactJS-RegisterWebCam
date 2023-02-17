import Webcam from "react-webcam";
// import {storage} from "../firebase/config";
// import { useCallback, useRef, useState } from "react";
// import { ref, uploadString } from "firebase/storage";

export const WebcamComponent = ({ startCam, imgSrc, setImgSrc, stopCamera, startCamera, onCapture, webcamRef }) =>  {
    const videoConstraints = {
	    width: "100%",
	    height: "100%",
	    facingMode: "user",
	    // facingMode: { exact: "environment" }
	};

	// // creating webcam reference
    // const webcamRef = useRef(null);

    // // imgSrc stores the image
    // const [imgSrc, setImgSrc] = useState(null);

    // // variable that controls if the camera is open or not
    // const [startCam, setStartCam] = useState(false);

    // const onCapture = useCallback(() => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImgSrc(imageSrc);
    // }, [webcamRef]);

    // const startCamera = () => {
    //     setStartCam(true);
    // };

    // const stopCamera = () => {
    //     setStartCam(false);
    //     setImgSrc(null);
    // };

    const exampleImage = "https://cdn.mos.cms.futurecdn.net/HjeuGzfuzMgMkwbnvSZueM-1200-80.jpg.webp";

    // const [counter, setCounter] = useState(0);

    // console.log(imgSrc)

    // const usePhoto = () => {
    //     if (imgSrc) {
    //         try {
    //             const storageRef = ref(
    //             storage,
    //             "sanscam/"  + counter.toString()
    //             );
    //             uploadString(storageRef, imgSrc, "data_url").then((snapshot) => {
    //             console.log("Uploaded a data_url string!");
    //             });
    //         } catch (e) {
    //             console.log(e);
    //         }

    //         setImgSrc(null);
    //         setCounter(counter + 1);
    //     }
    // }

    return (
        <div
            style={{
                alignSelf: "center",
                //paddingHorizontal: "20%",
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: "2px",
                backgroundColor: "#020202",
                paddingBottom: "10px",
                maxHeight: '500px',
                maxWidth: '700px'
            }}
        >
            {startCam ? (
                <>
                    {imgSrc ? (
                        <>
                            <img 
                                alt="Profile" 
                                src={imgSrc} 
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    paddingTop: "10px",
                                }} 
                            />
                            {/* <div>
                                <div
                                    onClick={() => {
                                        setImgSrc(null);
                                    }}
                                    style={{
                                        borderRadius: "1.33rem",
                                        paddingTop: "10%",
                                        alignItems: "center",
                                        padding: "1.25rem",
                                    }}
                                >
                                    PLay
                                
                                </div>
                                <div
                                    style={{
                                        width: "40%",
                                        backgroundColor: "#fd0159",
                                        borderRadius: "1.33rem",
                                        paddingTop: "10%",
                                        alignItems: "center",
                                        padding: "1.25rem",
                                    }}
                                    onClick={usePhoto}
                                >
                                    <div
                                        style={{
                                            color: "#fff",
                                            fontSize: 18,
                                            marginLeft: 5,
                                            textAlign: "center",
                                        }}
                                    >
                                        Save Image
                                    </div>
                                </div>
                            </div> */}
                            <div
                                style={{
                                    width: "80%",
                                    backgroundColor: "#feefe0",
                                    borderRadius: "1.33rem",
                                    alignItems: "center",
                                    padding: "2%",
                                    margin: "0 auto",
                                    marginTop: "10px",
                                }}
                                onClick={stopCamera}
                            >
                                <div
                                    style={{
                                        color: "#000",
                                        fontSize: 20,
                                        marginLeft: 5,
                                        textAlign: "center",
                                    }}
                                >
                                    Stop Camera
                                </div>
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                backgroundColor: "#020202",
                                paddingBottom: "10px",
                            }}
                        >
                            <Webcam
                                audio={false}
                                style={{
                                    width: "80%",
                                    height: "70%",
                                    objectFit: "cover",
                                    borderRadius: 16,
                                    display: "block",
                                    margin: "auto",
                                    paddingTop: "10px",
                                    paddingBottom: "10px"
                                }}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                            <div
                                style={{
                                    width: "80%",
                                    backgroundColor: "#fd0159",
                                    borderRadius: "1.33rem",
                                    alignItems: "center",
                                    padding: "2%",
                                    margin: "0 auto",
                                }}
                                onClick={onCapture}
                            >
                                <div
                                    style={{
                                        color: "#fff",
                                        fontSize: 20,
                                        marginLeft: 5,
                                        textAlign: "center",
                                    }}
                                >
                                    Capture
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "80%",
                                    backgroundColor: "#feefe0",
                                    borderRadius: "1.33rem",
                                    alignItems: "center",
                                    padding: "2%",
                                    margin: "0 auto",
                                    marginTop: "2%",
                                }}
                                onClick={stopCamera}
                            >
                                <div
                                    style={{
                                        color: "#000",
                                        fontSize: 20,
                                        marginLeft: 5,
                                        textAlign: "center",
                                    }}
                                >
                                    Stop Camera
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div
                    style={{
                        paddingTop: '10px'
                    }}
                >
                    <img
                        alt="Open camera"
                        src={exampleImage}
                        style={{
                            width: "80%",
                            height: "70%",
                            objectFit: "cover",
                            borderRadius: 20,
                            display: "block",
                            margin: "auto",
                            paddingBottom: "10px"
                        }}
                    />
                    <div
                        onClick={startCamera}
                        style={{
                            width: "80%",
                            backgroundColor: "#fd0159",
                            borderRadius: "1.33rem",
                            paddingTop: "10%",
                            alignItems: "center",
                            padding: "1.25rem",
                            margin: "0 auto",
                        }}
                    >
                        {/* <Grid item>
                        <CameraAltIcon sx={{ fontSize: 25, color: "#fff" }} />
                        </Grid> */}
                        <div
                            style={{
                                color: "#fff",
                                fontSize: 20,
                                marginLeft: 5,
                                textAlign: "center",
                            }}
                        >
                            Open camera
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}