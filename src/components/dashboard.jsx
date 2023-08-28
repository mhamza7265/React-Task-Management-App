import Logout from "./Logout";
import Organiser from "../Organiser/Organiser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditDisplayType } from "../reducers/DisplayTypeReducer";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [searchdate, setSearchDate] = useState("");
  const displaytype = useSelector((state) => state.display.value);
  const loggedinuser = useSelector((state) => state.loggedin.user);
  const newtasks = useSelector((state) => state.newtask.data);
  const dispatch = useDispatch();

  const handleChange = (val) => {
    dispatch(EditDisplayType(val));
  };

  const handleDateChange = (val) => {
    setDate(val);
    let d = val;
    let mon = d.getMonth() + 1;
    let y = d.getFullYear();
    let dy = d.getDate();
    console.log(dy);
    const duedate = dy + "/" + mon + "/" + y;
    setSearchDate(duedate);
  };

  return <Organiser searchbydate={searchdate} />;
};

export default Dashboard;
