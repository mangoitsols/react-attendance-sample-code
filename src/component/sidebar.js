import React, { Component,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/defaultSchoolLogo.png";
import student from "../images/student.svg";
import counsellor from "../images/counsellor.svg";
import pin from "../images/pin.svg";
import chat from "./images/chat.svg";
import manageclass from "./images/manage-class.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { createClass, getClass } from "../action/index";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { handleLogout } from "./header";
import { authHeader } from "../comman/authToken";
import axios from "axios";
import { API, BASE_URL } from "../config/config";

toast.configure();

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:'',
      loading:false,
      getCountryValue:[]
    }
  }

 getCountry = async() => {
  this.setState({loading:true});
    await axios
    .get(`${API.getAllCountry}`, { headers: authHeader() })
    .then((data) => {
      this.setState({loading:false});
      this.setState({getCountryValue:data.data.country});
      this.handleGetSchoolInfo()
    }).catch((err) => {
      this.setState({loading:false});
      if (err?.response?.status === 401) {
        handleLogout()
      }
    })
};
  
  handleGetSchoolInfo = async() =>{

    const Manager_ID = localStorage.getItem('id');

    this.setState({loading:true});
    await axios
    .get(`${API.getSchoolInfo}/${Manager_ID}`, { headers: authHeader() })
    .then((res) => {
      this.setState({loading:false});
      this.setState({data:res.data});
      const countryname =  this.state.getCountryValue.filter((value) => value._id === res.data.country)
      localStorage.setItem("schoolLocation", countryname[0]?.name);

    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        handleLogout()
      }
      localStorage.setItem("schoolLocation",'');
      this.setState({data:''});
      this.setState({loading:false});
    });
  }
  
  componentDidMount() {
    this.getCountry()
  }
  
  render() {
    const {data} = this.state
    const localData = localStorage.getItem('logoImage')

    return (
      <React.Fragment>
        
        <div className="col-md-4 col-lg-3 col-xl-2">
          <div style={{ height: "100%", minHeight: "100vh" }}>
            <div
              className="sidebar d-flex flex-column flex-shrink-0 pl-0 p-3 "
              style={{ width: "100%", height: "100%" }}
            >
              <a
                href="#"
                className="d-flex align-items-center mb-2 link-dark text-decoration-none logo"
              >
                {localData ? <img src={BASE_URL+'/'+localData} className="" alt="local_logo" width={'200px'} height={'80px'}/> : !data.logo ? <img src={logo} className="" alt="db_logo" width={'200px'} height={'80px'}/> :  <img src={BASE_URL+'/'+data.logo} className="" alt="db_logo" width={'200px'} height={'80px'}/> }
              </a>

              <ul className="nav nav-pills flex-column mb-auto">
                <li>
                  <Link to="/dashboard" className="nav-link link-dark">
                    <span className="icon">
                      <DashboardIcon />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="nav-link link-dark">
                    <span className="icon">
                      <AssignmentIndIcon />
                    </span>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/school"
                    className="nav-link link-dark"
                  >
                    <span className="icon">
                      <MapsHomeWorkIcon/>
                     
                    </span>
                    School Info
                  </Link>
                </li>
                <li>
                  <Link to="/student" className="nav-link link-dark">
                    <span className="icon">
                      {" "}
                      <img src={student} className="" alt="logo" />
                    </span>
                    Students
                  </Link>
                </li>
                <li>
                  <Link to="/counsellor" className="nav-link link-dark">
                    <span className="icon">
                      {" "}
                      <img src={counsellor} className="" alt="logo" />{" "}
                    </span>
                    Counsellor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/class"
                    className="nav-link link-dark"
                  >
                    <span className="icon">
                      <img src={manageclass} className="" alt="mangeclass" />
                    </span>
                    Manage Classes
                  </Link>
                </li>
                <li>
                  <Link to="/createPin" className="nav-link link-dark">
                    <span className="icon">
                      {" "}
                      <img src={pin} className="" alt="createpin" />
                    </span>
                    Pin
                  </Link>
                </li>
                <li>
                  <Link to="/changepassword" className="nav-link link-dark">
                    <span className="icon">
                      <LockOpenIcon />
                    </span>
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="nav-link link-dark">
                    <span className="icon">
                      <img src={chat} className="" alt="chat" />
                    </span>
                    Chat
                  </Link>
                </li>
               
               
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  createClass,
  getClass,
})(Sidebar);
