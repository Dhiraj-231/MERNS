import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.likes);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/resetPassword/:token");
      dispatch({ type: "clearMessasge" });
    }
  }, [dispatch, error, message]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Forget password
        </Typography>
        <input
          type="email"
          placeholder=" email"
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button disabled={loading} variant="contained" type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
