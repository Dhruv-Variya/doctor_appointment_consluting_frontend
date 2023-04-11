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


const socket = io.connect('http://localhost:8001')
function Testvideocall() {
}

export default Testvideocall

// patient......

// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
// import React, { useEffect, useRef, useState } from "react"
// import { CopyToClipboard } from "react-copy-to-clipboard"
// import Peer from "simple-peer"
// import io from "socket.io-client"
// import "../App.css"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { isExpired, decodeToken } from "react-jwt";


// const socket = io.connect('http://localhost:8001')
// function PatientCall() {
//     const [me, setMe] = useState("")
//     const [stream, setStream] = useState()
//     const [receivingCall, setReceivingCall] = useState(false)
//     const [caller, setCaller] = useState("")
//     const [callerSignal, setCallerSignal] = useState()
//     const [callAccepted, setCallAccepted] = useState(false)
//     const [idToCall, setIdToCall] = useState("")
//     const [callEnded, setCallEnded] = useState(false);
//     const [state, setstate] = useState(false);
//     const [name, setName] = useState("")
//     const myVideo = useRef()
//     const userVideo = useRef()
//     const connectionRef = useRef()

//     useEffect(() => {
//         const token = localStorage.getItem('patienttoken');
//         const myDecodedToken = decodeToken(token);
//         // console.log(myDecodedToken.oldUser);
//         setName(myDecodedToken.oldUser.fullname);
//         socket.current = io.connect("http://localhost:8001/");
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//             setStream(stream);
//             myVideo.current.srcObject = stream
//         })

//         socket.on("me", (id) => {
//             setMe(id);
//         })

//         socket.on("callUser", (data) => {
//             console.log(data);
//             setReceivingCall(true)
//             setCaller(data.from)
//             setName(data.name)
//             setCallerSignal(data.signal)
//         })
//         socket.on("endfromdoctor", (data) => {
//             console.log("from server");
//             if (data.callend == true) {
//                 setstate(data.callend);
//                 socket.close();
//                 connectionRef.current.destroy();
//                 setCallEnded(true);
//                 setTimeout(() => {
//                     window.location.reload();
//                 }, 3000);
//             }
//         });

//     }, []);
//     useEffect(() => {
//         if (state == true) {
//             toast.info("Call end from Doctor");
//         }
//     }, [state])

//     const callUser = (id) => {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false,
//             stream: stream
//         })
//         peer.on("signal", (data) => {
//             socket.emit("callUser", {
//                 userToCall: id,
//                 signalData: data,
//                 from: me,
//                 name: name
//             })
//             console.log("call user data", data);
//         })
//         peer.on("stream", (stream) => {

//             userVideo.current.srcObject = stream

//         })
//         socket.on("callAccepted", (signal) => {
//             setCallAccepted(true)
//             peer.signal(signal)
//         })
//         socket.on("callEnded", () => {

//             setCallEnded(true);
//             connectionRef.current.destroy();
//             window.location.reload();
//         })

//         connectionRef.current = peer
//     }

//     // const answerCall = () => {
//     //     setCallAccepted(true)
//     //     const peer = new Peer({
//     //         initiator: false,
//     //         trickle: false,
//     //         stream: stream
//     //     })
//     //     peer.on("signal", (data) => {
//     //         socket.emit("answerCall", { signal: data, to: caller });
//     //     })
//     //     peer.on("stream", (stream) => {
//     //         userVideo.current.srcObject = stream
//     //     })

//     //     peer.signal(callerSignal)
//     //     connectionRef.current = peer
//     // }

//     const leaveCall = () => {
//         socket.emit("patientdisconnect", { callend: true, userTocall: idToCall });
//         setCallEnded(true);
//         connectionRef.current.destroy();
//         setTimeout(() => {
//             window.location.reload();
//         }, 1000)
//     }


//     return (
//         <>
//             <h1 style={{ textAlign: "center", color: "black" }}>Virtual Appoitment</h1>
//             <div className="container">
//                 {/* <div>
//                     {receivingCall && !callAccepted ? (
//                         <div className="caller">
//                             <h1 >{name} is calling...</h1>
//                             <Button variant="contained" color="primary" onClick={answerCall}>
//                                 Answer
//                             </Button>
//                         </div>
//                     ) : null}
//                 </div> */}
//                 <div className="video-container">
//                     <div className="video">
//                         {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "500px", margin: "5px" }} />}
//                     </div>
//                     <div className="video">
//                         {callAccepted && !callEnded ?
//                             <video playsInline ref={userVideo} autoPlay style={{ width: "500px", margin: "5px" }} /> :
//                             null}
//                     </div>
//                 </div>
//                 <div className="myId">
//                     <TextField
//                         id="filled-basic"
//                         label="Name"
//                         variant="filled"
//                         disabled
//                         value={name}

//                         style={{ marginBottom: "20px" }}
//                     />
//                     <TextField
//                         id="filled-basic"
//                         label="ID to call"
//                         variant="filled"
//                         value={idToCall}
//                         onChange={(e) => setIdToCall(e.target.value)}
//                     />
//                     <div className="call-button">
//                         {callAccepted && !callEnded ? (
//                             <Button variant="contained" color="secondary" onClick={leaveCall}>
//                                 End Call
//                             </Button>
//                         ) : (
//                             <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
//                                 <PhoneIcon fontSize="large" />
//                             </IconButton>
//                         )}
//                         {idToCall}
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     )
// }

// export default PatientCall


// Doctor....

// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import SendIcon from '@material-ui/icons/Send';
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
// import React, { useEffect, useRef, useState } from "react"
// import { CopyToClipboard } from "react-copy-to-clipboard"
// import Peer from "simple-peer"
// import io from "socket.io-client"
// import "../App.css"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { isExpired, decodeToken } from "react-jwt";


// const socket = io.connect('http://localhost:8001')
// function Call() {
// 	const appointmentdata = JSON.parse(localStorage.getItem('appointmentdata'));
// 	const [me, setMe] = useState("")
// 	const [stream, setStream] = useState()
// 	const [receivingCall, setReceivingCall] = useState(false)
// 	const [caller, setCaller] = useState("")
// 	const [callerSignal, setCallerSignal] = useState()
// 	const [callAccepted, setCallAccepted] = useState(false)
// 	const [idToCall, setIdToCall] = useState("")
// 	const [callEnded, setCallEnded] = useState(false)
// 	const [name, setName] = useState("")
// 	const myVideo = useRef()
// 	const userVideo = useRef()
// 	const connectionRef = useRef();
// 	var [loader, setloader] = useState(false);
// 	const [state, setstate] = useState(false);
// 	const [senstatus, setsendstatus] = useState(false);
// 	const [restate, setrestate] = useState(false);
// 	const sendmail = async (e, id) => {
// 		var data = { patientemail: appointmentdata.patientemail, patientname: appointmentdata.patientname, callid: id }
// 		const res = await axios.post("http://localhost:8080/sendvideocallid", data);
// 		// console.log(res);
// 		if (res.data.message == "ok") {
// 			setrestate(true);
// 			setsendstatus(true);
// 		}
// 	};

// 	useEffect(() => {
// 		socket.current = io.connect("http://localhost:8001/");
// 		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
// 			setStream(stream);
// 			myVideo.current.srcObject = stream
// 		})

// 		socket.on("me", (id) => {
// 			setMe(id);
// 			console.log(id);
// 		})

// 		socket.on("callUser", (data) => {
// 			// console.log(data);
// 			setReceivingCall(true)
// 			setCaller(data.from)
// 			setName(data.name)
// 			setCallerSignal(data.signal)
// 		})
// 		socket.on("endfrompatient", (data) => {
// 			if (data.callend == true) {
// 				setstate(data.callend);
// 				setCallEnded(true);
// 				connectionRef.current.destroy();
// 				setTimeout(() => {
// 					window.location.reload();
// 				}, 3000);
// 			}
// 		});
// 	}, []);

// 	useEffect(() => {
// 		if (state == true) {
// 			toast.info("Call end from Patient");
// 		}
// 	}, [state])
// 	useEffect(() => {
// 		if (restate == true) {
// 			toast.info("Videocall Id is sent to patient mail");
// 		}
// 	}, [restate])


// 	// const callUser = (id) => {
// 	// const peer = new Peer({
// 	// 	initiator: true,
// 	// 	trickle: false,
// 	// 	stream: stream
// 	// })
// 	// peer.on("signal", (data) => {
// 	// 	socket.emit("callUser", {
// 	// 		userToCall: id,
// 	// 		signalData: data,
// 	// 		from: me,
// 	// 		name: name
// 	// 	})
// 	// 	console.log("call user data", data);
// 	// })
// 	// peer.on("stream", (stream) => {

// 	// 	userVideo.current.srcObject = stream

// 	// })
// 	// socket.on("callAccepted", (signal) => {
// 	// 	setCallAccepted(true)
// 	// 	peer.signal(signal)
// 	// })
// 	// 	socket.on("callEnded", () => {
// 	// 		setCallEnded(true);
// 	// 		connectionRef.current.destroy();
// 	// 		window.location.reload();
// 	// 	});


// 	// 	connectionRef.current = peer
// 	// }

// 	const answerCall = () => {
// 		setCallAccepted(true)
// 		const peer = new Peer({
// 			initiator: false,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {

// 			socket.emit("answerCall", { signal: data, to: caller });
// 		})
// 		peer.on("stream", (stream) => {
// 			userVideo.current.srcObject = stream
// 		})

// 		peer.signal(callerSignal)
// 		connectionRef.current = peer
// 	}

// 	const leaveCall = () => {
// 		console.log("leavecall called");
// 		socket.emit("doctordisconnect", { callend: true, to: caller });
// 		setCallEnded(true)
// 		setsendstatus(false);
// 		connectionRef.current.destroy();
// 		setTimeout(() => {
// 			window.location.reload();
// 		}, 3000)
// 	}

// 	return (
// 		<>
// 			<div>
// 				{loader ? (
// 					<>
// 						<div class="d-flex justify-content-center">
// 							<div class="spinner-border text-primary " role="status">
// 								<span class="sr-only"></span>
// 							</div>
// 						</div>
// 					</>
// 				) : (<>
// 					<h1 style={{ textAlign: "center", color: "black" }}>Virtual Appoitment</h1>
// 					<div className="container">
// 						<div>
// 							{receivingCall && !callAccepted ? (
// 								<div className="caller">
// 									<h1 >{name} is calling...</h1>
// 									<Button variant="contained" color="primary" onClick={answerCall}>
// 										Answer
// 									</Button>
// 								</div>
// 							) : null}
// 						</div>
// 						<div className="video-container">
// 							<div className="video">
// 								{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "500px", margin: "5px" }} />}
// 							</div>
// 							<div className="video">
// 								{callAccepted && !callEnded ?
// 									<video playsInline ref={userVideo} autoPlay style={{ width: "500px", margin: "5px" }} /> :
// 									null}
// 							</div>
// 						</div>
// 						<div className="myId">
// 							{
// 								callAccepted && !callEnded ? <TextField
// 									id="filled-basic"
// 									label="Caller Name"
// 									variant="filled"
// 									value={name}
// 									onChange={(e) => setName(e.target.value)}
// 									style={{ marginBottom: "20px" }}
// 								/> : null
// 							}

// 							<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
// 								<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
// 									Copy ID
// 								</Button>
// 							</CopyToClipboard>
// 							{
// 								!senstatus ? (
// 									<>
// 										<Button onClick={(e) => sendmail(e, me)} variant="contained" color="primary" startIcon={<SendIcon fontSize="large" />}>
// 											Send Id To Patient
// 										</Button>
// 									</>
// 								) : null
// 							}

// 							<br></br>

// 							{/* <TextField
// 								id="filled-basic"
// 								label="ID to call"
// 								variant="filled"
// 								value={idToCall}
// 								onChange={(e) => setIdToCall(e.target.value)}
// 							/> */}
// 							<div className="call-button">
// 								{callAccepted && !callEnded ? (
// 									<Button variant="contained" color="secondary" onClick={leaveCall}>
// 										End Call
// 									</Button>
// 								) : null
// 									// ) : (
// 									// 	<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
// 									// 		<PhoneIcon fontSize="large" />
// 									// 	</IconButton>
// 									// )}
// 								}
// 								{idToCall}
// 							</div>
// 						</div>
// 					</div>
// 					<ToastContainer />
// 				</>)}
// 			</div>
// 		</>
// 	)
// }

// export default Call
