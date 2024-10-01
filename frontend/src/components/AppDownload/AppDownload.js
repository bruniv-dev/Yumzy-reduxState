import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience download <br />
        Yumzy App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store_logo} alt="" />
        <img src={assets.app_store_logo} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
