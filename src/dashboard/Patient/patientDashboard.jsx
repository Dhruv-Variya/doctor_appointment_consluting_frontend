import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import PatientDetails from './patientDetails';
import Reqpendding from './reqpendding';
import Reqdone from './reqdone';
import Reqapproved from './reqapproved';

function PatientDashboard() {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('patienttoken');
        const decode = decodeToken(token);
        const isexpire = isExpired(token);
        if (!token) {
            navigate('/patientlogin');
        }
        else {
            if (isexpire) {
                navigate('/patientlogin');
            }
            else if (decode.role != "patient") {
                navigate('/patientlogin');
                toast.error("You have to login with patient");
            }
        }

    }, []);

    var [details, setdetails] = useState(true);
    var [pendding, setpendding] = useState(false);
    var [done, setdone] = useState(false);
    var [approved, setapproved] = useState(false);



    const fundetails = (e) => {
        setdetails(true);
        setapproved(false);
        setdone(false);
        setpendding(false);
    }
    const fundone = (e) => {
        setdetails(false);
        setapproved(false);
        setdone(true);
        setpendding(false);
    }
    const funpendding = (e) => {
        setdetails(false);
        setapproved(false);
        setdone(false);
        setpendding(true);
    }
    const funapproved = (e) => {
        setapproved(true);
        setdetails(false);
        setdone(false);
        setpendding(false);
    }
    const logout = () => {
        localStorage.removeItem("patienttoken");
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate("/patientlogin");
        }, 1100);

    }
    return (
        <div>
            <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-dark" id="sidenav-main">
                <div class="sidenav-header">
                    <h4 style={{ color: "white", paddingTop: "20px", paddingLeft: "25px" }} >Patient dashboard</h4>
                </div>
                <hr class="horizontal light mt-0 mb-2" />
                <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a onClick={(e) => fundetails(e)} class="nav-link text-white ">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    {/* <i class="material-icons opacity-10">table_view</i> */}
                                </div>
                                <span class="nav-link-text ms-1">My Details</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a onClick={(e) => funpendding(e)} class="nav-link text-white" >
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    {/* <i class="material-icons opacity-10">dashboard</i> */}
                                </div>
                                <span class="nav-link-text ms-1">Pendding Appointment</span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a onClick={(e) => funapproved(e)} class="nav-link text-white ">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    {/* <i class="material-icons opacity-10">receipt_long</i> */}
                                </div>
                                <span class="nav-link-text ms-1">Approved Appointment</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a onClick={(e) => fundone(e)} class="nav-link text-white ">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    {/* <i class="material-icons opacity-10">receipt_long</i> */}
                                </div>
                                <span class="nav-link-text ms-1">Doned Appointment</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href='/index' class="nav-link text-white ">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">assignment</i>
                                </div>
                                <span class="nav-link-text ms-1">Index</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a onClick={logout} class="nav-link text-white ">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">login</i>
                                </div>
                                <span class="nav-link-text ms-1">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </aside>
            <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                {/* <!-- Navbar --> */}
                <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">

                </nav >
                {/* <!-- End Navbar --> */}

                {details ? (
                    <>
                        <PatientDetails />
                    </>
                ) : null}
                {pendding ? (
                    <>
                        <Reqpendding />
                    </>
                ) : null}
                {done ? (
                    <>
                        <Reqdone />
                    </>
                ) : null}
                {approved ? (
                    <>
                        <Reqapproved />
                    </>
                ) : null}

            </main >



        </div >
    )
}

export default PatientDashboard