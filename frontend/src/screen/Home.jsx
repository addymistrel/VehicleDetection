import React from "react";
import "./home.css"; // Import your custom CSS file
import Img from "../Image/img.jpg";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function Home() {
  const djangoUrl = "http://127.0.0.1:8000/";
  const [selectedCamera, setSelectedCamera] = useState(null);
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  const [clickButton, setClickButton] = useState("Capture");
  const [predicted, setPredicted] = useState("");
  const [videoDevices, setVideoDevices] = useState([]);

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
  console.log(selectedCamera);
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="w-1/2 p-4 text-white">
          <Webcam
            key={videoDevices[0] ? videoDevices[0].deviceId : null}
            audio={false}
            ref={(el) => (webcamRef.current = el)}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              deviceId: videoDevices[0] ? videoDevices[0].deviceId : null,
            }}
            style={{ width: "74rem", height: "39rem" }}
          />
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
          <Webcam
            key={videoDevices[1] ? videoDevices[1].deviceId : null}
            audio={false}
            ref={(el) => (webcamRef.current = el)}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              deviceId: videoDevices[1] ? videoDevices[1].deviceId : null,
            }}
            style={{ width: "74rem", height: "39rem" }}
          />
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
            <button className="text-white bg-red-500 rounded-xl p-4">
              Capture
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
          <Webcam
            key={videoDevices[2] ? videoDevices[2].deviceId : null}
            audio={false}
            ref={(el) => (webcamRef.current = el)}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              deviceId: videoDevices[2] ? videoDevices[2].deviceId : null,
            }}
            style={{ width: "74rem", height: "39rem" }}
          />
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
          <Webcam
            key={videoDevices[3] ? videoDevices[3].deviceId : null}
            audio={false}
            ref={(el) => (webcamRef.current = el)}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              deviceId: videoDevices[3] ? videoDevices[3].deviceId : null,
            }}
            style={{ width: "74rem", height: "39rem" }}
          />
        </div>
      </div>
    </>
  );
}
