import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "../App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom"
import callingsound from "../assets/img/calling.mp3"
import busysound from "../assets/img/busy.mp3"
import noanswersound from "../assets/img/noanswer.mp3"


const socket = io.connect(`${process.env.REACT_APP_VIDEOCALL_URL}`)
function PatientCall() {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false);
    const [state, setstate] = useState(false);
    const [name, setName] = useState("")
    const myVideo = useRef(null)
    const userVideo = useRef()
    const connectionRef = useRef()
    var [loader, setloader] = useState(false);
    const token = localStorage.getItem('patienttoken');
    const myDecodedToken = decodeToken(token);
    const isexpire = isExpired(token);
    const navigate = useNavigate();
    const [calling, setcalling] = useState(false);
    const [ringing, setringing] = useState(false);
    const [connecting, setconnecting] = useState(false);
    const [callbtn, setcallbtn] = useState(false);
    const [busy, setbusy] = useState(false);
    const [noanswer, setnoanswer] = useState(false);
    const callavd = useRef();
    const busyavd = useRef();
    const noansweravd = useRef();

    useEffect(() => {
        callavd.current = callingsound;
        busyavd.current = busysound;
        noansweravd.current = noanswersound;
        if (!token) {
            navigate('/patientlogin');
            window.location.reload();
        }
        else {
            if (isexpire) {
                navigate('/patientlogin');
                window.location.reload();
            }
            else if (myDecodedToken.role != "patient") {
                navigate('/patientlogin');
                window.location.reload();

            }
        }
        if (token) {
            setName(myDecodedToken.oldUser.fullname);
        }


        socket.current = io.connect(`${process.env.REACT_APP_VIDEOCALL_URL}`);
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                console.log(stream);
                setStream(stream);
                myVideo.current.srcObject = stream;
            } catch (err) {
                console.log(err);
            }
        };
        getUserMedia();

        socket.on("me", (id) => {
            setMe(id);
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
        socket.on("sendcalling", () => {
            setconnecting(false);
            setcalling(false);
        })
        socket.on("ringing", () => {
            setcalling(false);
            setringing(true);
        })
        socket.on("endfromdoctor", (data) => {
            if (data.callend == true) {
                setstate(data.callend);
                socket.close();
                connectionRef.current.destroy();
                setCallEnded(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        });
        socket.on("doctorbusycut", (data) => {
            if (data.busy == true) {
                setringing(false);
                setbusy(data.busy);
                socket.close();
                connectionRef.current.destroy();
                setTimeout(() => {
                    window.location.reload();
                }, 13000);
            }
        });

    }, []);
    useEffect(() => {
        if (state == true) {
            toast.info("Call end from Doctor");
        }
    }, [state])

    const callUser = (id) => {
        setcallbtn(true);
        setconnecting(true);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream
        })
        socket.on("callAccepted", (signal) => {
            setringing(false);
            setCallAccepted(true)
            peer.signal(signal)
        })
        socket.on("callEnded", () => {
            setCallEnded(true);
            connectionRef.current.destroy();
            window.location.reload();
        })

        connectionRef.current = peer
    }

    const leaveCall = () => {
        if (callAccepted) {
            socket.emit("patientdisconnect", { callend: true, userTocall: idToCall });
            setCallEnded(true);
            connectionRef.current.destroy();
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
        else {
            socket.emit("patientmisscalled", { misscall: true, userTocall: idToCall })
            window.location.reload();
        }
    }

    return (
        <>
            <div>
                {loader ? (
                    <>
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
                    <div class="header-p">

                        <div class="container-v">
                            <ul>
                                <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" class="logo" />
                                <br></br>
                                <hr></hr>
                                <a href="/index"><li><img src="https://e7.pngegg.com/pngimages/703/597/png-clipart-logo-house-home-house-angle-building.png" class="active" /></li></a>

                            </ul>
                        </div>
                        <div class="container-p">
                            <div class="top-icons-p">
                            </div>
                            <div>
                                {connecting ? (
                                    <div className="caller">
                                        <h1 >Conneting to ID : {idToCall}...</h1>
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {calling && !ringing ? (
                                    <>
                                        <div className="caller">
                                            <h1 >Calling...</h1>
                                        </div>

                                        <audio id="audio" ref={callavd} autoPlay hidden loop>

                                            <source src={callingsound} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </>
                                ) : null}
                            </div>
                            <div>
                                {ringing && !calling ? (
                                    <>
                                        <div className="caller">
                                            <h3 class="text-white" >Ringing...</h3>
                                        </div>
                                        <audio id="audio" ref={callavd} autoPlay hidden loop>

                                            <source src={callingsound} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </>
                                ) : null}
                            </div>
                            <div>
                                {busy ? (
                                    <>
                                        <div className="caller">
                                            <h1 >Busy...</h1>
                                        </div>
                                        <audio ref={busyavd} autoPlay hidden loop>

                                            <source src={busysound} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </>
                                ) : null}
                            </div>
                            <div>
                                {noanswer ? (
                                    <>
                                        <div className="caller">
                                            <h1 >Not answering...</h1>
                                        </div>
                                        <audio ref={noansweravd} autoPlay hidden loop>

                                            <source src={noanswersound} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </>
                                ) : null}
                            </div>
                            <div class="row-p">
                                <div class="col-1-p ">


                                    {callAccepted && !callEnded ? (<>
                                        <video playsInline ref={userVideo} autoPlay class="host-img-p" />
                                    </>) :
                                        <img src="https://i.postimg.cc/521rVkhD/image.png" class="ratio ratio-16x9" />}
                                    {callbtn ? (
                                        <>
                                            <div class="contarols-p">
                                                <button class="btn bg-transparent" onClick={leaveCall}><img src="https://i.postimg.cc/fyJH8G00/call.png" class="call-icon-p" /></button>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                                <div class="col-2-p">
                                    <div class="joined-p">
                                        <p class="text-warning">My video</p>

                                        <div>
                                            <video ref={myVideo} muted autoPlay class="ratio ratio-16x9" />

                                        </div>

                                    </div>
                                    <div class="invite-p">
                                        <h4>Call Doctor</h4>
                                        {!callAccepted && !callEnded ? (<>
                                            <div>
                                                <TextField
                                                    id="filled-basic"
                                                    label="ID to call"
                                                    variant="filled"
                                                    color="primary"
                                                    value={idToCall}
                                                    onChange={(e) => setIdToCall(e.target.value)}
                                                />
                                                <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                                    <PhoneIcon fontSize="large" />
                                                </IconButton>
                                            </div>
                                        </>) : (<>
                                            <p>Call Id : {idToCall} </p>
                                        </>)}

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </>)}
                <ToastContainer />
            </div>

        </>
    )
}

export default PatientCall
