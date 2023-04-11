import React, { useRef } from 'react'

import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";



function Card_doc() {
    var [loader, setloader] = useState(false);
    var once = useRef(true);
    const [docinformation, setdoc] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('patienttoken');
        const isexpire = isExpired(token);
        const decode = decodeToken(token);
        if (once.current) {
            if (!token) {
                //console.log("hi");
                setloader(true);
                toast.error("Login first");
                once.current = false;
            }
            else {
                if (isexpire) {
                    setloader(true)
                    toast.error("Session expire login again");
                    once.current = false;
                }
                else if (decode.role != "patient") {

                    setloader(true);
                    toast.error("You have to login with patient");
                    once.current = false;
                }
            }
            if (location.state) {
                setdoc(location.state.docinfo);
            }
            else {
                navigate('/index');
            }
        }

    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const [slot, setslot] = useState({ date: "", email: "", docname: "", slot1: "", slot2: "", slot3: "", slot4: "" });
    const [slottime, setslottime] = useState([]);
    const [tempdetails, settempdetails] = useState({ slot: "", docname: "" });
    var slotobj = { slot11: "", slot22: "", slot33: "", slot44: "" };
    const [datepicker, setdatepicker] = useState(false);
    // const [docinfofordatecard, setdocinfofordatecard] = useState([]);
    // const [currentdate, setcurrentdate] = useState({ date: "" });
    var docemail = { email: "" };
    var datetimechecker = { email: "", date: "", docname: "" };
    const current = new Date();

    var curTime = current.getHours();
    var cdate = current.getDate();
    var cmonth = current.getMonth();
    if (cdate < 10) {
        cdate = `0${cdate}`

    }
    if (cmonth < 10) {
        cmonth = cmonth + 1;
        cmonth = `0${cmonth}`

    }
    const sdate = `${current.getFullYear()}-${cmonth}-${cdate}`;
    var todaydate = `${current.getFullYear()}-${cmonth}-${cdate}`;

    async function callback(obj, slot1hr, slot2hr, slot3hr, slot4hr) {
        var slot1num;
        var slot2num;
        var slot3num;
        var slot4num;
        var slot1time;
        var slot2time;
        var slot3time;
        var slot4time;
        if (slot1hr.substring(6, 9) == "am") {
            slot1num = slot1hr.substring(0, 2);
            slot1time = Number(slot1num);
        }
        else {
            slot1num = slot1hr.substring(0, 2);
            slot1time = Number(slot1num);

            if (slot1time != 12) {
                slot1time = slot1time + 12;
            }
        }


        if (slot2hr.substring(6, 9) == "am") {
            slot2num = slot2hr.substring(0, 2);
            slot2time = Number(slot2num);
        }
        else {
            slot2num = slot2hr.substring(0, 2);
            slot2time = Number(slot2num);
            if (slot2time != 12) {
                slot2time = slot2time + 12;
            }
        }


        if (slot3hr.substring(6, 9) == "am") {
            slot3num = slot3hr.substring(0, 2);
            slot3time = Number(slot3num);
        }
        else {
            slot3num = slot3hr.substring(0, 2);
            slot3time = Number(slot3num);
            if (slot3time != 12) {
                slot3time = slot3time + 12;
            }
        }


        if (slot4hr.substring(6, 9) == "am") {
            slot4num = slot4hr.substring(0, 2);
            slot4time = Number(slot4num);
        }
        else {
            slot4num = slot4hr.substring(0, 2);
            slot4time = Number(slot4num);
            if (slot4time != 12) {
                slot4time = slot4time + 12;
            }
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/getdatetime`, obj).then((res) => {
            var data = res.data.docinfo;
            if (data.slot1 == "true") {

                document.getElementById("slot1").setAttribute("disabled", true);

            }
            //console.log(data.slot2);
            if (data.slot2 == "true") {
                //console.log("in slot2 if");
                document.getElementById("slot2").setAttribute("disabled", true);
            }
            if (data.slot3 == "true") {
                document.getElementById("slot3").setAttribute("disabled", true);
            }
            if (data.slot4 == "true") {
                document.getElementById("slot4").setAttribute("disabled", true);
            }
            if (data.slot1 == "false") {
                if (curTime >= (slot1time - 2)) {
                    console.log("first");
                    document.getElementById("slot1").setAttribute("disabled", true);
                }
                else {
                    document.getElementById("slot1").removeAttribute("disabled");
                }
                //console.log(document.getElementById("slot1"));
                // document.getElementById("slot1").setAttribute("disabled", false);

            }
            if (data.slot2 == "false") {
                if (curTime >= (slot2time - 2)) {
                    document.getElementById("slot2").setAttribute("disabled", true);
                }
                else {
                    document.getElementById("slot2").removeAttribute("disabled");
                }
                ///console.log(document.getElementById("slot2"));
                //document.getElementById("slot2").setAttribute("disabled", false);

            }
            if (data.slot3 == "false") {
                if (curTime >= (slot3time - 2)) {
                    document.getElementById("slot3").setAttribute("disabled", true);
                }
                else {
                    document.getElementById("slot3").removeAttribute("disabled");
                }
                //console.log(document.getElementById("slot3"));
                //document.getElementById("slot3").setAttribute("disabled", false);

            }
            if (data.slot4 == "false") {
                if (curTime >= (slot4time - 2)) {
                    document.getElementById("slot4").setAttribute("disabled", true);
                    document.getElementById("hiddenatr").removeAttribute("hidden");
                }
                else {
                    document.getElementById("slot4").removeAttribute("disabled");
                }
                //console.log(document.getElementById("slot4"));
                //document.getElementById("slot4").setAttribute("disabled", false);

            }

            setslot(data);

        });
    }
    async function bookdocappo(e) {
        setdatepicker(false);
        docemail.email = e.target.value;
        await axios.post(`${process.env.REACT_APP_BASE_URL}/finddocemail`, docemail).then((res) => {
            var data = res.data.docinfo;
            const sdate1 = `${current.getFullYear()}-${cmonth}-${cdate}`;
            datetimechecker.email = data[0].email;
            datetimechecker.date = sdate1;
            datetimechecker.docname = data[0].docname;
            var slot1hr = data[0].slot1time;
            var slot2hr = data[0].slot2time;
            var slot3hr = data[0].slot3time;
            var slot4hr = data[0].slot4time;


            callback(datetimechecker, slot1hr, slot2hr, slot3hr, slot4hr);
            setslottime(data);
            setdatepicker(true);

        });

    }

    const handleinput = async (e) => {
        var temp = { docname: "", slot: "", slotnumber: "" };
        if (e.target.name == "slot1") {
            settempdetails({ slot: slottime[0].slot1time, docname: slottime[0].fullname });
            temp.docname = slottime[0].fullname;
            temp.slot = slottime[0].slot1time;
            temp.slotnumber = "1";
        }
        if (e.target.name == "slot2") {
            settempdetails({ slot: slottime[0].slot2time, docname: slottime[0].fullname });
            temp.docname = slottime[0].fullname;
            temp.slot = slottime[0].slot2time;
            temp.slotnumber = "2";
        }
        if (e.target.name == "slot3") {
            settempdetails({ slot: slottime[0].slot3time, docname: slottime[0].fullname });
            temp.docname = slottime[0].fullname;
            temp.slot = slottime[0].slot3time;
            temp.slotnumber = "3";
        }
        if (e.target.name == "slot4") {
            settempdetails({ slot: slottime[0].slot4time, docname: slottime[0].fullname });
            temp.docname = slottime[0].fullname;
            temp.slot = slottime[0].slot4time;
            temp.slotnumber = "4";
        }
        setslot({ ...slot, [e.target.name]: e.target.value });
        setslot({ ...slot, ...temp })

    }
    const handleinput1 = async (e) => {
        var slot1num;
        var slot2num;
        var slot3num;
        var slot4num;
        var slot1time;
        var slot2time;
        var slot3time;
        var slot4time;
        var slot1hr = slottime[0].slot1time;
        var slot2hr = slottime[0].slot2time;
        var slot3hr = slottime[0].slot3time;
        var slot4hr = slottime[0].slot4time;
        if (slot1hr.substring(6, 9) == "am") {
            slot1num = slot1hr.substring(0, 2);
            slot1time = Number(slot1num);
        }
        else {
            slot1num = slot1hr.substring(0, 2);
            slot1time = Number(slot1num);

            if (slot1time != 12) {
                slot1time = slot1time + 12;
            }
        }


        if (slot2hr.substring(6, 9) == "am") {
            slot2num = slot2hr.substring(0, 2);
            slot2time = Number(slot2num);
        }
        else {
            slot2num = slot2hr.substring(0, 2);
            slot2time = Number(slot2num);
            if (slot2time != 12) {
                slot2time = slot2time + 12;
            }
        }


        if (slot3hr.substring(6, 9) == "am") {
            slot3num = slot3hr.substring(0, 2);
            slot3time = Number(slot3num);
        }
        else {
            slot3num = slot3hr.substring(0, 2);
            slot3time = Number(slot3num);
            if (slot3time != 12) {
                slot3time = slot3time + 12;
            }
        }


        if (slot4hr.substring(6, 9) == "am") {
            slot4num = slot4hr.substring(0, 2);
            slot4time = Number(slot4num);
        }
        else {
            slot4num = slot4hr.substring(0, 2);
            slot4time = Number(slot4num);
            if (slot4time != 12) {
                slot4time = slot4time + 12;
            }
        }
        datetimechecker.email = slot.email;
        datetimechecker.date = e.target.value;
        datetimechecker.docname = slot.docname;
        await axios.post(`${process.env.REACT_APP_BASE_URL}/getdatetime`, datetimechecker).then((res) => {
            var data = res.data.docinfo;
            if (data.slot1 == "true") {
                document.getElementById("hiddenatr").setAttribute("hidden", true);
                document.getElementById("slot1").setAttribute("disabled", true);
            }
            if (data.slot2 == "true") {
                //console.log("in slot2 if");
                document.getElementById("slot2").setAttribute("disabled", true);
            }
            if (data.slot3 == "true") {
                document.getElementById("slot3").setAttribute("disabled", true);
            }
            if (data.slot4 == "true") {
                document.getElementById("slot4").setAttribute("disabled", true);
            }


            // false part
            if (data.slot1 == "false") {
                document.getElementById("hiddenatr").setAttribute("hidden", true);
                if (datetimechecker.date == todaydate) {
                    if (curTime >= (slot1time - 2)) {
                        console.log("2nd")
                        document.getElementById("slot1").setAttribute("disabled", true);
                    }
                    else {
                        document.getElementById("slot1").removeAttribute("disabled");
                    }

                }
                else {
                    document.getElementById("slot1").removeAttribute("disabled");
                }

                //console.log(document.getElementById("slot1"));
                //document.getElementById("slot1").removeAttribute("disabled", false);

            }
            if (data.slot2 == "false") {
                if (datetimechecker.date == todaydate) {
                    if (curTime >= (slot2time - 2)) {
                        document.getElementById("slot2").setAttribute("disabled", true);
                    }
                    else {
                        document.getElementById("slot2").removeAttribute("disabled");
                    }

                }
                else {
                    document.getElementById("slot2").removeAttribute("disabled");
                }

            }
            if (data.slot3 == "false") {
                if (datetimechecker.date == todaydate) {
                    if (curTime >= (slot3time - 2)) {
                        document.getElementById("slot3").setAttribute("disabled", true);
                    }
                    else {
                        document.getElementById("slot3").removeAttribute("disabled");
                    }

                }
                else {
                    document.getElementById("slot3").removeAttribute("disabled");
                }
            }
            if (data.slot4 == "false") {
                if (datetimechecker.date == todaydate) {
                    if (curTime >= (slot4time - 2)) {
                        document.getElementById("hiddenatr").removeAttribute("hidden");
                        document.getElementById("slot4").setAttribute("disabled", true);
                    }
                    else {
                        document.getElementById("slot4").removeAttribute("disabled");
                    }

                }
                else {
                    document.getElementById("slot4").removeAttribute("disabled");
                }
            }
            setslot(data);
        });

    };
    const submit = (e) => {
        navigate("/appointment", { state: { slotinfo: slot, docinfo: slottime } });
    }

    return (
        <div >
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
                            <a href="/patientlogin" class="btn btn-primary">Login</a>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <Header />
                    <div style={{ marginTop: "20px", marginBottom: "20px", }} class="container">
                        <div>
                            <div class="row">

                                {
                                    docinformation.map(doc => (
                                        <>


                                            <div class="col-lg-4">
                                                <div class="card card-margin" >

                                                    <div class="card-header no-border">
                                                        <h3 class="card-title " style={{ textTransform: 'uppercase' }}>Dr.{doc.fullname}</h3>
                                                    </div>
                                                    <div class="card-body pt-0">
                                                        <div class="widget-49">
                                                            <div class="widget-49-title-wrapper">
                                                                <div class="widget-49-date-primary">
                                                                    <span class="widget-49-date-day">Email : {doc.email}</span>
                                                                    {/* <span class="widget-49-date-month">apr</span> */}
                                                                </div>
                                                                <div class="widget-49-meeting-info">
                                                                    <span class="widget-49-pro-title"></span>
                                                                    <span class="widget-49-meeting-time">Speciality : {doc.specialty}</span>
                                                                </div>
                                                            </div>
                                                            <ol class="widget-49-meeting-points">
                                                                <li class="widget-49-meeting-item"><span>{doc.specialty}</span></li>
                                                                <li class="widget-49-meeting-item"><span>Data migration is in scope</span></li>
                                                                <li class="widget-49-meeting-item"><span>Session timeout increase to 30 minutes</span></li>
                                                            </ol>
                                                            <div class="widget-49-meeting-action">
                                                                <button onClick={bookdocappo} style={{ fontSize: "20px", color: "Blue" }} class="btn btn-sm btn-flash-border-primary" value={doc.email}>Book</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </>
                                    ))
                                }
                                {
                                    datepicker ? (
                                        <>
                                            <div style={{ marginTop: "50px", borderStyle: "groove" }} >

                                                <butoon class="btn btn-outline-danger" onClick={() => setdatepicker(false)}>X</butoon>

                                                <h3 class="text-black" style={{ color: "black", textAlign: "center" }}>Select date and time</h3>
                                                <h6 class="text-black" style={{ color: "black", textAlign: "center" }}>Dr.{slottime[0].fullname}</h6>
                                                <div class="row py-6">
                                                    <div class="col">
                                                        <form>
                                                            <div class="date" id="date1" data-target-input="nearest">

                                                                <form action="">
                                                                    <input type="date" name="date" class="form-control bg-light border-0 " onChange={(e) => handleinput1(e)}
                                                                        min={sdate} style={{ height: "55px" }} />

                                                                </form>
                                                            </div>
                                                        </form>

                                                    </div>

                                                    <div class="col" style={{ paddingRight: "20px" }}>
                                                        <div class="row" >
                                                            <div class="col-md-3  text-center"><button id="slot1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => handleinput(e)} name='slot1' class="btn btn-dark py-3" type="submit" value="true">{slottime[0].slot1time}</button></div>
                                                            <div class="col-md-3 text-center"><button id="slot2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => handleinput(e)} name='slot2' class="btn btn-dark py-3" type="submit" value="true">{slottime[0].slot2time}</button></div>
                                                            <div class="col-md-3 text-center"><button id="slot3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => handleinput(e)} name='slot3' class="btn btn-dark py-3" type="submit" value="true">{slottime[0].slot3time}</button></div>
                                                            <div class="col-md-3 text-center"><button id="slot4" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => handleinput(e)} name='slot4' class="btn btn-dark py-3" type="submit" value="true">{slottime[0].slot4time}</button></div>
                                                            <p id='hiddenatr' hidden class="text-center text-danger">Today appointment booking time is over </p>
                                                        </div>

                                                    </div>


                                                </div>
                                                {/* <div class="text-center">
                                                <button class="btn btn-dark py-3" type="button" data-toggle="modal" data-target="#exampleModal">Make Appointment</button>
                                            </div> */}

                                            </div>
                                        </>
                                    ) : null
                                }
                                {/* <!-- Button trigger modal --> */}
                                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Launch demo modal
                            </button> */}

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Your Selection</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p>DoctorName :{tempdetails.docname} </p>
                                                <p>AppointmentDate : {slot.date}</p>
                                                <p>AppointmentTime : {tempdetails.slot}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                <button onClick={(e) => submit(e)} type="button" class="btn btn-dark " data-bs-dismiss="modal">Proceed Further</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div style={{ position: "relative", top: "162px", bottom: "0", left: "0", right: "0" }}><Footer /></div>
            </>)}
        </div>

    )
}

export default Card_doc