const express = require("express");
const cors = require("cors");

const connectDB = require("./config/Database");
const memberRouter = require("./Routers/memberRouter");
const movieRouter = require("./Routers/movieRouter");
const userRouter = require("./Routers/userRouter");
const subscriptionRouter = require("./Routers/subscriptionRouter");

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.use("/api/movie", movieRouter);
app.use("/api/member", memberRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/user", userRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
