import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import SendIcon from '@material-ui/icons/Send';
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "../App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/img/01.png';


const socket = io.connect(`${process.env.REACT_APP_VIDEOCALL_URL}`)
function Call() {
	const navigate = useNavigate();
	const appointmentdata = JSON.parse(localStorage.getItem('appointmentdata'));
	const [me, setMe] = useState("")
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState("")
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef();
	var [loader, setloader] = useState(false);
	const [state, setstate] = useState(false);
	const [senstatus, setsendstatus] = useState(false);
	const [restate, setrestate] = useState(false);
	const token = localStorage.getItem('doctortoken');
	const decode = decodeToken(token);
	const isexpire = isExpired(token);
	var [loader, setloader] = useState(false);
	var once = useRef(true);
	const sendmail = async (e, id) => {
		var data = { patientemail: appointmentdata.patientemail, patientname: appointmentdata.patientname, callid: id }
		const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/sendvideocallid`, data);
		// console.log(res);
		if (res.data.message == "ok") {
			setrestate(true);
			setsendstatus(true);
		}
	};

	useEffect(() => {
		if (once.current) {
			if (!token) {
				setloader(true);
				toast.error("Login first");
				once.current = false;
			}
			else {

				if (isexpire) {
					setloader(true);
					toast.error("Session expire login again");
					once.current = false;
				}
				else if (decode.role != "doctor") {
					setloader(true);
					toast.error("You have to login with patient");
					once.current = false;
				}
				else if (!appointmentdata) {
					navigate("/doctordash");
					window.location.reload();
				}
			}
		}
		const myav = document.getElementById("myav");


		socket.current = io.connect(`${process.env.REACT_APP_VIDEOCALL_URL}`);
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {

			myav.srcObject = stream;
			setStream(stream);
			console.log(stream);
			myVideo.current.srcObject = stream
			console.log(stream);


		}).catch(console.error);

		socket.on("me", (id) => {
			setMe(id);
			console.log(id);
		})

		socket.on("callUser", (data) => {
			// console.log(data);
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
		socket.on("endfrompatient", (data) => {
			if (data.callend == true) {
				setstate(data.callend);
				setCallEnded(true);
				connectionRef.current.destroy();
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			}
		});
	}, []);

	useEffect(() => {
		if (state == true) {
			toast.info("Call end from Patient");
		}
	}, [state])
	useEffect(() => {
		if (restate == true) {
			toast.info("Videocall Id is sent to patient mail");
		}
	}, [restate])


	// const callUser = (id) => {
	// const peer = new Peer({
	// 	initiator: true,
	// 	trickle: false,
	// 	stream: stream
	// })
	// peer.on("signal", (data) => {
	// 	socket.emit("callUser", {
	// 		userToCall: id,
	// 		signalData: data,
	// 		from: me,
	// 		name: name
	// 	})
	// 	console.log("call user data", data);
	// })
	// peer.on("stream", (stream) => {

	// 	userVideo.current.srcObject = stream

	// })
	// socket.on("callAccepted", (signal) => {
	// 	setCallAccepted(true)
	// 	peer.signal(signal)
	// })
	// 	socket.on("callEnded", () => {
	// 		setCallEnded(true);
	// 		connectionRef.current.destroy();
	// 		window.location.reload();
	// 	});


	// 	connectionRef.current = peer
	// }

	const answerCall = () => {
		setCallAccepted(true)
		setsendstatus(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {

			socket.emit("answerCall", { signal: data, to: caller });
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
			console.log(userVideo);
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		console.log("leavecall called");
		socket.emit("doctordisconnect", { callend: true, to: caller });
		setCallEnded(true)
		setsendstatus(false);
		connectionRef.current.destroy();
		setTimeout(() => {
			window.location.reload();
		}, 3000)
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
							<ul class="text-center">
								<img src={img1} class="logo" />
								<br></br>
								<hr></hr>
								<a href="/doctordash"><li><img src="https://e7.pngegg.com/pngimages/703/597/png-clipart-logo-house-home-house-angle-building.png" class="active" /></li></a>
								{/* <li><img src="https://i.postimg.cc/JnggC78Q/video.png" /></li>
								<li><img src="https://i.postimg.cc/vmb3JgVy/message.png" /></li>
								<li><img src="https://i.postimg.cc/qR7Q7PwZ/notification.png" /></li>
								<li><img src="https://i.postimg.cc/k4DZH604/users.png" /></li>
								<li><img src="https://i.postimg.cc/v84Fqkyz/setting.png" /></li> */}
							</ul>
						</div>
						<div class="container-p">
							<div class="top-icons-p">
							</div>
							<div>
								{receivingCall && !callAccepted ? (
									<div className="caller">
										<h1 >{name} is calling...</h1>
										<Button variant="contained" color="primary" onClick={answerCall}>
											Answer
										</Button>
									</div>
								) : null}
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
											{stream && <video playsInline id="myav" muted autoPlay class="ratio ratio-16x9" />}
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
										{

											callAccepted && !callEnded ? <h6>Patient Name: {name}</h6> : null
										}
										<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
											<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
												Copy ID
											</Button>
										</CopyToClipboard>
										<br></br>
										{
											!senstatus ? (
												<>
													<Button onClick={(e) => sendmail(e, me)} variant="contained" color="primary" startIcon={<SendIcon fontSize="large" />}>
														Send Id To Patient
													</Button>
												</>
											) : null
										}

									</div>

								</div>

							</div>
						</div>
					</div>
					<ToastContainer />
				</>)}
			</div>
		</>
	)
}

export default Call
