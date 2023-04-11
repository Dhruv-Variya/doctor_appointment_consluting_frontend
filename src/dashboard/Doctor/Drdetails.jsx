import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isExpired, decodeToken } from "react-jwt";

function Drdetails() {
    var [docdata, setdocdata] = useState({});
    var [loader, setloader] = useState(true);
    const [changedetails, setchangedetails] = useState({ fullname: "", email: "", phonenumber: "", slot1time: "", slot2time: "", slot3time: "", slot4time: "" })
    const { fullname, phonenumber, email, slot1time, slot2time, slot3time, slot4time } = changedetails;
    var data;
    const fetch = async () => {
        const token = localStorage.getItem('doctortoken');
        const myDecodedToken = decodeToken(token);
        data = myDecodedToken.user;
        // setdocdata(data);
        await axios.post(`${process.env.REACT_APP_BASE_URL}/finddocemail`, myDecodedToken.user).then((res) => {
            setdocdata(res.data.docinfo);
            var fetchdata = res.data.docinfo;
            setchangedetails({
                fullname: fetchdata[0].fullname,
                email: fetchdata[0].email,
                phonenumber: fetchdata[0].phonenumber,
                slot1time: fetchdata[0].slot1time,
                slot2time: fetchdata[0].slot2time,
                slot3time: fetchdata[0].slot3time,
                slot4time: fetchdata[0].slot4time,

            })
        })
    }

    useEffect(() => {
        fetch();
        setTimeout(() => {
            setloader(false);
        }, 2000)


    }, []);

    const handleinput = (e) => {
        setchangedetails({ ...changedetails, [e.target.name]: e.target.value });
    }
    const savechanges = async (e) => {
        if (changedetails.slot1time == changedetails.slot2time && changedetails.slot1time == changedetails.slot3time && changedetails.slot1time == changedetails.slot4time) {
            toast.error("All slots are must different from each other");
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/changes`, changedetails).then((res) => {
            if (res.data.message == "ok") {
                toast.success("Updates successfully");
                setTimeout(() => {
                    window.location.reload()
                }, 1100);

            }
            if (res.data.message == "err") {
                toast.error("Sometinr went wrong");
            }
        })
    }



    return (
        <div>
            {loader ? (
                <>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary " role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <div class="container-fluid py-4">
                        <div class="row">
                            <div class="col-12">
                                <div class="container">
                                    <div class="main-body">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="d-flex flex-column align-items-center text-center">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110" />
                                                            <div class="mt-3">
                                                                <h4 class="text-uppercase">{docdata[0].fullname}</h4>
                                                                <p class="text-secondary mb-1">{docdata[0].email}</p>
                                                                {/* <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                                                                <button class="btn btn-primary">Follow</button>
                                                                <button class="btn btn-outline-primary">Message</button>
                                                            </div>
                                                        </div>
                                                        <hr class="my-4" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Dr.Name</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input onChange={(e) => handleinput(e)} name='fullname' value={docdata[0].fullname} type="text" class="form-control" />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Email</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input onChange={(e) => handleinput(e)} name='email' value={docdata[0].email} type="text" class="form-control" />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Phone</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input onChange={(e) => handleinput(e)} name='phonenumber' value={docdata[0].phonenumber} type="text" class="form-control" />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Slot1</h6>
                                                            </div>
                                                            <div class="col-sm-3 text-secondary">
                                                                <select onChange={e => handleinput(e)} name="slot1time" class="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot1time}>Curr. {docdata[0].slot1time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Slot2</h6>
                                                            </div>
                                                            <div class="col-sm-3 text-secondary">
                                                                <select onChange={e => handleinput(e)} name="slot2time" class="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot2time}>Curr. {docdata[0].slot2time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Slot3</h6>
                                                            </div>
                                                            <div class="col-sm-3 text-secondary">

                                                                <select onChange={e => handleinput(e)} name="slot3time" class="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot3time}>Curr. {docdata[0].slot3time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Slot4</h6>
                                                            </div>
                                                            <div class="col-sm-3 text-secondary">

                                                                <select onChange={e => handleinput(e)} name="slot4time" class="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot4time}>Curr. {docdata[0].slot4time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        {/* <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Mobile</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" class="form-control" value="(320) 380-4539" />
                                                            </div>
                                                        </div> */}
                                                        {/* <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Address</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" class="form-control" value="Bay Area, San Francisco, CA" />
                                                            </div>
                                                        </div> */}
                                                        <div class="row">
                                                            <div class="col-sm-3"></div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <button onClick={(e) => savechanges(e)} class="btn btn-primary">Save Changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </>)}
        </div>
    )
}

export default Drdetails