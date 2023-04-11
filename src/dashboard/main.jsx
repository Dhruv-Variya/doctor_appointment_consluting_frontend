
import '../assetsdash/css/material-dashboard.min.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import '../assetsdash/scss/material-dashboard.scss'

import img1 from '../assets/img/verifier.png';
import Table from './table';
import Adminreg from '../pages/adminreg';
import Verifierreg from '../pages/verifierreg';
import Displaydoc from './Displaydoc';
import Displaypatient from './Displaypatient';
import Displayverifier from './Displayverifier';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    var [doclist, setdoc] = useState([]);
    var [vdoclist, setvdoc] = useState([]);
    var [tableunverified, settableunverified] = useState(true);
    var [addadmin, setaddadmin] = useState(false);
    var [addverifier, setaddverifier] = useState(false);
    var [displaydoc, setdisplaydoc] = useState(false);
    var [displaypatient, setdisplaypatient] = useState(false);
    var [displayverifiers, setdisplayverifiers] = useState(false);
    var navigate = useNavigate();
    const token = localStorage.getItem('admintoken');
    const decode = decodeToken(token);
    const isexpire = isExpired(token);
    var [loader, setloader] = useState(false);
    var once = useRef(true);
    useEffect(() => {

        if (once.current) {
            if (!token) {
                setloader(true);
                toast.error("Login first");
                once.current = false;
            }
            else {
                if (isexpire) {
                    setloader(true);
                    toast.error("Session expire login again");
                    once.current = false;
                }
                else if (decode.role != "admin") {
                    setloader(true);
                    toast.error("You have to login with admin");
                    once.current = false;
                }
            }
        }

        const fetchdoctor = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/get`);
            const docdata = res.data.docdata;
            setdoc(docdata);
            const vdocdata = res.data.vdata;
            setvdoc(vdocdata);
            console.log(vdocdata);
        };
        fetchdoctor();



    }, []);
    const funaddadmin = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        setdisplaypatient(false);
        settableunverified(false);
        setdisplayverifiers(false);
        setaddadmin(true);
    }
    const funaddverifier = (e) => {
        setdisplaydoc(false);
        setdisplaypatient(false);
        settableunverified(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        setaddverifier(true);
    }
    const fundisplaydoc = (e) => {
        setaddverifier(false);
        setdisplaypatient(false);
        settableunverified(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        setdisplaydoc(true);
    }
    const fundisplaypatient = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        settableunverified(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        setdisplaypatient(true);
    }
    const funtableunverified = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        setdisplaypatient(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        settableunverified(true);
    }
    const fundisplayverifiers = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        setdisplaypatient(false);
        setaddadmin(false);
        settableunverified(false);
        setdisplayverifiers(true);
    }
    const logout = () => {
        localStorage.removeItem('admintoken');
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate('/adminlogin');
        }, 1200)
    }
    return (
        <div>
            {loader ? (
                <>
                    {/* <div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary " role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div> */}
                    <div class="d-flex align-items-center justify-content-center vh-100">
                        <div class="text-center">
                            <h1 class="display-1 fw-bold">401</h1>
                            <p class="fs-3"> <span class="text-danger">Opps!</span> You have to login first</p>
                            <p class="lead">
                                Got ot login page
                            </p>
                            <a href="/adminlogin" class="btn btn-primary">Login</a>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-dark" id="sidenav-main">
                        <div class="sidenav-header">
                            <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                            <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
                                <img src={img1} height="60px" weigth="60px" class="navbar-brand-img ml-10" alt="main_logo" />
                                <span class="ms-1 font-weight-bold text-white ml-10">{'  '}Admin</span>
                            </a>
                        </div>
                        <hr class="horizontal light mt-0 mb-2" />
                        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a onClick={(e) => funtableunverified(e)} class="nav-link text-white ">
                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i class="material-icons opacity-10">dashboard</i>
                                        </div>
                                        <span class="nav-link-text ms-1">Dashboard</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a onClick={(e) => funaddadmin(e)} class="nav-link text-white " >
                                        {/* <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">table_view</i>
                                </div> */}
                                        <span class="nav-link-text ms-1">Add Admin</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a onClick={(e) => funaddverifier(e)} class="nav-link text-white ">
                                        {/* <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">receipt_long</i>
                                </div> */}
                                        <span class="nav-link-text ms-1">Add Verifier</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a onClick={(e) => fundisplaydoc(e)} class="nav-link text-white ">
                                        {/* <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">view_in_ar</i>
                                </div> */}
                                        <span class="nav-link-text ms-1">Doclist</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a onClick={(e) => fundisplaypatient(e)} class="nav-link text-white ">
                                        {/* <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">format_textdirection_r_to_l</i>
                                </div> */}
                                        <span class="nav-link-text ms-1">Patientlist</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a onClick={(e) => fundisplayverifiers(e)} class="nav-link text-white ">
                                        {/* <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">format_textdirection_r_to_l</i>
                                </div> */}
                                        <span class="nav-link-text ms-1">Verifierlist</span>
                                    </a>
                                </li>
                                {/* <li class="nav-item">
                            <a class="nav-link text-white " href="../pages/notifications.html">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">notifications</i>
                                </div>
                                <span class="nav-link-text ms-1">Notifications</span>
                            </a>
                        </li> */}

                                {/* <li class="nav-item mt-3">
                            <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
                        </li> */}
                                {/* <li class="nav-item">
                            <a class="nav-link text-white " href="../pages/profile.html">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">person</i>
                                </div>
                                <span class="nav-link-text ms-1">Profile</span>
                            </a>
                        </li> */}
                                <li class="nav-item">
                                    <a onClick={logout} class="nav-link text-white ">
                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i class="material-icons opacity-10">login</i>
                                        </div>
                                        <span class="nav-link-text ms-1">Logout</span>
                                    </a>
                                </li>
                                {/* <li class="nav-item">
                            <a class="nav-link text-white " href="../pages/sign-up.html">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">assignment</i>
                                </div>
                                <span class="nav-link-text ms-1">Sign Up</span>
                            </a>
                        </li> */}
                            </ul>
                        </div>

                    </aside>
                    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                        {/* <!-- Navbar --> */}
                        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
                            <div class="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href='/#' >Admin</a></li>
                                        {/* <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li> */}
                                    </ol>
                                    <h6 class="font-weight-bolder mb-0">Dashboard</h6>
                                </nav>
                                <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                                    {/* <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                                <div class="input-group input-group-outline">
                                    <label class="form-label">Type here...</label>
                                    <input type="text" class="form-control"/>
                                </div>
                            </div> */}

                                </div>
                            </div>
                        </nav >
                        {/* <!-- End Navbar --> */}

                        {tableunverified ? (
                            <>
                                <Table />
                            </>
                        ) : null

                        }
                        {addadmin ? (
                            <>
                                <Adminreg />
                            </>
                        ) : null

                        }
                        {addverifier ? (
                            <>
                                <Verifierreg />
                            </>
                        ) : null

                        }
                        {displaydoc ? (
                            <>
                                <Displaydoc />
                            </>
                        ) : null

                        }
                        {displaypatient ? (
                            <>
                                <Displaypatient />
                            </>
                        ) : null

                        }
                        {displayverifiers ? (
                            <>
                                <Displayverifier />
                            </>
                        ) : null

                        }

                    </main >
                </div >
            </>)}
            <ToastContainer />
        </div>

    )

}


export default Main