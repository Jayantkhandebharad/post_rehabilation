import { useNavigate, useParams } from "react-router-dom";

import { useState,useEffect } from "react";
import DrawerAppBar from "./DrawerAppBar";

// import ListItemAvatar from '@mui/material/ListItemAvatar';
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Paper from "@mui/material/Paper";






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
  const navigate = useNavigate();
  const params = useParams();
  const [data,setData] = useState("");
    
   
    useEffect(()=>{
      
        fetch("http://127.0.0.1:8000/CIgetOneUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"userId":props.userId}),
        }).then((res)=>res.json())
        .then(data => setData(data),console.log(data))
        .catch(e => console.log(e))
    },[])
 console.log(data);
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
        
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={5}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Name : {data.Name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Doctor Name : {data.doctorName}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Hospital Name : {data.hospName}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              City : {data.city}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Gender : {data.gender}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Age : {data.age}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Date of Surgery : {data.date}
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
const UserDetails = ()=>{
    let params = useParams();
    console.log(params.id);
    const tosendval = {
      userId:params.id,
    };
   // console.log(tosendval);
   
//console.log(data);

const [comment,setComment]=useState("");
const [rating,setRating]=useState("");
  function handleSubmit(){
    console.log(comment,rating);
    fetch("http://127.0.0.1:8000/CIAddCommentss", {
      method: "post",
      body: JSON.stringify({
          userId:params.id,
          comment:comment,
          rating:rating
        })
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if(result==="Success"){
        alert("Comment & rating added");
      }
      //setData(result);
    })
  }
    return(
      <>
      <DrawerAppBar/>
      <br/>
      <br/>
      <br/>
      <br/>
      
        <div className="UserDetails">
        
            {/* <h1>This is UserDetails</h1> */}
            <BasicCard userId={params.id}/>
            
            <Demo style={{width:"95%",borderRadius:"2px",marginLeft:"3%",boxShadow: "2px 2px 4px -1px rgba(0,0,0,0.75)"}}>
            <Grid item xs={2} display={"flex"} justifyContent={"flex-start"}
            style={{ display: "block", margin:"10px"}}
            >
                <Typography variant={"h4"}>Session details</Typography>
            </Grid>
           {FormCard()}
          </Demo>
        </div>
        <div style={{width:"95%",boxShadow:"5px 5px 5px 5px #E8E8E8",marginLeft:"50px"}}>

        <form onSubmit={handleSubmit} style={{marginLeft:"50px",width:"95%"}}>
        <Typography variant="h6">Comment</Typography>
        <Grid item xs={12}>
            <label htmlFor="comment" className="form-label"></label>
            <TextField
              color="success"
             
              required={true}
              type="text"
              fullWidth
             
              name="name"
              className="form-input"
              label="Comment"
              margin-right="20px"
              variant="standard"
            
              onChange={(e)=>setComment(e.target.value)}
             
            />
           
          </Grid>
          <Typography variant="h6">Rating</Typography>
          <Grid item xs={12}>
            <label htmlFor="rating" className="form-label"></label>
            <TextField
              color="success"
             
              required={true}
              type="text"
           fullWidth
              
              name="rating"
              className="form-input"
              label="Rating"
              margin-left="20px"
              variant="standard"
              onChange={(e)=>setRating(e.target.value)}
              
            />
           
          </Grid>
          <Button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "green" }}
            variant="contained"
            color="primary"
           
          >
            Submit
          </Button>
        </form>
        </div>
        </>
    )
}

export default UserDetails;