import { useNavigate, useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import * as React from 'react';
import Slider from '@mui/material/Slider';
import {
    TextField,
  } from "@material-ui/core"
// import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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

import { Link, useLocation } from "react-router-dom";

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

function BasicCard(props) {
  const navigate = useNavigate();
  const params = useParams();
  console.log("props",props);

  const handleSend =()=>{
      try{
        fetch("http://127.0.0.1:8000/CIincrementStatus", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({userId:params.id}),
        })
        .then((res)=>{
          console.log(res);
          alert("Send to AVT successfully ...")
          navigate("/listOfPatients")
        })
        .catch(e => console.log(e))
      }
      catch(e){
        console.log(e);
      }
   }

    return (
      <>
      <Card sx={{ minWidth: 275}} style={{marginBottom:"10px",marginLeft:"3%",width:"95%"}}>
        <CardContent>
        <Grid container spacing={2}>
        <Grid item xs={8}>
        <Typography variant="h4" component="div" fullWidth>
            User Details
        </Typography>
        </Grid>
        <Grid item xs={4} style={{display:"flex",justifyContent:"flex-end"}}>
        <CardActions>
            <Button variant="outlined" color="error" onClick={handleSend}>Send to AVT</Button>
        </CardActions>
        </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={5}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Name : {props.props.Name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Age : {props.props.age}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Phone : {props.props.phoneNumber}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Doctor Name : {props.props.doctorName}
            </Typography>
          </Grid>
        </Grid>
        </CardContent>
      </Card>
      </>
    );
  }

  function FormCard(){
    const params = useParams();
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/CIAllForms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId:params.id}),
        }).then(res => res.json())
        .then(data => setData(data))
        .catch(e => console.log(e)) 
    },[]);

    if(data.length === 0){
        return(
            <p style={{border:"2px solid red",width:"92%",marginLeft:"3%",padding:"20px"}}>
                No sessions added
            </p>
        )
    }
    else{
        var cnt = 1;
        return(
        data.map((item)=>{
            return (
                <>
                <Card sx={{ minWidth: 275}} style={{marginBottom:"10px",marginLeft:"3%",width:"95%"}}>
                  <CardContent>
                  <Grid container spacing={2}>
                  <Grid item xs={8}>
                  <Typography variant="h4" component="div" fullWidth>
                      Form {cnt++} Details
                  </Typography>
                  </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                  <Grid item xs={5}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        FeedBack : {item.feedback}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Progress :{item.progress}
                      </Typography>
                    </Grid>
                  </Grid>
                  </CardContent>
                </Card>
                </>
              );
        })
        )
    }
  }

function Form(){
    let params = useParams();
    const [feedBack,setfeedBack]=useState("");
    const [progress,setProgress]=useState("");
    function handleSubmit(){
        fetch("http://127.0.0.1:8000/CIAddtheForms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId:params.id,feedback:feedBack,progress:progress}),
        }).then(data => console.log(data))
        .catch(e => console.log(e))   
    }
    return(
        <>
        <div style={{width:"95%",boxShadow:"5px 5px 5px 5px #E8E8E8",margin:"3%",height:"220px"}}>

        <form onSubmit={handleSubmit} style={{marginLeft:"15px",width:"95%"}}>
        <Typography variant="h4">Add FeedBack</Typography>
        {/* <Typography variant="h6">FeedBack</Typography> */}
        <Grid item xs={12}>
            <label htmlFor="feedBack" className="form-label"></label>
            <TextField
            color="success"
            required={true}
            type="text"
            fullWidth
            name="feedBack"
            className="form-input"
            label="FeedBack"
            margin-right="20px"
            variant="standard"
            onChange={(e)=>setfeedBack(e.target.value)}
            />
        </Grid>
        {/* <Typography variant="h6">Progress</Typography> */}
        <Grid item xs={12}>
            <label htmlFor="progress" className="form-label"></label>
            <TextField
            color="success"
            required={true}
            type="text"
            fullWidth
            name="progress"
            className="form-input"
            label="Add Progress"
            margin-left="20px"
            variant="standard"
            onChange={(e)=>setProgress(e.target.value)}
            />
        
        </Grid>
        <Grid item xs={12} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "green" }}
            variant="contained"
            color="primary"
        >
            Submit
        </Button>
        </Grid>
        </form>
        </div>
        </>
    )
}
const UserDetails = ()=>{
    let params = useParams();
    console.log("params :",params.id);
    const tosendval = {
      userId:params.id,
    };
    console.log("tosendval",tosendval);
    const [data,setData] = useState("");
    const [form,setForm] = useState("");
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/CIgetOneUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId:params.id}),
        }).then((res)=>res.json())
        .then(data => setData(data))
        .catch(e => console.log(e))    
    },[]);
    
    return(
        <>
        <DrawerAppBar/>
        <div className="UserDetails">
        <BasicCard props={data}/>
        <FormCard style={{border:"2px solid black"}}/>
        <Form/>
        </div>
        </>
    )
}

export default UserDetails;