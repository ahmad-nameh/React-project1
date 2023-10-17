import {React,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReservationContent.css";
import { useState } from "react";

const ReservationContent3 = (props) => {
  const token = localStorage.getItem("token");
  const [error,setError] = useState('');
  const [ben,setben] = useState('no');
  const [bookData,setbookdata] = useState(props.requestBody);

  const navigate = useNavigate();

  useEffect(() => {
    setbookdata(prevState => ({
      ...prevState,
       "check_or_book":"book",
       with_discount:ben ? "yes" :"no"
     }));
  }, [ben]);
  

  const nextLaistener = async (e) => {
    e.preventDefault();

    console.log(props.requestBody);
    if(props.type==="attraction") {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/attraction/bookingTicket',
      bookData,
      {headers :{
        'Authorization': `Bearer  ${token}`,
        'accept':"application/json"

      }});
      // setData(response.data);
      console.log(response.data);
      if(response.data.success){
        navigate("/");
      }

    }
    catch (error) {
      if(error){
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  }
  if(props.type==="hotel") {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookingRoom',
      bookData,
      {headers :{
        'Authorization': `Bearer  ${token}`,
        'accept':"application/json"

      }});
      // setData(response.data);
      console.log(response.data);
      if(response.data.success){
        navigate("/");
      }

    }
    catch (error) {
      if(error){
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }

  }
    
  };
}
  console.log(props.data);
  if(props.type==="attraction"){

  return (
  <div>
    <h3>reservation confirmation</h3>
    <p style={{fontWeight:"600"}}>{props.data.message}</p>
    <p>booking date : {props.data.data.book_date}</p>
    <p>adults number: {props.data.data.adults}</p>
    <p>children number: {props.data.data.children}</p>
    <p>payment : {props.data.data.payment}</p>
    {props.data.message1 && 
    <span style={{display:"flex"}}>
      <label htmlFor="check" style={{fontSize:"16px",color:"green",fontWeight:"700"}}>checkpoints</label>
      <input type="checkbox" onChange={(e)=>setben(!ben)}/>
      </span>}
    {error && <p className="errormessage">{error}</p>}

    <button className="next" onClick={(e)=>nextLaistener(e)}>confirm reservation</button>
  </div>
  );
    }
    if(props.type==="hotel"){

      return (
      <div>
        <h3>reservation confirmation</h3>
        <p style={{fontWeight:"600"}}>{props.data.message}</p>
        <p>Check in  : {props.data.data.check_in}</p>
        <p>Check out {props.data.data.check_out}</p>
        <p>number of adults {props.data.data.num_of_adults}</p>
        <p>number of children: {props.data.data.num_of_child}</p>
        <p>Payment : {props.data.data.payment}</p>
        {props.data.message1 && 
        <div>
          <p>you have points do you want to take a discount&nbsp;<span>{props.data.data.payment_with_discount}</span></p>
        <span style={{display:"flex"}}>
          <label htmlFor="check" style={{fontSize:"16px",color:"green",fontWeight:"700"}}>checkpoints</label>
          <input type="checkbox" onChange={(e)=>setben(!ben)}/>
          </span>
          </div>}
        {error && <p className="errormessage">{error}</p>}
    
        <button className="next" onClick={(e)=>nextLaistener(e)}>confirm reservation</button>
      </div>
      );
        }
        if(props.type==="trip"){

          return (
          <div>
            <h3>reservation confirmation</h3>
            <p style={{fontWeight:"600"}}>{props.data.message}</p>
            <p>nuber of adult: {props.data.data.adult}</p>
            <p>number of children {props.data.data.child}</p>
            <p>Payment : {props.data.data.payment}</p>
            {props.data.message1 && 
            <div>
              <p>you have points do you want to take a discount&nbsp;<span>{props.data.data.payment_with_discount}</span></p>
            <span style={{display:"flex"}}>
              <label htmlFor="check" style={{fontSize:"16px",color:"green",fontWeight:"700"}}>checkpoints</label>
              <input type="checkbox" onChange={(e)=>setben(!ben)}/>
              </span>
              </div>}
          </div>
          );
            }

}

export default ReservationContent3;
