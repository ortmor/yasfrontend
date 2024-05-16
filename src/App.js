
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RegistrationForm from "./components/RegistrationForm";
// import WelcomePage from "./components/WelcomePage"; // Import the WelcomePage component
// import AboutProgram from "./components/AboutProgram";
// import Programs from "./components/Programs";
// import VideoPage from "./components/VideoPage";
// import ThankyouPage from "./components/ThankyouPage";

// import AboutPageDetails from "./components/AboutPageDetails"; // Updated component
// import AboutProgram2 from "./components/AboutProgram2";
// import AboutProgram3 from "./components/AboutProgram3";
// import AboutProgram4 from "./components/AboutProgram4";
// import LoginPage from "./components/LoginPage";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useEffect } from "react";
// import AboutPageDetails2 from "./components/AboutPageDetails2";
// import AboutPageDetails3 from "./components/AboutPageDetails3";
// import AboutPageDetails4 from "./components/AboutPageDetails4";
// import QRScanner from "./components/QrScannerPage";

// const App = () => {
//   const { user, refresh } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios
//       .get("/auth/")
//       .then((response) => {
//         dispatch({
//           type: "user",
//           payload: {
//             login: response.data.logged,
//             details: response.data.details,
//           },
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [refresh, dispatch]);
//   console.log(user, "user");

//   return (
//     <Router>
//       <div className="app-container">
//         <Routes>
//           <Route path="/" element={<WelcomePage />} />
//           <Route path="/registration" element={<RegistrationForm />} />
//           <Route path="/about" element={<AboutProgram />} />
//           <Route path="/programs" element={<Programs />} />
//           <Route path="/video" element={<VideoPage />} />
//           <Route path="/thank-you" element={<ThankyouPage />} />

//           <Route path="/about-page-details" element={<AboutPageDetails />} />
//           <Route path="/about-page-details-2" element={<AboutPageDetails2 />} />
//           <Route path="/about-page-details-3" element={<AboutPageDetails3 />} />
//           <Route path="/about-page-details-4" element={<AboutPageDetails4 />} />
//           <Route path="/about-program" element={<AboutProgram />} />
//           <Route path="/about-program-2" element={<AboutProgram2 />} />
//           <Route path="/about-program-3" element={<AboutProgram3 />} />
//           <Route path="/about-program-4" element={<AboutProgram4 />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/qr-scanner" element={<QRScanner />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



 /* eslint-disable */


import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import RegistrationForm from "./components/RegistrationForm";
import WelcomePage from "./components/WelcomePage";
import AboutProgram from "./components/AboutProgram";
import Programs from "./components/Programs";
import VideoPage from "./components/VideoPage";
import ThankyouPage from "./components/ThankyouPage";
import AboutPageDetails from "./components/AboutPageDetails";
import AboutProgram2 from "./components/AboutProgram2";
import AboutProgram3 from "./components/AboutProgram3";
import AboutProgram4 from "./components/AboutProgram4";
import AboutPageDetails2 from "./components/AboutPageDetails2";
import AboutPageDetails3 from "./components/AboutPageDetails3";
import AboutPageDetails4 from "./components/AboutPageDetails4";
import LoginPage from "./components/LoginPage";
import QrScannerPage from "./components/QrScannerPage";
import PageNotFound1 from "./components/PageNotFound1";

const App = () => {
  const { user, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [checkAuth, setCheckAuth] = useState(true);

  useEffect(() => {
    axios
      .get("/auth/")
      .then((response) => {
        dispatch({
          type: "user",
          payload: {
            login: response.data.logged,
            details: response.data.details,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setCheckAuth(false));
  }, [refresh, dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {!user.login ? (
            <>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/thank-you" element={<ThankyouPage />} />
            </>
          ) : (
            // <Route path="/" element={<Navigate to="/about" />} />
            <></>
          )
          }
          {user.login && (
            <>
              <Route path="/about" element={<AboutProgram />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/video" element={<VideoPage />} />
              <Route path="/qr-scanner" element={<QrScannerPage />} />
              <Route path="/about-page-details" element={<AboutPageDetails />} />
              <Route path="/about-page-details-2" element={<AboutPageDetails2 />} />
              <Route path="/about-page-details-3" element={<AboutPageDetails3 />} />
              <Route path="/about-page-details-4" element={<AboutPageDetails4 />} />
              <Route path="/about-program" element={<AboutProgram />} />
              <Route path="/about-program-2" element={<AboutProgram2 />} />
              <Route path="/about-program-3" element={<AboutProgram3 />} />
              <Route path="/about-program-4" element={<AboutProgram4 />} />
            </>
          )}
          {checkAuth && 
          <Route path="*" element={<PageNotFound1 />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
