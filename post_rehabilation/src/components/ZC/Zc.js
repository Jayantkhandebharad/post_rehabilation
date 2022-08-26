import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from "material-ui-search-bar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DrawerAppBar from './DrawerAppBar';
import UserDetails from './UserDetails_zc';

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

export default function ListOfUsers() {
  const [data,setData] = React.useState("");
  const [rows,setRows] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(()=>{
    fetch("http://127.0.0.1:8000/CIgetUser",{
              method:"post",
              body:JSON.stringify({
                "schedule":"true",
                "stage":"2"
              })
        }).then(res=>res.json())
          .then(data=>setRows(data))
          .catch(err=>console.log(err))
  },[])
  console.log(rows);
  return (
    <>
    <DrawerAppBar/>
    <div className='UpdateUser'>
    <SearchBar
      value={data}
      onChange={(newValue) => setData(newValue)}
      placeholder="Search using name"
      onRequestSearch={() => search(data)}
      style={{borderRadius: "0px"}}
    />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Age</StyledTableCell>
            <StyledTableCell >Date of Surgery</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
          .filter(row => row.Name.includes(data))
          .map((row) => (
            <StyledTableRow 
              style={{ cursor: "pointer" }}
              key={row.Name}
              onClick={() => {
               navigate(`/userDetails/${row.userId}`);
              // <UserDetails id={row.userId}/>
               }}
            >
              <StyledTableCell component="th" scope="row">
                {row.userId}
              </StyledTableCell>
              <StyledTableCell >{row.Name}</StyledTableCell>
              <StyledTableCell >{row.age}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
