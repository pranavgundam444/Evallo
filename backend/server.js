const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { init } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

init();

app.listen(4000, () => console.log("Backend running on 4000"));