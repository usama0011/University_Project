import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./auth/user.auth.js";
import userRoute from "./routes/user.route.js";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())
mongoose
  .connect(
    "mongodb+srv://usama:usama@cluster0.sb4cega.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connnection successfully"))
  .catch((err) => console.log("DB Error", err));
app.use("/api/auth", AuthRouter);
app.use("/api/users", userRoute);
app.listen(5000, () => {
  console.log("server is running at localhost:5000");
});
