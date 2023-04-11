// import img1 from '../images/stath.jpg';
import Header from './Header';
import Footer from './Footer';
// import css from '../images/patientreg.css';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Adminreg() {
    const [admindetails, setdetails] = useState({
        name: "", email: "", password: "",
    })
    const { name, email, password } = admindetails;
    const handleInput = (e) => {
        setdetails({ ...admindetails, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    function navigator() {

        navigate('/adminlogin', { replace: true });
    }
    const submit = async e => {
        if (admindetails.name == "" || admindetails.email == "" || admindetails.password == "") {
            toast.error("Fill info first");
        }
        else {
            console.log("submit call");
            e.preventDefault();
            await axios.post(`${process.env.REACT_APP_BASE_URL}/adminreg`, admindetails).then((res) => {
                //console.log(res);
                if (res.data.message === "ok") {
                    toast.success("registration Successful");
                    toast.info("Admin added successfully");

                    var i = 0;
                    var count = 0;
                    for (i = 0; i < 100000; i++) {
                        count = count + 1;
                    }
                    if (count > 1000) {
                        window.location.reload();
                    }

                }
                if (res.data.message === "error") {
                    toast.error("Something went wrong");
                }
                if (res.data.message === "Exists") {
                    toast.error("User already exist on this email");
                }


            });
        }
    }





    return (
        <div>
            <div>
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-12">
                            <div class="card my-4">
                                <section class="home-banner">

                                    <div class="container">
                                        <div class="row">
                                            <div class="container col-6 mt-lg-5"  >
                                                <div class=" px-xl-5">
                                                    <div class="lead_magnet_form_wrapper">
                                                        <div class="form_title">
                                                            <h4 class="sub_heading">Register New Admin :</h4>
                                                            <h3 class="heading mb-2 pb-1">Fill details</h3>
                                                        </div>
                                                        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7_dtp.css" rel="stylesheet" type="text/css" />

                                                        <div id="">
                                                            <form >
                                                                <div id="mc_embed_signup_scroll">

                                                                    <div class="indicates-required"><span class="asterisk"></span> </div>
                                                                    <div class="mc-field-group form-group">
                                                                        <label for="mce-MMERGE1" class="mb-1 mt-3">Admin Name *</label>
                                                                        <input type="text" name="name" value={name} onChange={(e) => handleInput(e)} class="form-control" id="mce-MMERGE1" required="true" />
                                                                    </div>
                                                                    <div class="mc-field-group form-group">
                                                                        <label for="mce-EMAIL" class="mb-1 mt-3">Email Address *<span
                                                                            class="asterisk"></span></label>
                                                                        <input type="email" name="email" value={email} onChange={(e) => handleInput(e)} class="email form-control"
                                                                            id="mce-EMAIL" required="true" />
                                                                    </div>
                                                                    <div class="mc-field-group form-group">
                                                                        <label for="mce-MMERGE1" class="mb-1 mt-3">Password *</label>
                                                                        <input type="password" name="password" value={password} onChange={(e) => handleInput(e)} class="form-control" id="mce-MMERGE1" required="true" />
                                                                    </div>


                                                                    <div id="mce-responses" class="clear foot">
                                                                        <div class="response" id="mce-error-response" style={{ display: NaN }}></div>
                                                                        <div class="response" id="mce-success-response" style={{ display: NaN }}></div>
                                                                    </div>
                                                                    <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text" name="b_dd80eb08d9cc3b8010abc039f_34a0b4f4e9" tabindex="-1" value="" /></div>
                                                                    <div class="row">
                                                                        <div class=" col-2 optionalParent">
                                                                            <div class="clear foot pt-4 ">
                                                                                <input type="submit" onClick={submit}
                                                                                    id="mc-embedded-subscribe"
                                                                                    class="button btn btn-primary bt mt-5 get_demo_btn" />

                                                                            </div>
                                                                        </div>


                                                                    </div>

                                                                </div>
                                                            </form><br />
                                                            <Link style={{ textDecoration: "none" }} to="/adminlogin">Already an Admin ? Check here !!</Link>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>


                                        </div>



                                    </div>


                                </section >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >





    )
}
export default Adminreg
