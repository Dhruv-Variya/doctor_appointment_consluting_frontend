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


function Patientreg() {
    const [patientdetails, setdetails] = useState({
        fullname: "", phonenumber: "", email: "", password: "", confirmpassword: "",
    })
    const { fullname, phonenumber, email, password, confirmpassword } = patientdetails;
    const handleInput = (e) => {
        setdetails({ ...patientdetails, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    function navigator() {
        setTimeout(() => {
            navigate('/patientlogin', { replace: true });
        }, 1100);

    }
    const submit = async e => {
        if (patientdetails.fullname == "" || patientdetails.phonenumber == "" || patientdetails.email == "" || patientdetails.password == "" || patientdetails.confirmpassword == "") {
            toast.error("Fill up details !");
        }
        else {
            e.preventDefault();
            if (patientdetails.password === patientdetails.confirmpassword) {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, patientdetails).then((res) => {
                    //console.log(res);
                    if (res.data.message === "ok") {
                        toast.success("Registration Successful");
                        navigator();

                    }
                    if (res.data.message === "error") {
                        toast.error("Something went wrong");
                    }
                    if (res.data.message === "Exists") {
                        toast.error("User already exist on this email");
                    }


                });
            }
            else {
                toast.error("Password doesn't match with Confirpassword");
            }

        }
    }
    const styles = {
        imageabc: {
            height: "100%",
            backgroundImage: `url(${"4.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            filter: ` blur(8px)`


        }
    }
    const bdcontent = {
        backgroundColor: "rgb(0,0,0)", /* Fallback color */
        backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
        color: `white`,
        fontWeight: `bold`,
        border: `3px`,
        borderRadius: "50px",
        position: `absolute`,
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        zIndex: `2`,
        width: `80%`,
        padding: `20px`,

    }

    return (
        <>
            <div style={styles.imageabc}></div>
            <div style={bdcontent}>

                <section class="home-banner">

                    <div class="container">
                        <div class="row">
                            <div class=" col-4  d-flex align-items-center">
                                <div class="banner_title" data-animation="fadeInLeft" animation-delay="2s" data-delay="0.3s">
                                    <h1>My Online Address<br /><span>My Digital Clinic</span></h1>
                                    <p class="py-3">Establish medical practice online and grow it digitally, easing clinic management.
                                    </p>
                                </div>
                            </div>
                            <div class="container col-6 mt-lg-5"  >
                                <div class=" px-xl-5">
                                    <div class="lead_magnet_form_wrapper">
                                        <div class="form_title">
                                            <h4 class="sub_heading">Register Here :</h4>
                                            <h3 class="heading mb-2 pb-1">Fill details</h3>
                                        </div>
                                        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7_dtp.css" rel="stylesheet" type="text/css" />

                                        <div id="">
                                            <form >
                                                <div id="mc_embed_signup_scroll">

                                                    <div class="indicates-required"><span class="asterisk"></span> </div>
                                                    <div class="mc-field-group form-group">
                                                        <label for="mce-MMERGE1" class="mb-1 mt-3">Full Name </label>
                                                        <input type="text" name="fullname" value={fullname} onChange={(e) => handleInput(e)} class="form-control" id="mce-MMERGE1" required="true" />
                                                    </div>
                                                    <div class="mc-field-group size1of2 form-group">
                                                        <label for="mce-PHONE" class="mb-1 mt-3">Phone Number </label>
                                                        <input type="text" name="phonenumber" value={phonenumber} onChange={(e) => handleInput(e)} class="form-control" id="mce-PHONE" required="true" />
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
                                                    <div class="mc-field-group form-group">
                                                        <label for="mce-MMERGE1" class="mb-1 mt-3">Confirm Password *</label>
                                                        <input type="password" name="confirmpassword" value={confirmpassword} onChange={(e) => handleInput(e)} class="form-control" id="mce-MMERGE1" required="true" />
                                                    </div>



                                                    <div id="mce-responses" class="clear foot">
                                                        <div class="response" id="mce-error-response" style={{ display: NaN }}></div>
                                                        <div class="response" id="mce-success-response" style={{ display: NaN }}></div>
                                                    </div>
                                                    <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text" name="b_dd80eb08d9cc3b8010abc039f_34a0b4f4e9" tabindex="-1" value="" /></div>
                                                    <div class="row">
                                                        <div class=" col-3 optionalParent">
                                                            <div class="clear foot pt-4 ">
                                                                <input type="submit" onClick={submit}
                                                                    id="mc-embedded-subscribe"
                                                                    class="button btn btn-success bt mt-5 get_demo_btn" />

                                                            </div>
                                                            {/* <button onClick={(e) => handleGoogleSignin(e)}>login with google</button> */}
                                                        </div>
                                                        <div class=" col-3 optionalParent">
                                                            <div class="clear foot pt-4 pl-10 ">
                                                                <Link class="button btn btn-primary bt " style={{ textDecoration: "none" }} to="/">Home</Link>
                                                            </div>
                                                        </div>
                                                        <div class=" col-5 optionalParent">
                                                            <div class="clear foot pt-4 pl-10 ">
                                                                <Link class="button btn btn-info bt " style={{ textDecoration: "none" }} to="/doclogin">I'm Doctor !!</Link>
                                                            </div>
                                                        </div>



                                                    </div>

                                                </div>
                                            </form><br />
                                            <Link style={{ textDecoration: "none" }} to="/patientlogin">Already have an account?</Link>
                                        </div>


                                    </div>
                                </div>
                            </div>


                        </div>



                    </div>


                </section >

                <ToastContainer />
            </div >
        </>





    )
}
export default Patientreg



