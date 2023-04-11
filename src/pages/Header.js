import React from 'react'
import img1 from '../assets/img/images.png';

function Header() {
    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-lg shadow navbar-light" id="patient_nav">
                    <div class="container">
                        <button class="navbar-toggler navbar-left collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content">
                            <div class="hamburger-toggle">
                                <div class="hamburger">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </button>
                        <a class="navbar-brand" href="index.php"><img src={img1} class="img-fluid" alt="India’s best doctor healthcare app solution provider" style={{ height: "50px", weight: "50px" }} /></a>
                        <div class="collapse navbar-collapse" id="navbar-content">
                            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" href="/index" >Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/patientdashboard">Profile</a>
                                </li>
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="/VideoCall">Videocall</a>
                                </li> */}
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="#specialties">Specialties</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#faq">FAQ</a>
                                </li> */}
                                <li class="nav-item">
                                    <a class="nav-link msp_5 position-absolute top-11 end-10" style={{ backgroundColor: "blue", }} href="/docreg">I'm Doctor</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default Header