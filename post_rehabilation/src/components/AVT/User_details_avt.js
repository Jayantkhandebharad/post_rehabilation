import { useState,useEffect } from 'react'; 

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import {Typography} from "@material-ui/core";
import Paper from "@mui/material/Paper";

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

import { Link, useLocation,useNavigate, useParams } from "react-router-dom";


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
          <p style={{border:"2px solid red",borderRadius:"30px",width:"92%",marginLeft:"3%",padding:"20px"}}>
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



const drawerWidth = 240;
const navItems = ['List of Patients'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Welcome Doctor
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
    return "avt"
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
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            AVT
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block',marginLeft:'auto' } }}>
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

function BasicCard(props) {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.id)
  const Schedule=()=>{
    fetch("http://127.0.0.1:8000/CISchedule", {
        method: "post",
        body: JSON.stringify({
            "userId":params.id
          })
    })
    navigate('/avt');
  }
  console.log(props);

    return (
      <>
        <DrawerAppBar/>
        <br/><br/><br/><br/><br/>
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
            <Button variant="contained"  onClick={Schedule}  >Schedule</Button>
        </CardActions>
        </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={5}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Name : {props.data.Name}
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              user id : {props.data.userId}
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              UDID : {props.data.udid}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Phone : {props.data.phoneNumber}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              parent name : {props.data.parentName} 
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Date of operation : {props.data.date}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Age : {props.data.age}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              place : {props.data.city}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              doctor name : {props.data.doctorName}  
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              doctor id : {props.data.doctorId}
            </Typography>
          </Grid>
        </Grid>
        </CardContent>
      </Card>
      </>
    );
  }

const User_details_avt = ()=>{
    const  navigate = useNavigate();
    const params = useParams();
    const [data,setData] = useState("");
      console.log(params.id);
     
      useEffect(()=>{
        
          fetch("http://127.0.0.1:8000/CIgetOneUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"userId":params.id}),
          }).then((res)=>res.json())
          .then(data => setData(data))
          .catch(e => console.log(e))
          
      },[])

    return(
        <div className="UserDetails">
            {/* <h1>This is UserDetails</h1> */}
            <BasicCard data={data}/>
            {FormCard()}
            

            </div>
        
    )
}

export default User_details_avt;