import {React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ReservationContent.css";
import "react-phone-number-input/style.css";
import axios from "axios";
import BasicDatePicker from "../searchbar&itscomponenet/othercomponent/Basicdatebicker";
import ControlledRadioButtonsGroup from "../male&femaleselection/GenderSelection";
import  ResponsiveDateTimePickers from "../searchbar&itscomponenet/othercomponent/Timebicker";
import { passport } from "fontawesome";
const ReservationContent = (props) => {
    const location = useLocation();


  function convertdate(str){
    var date = new Date(str),
    mnth=("0"+(date.getMonth()+1)).slice(-2),
    day=("0"+date.getDate()).slice(-2);
    return [date.getFullYear(),mnth,day].join("-");
}

  const token = localStorage.getItem("token");
  console.log(token);
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');

  const [passport,setPassport] = useState('');
  const [adultNum, setAdultnum] = useState(1);
  const [childNum,setChildnum] = useState(0);
  const [gender,setGender] = useState('');
  const [error,setError] = useState();
  const [check_in,setCheckin] = useState('');
  const [check_out,setCheckout] = useState('');
  const[data,setData] = useState([]);
  const [time,setTime] = useState('');

  const [reqBody,setreqbody] = useState([]);

  let requestBody;

useEffect(() => {
  props.data(data);
  props.requestBody(reqBody);
}, [data,requestBody]);


  const nextLaistener = async (e) => {
    e.preventDefault();

    if(props.type==="hotel"){
      requestBody = {
        first_name:first_name,
          last_name:last_name,
          room_id:props.id,
          check_in: convertdate(check_in),
          check_out: convertdate(check_out),
          num_of_adults:adultNum,
          num_of_children:childNum,
      };
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/bookingRoom', {
          check_or_book:"check",
          first_name:first_name,
          last_name:last_name,
          room_id:props.id,
          check_in: convertdate(check_in),
          check_out: convertdate(check_out),
          num_of_adults:adultNum,
          num_of_children:childNum,
        },
        {headers :{
          'Authorization': `Bearer  ${token}`,
          'accept':"application/json"

        }});
        setreqbody(requestBody);
        setData(response.data);
        console.log(response.data);
        if(response.status===200){
          // props.data(requestBody)
          props.setnext(1);

        }

      }
      catch (error) {
        if(error){
          console.log(error.response.data.message);
          setError(error.response.data.message);
        }
      }
  };
    if(props.type==="attraction"){
      requestBody = {
        first_name: first_name,
        last_name: last_name,
        attraction_id:props.id,
        book_date: time,
        adults:adultNum,
        children:childNum,
      };
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/attraction/bookingTicket', {
          first_name: first_name,
          last_name: last_name,
          check_or_book:"check",
          attraction_id:props.id,
          book_date: time,
          adults:adultNum,
          children:childNum,
        },
        {headers :{
          'Authorization': `Bearer  ${token}`,
          'accept':'application/json'

        }});

        setreqbody(requestBody);
        setData(response.data);
        console.log(response);
        if(response.status===200){
          props.setnext(1);
        }

      }

    catch (error) {
      if(error){
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
      // setError(error);
    }

  };
  if(props.type==="trip"){
    try {
      const formData = new FormData();

    Object.entries(first_name).forEach(([key, value], index) => {
      formData.append(`first_name${index + 1}`, value);
    });

    Object.entries(last_name).forEach(([key, value], index) => {
      formData.append(`last_name${index + 1}`, value);
    });
    Object.entries(gender).forEach(([key, value], index) => {
      formData.append(`gender${index + 1}`, value);
    });
    Object.entries(check_out).forEach(([key, value], index) => {
      formData.append(`birth${index + 1}`, convertdate(value));
    });
    console.log(childNum);

    formData.append('check_or_book','book');
    formData.append('with_discount',"no");
    formData.append('date_id',props.id);
    formData.append('adults',adultNum);
    formData.append('children',childNum);




      const response = await axios.post('http://127.0.0.1:8000/api/trip/makeReservation', formData,
      {headers :{
        'Authorization': `Bearer  ${token}`,
        'accept':"application/json"

      }});
      setData(response.data);
      console.log(response);
      if(response.data.success||response.data.message1){
        props.setnext(1);
      }

    console.log(response);
    }
    catch (error) {
      console.log(error);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      // setError(error);
    }
  }; console.log(data);


if(props.type==="flight"){
    console.log(location.state.data);
    try {
      const formData = new FormData();

    Object.entries(first_name).forEach(([key, value], index) => {
      formData.append(`first_name${index + 1}`, value);
    });

    Object.entries(last_name).forEach(([key, value], index) => {
      formData.append(`last_name${index + 1}`, value);
    });
    Object.entries(gender).forEach(([key, value], index) => {
      formData.append(`gender${index + 1}`, value);
    });
    Object.entries(check_out).forEach(([key, value], index) => {
      formData.append(`birth${index + 1}`, convertdate(value));
    });
    Object.entries(passport).forEach(([key, value], index) => {
        formData.append(`passport_id${index + 1}`, value);
      });
    console.log(childNum);

    formData.append('check_or_book','book');
    formData.append('with_discount',"no");
    formData.append('date_id',props.id);
    formData.append('num_of_adults',adultNum);
    formData.append('num_of_children',childNum);





      const response = await axios.post('http://127.0.0.1:8000/api/bookingTickets', formData,
      {headers :{
        'Authorization': `Bearer  ${token}`,
        'accept':"application/json"

      }});
      setData(response.data);
      console.log(response);
      if(response.data.success||response.data.message1){
        props.setnext(1);
      }

    console.log(response);
    }
    catch (error) {
      console.log(error);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      // setError(error);
    }
  }; console.log(data);

}
  if(props.type==="attraction"||props.type==="hotel") {
    console.log(time);
  return (
    <div className="info">
      <form action="" onSubmit={nextLaistener}>
      <h3 className="title">Traveler details</h3>

    <div className="nameRegister">
      <div className="left">
        <label form="Fname">First name</label>
        <input type="text" value={first_name} onChange={(e) => setFirstname(e.target.value)}
        placeholder="First name" id="FnameR"  required />
      </div>
      <div className="right">
        <label form="Lname">Last name</label>
        <input type="text"  value={last_name} onChange={(e) => setLastname(e.target.value)}
        placeholder="Last name" id="LnameR" required />
      </div>
      <div>
      </div>

    </div>

    <div className="nameRegister">
    <div className="left">
    <label >Adult number</label>
    <input type="number" value={adultNum} onChange={(e) => setAdultnum(e.target.value)}  min="0"
    placeholder="adults number" required />
    </div>
    <div className="right">
    <label>Child number</label>
    <input type="number" value={childNum} onChange={(e) => setChildnum(e.target.value)}  min="0"
    placeholder="adults number" required />
    </div>
    </div>
    {props.type==="hotel" && <div className="nameRegister">
    <div className="left">
    <label>Check in </label>
      <div className="Date">
    <BasicDatePicker value={check_in} date={(e)=>setCheckin(e)} />
    </div>
    </div>
    <div className="right">
    <label>Check out </label>
    <div className="Date">
    <BasicDatePicker value={check_out} date={(e)=>setCheckout(e)}/>
    </div>
    </div>
    </div>}

    {props.type==="attraction" && <div className="nameRegister">
    <div className="left">
    <label>depature date </label>
    < ResponsiveDateTimePickers date={(e)=>setTime(e)}/>
    </div>
    </div>}
    {error && <p className="errormessage">{error}</p>}

        <button className="next">Next</button>
      </form>
    </div>
  );
  }
  if(props.type==="trip"||props.type==="flight") {
    console.log("lolo"+props.id);
    console.log(gender);
    console.log(check_out);
    console.log(first_name);
    console.log(last_name);
    console.log(childNum);
    return (
      <div className="info">
  <form action="" onSubmit={nextLaistener}>
    <h3 className="title">Traveler details</h3>
    <div className="nameRegister">
      <div className="left">
        <label>Adult number</label>
        <input type="number" value={adultNum} onChange={(e) => setAdultnum(e.target.value)} min="1"
        placeholder="adults number" required />
      </div>
      <div className="right">
        <label>Child number</label>
        <input type="number" value={childNum} onChange={(e) => setChildnum(e.target.value)} min="0"
        placeholder="children number" required />
      </div>

    </div>


    {[...Array(parseInt(adultNum) + parseInt(childNum))].map((_, i) => (
      <div className="nameRegister" key={i}>
        {/* <div className="left"> */}
        <div>
          <label form={`Fname${i}`}>First name</label>
          <input type="text" value={first_name[i]} onChange={(e) => setFirstname({ ...first_name, [i]: e.target.value })}
          placeholder="First name" id={`FnameR${i}`} required />
          </div>
          <div>
          <label form={`Lname${i}`}>Last name</label>
          <input type="text" value={last_name[i]} onChange={(e) => setLastname({ ...last_name, [i]: e.target.value })}
          placeholder="Last name" id={`LnameR${i}`} required />
          </div>

        {/* </div>
        <div className="right"> */}
        <div>
        <label>birth date</label>
        <div className="Date">
          <BasicDatePicker date={(e)=>setCheckout({ ...e, [i]: e})}/>
        </div>
        </div>
        <ControlledRadioButtonsGroup onChange={(e)=>setGender({ ...gender, [i]: e.target.value})}/>
        {props.type==="flight" && <div>
          <label>Passport id</label>
          <input type="tel" value={passport[i]} onChange={(e) => setPassport({ ...passport, [i]: e.target.value })}
          placeholder="passport" id={`passport${i}`} required />
          </div>
          }
      </div>

    ))}
    {error && <p className="errormessage">{error}</p>}
    <button className="next">Next</button>
  </form>
</div>

    );
    }
};

export default ReservationContent;
