import React from "react";
import "./success.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Check from "../../assets/images/ggg.gif";

const Success = () => {
  return (
    <div className="col-12">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 d-flex justify-content-center success-container">
            <img src={Check} alt="Success GIF" className="img-fluid rounded-circle" />
          </div>
          <div className="col-12 confirmation-message text-center whitecolor pt-3">
            <h3>THANK YOU</h3>
            <p>Your interview has been submitted successfully.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
