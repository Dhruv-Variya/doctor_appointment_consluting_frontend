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

    useEffect(() => {
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

        const myav = document.getElementById("myav");
        socket.current = io.connect(`${process.env.REACT_APP_VIDEOCALL_URL}`);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            myav.srcObject = stream;
            setStream(stream);
            console.log(stream);
            myVideo.current.srcObject = stream;
            console.log(myVideo);



        })

        socket.on("me", (id) => {
            setMe(id);
        })

        socket.on("callUser", (data) => {
            console.log(data);
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
        socket.on("endfromdoctor", (data) => {
            console.log("from server");
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

    }, []);
    useEffect(() => {
        if (state == true) {
            toast.info("Call end from Doctor");
        }
    }, [state])

    const callUser = (id) => {
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
            console.log("call user data", data);
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream
            console.log(userVideo);

        })
        socket.on("callAccepted", (signal) => {
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

    // const answerCall = () => {
    //     setCallAccepted(true)
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     })
    //     peer.on("signal", (data) => {
    //         socket.emit("answerCall", { signal: data, to: caller });
    //     })
    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream
    //     })

    //     peer.signal(callerSignal)
    //     connectionRef.current = peer
    // }

    const leaveCall = () => {
        socket.emit("patientdisconnect", { callend: true, userTocall: idToCall });
        setCallEnded(true);
        connectionRef.current.destroy();
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    return (
        <>
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
                    <div class="header-p">

                        <div class="container-v">
                            <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" class="logo" />
                            <hr></hr>
                            <ul>
                                {/* <li><img src="https://i.postimg.cc/L8zxQBhv/live.png" class="active" /></li>
                                <li><img src="https://i.postimg.cc/JnggC78Q/video.png" /></li>
                                <li><img src="https://i.postimg.cc/vmb3JgVy/message.png" /></li>
                                <li><img src="https://i.postimg.cc/qR7Q7PwZ/notification.png" /></li>
                                <li><img src="https://i.postimg.cc/k4DZH604/users.png" /></li>
                                <li><img src="https://i.postimg.cc/v84Fqkyz/setting.png" /></li> */}
                            </ul>
                        </div>
                        <div class="container-p">
                            <div class="top-icons-p">
                            </div>
                            <div class="row-p">
                                <div class="col-1-p ">


                                    {callAccepted && !callEnded ? (<>
                                        <video playsInline ref={userVideo} autoPlay class="host-img-p" />
                                        <div class="contarols-p">
                                            <button class="btn bg-transparent" onClick={leaveCall}><img src="https://i.postimg.cc/fyJH8G00/call.png" class="call-icon-p" /></button>
                                        </div>
                                    </>) :
                                        <img src="https://i.postimg.cc/521rVkhD/image.png" class="ratio ratio-16x9" />}

                                </div>
                                <div class="col-2-p">
                                    <div class="joined-p">
                                        <p class="text-warning">My video</p>

                                        <div>
                                            {stream && <video id="myav" playsInline muted autoPlay class="ratio ratio-16x9" />}
                                            {/* <TextField
                                                id="filled-basic"
                                                label="ID to call"
                                                variant="filled"
                                                value={idToCall}
                                                onChange={(e) => setIdToCall(e.target.value)}
                                            /> */}
                                            {/* <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                                <PhoneIcon fontSize="large" />
                                            </IconButton> */}
                                            {/* <img src="https://i.postimg.cc/WzFnG0QG/people-1.png" />
                                            <img src="https://i.postimg.cc/fRhGbb92/people-2.png" />
                                            <img src="https://i.postimg.cc/02mgxSbK/people-3.png" />
                                            <img src="https://i.postimg.cc/K8rd3y7Z/people-4.png" />
                                            <img src="https://i.postimg.cc/HWFGfzsC/people-5.png" /> */}
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
