const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");	
var multer = require('multer');
var path = require('path');
const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config()
var storage = multer.diskStorage(
  {
    destination: function (req, file, cb) 
                  {
                    fs.mkdirSync(`C:\\MinorImages\\${req.fname}\\`, { recursive: true })
                    cb(null, `C:\\MinorImages\\${req.fname}\\`)
                  },
    filename: function (req, file, cb) 
              {
                cb(null, 'Verification'+path.extname(file.originalname))
              }
  }
);
var upload = multer({ 
  storage: storage, 
  limits:{fieldNameSize:150, fileSize: 250000} ,
  fileFilter: (req, file, cb) => 
  {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") 
    {
      //console.log('Req in upload is = $1', req);
      cb(null, true);
    } 
    else 
    {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).single('file');
router.post('/upload', authorisation, async function(req, res) {
  console.log(req.headers);
  console.log(8);
  /*try {
    const jwtToken = req.token;
    //console.log(req.token);
    if (!jwtToken) {
      console.log(5);
      return res.status(403).json("Not Authorise");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    console.log(req.user.id);
  } catch (err) {
    console.log(2);
    console.error(err.message);
    return res.status(403).json("Not Authorise");
  }*/
  const doctor = await pool.query("SELECT * FROM doctor WHERE doctor_id = $1", [req.user.id]);
  req.fname = 'Doctors/'+doctor.rows[0].username+"/";
  console.log()
  upload(req, res, function (err) 
  {
    console.log(7);
    if (err instanceof multer.MulterError) 
    {
      console.log(22);
      console.log(err.message); 
      if(err.message=='File too large')
      {
        return res.send({msg:"File size should be less than 250kb"});
      }
      return res.send(err);
    } 
    else if (err) 
    {
      console.log(err);  
      console.log(1);          
      return res.send({msg: err.message})
    }
    console.log(2);
    console.log(req.file.path);
    const path_upd = pool.query(`UPDATE doctor SET file_path='${req.file.path}' WHERE doctor_id='${req.user.id}'`);
    return res.status(200).send(req.file);
  })
});
router.post('/patientupload', authorisation, async function(req, res) {
  console.log(req.headers);
  console.log(8);
  const patient = await pool.query("SELECT * FROM patient WHERE patient_id = $1", [req.user.id]);
  req.fname = 'Patients/'+patient.rows[0].username+"/";
  console.log();
  upload(req, res, function (err) 
  {
    console.log(7);
    if (err instanceof multer.MulterError) 
    {
      console.log(22);
      console.log(err.message); 
      if(err.message=='File too large')
      {
        return res.send({msg:"File size should be less than 250kb"});
      }
      return res.send(err);
    } 
    else if (err) 
    {
      console.log(err);  
      console.log(1);          
      return res.send({msg: err.message})
    }
    console.log(2);
    console.log(req.file.path);
    const path_upd = pool.query(`UPDATE patient SET file_path='${req.file.path}' WHERE patient_id='${req.user.id}'`);
    return res.status(200).send(req.file);
  })
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

      const token = jwtGenerator(user.rows[0].doctor_id);
      console.log(token);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

    //emr route
    router.post("/emr", authorisation, async (req, res) => {
      try{
        console.log('Doctor id= $1', [req.user.id]);
        //const doc = await pool.query('SELECT * from doctor WHERE doctor_id= $1', [req.user.id]);

        const{
          username,
          reporttype,
          date,
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
          //console.log(req.body);
          console.log(nextvisitdate);
          const pat = await pool.query('SELECT * from patient WHERE username= $1', [username]);
          const newUser = await pool.query(
            "INSERT INTO medical_record (patient_id, doctor_id, username, reporttype, report_date, description, medical_prescription, systolicbp, diastolicbp, heartrate, bodytemperature, bodyweight, nextvisitdate, referrals, referreddoctor, prevallergies, specifyallergies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,$17) RETURNING *",
            [
              pat.rows[0].patient_id,
              req.user.id,
              username,
              reporttype,
              date,
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

router.get("/todo/:username", authorisation, async(req, res)=>
{
  try{
    //const {username} = req.params;
    const username = req.user.id;
    const todo = await pool.query("SELECT * FROM doctor WHERE doctor_id = $1", [username]);
    res.json(todo.rows[0]);
  }catch(err){
    console.error(err.message);
  }
});
router.get("/searchemr", authorisation, async(req, res)=>
{
  try{
    //const {username} = req.params;
    const {username} = req.query;
    const todo = await pool.query("SELECT * FROM medical_record WHERE username = $1", [username]);
    res.json(todo.rows);
  }catch(err){
    console.error(err.message);
  }
});	

router.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query(
      "SELECT * FROM medical_record WHERE record_id = $1",
      [id]
    );
    res.json(getTodo.rows);

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//retrieve patient record in emr
router.get("/searchpatient/:username", async(req, res)=>
{
  try{
    //const {username} = req.params;
    const {username} = req.params;
    const patient = await pool.query("SELECT * FROM patient WHERE username = $1", [username]);
    res.json(patient.rows);
  }catch(err){
    console.error(err.message);
  }
});
//retrieve doctors detail in emr
router.get("/searchdoc/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query(
      "SELECT * FROM doctor WHERE doctor_id=(SELECT doctor_id from medical_record where record_id = $1)",
      [id]
    );
    res.json(getTodo.rows);

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/doctorpermission", authorisation, async(req, res)=>
{
  try{
    //const {username} = req.params;
    console.log(req.params);
    const {username} = req.params;
    //const doc = await pool.query("SELECT * FROM doctor WHERE doctor_id= $1", [username]);
    const check = await pool.query("SELECT * FROM permissions WHERE patient_id= $1", [req.user.id]);
    console.log(67);
    if(check.rowCount==0){
      console.log(68);
      return res.json({"doc": "Nodoctor"});
    }
    var doct=[];
    for(i=0;i<check.rowCount;i++){
      doct[i] = (await pool.query("SELECT * FROM doctor WHERE doctor_id = $1", [check.rows[i].doctor_id])).rows[0];
    }
    console.log(doct);
    res.json(doct);
  }catch(err){
    console.error(err.message);
  }
});

router.post("/doctorpermissionAdd/:usern", authorisation, async(req, res)=>
{
  try{
    console.log(1);
    console.log(req.params);
    const username = req.params.usern;
    const check2 = await pool.query("SELECT * from doctor WHERE username= $1", [username]);
    console.log(check2);
    if(check2.rows[0]===undefined){
      return res.json({"doc":"Invalidusername"});
    }
    const added = await pool.query("SELECT * from permissions WHERE patient_id= $1 AND doctor_id= $2", [req.user.id, check2.rows[0].doctor_id]);
    if(added.rowCount>0){
      return res.json({"doc":"Alreadypresent"});
    }
    else{
      const add = await pool.query("INSERT INTO permissions VALUES ($1, $2)", [req.user.id, check2.rows[0].doctor_id]);
      console.log(1);
      res.json({"doc":"added"});
    }
  }catch(err){
    console.error(err.message);
  }
});
router.get("/checkPermission/:usern", authorisation, async(req, res)=>
{
  try{
    console.log(161);
    //console.log(req.params);
    const username = req.params.usern;
    const check2 = await pool.query("SELECT * from patient WHERE username= $1", [username]);
    //console.log(check2);
    if(check2.rows[0]===undefined){
      return res.json({"perimission":"false"});
    }
    console.log(190);
    console.log(check2.rows[0].patient_id);
    console.log(req.user.id);
    const added = await pool.query(`SELECT * from permissions WHERE doctor_id= '${req.user.id}' AND patient_id= '${check2.rows[0].patient_id}'`);
    console.log(added.rows[0]);
    if(added.rowCount>0){
      console.log(true);
      return res.json({"permission":"true"});
    }
    else{
      res.json({"perimission":"false"});
    }
  }catch(err){
    console.log(1);
    console.error(err.message);
  }
});

router.post("/deleteDoc/:usern", authorisation, async(req, res)=>
{
  try{
    console.log(161);
    //console.log(req.params);
    const username = req.params.usern;
    const check2 = await pool.query("SELECT * from doctor WHERE doctor_id= $1", [username]);
    //console.log(check2);
    if(check2.rows[0]===undefined){
      return res.json({"delStatus":"unsucessful"});
    }
    console.log(190);
    console.log(check2.rows[0].doctor_id);
    console.log(req.user.id);
    const added = await pool.query(`DELETE from permissions WHERE patient_id= '${req.user.id}' AND doctor_id= '${check2.rows[0].doctor_id}'`);
    console.log(added.rows[0]);
    return res.json({"delStatus":"success"})
    /*if(added.rowCount>0){
      console.log(true);
      return res.json({"permission":"true"});
    }
    else{
      res.json({"perimission":"false"});
    }*/
  }catch(err){
    console.log(1);
    console.error(err.message);
  }
});

	router.get("/is-verify", authorisation, async (req, res) => {
    try {
      console.log(1);
      const doc = await pool.query("SELECT * FROM doctor WHERE doctor_id = $1", [req.user.id]);
      console.log(doc.rows[0]);
      //console.log(doc.rows[0].verification);
      if(doc.rows[0]!==undefined){
      if(doc.rows[0].verification == 'P'){
        res.json({"authorisation": true, "verification": false});
      }
      else if(doc.rows[0].verification == 'V'){
        res.json({"authorisation": true, "verification": true});
      }
      }
      else{
        console.log(16);
        const pat = await pool.query("SELECT * FROM patient WHERE patient_id = $1", [req.user.id]);
      console.log(pat.rows[0]);
      console.log(pat.rows[0].verification);
      if(pat.rows[0]!==undefined){
      if(pat.rows[0].verification == 'P'){
        res.json({"authorisation": true, "verification": false});
      }
      else if(pat.rows[0].verification == 'V'){
        res.json({"authorisation": true, "verification": true});
      }
      }
    }
    } catch (err) {
      console.log(2);
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  router.get("/getemr", authorisation, async (req, res) =>{
    try {
        console.log(req.user.id); 
        const user = await pool.query("SELECT * FROM medical_record WHERE patient_id = $1", [req.user.id]);
        console.log(22);
        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
  });
module.exports = router;