const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");


router.post("/registerPatient", validInfo, async (req, res) => { //Patient
  const {  first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
      username
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      `INSERT INTO patient ( first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, address, record_id, gender, username, password) VALUES ( '${first_name}', '${middle_name}', '${last_name}', '${mobile_number}', '${phone_number}', '${date_of_birth}', '${blood_group}',('${house_number}', '${street}', '${city}', '${pincode}', '${state}'), null, '${gender}', '${username}', '${bcryptPassword}') RETURNING *`

    );
      console.log(newUser.rows[0].patient_id);
    const jwtToken = jwtGenerator(newUser.rows[0].patient_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/registerDoctor", validInfo, async (req, res) => {
  console.log(1);
  try {
    const {
      first_name,
      middle_name,
      last_name,
      mobile_number,
      phone_number,
      speciality,
      hospital_name,
      gender,
      username,
      password,
      dob
    } = req.body;
    const user = await pool.query(
      "SELECT * FROM doctor WHERE username = $1",
      [username]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists.");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);
    
    const newUser = await pool.query(
      "INSERT INTO doctor (first_name, middle_name, last_name, mobile_number, phone_number, speciality, hospital_name, gender, username, password, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [ first_name,
        middle_name,
        last_name,
        mobile_number,
        phone_number,
        speciality,
        hospital_name,
        gender,
        username,
        bcryptPassword,
        dob
      ]
    );
   // res.json(newUser.rows[0]);
    const jwt_token = jwtGenerator(newUser.rows[0].doctor_id);
    res.json({ jwt_token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/loginPatient", validInfo, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
      username
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential. Username does not exist.");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential. Wrong Password.");
    }
    console.log(user.rows[0].patient_id);
    const jwtToken = jwtGenerator(user.rows[0].patient_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/loginDoctor", validInfo ,async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await pool.query("SELECT * FROM doctor WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Username is Incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!validPassword) {
      return res.status(401).json("Password or Username is Incorrect");
    }

    const jwt_token = jwtGenerator(user.rows[0].doctor_id);
    res.json({ jwt_token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;