const express = require("express");
const routes = require("./routes");
const connectDB = require("../config/db");
const cors = require("cors");

const app = express();

//Connect DataBase
connectDB();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3334, "localhost", () => {
  console.log("Running");
});
