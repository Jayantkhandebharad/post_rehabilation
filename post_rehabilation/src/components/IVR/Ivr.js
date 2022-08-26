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
//   import avatar from "../images/avatar.svg";
  import validate from "./ValidateComplaint";

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
    // avatar: {
    //   margin: theme.spacing(1),
    //   backgroundColor: theme.palette.secondary.main,
    // },
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
        description:"",
        audio:"" 
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
            userId: values.userId,
            description:values.description,
            audio:values.audio 
        };
        console.log(tosendval); 

        async function sendReq() {  
          try {
            fetch("http://127.0.0.1:8000/COMPAddComplain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tosendval),
            })
            .then(res => res.json())
            .then(data => {
                if(data === "Success"){
                    alert("Complaint registered succefully ... ")
                    setValues({
                        userId: "",
                        description:"",
                        audio:"" 
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
const navItems = ['Log out'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Customer Care
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
            Customer Care
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

  const Ivr = ({ submitForm }) => {
    const classes = useStyles();
  
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
            {/* <img src={avatar} alt="signup-alt" /> */}
            <Typography variant="h4">Register New Complaint</Typography>
            <Grid item xs={12}>
              <label htmlFor="userId" className="form-label"></label>
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
                id="userId"
                name="userId"
                className="form-input"
                label="userId"
                margin-right="20px"
                variant="standard"
                value={values.userId}
                onChange={handleChange}
                error={ErrorsFlag.userId}
              />
              <Typography variant="caption">
                {errors.userId && <p style={{ color: "red" }}>{errors.userId}</p>}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="description" className="form-label"></label>
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
                id="description"
                name="description"
                className="form-input"
                label="Add description of the complaint"
                margin-right="20px"
                variant="standard"
                value={values.description}
                onChange={handleChange}
                error={ErrorsFlag.description}
              />
              <Typography variant="caption">
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="audio" className="form-label"></label>
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
                id="audio"
                name="audio"
                className="form-input"
                label="Add audio link"
                margin-right="20px"
                variant="standard"
                value={values.audio}
                onChange={handleChange}
                error={ErrorsFlag.audio}
              />
              <Typography variant="caption">
                {errors.audio && <p style={{ color: "red" }}>{errors.audio}</p>}
              </Typography>
            </Grid>
        
            <Button
              type="submit"
              style={{ marginTop: "20px", backgroundColor: "green" }}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register Complaint
            </Button>
          </form>
        </div>
      </div>
      </div>
      </>
    );
  };
  
  export default Ivr;
  