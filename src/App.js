import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Doctorreg from './pages/doctorreg';
import Patientreg from './pages/patientreg';
import Appointmentbooking from './pages/appointmentbooking';
import Index from './pages/Index';
import Patientlogin from './pages/Patientlogin';
import Main from './dashboard/main';
import Card_doc from './pages/Card_doc';
import DateTimePicker from './pages/DateTimePicker';
import PatientDashboard from './dashboard/Patient/patientDashboard';
import Call from './pages/VideoCall';
import PatientCall from './pages/Patientvideocall';
import Verifierdashboard from './dashboard/VerifierDash/Verifierdashboard';
import DoctorDashboard from './dashboard/Doctor/doctorDashboard';



import Adminlogin from './pages/adminlogin';
import Verlogin from './pages/verifierlogin';
import Adminreg from './pages/adminreg';
import Admindash from './pages/admindash';
import Verifierreg from './pages/verifierreg';
import Doclogin from './pages/Doclogin';



function App({ session }) {
  return (
    <>

      {/* <Component {...pageProps} /> */}


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/datetimepicker" element={<DateTimePicker />} />
          <Route path="/docreg" element={<Doctorreg />} />
          <Route path="/patientreg" element={<Patientreg />} />
          <Route path='/appointment' element={<Appointmentbooking />} />
          <Route path='/index' element={<Index />} />
          <Route path='/patientlogin' element={<Patientlogin />} />
          <Route path='/dashmain' element={<Main />} />
          <Route path='/selectedspecialist' element={<Card_doc />} />
          <Route path='/patientdashboard' element={<PatientDashboard />} />
          <Route path='/doclogin' element={<Doclogin />} />
          <Route path='/adminlogin' element={<Adminlogin />} />
          <Route path='/verifierreg' element={<Verifierreg />} />
          <Route path='/verifierlogin' element={<Verlogin />} />
          <Route path='/adminreg' element={<Adminreg />} />
          <Route path='/admindash' element={<Admindash />} />
          <Route path='/verifierdash' element={<Verifierdashboard />} />
          <Route path='/doctordash' element={<DoctorDashboard />} />


          {/* Videocall */}
          <Route path='/VideoCall' element={<Call />} />
          <Route path='/PatientVideoCall' element={<PatientCall />} />

          {/* nilkanth */}


          <Route path='/adminlogin' element={<Adminlogin />} />
          <Route path='/verifierreg' element={<Verifierreg />} />
          <Route path='/verifierlogin' element={<Verlogin />} />
          <Route path='/adminreg' element={<Adminreg />} />
          <Route path='/admindash' element={<Admindash />} />
          {/* <Route path='http://localhost:5000/'/> */}

        </Routes>
      </BrowserRouter>


      {/* <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider> */}
    </>
  );
}

export default App;
