import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { useEffect, useState } from "react";
import avatar from "../images/avatar.svg";
import login from "../images/login.svg";
import validate from "./ValidateSignin";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignSelf: "center",
  },
}));

const useForm = (callback, validate) => {
  const [errors, setErrors] = useState({});
  const [ErrorsFlag, setErrorsFlag] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({
    role:"",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCase =(props)=> {
      switch(props){
        case "Doctor":
          return 1;
        case "AVT":
          return 2;
        case "ZC":
          return 3;
        case "Final":
          return 4;
      }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorsFlag(validate(values).errorsFlag);
    setErrors(validate(values).errors);
    setIsSubmitting(true);
  };
  function routeHelp(route){
    switch(route){
      case 1:
        return '/doctor';
      case 2:
        return '/avt';
      case 3:
        return '/zc';
    }
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (values.username == "admin") {
        if (values.password == "admin") {
          localStorage.setItem("username", values.username);
          const role = handleCase(values.role);

          localStorage.setItem("role", role);
          alert("Signed In Successfully!");
          window.location.href = routeHelp(role);
        }
        else {
          setErrors({ password: "Wrong Password" });
        }
      }
      else {
        setErrors({ username: "Username doesn't exists" });
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback, values]);
  return { handleChange, values, handleSubmit, errors, ErrorsFlag };
};

const Signin = ({ submitForm }) => {
  const classes = useStyles();

  const { handleChange, values, handleSubmit, errors, ErrorsFlag } = useForm(
    submitForm,
    validate
  );
 const Types = ["Doctor","AVT","ZC","Final"]
  return (
    <div className="container-signup">
      <div className="img">
        <img src={login} alt="login-img" />
      </div>
      <div className="login-content">
        <form onSubmit={handleSubmit} noValidate>
          <img src={avatar} alt="login-avatar" />
          <Typography variant="h3">Welcome</Typography>
          <Grid item xs={12}>

        <FormControl variant="standard" sx={{minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">Select your role</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="role"
              value={values.role}
              fullWidth
              name="role"
              onChange={handleChange}
              label="Select your role"
              variant="standard"
              defaultValue="Select your role"
            >
              {Types.map((type) => (
                  <MenuItem value={type} style={{ cursor: "pointer" }}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="username" className="form-label"></label>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              id="username"
              fullWidth
              style={{ marginTop: "20px" }}
              type="text"
              name="username"
              variant="standard"
              label="Username"
              value={values.username}
              onChange={handleChange}
              error={ErrorsFlag.Username}
            />

            <Typography variant="caption">
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username}</p>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="password" className="form-label"></label>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              variant="standard"
              style={{ marginTop: "20px" }}
              id="password"
              type="password"
              name="password"
              className="form-input"
              label="Password"
              value={values.password}
              onChange={handleChange}
              error={ErrorsFlag.Password}
            />

            <Typography variant="caption">
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </Typography>
          </Grid>
          <Button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "green" }}
            variant="contained"
            color="primary"
            className={"btn" + classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
