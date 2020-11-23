const express = require("express");
const router = express.Router();
const authorize = require('../middleware/authorize');
const pool = require("../db");

router.get("/doctor", authorize,async (req,res)=>{
    const patientUsername = req.body.patientUsername;
    const doc=req.user.id;
    console.log(patientUsername);
    console.log(doc);
    const doctor=await pool.query("select * from patient where patient_id=$1",[doc]);
    console.log(doctor);
    console.log(doctor.rows[0].username);
    res.json(true);
});
module.exports = router;
