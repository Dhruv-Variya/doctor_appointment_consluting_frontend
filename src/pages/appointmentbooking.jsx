
import React, { Component, useRef } from 'react';
import { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";



//pehela pehela pyar he.....

function Appointmentbooking() {
  const navigate = useNavigate();
  var modal = document.getElementById("myModal");
  var start = document.getElementById("start");
  var [loader, setloader] = useState(true);
  const location = useLocation();
  const [data, setdata] = useState({});
  const [tokendata, settoken] = useState({});
  const [docandpatientappointementdetails, setdetails] = useState({ date: " ", email: " ", slot1: " ", slot2: " ", slot3: " ", slot4: " ", docname: " ", slot: " ", slotnumber: " ", patientname: "", patientemail: "", phonenumber: "", gender: "" });
  const [docinfo, setdocinfo] = useState();
  const token = localStorage.getItem('patienttoken');
  const isexpire = isExpired(token);
  const decode = decodeToken(token);
  const updatevalue = async () => {
    settoken(decode);
  };
  useEffect(() => {

    if (!token) {
      navigate('/patientlogin');
    }
    else {
      if (isexpire) {
        navigate('/patientlogin');
      }
      else if (decode.role != "patient") {
        navigate('/patientlogin');

      }
    }

    if (location.state) {
      setdata(location.state.slotinfo);
      setdocinfo(location.state.docinfo);
    }
    else {

      navigate('/index');
    }


    setTimeout(() => {
      setloader(false);
    }, 2000);
    updatevalue();

  }, []);
  useEffect(() => {
    setdetails({
      date: data.date,
      email: data.email,
      slot1: data.slot1,
      slot2: data.slot2,
      slot3: data.slot3,
      slot4: data.slot4,
      docname: data.docname,
      slot: data.slot,
      slotnumber: data.slotnumber,
      patientname: "",
      patientemail: decode.oldUser.email,
      phonenumber: "",
      gender: ""
    });
  }, [data])



  const handleInput = (e) => {
    setdetails({ ...docandpatientappointementdetails, [e.target.name]: e.target.value });
  }

  const submit = async (e) => {


    if (docandpatientappointementdetails.patientname == "" || docandpatientappointementdetails.patientemail == "" || docandpatientappointementdetails.phonenumber == "" || docandpatientappointementdetails.gender == "") {
    }
    else {
      e.preventDefault();
      await axios.post(`${process.env.REACT_APP_BASE_URL}/addappoinfo`, docandpatientappointementdetails).then((res) => {
        if (res.data.message === "error") {
          //console.log(res.data.docinfo);
          // navigate("/card", { state: { docinfo: res.data.docinfo } });
          toast.error("Someting Went Wrong");
        }
        else if (res.data.message === "done") {
          toast.success("Appointment request has sent to your selected doctor");
          toast.info("keep checking your profile");
          axios.post(`${process.env.REACT_APP_BASE_URL}/afterappobook`, docandpatientappointementdetails);

          modal.style.display = "block";
          start.style.filter = "blur(5px)";
          // document.getElementById("buton").setAttribute("data-bs-toggle", "model");
          // document.getElementById("buton").setAttribute("data-bs-target", "#exampleModal");

        }

      });
    }


  }
  window.onclick = function (event) {

    if (event.target == modal) {
      modal.style.display = "none";
      start.style.filter = "blur(0px)";
      navigate('/index');
    }
  }






  return (

    <div >
      {loader ? (
        <>
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary " role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        </>
      ) : (<>
        <div id="start">
          <Header />
          <div class="container-fluid bg-primary bg-appointment mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ marginTop: "50px" }} >
            <div class="container">
              <div class="row gx-5">
                <div class="col-lg-6 py-5">
                  <div class="py-5">
                    <h1 class="display-5 text-black mb-4">We Are A Certified!! You Can Trust</h1>
                    <h4 class="text-black mb-0">Dr Name : Dr.{docinfo[0].fullname}</h4>
                    <h4 class="text-black mb-0">Dr Speciality : {docinfo[0].specialty}</h4>
                    <h4 class="text-black mb-0">Dr Email : {docinfo[0].email}</h4>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                    <h1 class="text-black mb-4" style={{ color: "black" }}>Make Appointment</h1>
                    <form>
                      <div class="row g-3">



                        {/* <div class="col-12 col-sm-6">
                      <input id="placeholdercolor" class="form-control bg-light border-0" disabled style={{ height: "55px" }}></input>
                    </div> */}
                        <div class="col-12 col-sm-6">
                          <input name="patientname" onChange={e => handleInput(e)} type="text" class="form-control bg-light border-0" placeholder="Your Name" style={{ height: "55px" }} required />
                        </div>
                        <div class="col-12 col-sm-6">
                          <input disabled name="patientemail" value={tokendata.oldUser.email} onChange={e => handleInput(e)} type="email" class="form-control bg-light border-0" placeholder={tokendata.oldUser.email} style={{ height: "55px" }} required />
                        </div>
                        <div class="col-12 col-sm-6">
                          <input name="phonenumber" onChange={e => handleInput(e)} type="text" class="form-control bg-light border-0" placeholder="Phone Number" style={{ height: "55px" }} required />
                        </div>
                        <div class="col-12 col-sm-6">
                          <select name="gender" onChange={e => handleInput(e)} class="form-select bg-light border-0" style={{ height: "55px" }} required >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>


                        <div class="col-12 col-sm-6">
                          <label>: Your Appointment date : </label>
                          <input name="phonenumber" disabled type="text" class="form-control bg-light border-0" placeholder={docandpatientappointementdetails.date}
                            value={docandpatientappointementdetails.date} style={{ height: "55px" }} />
                        </div>
                        <div class="col-12 col-sm-6">
                          <label>: Your Appointment Time : </label>
                          <input name="phonenumber" type="text" class="form-control bg-light border-0" value={docandpatientappointementdetails.slot} placeholder="Phone Number" style={{ height: "55px" }} />
                        </div>
                        <div class="col-12">
                          <button id="buton" onClick={submit} class="btn btn-dark w-100 py-3" type="button">Make Appointment</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <ToastContainer />
        </div>
        <div id="myModal" class="modal">
          <div id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Your Selection</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p>
                      We will send you a mail when doctor will confirm your appointment
                    </p>
                  </div>
                  <div class="modal-footer">
                    <a class="btn badge badge-sm btn-primary" href='/index'>Home</a>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </>)}
    </div>
  )
}


export default Appointmentbooking