

import '../../assetsdash/css/material-dashboard.min.css'

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import img1 from '../../assets/img/verifier.png';
import { useNavigate } from 'react-router-dom';
import Verifiertable from './Verifiertable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isExpired, decodeToken } from "react-jwt";

function Verifierdashboard() {
    var [doclist, setdoc] = useState([]);
    var [vdoclist, setvdoc] = useState([]);
    const token = localStorage.getItem('verifiertoken');
    const decode = decodeToken(token);
    const isexpire = isExpired(token);
    var [loader, setloader] = useState(false);
    var once = useRef(true);

    var navigate = useNavigate();
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
                else if (decode.role != "verifier") {
                    setloader(true);
                    toast.error("You have to login with verifier");
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

    const logout = () => {
        localStorage.removeItem('verifierdash');
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate('/verifierlogin');
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
                                <span class="ms-1 font-weight-bold text-white ml-10">{'  '}Verifier</span>
                            </a>
                        </div>
                        <hr class="horizontal light mt-0 mb-2" />
                        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link text-white">
                                        <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i class="material-icons opacity-10">dashboard</i>
                                        </div>
                                        <span class="nav-link-text ms-1">New Requests   </span>
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
                            <div class="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href='/#' >Verifier</a></li>
                                    </ol>
                                    <h6 class="font-weight-bolder mb-0">Dashboard</h6>

                                </nav>
                                <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                                </div>
                            </div>
                        </nav >
                        {/* <!-- End Navbar --> */}
                        <Verifiertable />


                    </main >



                </div >
            </>)}
            <ToastContainer />
        </div>

    )

}

export default Verifierdashboard