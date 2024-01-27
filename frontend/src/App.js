import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const djangoUrl = "http://127.0.0.1:8000/";
  const [imageUrl, setUrl] = useState("");
  const [imageType, setType] = useState("");

  function handleChange(e) {
    const fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);
    let tmpresult;
    fr.addEventListener("load", () => {
      tmpresult = fr.result;

      var imgType = "";
      let ctr = 0;
      var i = 0;
      for (i = 0; tmpresult[i] !== ","; i++) {
        if (tmpresult[i] === ";") ctr = 0;
        if (ctr !== 0) imgType += tmpresult[i];
        if (tmpresult[i] === "/") ctr = 1;
      }
      // console.log(tmpresult.substring(i + 1));
      setType(imgType);
      setUrl(tmpresult.substring(i + 1));
    });
  }
  console.log("image uploaded");
  console.log(imageType);

  const handleClick = async () => {
    const resData = await axios
      .post(djangoUrl + "imgpredict/", {
        imageUrl: imageUrl,
        imageType: imageType,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <input
          type="file"
          id="images"
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleClick}>Submit</button>
      </header>
    </div>
  );
}

export default App;
