const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");	

//registering
router.post("/register", validInfo, async (req, res) => {
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
        const token = jwtGenerator(newUser.rows[0].userid);
        res.json({ token });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
	});
	
	//login route
	router.post("/login", validInfo ,async (req, res) => {
    try {
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

      const token = jwtGenerator(user.rows[0].userid);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

//emr
router.post("/emr", validInfo, async (req, res) => {
	    try {
        const {
          description,
          report_type,
          medical_pres,
          report_date
        } = req.body;
        
        const newUser = await pool.query(
          "INSERT INTO medical_record (description, report_type, medical_pres, report_date) VALUES ($1, $2, $3, $4) RETURNING *",
          [
            description,
            report_type,
            medical_pres,
            report_date
          ]
        );
       res.json(newUser.rows[0]);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
	});
	
	router.get("/is-verify", authorisation, async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;