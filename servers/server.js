import express from "express";
import database from "./configs/database.js";
import dotenv from "dotenv";
import router from "./routes/post.js";
import router1 from './routes/user.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
dotenv.config({ path: "./configs/config.env" });
const app = express();
database();
console.log("Database connect successfully");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use("/post", router);
app.use("/user", router1);
app.get("/", (req, res) => {
    res.send("Hii i am your server");
});

app.listen(process.env.PORT_NUM, () => {
    console.log(`Server run at http://localhost:${process.env.PORT_NUM}`);
})