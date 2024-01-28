// CameraComponent.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const CameraComponent = () => {
  const djangoUrl = "http://127.0.0.1:8000/";
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  const [clickButton, setClickButton] = useState("Capture");
  const [predicted, setPredicted] = useState("");

  const startCamera = () => {
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
    setIsPredicted(false);
    setCapturedImage(null);
    setPredicted("");
  };

  const capture = () => {
    setIsPredicted(false);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setClickButton("Predict");
  };

  const predict = async () => {
    var imgType = "";
    let ctr = 0;
    var i = 0;
    for (i = 0; capturedImage[i] !== ","; i++) {
      if (capturedImage[i] === ";") ctr = 0;
      if (ctr !== 0) imgType += capturedImage[i];
      if (capturedImage[i] === "/") ctr = 1;
    }
    var imgUrl = capturedImage.substring(i + 1);

    const resData = await axios
      .post(djangoUrl + "imgpredict/", {
        imageUrl: imgUrl,
        imageType: imgType,
      })
      .then((res) => {
        console.log(JSON.parse(res.data));
        setPredicted(JSON.parse(res.data)[0]);
        setIsPredicted(true);
        setClickButton("Capture");
      })
      .catch((err) => console.log(err));
  };

  console.log(capturedImage);

  return (
    <div>
      {!isCameraOn ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <div>
          <button onClick={stopCamera}>Turn Off Camera</button>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
          />
          <button onClick={clickButton === "Capture" ? capture : predict}>
            {clickButton}
          </button>
          {capturedImage && (
            <img
              src={isPredicted === true ? predicted : capturedImage}
              alt="Captured"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
