import {
    Grid,
    InputAdornment,
    TextField,
  } from "@material-ui/core";
  
  import "react-datepicker/dist/react-datepicker.css";
  import { makeStyles } from "@material-ui/core/styles";
  import AccountCircleIcon from "@material-ui/icons/AccountCircle";
  import EmailIcon from "@material-ui/icons/Email";
  import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
  import VpnKeyIcon from "@material-ui/icons/VpnKey";
  import React, { useEffect, useState } from "react";
  import avatar from "../images/avatar.svg";
  import validate from "./ValidateAddUser";
  import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
  import BorderColorIcon from '@mui/icons-material/BorderColor';
  import PercentIcon from '@mui/icons-material/Percent';
  import WcIcon from '@mui/icons-material/Wc';
  import axios from "axios";
  import DialpadIcon from '@mui/icons-material/Dialpad';
  import BoyIcon from '@mui/icons-material/Boy';
  import LocationCityIcon from '@mui/icons-material/LocationCity';
  import FmdGoodIcon from '@mui/icons-material/FmdGood';

  import PropTypes from 'prop-types';
  import AppBar from '@mui/material/AppBar';
  import Box from '@mui/material/Box';
  import Divider from '@mui/material/Divider';
  import Drawer from '@mui/material/Drawer';
  import IconButton from '@mui/material/IconButton';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemText from '@mui/material/ListItemText';
  import MenuIcon from '@mui/icons-material/Menu';
  import Toolbar from '@mui/material/Toolbar';
  import Typography from '@mui/material/Typography';
  import Button from '@mui/material/Button';

import { Link, useLocation } from "react-router-dom";


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
      userId: "",
      Name: "",
      doctorId: "",
      doctorName: "",
      parentName: "",
      hospName:"",
      hospId:"",
      gender:"",
      schedule:false,
      Date:"",
      link:"",
      stage:"",
      comment:"",
      rating:"",
      age:"",
      forms:[],
      city:"",
      phoneNumber:"",
      pinCode:""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrorsFlag(validate(values).errorsFlag);
      setErrors(validate(values).errors);
      // console.log(values);
      setIsSubmitting(true);
    };
    const [res,setRes] = useState("");

    useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        let tosendval = {
            Name:values.Name,
            doctorName:values.doctorName,
            doctorId:values.doctorId,
            parentName:values.parentName,
            hospName:values.hospName,
            hospId:values.hospId,
            gender:values.gender,
            schedule:false,
            age:values.age,
            city:values.city,
            phoneNumber:values.phoneNumber,
            pinCode:values.pinCode,
            udid:values.udid
        };
        console.log(tosendval); 

        async function sendReq() {  
          try {
            fetch("http://127.0.0.1:8000/CIAddUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tosendval),
            })
            .then(res => res.json())
            .then(data => {
                if(data === "Success"){
                    alert("Patient added succefully ... ")
                    setValues({
                        userId: "",
                        Name: "",
                        doctorId: "",
                        doctorName: "",
                        parentName: "",
                        hospName:"",
                        hospId:"",
                        gender:"",
                        age:"",
                        city:"",
                        phoneNumber:"",
                        udid:"",
                        pinCode:""
                    });
                }
            }).catch(e=>console.log(e));
            

            
          } catch (e) {
            console.log(e);
        }
        }
        sendReq();
        setIsSubmitting(false);
      }
    }, [errors, isSubmitting, callback, values]);
    return { handleChange, values, handleSubmit, errors, ErrorsFlag };
  };
  

const drawerWidth = 240;
const navItems = ['Add Patient', 'List of Patients','Complaints','Log out'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
       Hospital
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  function pageHelp(link){
    switch(link){
        case "Add Patient":
            return "addPatient"
        case "List of Patients":
            return "listOfPatients"
        case "Complaints":
            return "complaints"
        case "Log out":
            return "Logout"
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Hospital
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
            <Link to={`/${pageHelp(item)}`} key={item} className="link-to">
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box> 
    </Box>
  );
}

  const AddUser = ({ submitForm }) => {
    const classes = useStyles();
    // const [startDate, setStartDate] = useState(new Date());
    const [focus, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
  
    const { handleChange, values, handleSubmit, errors, ErrorsFlag } = useForm(
      submitForm,
      validate
    );
  
    return (
        <>
      <DrawerAppBar/>
      <div className="AddUser">
      <div className="container-AddUser">
        <div className="login-content">
          <form onSubmit={handleSubmit} noValidate style={{width:"700px"}}>
            <img src={avatar} alt="signup-alt" />
            <Typography variant="h4">Add New Patient</Typography>
            <Grid item xs={12}>
              <label htmlFor="Name" className="form-label"></label>
              <TextField
                color="success"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                type="text"
                fullWidth
                id="Name"
                name="Name"
                className="form-input"
                label="Name"
                margin-right="20px"
                variant="standard"
                value={values.Name}
                onChange={handleChange}
                error={ErrorsFlag.Name}
              />
              <Typography variant="caption">
                {errors.Name && <p style={{ color: "red" }}>{errors.Name}</p>}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="parentName" className="form-label"></label>
              <TextField
                color="success"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                type="text"
                fullWidth
                id="parentName"
                name="parentName"
                className="form-input"
                label="Parents Name"
                margin-right="20px"
                variant="standard"
                value={values.parentName}
                onChange={handleChange}
                error={ErrorsFlag.parentName}
              />
              <Typography variant="caption">
                {errors.parentName && <p style={{ color: "red" }}>{errors.parentName}</p>}
              </Typography>
            </Grid>

            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <label htmlFor="doctorName" className="form-label"></label>
  
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  required={true}
                  type="text"
                  id="doctorName"
                  variant="standard"
                  name="doctorName"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  className="form-input"
                  label="Doctor Name"
                  value={values.doctorName}
                  onChange={handleChange}
                  error={ErrorsFlag.doctorName}
                />
  
                <Typography variant="caption">
                  {errors.doctorName && <p style={{ color: "red" }}>{errors.doctorName}</p>}
                </Typography>
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <label htmlFor="doctorId" className="form-label"></label>
  
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DialpadIcon />
                      </InputAdornment>
                    ),
                  }}
                  required={true}
                  type="text"
                  id="doctorId"
                  variant="standard"
                  fullWidth
                  name="doctorId"
                  style={{ marginTop: "20px" }}
                  className="form-input"
                  label="Doctor Id"
                  value={values.doctorId}
                  onChange={handleChange}
                  error={ErrorsFlag.doctorId}
                />
  
                <Typography variant="caption">
                  {errors.doctorId && (
                    <p style={{ color: "red" }}>{errors.doctorId}</p>
                  )}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <label htmlFor="hospName" className="form-label"></label>
  
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneAndroidIcon />
                      </InputAdornment>
                    ),
                  }}
                  required={true}
                  type="text"
                  id="hospName"
                  variant="standard"
                  name="hospName"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  className="form-input"
                  label="Hospital Name"
                  value={values.hospName}
                  onChange={handleChange}
                  error={ErrorsFlag.hospName}
                />
  
                <Typography variant="caption">
                  {errors.hospName && <p style={{ color: "red" }}>{errors.hospName}</p>}
                </Typography>
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <label htmlFor="hospId" className="form-label"></label>
  
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DialpadIcon />
                      </InputAdornment>
                    ),
                  }}
                  required={true}
                  type="text"
                  id="hospId"
                  variant="standard"
                  fullWidth
                  name="hospId"
                  style={{ marginTop: "20px" }}
                  className="form-input"
                  label="Hospital Id"
                  value={values.hospId}
                  onChange={handleChange}
                  error={ErrorsFlag.hospId}
                />
  
                <Typography variant="caption">
                  {errors.hospId && (
                    <p style={{ color: "red" }}>{errors.hospId}</p>
                  )}
                </Typography>
              </Grid>
            </Grid>

          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
  
          <label htmlFor="age" className="form-label"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WcIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="age"
              variant="standard"
              name="age"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="Age"
              value={values.age}
              onChange={handleChange}
              error={ErrorsFlag.age}
            />
  
            <Typography variant="caption">
              {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
            </Typography>
            </Grid>
  
            <Grid item xs={12} sm={6}>
            <label htmlFor="gender" className="form-label"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WcIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="gender"
              variant="standard"
              name="gender"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="Gender"
              value={values.gender}
              onChange={handleChange}
              error={ErrorsFlag.gender}
            />
  
            <Typography variant="caption">
              {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
            </Typography>
            </Grid>
            </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
  
          <label htmlFor="phoneNumber" className="form-label"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="phoneNumber"
              variant="standard"
              name="phoneNumber"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              error={ErrorsFlag.phoneNumber}
            />
  
            <Typography variant="caption">
              {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
            </Typography>
            </Grid>
  
            <Grid item xs={12} sm={6}>
            <label htmlFor="city" className="form-label"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationCityIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="city"
              variant="standard"
              name="city"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="City"
              value={values.city}
              onChange={handleChange}
              error={ErrorsFlag.city}
            />
  
            <Typography variant="caption">
              {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            </Typography>
            </Grid>
            </Grid>

            <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
  
          <label htmlFor="udid" className="form-label"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="udid"
              variant="standard"
              name="udid"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="UDID"
              value={values.udid}
              onChange={handleChange}
              error={ErrorsFlag.udid}
            />
  
            <Typography variant="caption">
              {errors.udid && <p style={{ color: "red" }}>{errors.udid}</p>}
            </Typography>
            </Grid>
  
            <Grid item xs={12} sm={6}>
            <label htmlFor="pinCode" className="form-label"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FmdGoodIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="pinCode"
              variant="standard"
              name="pinCode"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="Pin Code"
              value={values.pinCode}
              onChange={handleChange}
              error={ErrorsFlag.pinCode}
            />
  
            <Typography variant="caption">
              {errors.pinCode && <p style={{ color: "red" }}>{errors.pinCode}</p>}
            </Typography>
            </Grid>
            </Grid>
            
  
            <Button
              type="submit"
              style={{ marginTop: "20px", backgroundColor: "green" }}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Patient
            </Button>
          </form>
        </div>
      </div>
      </div>
      </>
    );
  };
  
  export default AddUser;
  