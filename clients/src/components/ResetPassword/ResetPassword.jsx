import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [newPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.likes);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT,
      });
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
      dispatch({ type: "clearMessasge" });
    }
  }, [error, message, dispatch]);
  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Change Password
        </Typography>
        <input
          type="password"
          placeholder="Enter New Password"
          className="resetPasswordFormInput"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="/forgot/password">
          <Typography variant="subtitle1">Request new Token ?</Typography>
        </Link>
        <Button disabled={loading} variant="contained" type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
