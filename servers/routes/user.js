import express from "express";
import { register, login, followuser, logout, updatePasssword, updateProfile, deleteProfile, myProfileDetail, getProfileDetail, getAllUser, forgotPassword, resetPassword, getmyPost, getUserPost } from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.get("/logout", logout);
router.get("/follow/:id", isAuth, followuser);
router.patch("/updatePassword", isAuth, updatePasssword);
router.patch("/updateProfile", isAuth, updateProfile);
router.delete("/deleteProfile/me", isAuth, deleteProfile);
router.get("/profileDetail/me", isAuth, myProfileDetail);
router.get("/ProfileDetail/:id", isAuth, getProfileDetail);
router.get("/getAllDetail", isAuth, getAllUser);
router.post("/forget/password", forgotPassword);
router.put("/resetPassword/:token", resetPassword);
router.get("/mypost", isAuth, getmyPost);
router.get("/userPost/:id", isAuth, getUserPost);

export default router;