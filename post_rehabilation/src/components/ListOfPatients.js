import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchBar from "material-ui-search-bar";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Slider from '@mui/material/Slider';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const search = (data) =>{
  console.log(data);
}

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
            Welcome Doctor
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

export default function ListOfUsers() {
  const [data,setData] = React.useState("");
  const [rows,setRows] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(()=>{
    fetch("http://127.0.0.1:8000/CIgetUser",{
              method:"post",
              body:JSON.stringify({
                "schedule":"true",
                "stage":"0"
              })
        }).then(res=>res.json())
          .then(data=>setRows(data))
          .catch(err=>console.log(err))
  },[]);

  console.log(rows);
  return (
    <>
    <DrawerAppBar/>
    <div className='ListOfPatients'>
    {/* <SearchBar
      value={data}
      onChange={(newValue) => setData(newValue)}
      placeholder="Search using name"
      onRequestSearch={() => search(data)}
      style={{borderRadius: "0px"}}
    /> */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Number of sessions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
          .filter(row => row.Name.includes(data))
          .map((row) => (
            <StyledTableRow 
              style={{ cursor: "pointer" }}
              key={row.UserName}
              onClick={() => {
                navigate(`/userDetails/${row.userId}`);
              }}
            >
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.gender}</StyledTableCell>
              <StyledTableCell align="right">{row.forms.length}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
