const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//Patient routes//

//Doctor routes
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/patientdash", require("./routes/patientdash"))

app.listen(5001, () => {
    console.log("server is running on port 5001");
});