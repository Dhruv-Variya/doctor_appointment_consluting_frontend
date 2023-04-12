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
import ringingaudio from "../assets/img/ringing.mp3"

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
	var ringavd = useRef();
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
		ringavd.current = ringingaudio
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

		socket.current = io.connect(`${process.env.REACT_APP_VIDEOCALL_URL}`);
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {


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
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
			socket.emit("sendringing", (data));
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
		socket.on("misscall", (data) => {
			if (data.callend == true) {
				window.location.reload();
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

	const answerCall = () => {
		ringavd.current = null;
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
		if (callAccepted) {
			socket.emit("doctordisconnect", { callend: true, to: caller });
			setCallEnded(true)
			setsendstatus(false);
			connectionRef.current.destroy();
			setTimeout(() => {
				window.location.reload();
			}, 3000)
		}
		else {
			console.log("else called");
			socket.emit("doctorbusy", { busy: true, to: caller });
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
								<a href="/doclogin" class="btn btn-primary">Login</a>
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

							</ul>
						</div>
						<div class="container-p">
							<div class="top-icons-p">
							</div>
							<div>
								{receivingCall && !callAccepted ? (
									<>
										<div className="caller">
											<h1 class="text-white" >{name} is calling...</h1>
											<Button variant="contained" color="primary" onClick={answerCall}>
												Answer
											</Button>
										</div>
										<audio id="audio" ref={ringavd} autoPlay hidden loop>

											<source src={ringingaudio
											} type="audio/mpeg" />
											Your browser does not support the audio element.
										</audio>
									</>

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
									{receivingCall ? (
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
											<video playsInline muted ref={myVideo} autoPlay class="ratio ratio-16x9" />
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
