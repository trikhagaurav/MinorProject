module.exports = function(req, res, next){
    const {first_name,
          middle_name,
          last_name,
          mobile_number,
          phone_number,
          speciality,
          hospital_name,
          gender,
          username,
          password,
          dob} = req.body;

  /*  function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }*/

    if(req.path === "/register"){
        console.log(!username.length);
        if([first_name, middle_name, last_name, mobile_number, phone_number, speciality, hospital_name, gender, username, password, dob].every[Boolean]){
            return res.status(401).json("Missing credentials");
        }
    } else if (req.path === "/login"){
        if(![username, password].every(Boolean)) {
            return res.status(401).json("Missing credentials");
        }
    }
    next();
};