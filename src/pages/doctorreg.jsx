import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Header_doc from './header_doc';
import Footer from './Footer';

const Doctorreg = () => {
  const [loader, setloder] = useState(false);
  //let filedetails:{email:"",file:""}
  const [docdetails, setdetails] = useState({
    fullname: "", phonenumber: "", email: "", password: "", specialty: "", filedoc: { name: "", size: "", type: "" },
  })
  const { fullname, phonenumber, email, password, specialty, filedoc } = docdetails;
  const handleInput = (e) => {
    setdetails({ ...docdetails, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  function navigator() {

    navigate('/docreg', { replace: true });
  }
  const [file, setfile] = useState();
  const handleFile = (e) => {
    setfile(e.target.files[0]);


  }
  const submit = async e => {
    if (docdetails.fullname == "" || docdetails.email == "" || docdetails.phonenumber == "" || docdetails.password == "") {
      toast.error("Fill up details !");
    }
    else {
      setloder(true);
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("docfile", file);
      filedoc.name = file.name;
      filedoc.size = file.size;
      filedoc.type = file.type;
      axios.post(`${process.env.REACT_APP_BASE_URL}/check`, docdetails).then((res) => {
        if (res.data.message === "Exists") {
          setloder(false);
          toast.error("User already exist on this email");
        }
        if (res.data.message === "ok") {
          axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(async (res) => {
            if (res.data.message === "only pdf file are allowed") {
              setloder(false);
              toast.error("only pdf file are allowed");
            }
            if (res.data.message === "okk") {
              await axios.post(`${process.env.REACT_APP_BASE_URL}/docreg`, docdetails).then((res) => {
                //console.log(res);
                if (res.data.message === "ok") {
                  toast.success("registration Successful");
                  setloder(false);
                  axios.post(`${process.env.REACT_APP_BASE_URL}/afterdocreg`, docdetails).then((res) => {
                    toast.success("check email");
                  })

                  setTimeout(() => {
                    navigate("/doclogin");
                  }, 2000);


                }
                if (res.data.message === "error") {
                  toast.error("Something went wrong");
                }



              });
            }
          });

        }
      })


    }

  }
  const styles = {
    imageabc: {
      height: "100%",
      backgroundImage: `url(${"5.jpg"})`,
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
    border: `3px `,
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    zIndex: `2`,
    width: `100%`,
    padding: `0px`,

  }
  const bdloder = {
    color: `white`,
    fontWeight: `bold`,
    border: `3px `,
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    zIndex: `2`,
    width: `100%`,
    padding: `0px`,

  }




  return (
    <>
      <div style={styles.imageabc}></div>
      <div>
        {loader ? (
          <>
            <div style={bdloder}>
              <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary " role="status">
                  <span class="sr-only"></span>
                </div>
                <br></br>
                <h4>Please Wait...</h4>
              </div>
            </div>
          </>
        ) : (<>

          <div style={bdcontent}>
            <section class="home-banner">

              <div class="container">
                <div class="row">
                  <div class=" col-4  d-flex align-items-center">
                    <div class="banner_title" data-animation="fadeInLeft" animation-delay="2s" data-delay="0.3s">
                      <h1>Medicines cure diseases,<br /><span>But only Doctor can cure patient</span></h1>
                      <p class="py-3">Establish your clinic virtually and grow it.
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
                                <label for="mce-EMAIL" class="mb-1 mt-3">Password *<span
                                  class="asterisk"></span></label>
                                <input type="password" name="password" value={password} onChange={(e) => handleInput(e)} class="email form-control"
                                  id="mce-EMAIL" required="true" />
                              </div>

                              <div class="mc-field-group mb-5">
                                <label for="mce-MMERGE2" class="mb-1 mt-3">Specialty </label>
                                <select name="specialty" value={specialty} onChange={(e) => handleInput(e)} class="form-select form-control" id="mce-MMERGE2">
                                  <option value="">Select Specialty</option>
                                  <option value="Gynecology">Gynecology</option>
                                  <option value="Dermatology">Dermatology</option>
                                  <option value="Pediatrician">Pediatrician</option>
                                  <option value="Orthopedic">Orthopedic</option>
                                  <option value="Ayurveda">Ayurveda</option>
                                  <option value="Homeopathy">Homeopathy</option>
                                  <option value="Nephrologist">Nephrologist</option>
                                  <option value="Urologist">Urologist</option>
                                  <option value="Neurologist">Neurologist</option>
                                  <option value="Dentist">Dentist</option>
                                  <option value="Ophthalmology">Ophthalmology</option>
                                  <option value="Cardiologist">Cardiologist</option>
                                  <option value="Oncologist">Oncologist</option>
                                  <option value="Pulmonologist">Pulmonologist</option>
                                  <option value="Psychiatrist">Psychiatrist</option>
                                  <option value="Neurologist">Neurologist</option>
                                  <option value="Radiologist">Radiologist</option>
                                </select>
                              </div>
                              <div class="mc-field-group form-group">
                                <label for="mce-EMAIL" class="mb-1 mt-3">upload file<span
                                  class="asterisk"></span></label>
                                <input type="file" name="docfile" onChange={(e) => handleFile(e)} class="email form-control"
                                  id="mce-EMAIL" required="true" />
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
                                </div>
                                <div class=" col-3 optionalParent">
                                  <div class="clear foot pt-4 pl-10 ">
                                    <Link class="button btn btn-primary bt " style={{ textDecoration: "none" }} to="/">Home</Link>
                                  </div>
                                </div>
                                <div class=" col-5 optionalParent">
                                  <div class="clear foot pt-4 pl-10 ">
                                    <Link class="button btn btn-info bt " style={{ textDecoration: "none" }} to="/patientlogin">I'm Patient !!</Link>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </form>
                          <Link style={{ textDecoration: "none" }} to="/doclogin">Already have an account?</Link>
                        </div>


                      </div>
                    </div>
                  </div>


                </div>



              </div>


            </section >


          </div >
        </>)}
        <ToastContainer />
      </div>
    </>





  )
}

export default Doctorreg