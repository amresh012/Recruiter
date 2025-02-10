const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/db.config.js");
const authRoute = require("./routes/auth.route.js");
const jobRoute = require("./routes/job.route.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// db connect
mongoose.set("strictQuery", true);
dbConnect();

 const allowedOrigins = [
   "http://localhost:5173",
 ];


// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Authorization,Content-Type",
  preflightContinue: false,
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  exposedHeaders: ["Content-Disposition"],
};

// middlewares
app.use(morgan("dev"))
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 
app.use(cookieParser());



// routes
app.use("/api/v1/user", authRoute);
app.use("/api/v1/job", jobRoute);




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
