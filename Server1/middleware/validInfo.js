module.exports = function(req, res, next) {
    console.log(req.body);

    if (req.path === "/registerPatient") {
    const {  first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password } = req.body;
  
      //console.log(!patient_id.length);
      if (![ first_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      }
      if(first_name.length>20){
        return res.json("First Name should be less 20 characters");
      }
      if(middle_name!="")
      {
        if(middle_name.length>20){
          return res.json("Middle Name should be less 10 characters");
        }
      }
      if(last_name.length>20){
        return res.json("Last name should be less 20 characters");
      }
      if(blood_group.length<2||blood_group.length>3||(blood_group.charAt(blood_group.length-1)!='+'&&(blood_group.charAt(blood_group.length-1)!='-'))){
        return res.json("Invalid blood group");
      } 
      if(gender.length!=1||(gender!='M'&&gender!='F'&&gender!='O')){
        return res.json("Invalid gender");
      }
      if(house_number.length>10){
        return res.json("House number should be less 10 characters");
      }
      if(street.length>15){
        return res.json("Street should be less 15 characters");
      }
      if(city.length>15){
        return res.json("City should be less 15 characters");
      }
      if(state.length>15){
        return res.json("State should be less 15 characters");
      }
      if(pincode.length!=6){
        return res.json("Invalid pincode. Pincode should be of 6 digits.");
      }
      if(mobile_number.length<13||mobile_number.length>14){
        return res.json("Invalid mobile number. Add mobile number with country code. Example- +918865432189");
      }
      if(phone_number.length!=11){
        return res.json("Invalid phone number. Add phone number with state code. Example- 01126455669");
      }
      if(username.length>10){
        return res.json("Username is too long. Username should be less than 10 characters");
      }
      if(password.length<6){
        return res.json("Password must contain atleast 6 characters");
      }
      if(password.length>20){
        return res.json("Password must contain less 20 characters");
      }
      var reg= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
      if(!reg.test(password)){
        return res.json("Password must contain a digit and a special character");
      }
    } 
    else if (req.path === "/loginPatient") {
      console.log(1111);
      console.log(req.body);
      const username = req.body.username;
      const password = req.body.password;
      if (![username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
    }
    else if(req.path === "/registerDoctor"){

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
      console.log(!username.length);
      if([first_name, middle_name, last_name, mobile_number, phone_number, speciality, hospital_name, gender, username, password, dob].every[Boolean])
      {
          return res.status(401).json("Missing credentials");
      }
    } 
    else if (req.path === "/loginDoctor"){
      if(![username, password].every(Boolean)) {
          return res.status(401).json("Missing credentials");
      }
    }
    next();
  };