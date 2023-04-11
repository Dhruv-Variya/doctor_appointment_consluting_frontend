// import img1 from '../images/stath.jpg';
// import Header from './Header';
import Footer from './Footer';
// import css from '../images/patientreg.css';
// import { Component } from 'react';
// import useNavigate from "react-router-dom";
import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useState, useEffect } from "react";
// import axios, { isCancel, AxiosError } from 'axios';
import { Link } from "react-router-dom";

function Admindash() {
    
    return (
        <div>
            <div class="row container mt-3 justify-content-center">
            <div class="card shadow-none pt-3 pb-1 mb-4 mx-4 bg-dark rounded" style={{width: "18rem"}}>
            <img class="card-img-top" src="assets/img/admin.jpg" alt="Admin image cap"/>
            <div class="card-body">
                <h5 class="card-title" style={{color: "whitesmoke"}}>Admin</h5>
                <p class="card-text" style={{color: "white"}}>Admin have authorities to add an admin and a verifier. So if you are willing to add someone as 'New Admin', you can add here.</p>
                <a href="/adminreg" class="btn btn-primary">Add Admin</a>
            </div>
            </div>
            <div class="card shadow-none pt-4 pb-1 mb-4 mx-4 bg-dark rounded" style={{width: "18rem"}}>
            <img class="card-img-top" src="assets/img/var.jpg" alt="Admin image cap"/>
            <div class="card-body">
                <h5 class="card-title" style={{color: "white"}}>Verifier</h5>
                <p class="card-text" style={{color: "white"}}>Verifier can authaunticate 'New Doctor' only. So if you want to add someone as 'New Verifier', you can add here.</p>
                <a href="/verifierreg" class="btn btn-primary">Add Verifier</a>
            </div>
            </div>
            </div>
            <Footer />
        </div >
 )
}
export default Admindash
