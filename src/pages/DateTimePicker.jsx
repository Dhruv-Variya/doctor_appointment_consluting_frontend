import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';


function DateTimePicker() {
    const current = new Date();
    var cdate = current.getDate();
    var cmonth = current.getMonth();
    var cyear = current.getFullYear();
    if (cdate < 10) {
        cdate = `0${cdate}`
        console.log(cdate);
    }
    if (cmonth < 10) {
        cmonth = cmonth + 1;
        cmonth = `0${cmonth}`
        console.log(cmonth);
    }

    const sdate = `${current.getFullYear()}-${cmonth}-${cdate}`;
    console.log(sdate);

    const [appodetails, setdetails] = useState({
        specialist: "", docname: "", username: "", email: "", phonenumber: "", gender: "", date: "", time: ""
    })
    const { specialist, docname, username, email, phonenumber, gender, date, time } = appodetails;
    return (
        <div>
            <Header />
            <div class="container-fluid bg-primary bg-appointment mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ marginTop: "50px" }} >
                <div class="container">
                    <div class="row gx-5">
                        <div class="col-lg-6 py-5">
                            <div class="py-5">
                                <h1 class="display-5 text-black mb-4">We Are A Certified and Award Winning Dental Clinic You Can Trust</h1>
                                <p class="text-black mb-0">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                                <h1 class="text-black mb-4" style={{ color: "black" }}>Make Appointment</h1>
                                <form>
                                    <div class="row g-3">




                                        <div class="col-12 col-sm-6">
                                            <div class="date" id="date1" data-target-input="nearest">

                                                <form action="">
                                                    <input type="date" name="date" class="form-control bg-light border-0 datetimepicker-input"
                                                        value="10" min={sdate} style={{ height: "55px" }} />

                                                </form>
                                            </div>


                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <select name="gender" class="form-select bg-light border-0" style={{ height: "55px" }} >
                                                <option selected>Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div class="col-12">
                                            <button class="btn btn-dark w-100 py-3" type="submit">Make Appointment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DateTimePicker