// const router = require("express").Router();
// const pool = require("../db");
// const bcrypt = require("bcrypt");
// const jwtGenerator = require("../utils/jwtGenerator");
// const validInfo = require("../middleware/validInfo");
// const authorisation = require("../middleware/authorisation");	

// //patient register
// router.post("/patientregister", validInfo, async (req, res) => {
//   const {  first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
//       username
//     ]);

//     if (user.rows.length > 0) {
//       return res.status(401).json("User already exist!");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const bcryptPassword = await bcrypt.hash(password, salt);

//     let newUser = await pool.query(
//       `INSERT INTO patient ( first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, address, record_id, gender, username, password) VALUES ( '${first_name}', '${middle_name}', '${last_name}', '${mobile_number}', '${phone_number}', '${date_of_birth}', '${blood_group}',('${house_number}', '${street}', '${city}', '${pincode}', '${state}'), null, '${gender}', '${username}', '${bcryptPassword}') RETURNING *`

//     );
//       console.log(newUser.rows[0].patient_id);
//     const token = jwtGenerator(newUser.rows[0].patient_id);

//     return res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// //patient login

// router.post("/patientlogin", validInfo, async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
//       username
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(401).json("Invalid Credential. Username does not exist.");
//     }

//     const validPassword = await bcrypt.compare(
//       password,
//       user.rows[0].password
//     );

//     if (!validPassword) {
//       return res.status(401).json("Invalid Credential. Wrong Password.");
//     }
//     console.log(user.rows[0].patient_id);
//     const token = jwtGenerator(user.rows[0].patient_id);
//     return res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// })

// // Doctor registering
// router.post("/register", validInfo, async (req, res) => {
// 	    try {
//         const {
//           first_name,
//           middle_name,
//           last_name,
//           mobile_number,
//           phone_number,
//           speciality,
//           hospital_name,
//           gender,
//           username,
//           password,
//           dob
//         } = req.body;
//         const user = await pool.query(
//           "SELECT * FROM doctor WHERE username = $1",
//           [username]
//         );

//         if (user.rows.length !== 0) {
//           return res.status(401).json("User already exists.");
//         }

//         const saltRound = 10;
//         const salt = await bcrypt.genSalt(saltRound);

//         const bcryptPassword = await bcrypt.hash(password, salt);
        
//         const newUser = await pool.query(
//           "INSERT INTO doctor (first_name, middle_name, last_name, mobile_number, phone_number, speciality, hospital_name, gender, username, password, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
//           [ first_name,
//             middle_name,
//             last_name,
//             mobile_number,
//             phone_number,
//             speciality,
//             hospital_name,
//             gender,
//             username,
//             bcryptPassword,
//             dob
//           ]
//         );
//        // res.json(newUser.rows[0]);
//         const token = jwtGenerator(newUser.rows[0].userid);
//         res.json({ token });
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//       }
// 	});
	
// 	//Doctor login
// 	router.post("/login", validInfo ,async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await pool.query("SELECT * FROM doctor WHERE username = $1", [
//         username,
//       ]);
//       if (user.rows.length === 0) {
//         return res.status(401).json("Password or Username is Incorrect");
//       }

//       const validPassword = await bcrypt.compare(
//         password,
//         user.rows[0].password
//       );
//       if (!validPassword) {
//         return res.status(401).json("Password or Username is Incorrect");
//       }

//       const token = jwtGenerator(user.rows[0].userid);
//       res.json({ token });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   });

//     //emr route
//     router.post("/emr", validInfo, async (req, res) => {
//       try{
       
//         const{
//           patient_username,
//           reporttype,
//           report_date,
//           description,
//           medical_prescription,
//           systolicbp,
//           diastolicbp,
//           heartrate,
//           bodytemperature,
//           bodyweight,
//           nextvisitdate,
//           referrals,
//           referreddoctor,
//           prevallergies,
//           specifyallergies
//           } = req.body;
//           const newUser = await pool.query(
//             "INSERT INTO medical_record (patient_username, reporttype, report_date, description, medical_prescription, systolicbp, diastolicbp, heartrate, bodytemperature, bodyweight, nextvisitdate, referrals, referreddoctor, prevallergies, specifyallergies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
//             [
//               patient_username,
//               reporttype,
//               report_date,
//               description,
//               medical_prescription,
//               systolicbp,
//               diastolicbp,
//               heartrate,
//               bodytemperature,
//               bodyweight,
//               nextvisitdate,
//               referrals,
//               referreddoctor,
//               prevallergies,
//               specifyallergies
//             ]
//           );
//           res.json(newUser.rows[0]);
//         } catch (err) {
//           console.error(err.message);
//           res.status(500).send("Server Error");
//         }
//       });

// //patient register

// router.post("/patientregister", validInfo, async (req, res) => {
//   const {  first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
//       username
//     ]);

//     if (user.rows.length > 0) {
//       return res.status(401).json("User already exist!");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const bcryptPassword = await bcrypt.hash(password, salt);

//     let newUser = await pool.query(
//       `INSERT INTO patient ( first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, address, record_id, gender, username, password) VALUES ( '${first_name}', '${middle_name}', '${last_name}', '${mobile_number}', '${phone_number}', '${date_of_birth}', '${blood_group}',('${house_number}', '${street}', '${city}', '${pincode}', '${state}'), null, '${gender}', '${username}', '${bcryptPassword}') RETURNING *`

//     );
//       console.log(newUser.rows[0].patient_id);
//     const jwtToken = jwtGenerator(newUser.rows[0].patient_id);

//     return res.json({ jwtToken });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// //patient login
// router.post("/patientlogin", validInfo, async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
//       username
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(401).json("Invalid Credential. Username does not exist.");
//     }

//     const validPassword = await bcrypt.compare(
//       password,
//       user.rows[0].password
//     );

//     if (!validPassword) {
//       return res.status(401).json("Invalid Credential. Wrong Password.");
//     }
//     console.log(user.rows[0].patient_id);
//     const jwtToken = jwtGenerator(user.rows[0].patient_id);
//     return res.json({ jwtToken });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });
	
// 	router.get("/is-verify", authorisation, async (req, res) => {
//     try {
//       res.json(true);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   });

// module.exports = router;
const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");	

//patient register
router.post("/patientregister", validInfo, async (req, res) => {
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
    const token = jwtGenerator(newUser.rows[0].patient_id);

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//patient login

router.post("/patientlogin", validInfo, async (req, res) => {
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
    const token = jwtGenerator(user.rows[0].patient_id);
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// Doctor registering
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
	
	//Doctor login
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

    //emr route
    router.post("/emr", validInfo, async (req, res) => {
      try{
       
        const{
          username,
          reporttype,
          report_date,
          description,
          medical_prescription,
          systolicbp,
          diastolicbp,
          heartrate,
          bodytemperature,
          bodyweight,
          nextvisitdate,
          referrals,
          referreddoctor,
          prevallergies,
          specifyallergies
          } = req.body;
          const newUser = await pool.query(
            "INSERT INTO medical_record (username, reporttype, report_date, description, medical_prescription, systolicbp, diastolicbp, heartrate, bodytemperature, bodyweight, nextvisitdate, referrals, referreddoctor, prevallergies, specifyallergies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
            [
              username,
              reporttype,
              report_date,
              description,
              medical_prescription,
              systolicbp,
              diastolicbp,
              heartrate,
              bodytemperature,
              bodyweight,
              nextvisitdate,
              referrals,
              referreddoctor,
              prevallergies,
              specifyallergies
            ]
          );
          res.json(newUser.rows[0]);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      });

//patient register

router.post("/patientregister", validInfo, async (req, res) => {
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

//patient login
router.post("/patientlogin", validInfo, async (req, res) => {
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

router.get("/todo/:username", async(req, res)=>
{
  try{
    const {username} = req.params;
    const todo = await pool.query("SELECT * FROM doctor WHERE username = $1", [username]);
    res.json(todo.rows[0]);
  }catch(err){
    console.error(err.message);
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