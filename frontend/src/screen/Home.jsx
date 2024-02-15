import React from "react";
import "./home.css"; // Import your custom CSS file
import Img from "../Image/img.jpg";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function Home() {
  const djangoUrl = "http://127.0.0.1:8000/";
  const [selectedCamera, setSelectedCamera] = useState(null);
  const webcamRef1 = useRef(null);
  const webcamRef2 = useRef(null);
  const webcamRef3 = useRef(null);
  const webcamRef4 = useRef(null);
  const [capturedImage, setCapturedImage] = useState({});
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  const [clickButton, setClickButton] = useState("Capture");
  const [predicted, setPredicted] = useState({});
  const [videoDevices, setVideoDevices] = useState([]);
  const [imgShow, setImgShow] = useState(false);

  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Error getting video devices:", error);
    }
  };

  useEffect(() => {
    getVideoDevices();
  }, []);

  const startCamera = () => {
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
    setIsPredicted(false);
    setCapturedImage(null);
    setPredicted("");
  };

  const handleCameraChange = (deviceId) => {
    setSelectedCamera(deviceId);
    stopCamera();
    startCamera();
  };

  const capture = () => {
    setIsPredicted(false);
    const imageSrc = {
      1: webcamRef1.current.getScreenshot(),
      2: webcamRef2.current.getScreenshot(),
      3: webcamRef3.current.getScreenshot(),
      4: webcamRef4.current.getScreenshot(),
    };
    setCapturedImage(imageSrc);
    setImgShow(true);
    setClickButton("Predict");
  };

  const predict = async () => {
    setPredicted({});
    let sendData = {};
    for (const k in capturedImage) {
      var imgType = "";
      let ctr = 0;
      var i = 0;
      for (i = 0; capturedImage[k][i] !== ","; i++) {
        if (capturedImage[k][i] === ";") ctr = 0;
        if (ctr !== 0) imgType += capturedImage[k][i];
        if (capturedImage[k][i] === "/") ctr = 1;
      }
      var imgUrl = capturedImage[k].substring(i + 1);
      sendData[k] = { imageUrl: imgUrl, imageType: imgType };
    }
    console.log(sendData);

    const resData = await axios
      .post(djangoUrl + "imgpredict/", {
        sendData,
      })
      .then((res) => {
        console.log(JSON.parse(res.data));
        setPredicted(JSON.parse(res.data));
        setIsPredicted(true);
        setClickButton("Capture");
      })
      .catch((err) => console.log(err));
  };
  // const predict = () => {
  //   setIsPredicted(true);
  //   setClickButton("Capture");
  //   setImgShow(false);
  // };
  // console.log(selectedCamera);
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="w-1/2 p-4 text-white">
          {imgShow === false ? (
            <Webcam
              key={videoDevices[0] ? videoDevices[0].deviceId : null}
              audio={false}
              ref={(el) => (webcamRef1.current = el)}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                deviceId: videoDevices[0] ? videoDevices[0].deviceId : null,
              }}
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
            />
          ) : (
            <img
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
              src={
                isPredicted === false
                  ? capturedImage[1]
                  : predicted[1].actualVehicles !== 0 ||
                    predicted.invalidVehicles !== 0
                  ? predicted[1].predictedUrl
                  : capturedImage[4]
              }
              alt="1st camera"
            />
          )}
        </div>

        <div className="w-1/4 p-4 text-white flex-row hello-hello-2 mx-10">
          <div className="p-2 hello-hello  mx-4">
            <div className="mx-auto mt-40 Hello-hello-hello">
              <h1 className="bg-white text-5xl py-3 px-3">65</h1>
            </div>
          </div>
          <div className="mx-auto m-1 border h-20 w-15 helo-helo-helo bg-white flex p-2">
            <div className="h-7 w-7 bg-red-500 m-2 rounded-full"></div>
            <div className="h-7 w-7 bg-yellow-500 m-2 rounded-full"></div>
            <div className="h-7 w-7 bg-green-500 m-2 rounded-full"></div>
          </div>
        </div>

        <div className="w-1/2 p-4 text-white">
          {imgShow === false ? (
            <Webcam
              key={videoDevices[1] ? videoDevices[1].deviceId : null}
              audio={false}
              ref={(el) => (webcamRef2.current = el)}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                deviceId: videoDevices[1] ? videoDevices[1].deviceId : null,
              }}
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
            />
          ) : (
            <img
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
              src={
                isPredicted === false
                  ? capturedImage[2]
                  : predicted[2].actualVehicles !== 0 ||
                    predicted.invalidVehicles !== 0
                  ? predicted[2].predictedUrl
                  : capturedImage[2]
              }
              alt="2nd camera"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 p-4 text-white flex second-second mr-7">
          <div className="Hello-hello-hello mx-auto my-10">
            <h1 className="bg-white text-5xl py-3 px-3">65</h1>
          </div>

          <div className="my-auto m-1 border second-second-second bg-white flex-row justify-center p-1">
            <div className="h-7 w-7 bg-red-500 m-3 rounded-full"></div>
            <div className="h-7 w-7 bg-yellow-500 m-3 rounded-full"></div>
            <div className="h-7 w-7 bg-green-500 m-3 rounded-full"></div>
          </div>
        </div>

        <div className="w-1/4 p-4">
          <div className="flex justify-center items-center p-12">
            <button
              className="text-white bg-red-500 rounded-xl p-4"
              onClick={clickButton === "Capture" ? capture : predict}
            >
              {clickButton}
            </button>
          </div>
        </div>

        <div className="w-1/2 p-4 flex second-second mr-7">
          <div className="my-auto m-1 border third-second-second bg-white flex-row justify-center p-1">
            <div className="h-7 w-7 bg-red-500 m-3 rounded-full"></div>
            <div className="h-7 w-7 bg-yellow-500 m-3 rounded-full"></div>
            <div className="h-7 w-7 bg-green-500 m-3 rounded-full"></div>
          </div>
          <div className="Hello-hello-hello mx-auto my-10">
            <h1 className="bg-white text-5xl py-3 px-3">65</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div className="w-1/2 p-4 text-white">
          {imgShow === false ? (
            <Webcam
              key={videoDevices[2] ? videoDevices[2].deviceId : null}
              audio={false}
              ref={(el) => (webcamRef3.current = el)}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                deviceId: videoDevices[2] ? videoDevices[2].deviceId : null,
              }}
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
            />
          ) : (
            <img
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
              src={
                isPredicted === false
                  ? capturedImage[3]
                  : predicted[3].actualVehicles !== 0 ||
                    predicted.invalidVehicles !== 0
                  ? predicted[3].predictedUrl
                  : capturedImage[3]
              }
              alt="3rd camera"
            />
          )}
        </div>

        <div className="w-1/4 p-4 text-white flex-row hello-hello-2 mx-10">
          <div className="mx-auto m-1 border h-20 w-15 helo-helo-helo-helo bg-white flex p-2">
            <div className="h-7 w-7 bg-red-500 m-2 rounded-full"></div>
            <div className="h-7 w-7 bg-yellow-500 m-2 rounded-full"></div>
            <div className="h-7 w-7 bg-green-500 m-2 rounded-full"></div>
          </div>
          <div className="p-2 hello-hello  mx-4 mt-6">
            <div className="mx-auto mb-70 Hello-hello-hello">
              <h1 className="bg-white text-5xl py-3 px-3">65</h1>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-4 text-white">
          {imgShow === false ? (
            <Webcam
              key={videoDevices[3] ? videoDevices[3].deviceId : null}
              audio={false}
              ref={(el) => (webcamRef4.current = el)}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                deviceId: videoDevices[3] ? videoDevices[3].deviceId : null,
              }}
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
            />
          ) : (
            <img
              style={{
                width: "74rem",
                height: "39rem",
                paddingLeft: "8rem",
                paddingRight: "8rem",
              }}
              src={
                isPredicted === false
                  ? capturedImage[4]
                  : predicted[4].actualVehicles !== 0 ||
                    predicted.invalidVehicles !== 0
                  ? predicted[4].predictedUrl
                  : capturedImage[4]
              }
              alt="4th camera"
            />
          )}
        </div>
      </div>
    </>
  );
}
