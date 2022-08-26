import { useNavigate, useParams } from "react-router-dom";

import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";

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


const marks = [
  {
    value: 0,
    label: 'ZC (R)',
  },
  {
    value: 20,
    label: 'ZC (U)',
  },
  {
    value: 40,
    label: 'Hospital (R)',
  },
  {
    value: 60,
    label: 'Hospital (U)',
  },
  {
    value: 80,
    label: 'ZC (R)',
  },
  {
    value: 100,
    label: 'ZC (U)',
  },
];

function valuetext(value) {
  return value;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

const arr = [0,20,40,60,80,100];
function DiscreteSliderValues(props) {
    console.log("Discrete :",props.props);
  return (
    <Box sx={{ width: "50%" }}>
      <Slider
        aria-label="Restricted values"
        defaultValue={arr[props.props-1]}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        style={{marginLeft:"-250px"}}
      />
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

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
          User Login
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
              User Login
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


const UserDetails = ()=>{
    const [info,setInfo] = React.useState([]);
    
    React.useEffect(()=>{
      async function sendInfo(){
        // const val = {
        //   userId:localStorage.getItem('user'),
        // };
        // console.log(val);
        try{
          await fetch("http://127.0.0.1:8000/COMPAllTrackComplain", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId:"2"}),
          }).then((res)=>res.json())
          .then(info => setInfo(info))
          .catch(e => console.log(e))
        }
        catch(e){
            console.log(e);
        }
      }
      sendInfo();
    },[]);



    return(
        <>
        <DrawerAppBar/>
        <div className="UserDetails">     
            <Demo style={{width:"95%",borderRadius:"2px",marginLeft:"3%",boxShadow: "2px 2px 4px -1px rgba(0,0,0,0.75)"}}>
            <Grid item xs={2} display={"flex"} justifyContent={"flex-start"}
            style={{ display: "block", margin:"10px"}}
            >
                <Typography variant={"h4"}>Complaints</Typography>
            </Grid>
            {
              info.length == 0 ? <p style={{margin:"3%"}}>No Schemes Applied</p>:
              <List>
              {info.map((complain)=> {
                return(
                <ListItem>
                    <ListItemText
                        primary={"Complaint id : "+complain.compId}
                    />
                    <DiscreteSliderValues props={complain.final_status}/> 
                </ListItem>
                )  
              })}
            </List>
            }
          </Demo>
        </div>
        </>
    )
}

export default UserDetails;