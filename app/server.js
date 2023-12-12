const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();


const app = express();

app.use(cors({
    optionsSuccessStatus: 204, 
  }));

app.use(express.json());

//const MONGODBURL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/postDB`;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const postRouter = require("./routers/posts_router");
app.use("/post", postRouter);
app.use("/post", cors());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
