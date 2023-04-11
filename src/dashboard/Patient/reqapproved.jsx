import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isExpired, decodeToken } from "react-jwt";

function Reqapproved() {
    var [patient, setpatient] = useState([]);
    const fetchdoctor = async () => {
        const token = localStorage.getItem('patienttoken');
        const myDecodedToken = decodeToken(token);
        var obj = { email: myDecodedToken.oldUser.email }
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/findapprovedappointmentofpatient`, myDecodedToken.oldUser);
        const patientappo = await res.data.patientinfo
        setpatient(patientappo);

    };
    useEffect(() => {
        fetchdoctor();
    }, []);
    return (
        <div>
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card my-4">
                            < div class="container-fluid py-4" >
                                <div class="row">
                                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                        <div class="card">
                                            <div class="card-header p-3 pt-2">
                                                <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                                                    <i class="material-icons opacity-10">person</i>
                                                </div>
                                                <div class="text-end pt-1">
                                                    <p class="text-sm mb-0 text-capitalize">Approved Appointment</p>
                                                    <h4 class="mb-0">{patient.length}</h4>
                                                </div>
                                            </div>
                                            <hr class="dark horizontal my-0" />

                                        </div>
                                    </div>

                                </div>



                            </div >
                            <div class="container-fluid py-4">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card my-4">
                                            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                                    <h6 class="text-white text-capitalize ps-3">My Approved requestes</h6>
                                                </div>
                                            </div>
                                            <div class="card-body px-0 pb-2">
                                                <div class="table-responsive p-0">
                                                    <table class="table align-items-center mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">DoctorName</th>
                                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">PatientName</th>
                                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">P. Mobilenumber</th>
                                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date</th>
                                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Time</th>
                                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                patient.map(patient => (
                                                                    <>
                                                                        <tr >
                                                                            <td>
                                                                                <div class="d-flex px-2 py-1">
                                                                                    <div class="d-flex flex-column justify-content-center">
                                                                                        <h6 class="mb-0 text-sm">{patient.docname}</h6>
                                                                                        <p class="text-xs text-secondary mb-0">{patient.email}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div class="d-flex px-2 py-1">
                                                                                    <div class="d-flex flex-column justify-content-center">
                                                                                        <h6 class="mb-0 text-sm">{patient.patientname}</h6>
                                                                                        <p class="text-xs text-secondary mb-0">{patient.patientemail}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h6 class=" text-sm font-weight-bold mb-0" style={{ fontSize: "20px" }}>{patient.phonenumber}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <h6 class=" text-sm font-weight-bold mb-0" style={{ fontSize: "20px" }}>{patient.date}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <h6 class=" text-sm font-weight-bold mb-0" style={{ fontSize: "20px" }}>{patient.slot}</h6>
                                                                            </td>
                                                                            <td class="align-middle text-center text-sm">
                                                                                <span class="badge badge-sm bg-gradient-success">{patient.appointmentstatus}</span>
                                                                            </td>

                                                                        </tr>
                                                                    </>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
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
    )
}

export default Reqapproved