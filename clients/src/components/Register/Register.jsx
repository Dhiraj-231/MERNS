import React, { useEffect, useState } from "react";
import "./Register.css";
import { Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
function Register() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUser(form.name, form.email, form.password, form.image));
  };
  const { loading, error, message } = useSelector((state) => state.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setForm({ ...form, image: Reader.result });
      }
    };
    Reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT,
      });
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [dispatch, error, message]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h4">Sign Up</Typography>
        <Avatar
          src={form.image}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter Your Name"
          className="registerFormInput"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="registerFormInput"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="registerFormInput"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Link to="/">
          <Typography>Already have an account? sign in</Typography>
        </Link>
        <Button disabled={loading} variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Register;
