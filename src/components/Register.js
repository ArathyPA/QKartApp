import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link} from "react-router-dom";

const Register = () => {
  const history=useHistory();
 
  const { enqueueSnackbar } = useSnackbar();

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setconfirmPassword]=useState("");
  const [validateinput,setvalidateinput]=useState(false);
  const [progress,setprogress]=useState(false);


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
   const isvalid= validateInput({
      username:username,password:password,confirmpassword:confirmpassword})
    console.log(formData);
    console.log(validateinput);
    if(isvalid){
    setprogress(true);
    
    try {
     const res = await axios.post(`${config.endpoint}/auth/register`, 
      {"username": formData.username, "password": formData.password}
      );

      //let resjson = await res.json();
      console.log(res);
      if (res.status === 200||res.status ===201) {
        console.log("User created successfully" + username);
        enqueueSnackbar("Registered successfully", {variant:'success'});
        history.push("/login")
        
        
      } 
    } catch (err) {
      const error={...err};
      if(error.response.status===400){
        enqueueSnackbar(error.response.data.message, {variant:'error'})
      }
      //enqueueSnackbar("error");
     else{
      console.log(err);
      enqueueSnackbar("Some error",{variant:'error'})
     }
    }
    setprogress(false);
    
    }
    else if (username.length==0||password.length==0){
      if(username.length==0&&password.length==0){
      enqueueSnackbar("Username required and Password required",{variant:'error'})    
      }
      else if(username.length==0){
        enqueueSnackbar("Username required",{variant:'error'})
        //alert("Username is a required field")
        }
        else if(password.length==0){
          enqueueSnackbar("Password required",{variant:'error'})
          }
    }
    
    else if (username.length<6){enqueueSnackbar("Username should be atleast 6 characters long")} 
    else if (password.length<6){enqueueSnackbar("Password should be atleast 6 characters long")}
    else if (password!=confirmpassword){enqueueSnackbar("Password do not match",{variant:'error'})}


  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    //console.log(data,data.username.length,data.password.length);
    //console.log("here"+(data.password==data.confirmpassword));

     if(username.length>=6&&username.length&&password.length>=6&&password==confirmpassword){
     return true;
     
  }
  else{
    return false;
  }
 
  

    }
    
    

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={false} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmpassword}
            onChange={(e)=>{setconfirmPassword(e.target.value)}}
            type="password"
            fullWidth
          />
           {!progress&&<Button className="button" variant="contained" onClick={()=>{register({
            username:username,password:password,confirmpassword:confirmpassword})}}>
            Register Now
           </Button>}
           {progress&&<CircularProgress/>}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
