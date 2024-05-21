import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./App.css";
import AppNavBar from "./component/Navbar/AppNavBar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Faq from "./pages/faq/Faq";
import Termscondition from "./pages/TermsCondition/Termscondition";
import InterviewRoom from './pages/InterviewRoom/InterviewRoom';
import AIAssist from "./pages/InterviewRoom/AIAssist";
import Success from "./pages/Success/Success";
import Contact from "./pages/Contact/Contact";
// import ForgotPassword from "./pages/ForgetPassword/ForgetPassword";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <div className="WithHP">
          <AppNavBar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
          />
          <div>
            <Routes>
              <Route path="/" exact
                element={
                  <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                }
              />

              <Route path="/register" exact
                element={
                  <Register
                    // isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setName={setName}
                    setEmail={setEmail}
                  />
                }
              />
              <Route path="/contact" exact
                element={
                  <Contact />
                }
              />
              <Route path="/login" exact
                element={
                  <Login
                    // isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setName={setName}
                    setEmail={setEmail}
                  />
                }
              />
              <Route path="/faq" exact
                element={<Faq />}
              />
              <Route path="/termscondition" exact
                element={<Termscondition />}
              />

              <Route path="/termscondition" exact
                element={<Termscondition />}
              />
              <Route path="/InterviewRoom"
                element={<InterviewRoom />}
              />
              <Route path="/aiassist"
                element={<AIAssist />}
              />
              <Route path="/profile" exact
                element={<Profile />}
              />
              <Route path="/success" exact
                element={<Success />}
              />

            </Routes>
          </div>
        </div>


      </BrowserRouter>
    </div>
  );
};

export default App;