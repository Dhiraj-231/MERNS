import React, { useState } from "react";
import "../Login/Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/User";
import { toast } from "react-toastify";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser(form.email, form.password));
    toast.success("Login successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Let Connect
        </Typography>
        <input
          type="email"
          placeholder=" email"
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder=" password"
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          required
        />
        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Link to="/register">
          <Typography>new User?</Typography>
        </Link>
      </form>
    </div>
  );
}

export default Login;
