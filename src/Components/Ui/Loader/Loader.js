import React from "react";
import './loader.css'
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return <div className="spinner__main">
      <Spinner className="spinner_loader" animation="border" />
  </div>;
};

export default Loader;
