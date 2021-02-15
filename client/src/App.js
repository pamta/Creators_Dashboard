import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fbSDKInit } from "./config/ApisConfig";

const App = () => {
  // use useEffect to execute when the component loads, just once
  useEffect(() => {
    fbSDKInit();
    window.FB.getLoginStatus(function (response) {
      console.log(response);
    });
  }, [fbSDKInit]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body></body>
    </div>
  );
};

export default App;
