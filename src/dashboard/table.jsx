
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
    var docpdf = { docmail: "" };
    var docstatus = { doctormail: "" };
    var [doclist, setdoc] = useState([]);
    var [vdoclist, setvdoc] = useState([]);
    const fetchdoctor = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/get`);
        const docdata = await res.data.docdata
        //console.log(docdata);
        //console.log('doctors' >> docdata.fullname);
        setdoc(docdata);
        // console.log(docdata);
        const vdocdata = res.data.vdata;
        setvdoc(vdocdata);
        // console.log(vdocdata);
    };
    useEffect(() => {

        fetchdoctor();

    }, []);

    function getdocpdf(e) {
        console.log("getdoc");
        //setdocument({ ...docpdf, docmail: e.target.value });
        docpdf.docmail = e.target.value;
        console.log(docpdf);
        //setdocument(e);
        axios.post(`${process.env.REACT_APP_BASE_URL}/getpdf`, docpdf).then((res) => {
            if (res.data.message === "filenowread") {
                //window.location.href = "http://localhost:8080/readpdf";
                window.open(
                    `${process.env.REACT_APP_BASE_URL}/readpdf`,
                    '_blank' // <- This is what makes it open in a new window.
                );
            }

            // if (res) {
            //     axios.get("http://localhost:8080/readpdf");
            // }
        })
    }

    function Changedocstatus(e) {
        console.log("change doc");
        //setdocument({ ...docpdf, docmail: e.target.value });
        docstatus.doctormail = e.target.value;
        console.log(docstatus);
        //setdocument(e);
        axios.post(`${process.env.REACT_APP_BASE_URL}/changestatus`, docstatus).then((res) => {
            if (res.data.message === "doctor verified") {
                // console.log("if called");
                toast.success("doctor verified");
                axios.post(`${process.env.REACT_APP_BASE_URL}/afterdocverified`, docstatus).then((res) => {

                });
                window.location.reload(true);


            }
            if (res.data.message === "no user") {
                toast.error("no user found");
            }
        })




    }
    // function getdocpdf() {
    //     console.log("get mail called");
    //     console.log(docemail);
    // }




    return (
        <div>
            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card my-4">
                            < div class="container-fluid py-4" >
                                <div class="row">
                                    {/* <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                            <div class="card">
                                <div class="card-header p-3 pt-2">
                                    <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                        <i class="material-icons opacity-10">weekend</i>
                                    </div>
                                    <div class="text-end pt-1">
                                        <p class="text-sm mb-0 text-capitalize">Total Unverified Doctor</p>
                                        <h4 class="mb-0">{doclist.length}</h4>
                                    </div>
                                </div>
                                <hr class="dark horizontal my-0" />
                                <div class="card-footer p-3">
                                    <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+55% </span>than last week</p>
                                </div>
                            </div>
                        </div> */}
                                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                        <div class="card">
                                            <div class="card-header p-3 pt-2">
                                                <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                                                    <i class="material-icons opacity-10">person</i>
                                                </div>
                                                <div class="text-end pt-1">
                                                    <p class="text-sm mb-0 text-capitalize">#Verified Doctors   </p>
                                                    <h4 class="mb-0">{vdoclist.length}</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                        <div class="card">
                                            <div class="card-header p-3 pt-2">
                                                <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                                    <i class="material-icons opacity-10">person</i>
                                                </div>
                                                <div class="text-end pt-1">
                                                    <p class="text-sm mb-0 text-capitalize">#Unveridied Doctors</p>
                                                    <h4 class="mb-0">{doclist.length}</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>



                            </div >
                            <br></br>
                            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 class="text-white text-capitalize ps-3">Newly register Doctor</h6>
                                </div>
                            </div>
                            <div class="card-body px-0 pb-2">
                                <div class="table-responsive p-0">
                                    <table class="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Doc.Document</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Verified</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Delete</th>
                                                <th class="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                doclist.map(doc => (
                                                    <>
                                                        <tr >
                                                            <td>
                                                                <div class="d-flex px-2 py-1">
                                                                    <div>
                                                                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                                    </div>
                                                                    <div class="d-flex flex-column justify-content-center">
                                                                        <h6 class="mb-0 text-sm">{doc.fullname}</h6>
                                                                        <p class="text-xs text-secondary mb-0">{doc.email}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p class="text-xs font-weight-bold mb-0">{doc.specialty}</p>
                                                                <p class="text-xs text-secondary mb-0">Organization</p>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                <span class="badge badge-sm bg-gradient-secondary">{doc.role}</span>
                                                            </td>
                                                            <td class="align-middle text-center">
                                                                <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                                                            </td>
                                                            <td class="align-middle text-center text-sm">
                                                                {/* <a onClick={getdocpdf()} class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                    showpdf
                                                                </a> */}

                                                                {/* <span onClick={getdocpdf} class="badge badge-sm bg-gradient-secondary" value={doc.email}>show pdf</span> */}
                                                                <button onClick={getdocpdf} class="btn badge badge-sm btn-dark" type="button" value={doc.email}>show pdf</button>


                                                                {/* <div class="col-5">
                                                                    <button onClick={getdocpdf} class="btn btn-dark " type="button" value={doc.email}>show pdf</button>
                                                                </div> */}
                                                            </td>
                                                            <td class="align-middle text-center text-sm">


                                                                <button onClick={Changedocstatus} class="btn badge badge-sm btn-success" value={doc.email} type="button" >✔</button>


                                                            </td>
                                                            <td class="align-middle text-center text-sm">


                                                                <button onClick={Changedocstatus} class="btn badge badge-sm btn-danger" value={doc.email} type="button" >✘</button>


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
            <ToastContainer />
        </div>


    )
}

export default Table