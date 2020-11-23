const express = require("express");
const router = express.Router();

const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/addRecord", async (req, res)=>{
    console.log(req.body);
    console.log('Report Type: ', req.body.reportType);
    console.log('Report Date ', req.body.date);
    console.log('Report Description: ', req.body.description);
    console.log('Medical Prescription: ', req.body.medical_prescription);
    console.log();
});

module.exports = router;