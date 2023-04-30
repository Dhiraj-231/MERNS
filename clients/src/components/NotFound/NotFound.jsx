import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorIcon />
        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Page not Found
        </Typography>

        <Link to="/">
          <Typography variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
