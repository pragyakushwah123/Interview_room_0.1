import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/login";
// const URL =  "https://interviewrdj.onrender.com/api/login";

const Login = (props) => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setName, setEmail } = props;

  useEffect(() => {
    const storedUseremail = localStorage.getItem("useremail");
    if (storedUseremail != null) {
      setUseremail(storedUseremail);
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(useremail);
    setEmailValid(isValidEmail);

    if (!isValidEmail) {
      return;
    }

    const formData = { email: useremail, password };

    try {
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success === true) {
        toast.success(data.message);
        setIsLoggedIn(true);
        setEmail(useremail);
        setName(data.name);
        localStorage.setItem("useremail", useremail);
        localStorage.setItem("name", data.name);
        localStorage.setItem("phone", data.phone);
        navigate("/termscondition");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  const handleEmailChange = (event) => {
    setUseremail(event.target.value);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(event.target.value);
    setEmailValid(isValidEmail);
  };

  return (
    <div className="w-full flex justify-center py-4 px-4 login-page">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Login to your account
        </h5>
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleLogin}
        >
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="text-sm font-medium required">
                Email
              </label>
            </div>
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Please enter your email here"
            >
              <input
                id="email"
                type="email"
                placeholder="Useremail"
                value={useremail}
                onChange={handleEmailChange}
                className={`bg-gray-50 border ${emailValid ? "border-gray-300" : "border-red-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `}
                required
              />
            </div>
            {!emailValid && (
              <p className="text-red-500 text-sm mt-1">Invalid email format</p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" className="text-sm font-medium required">
                Password
              </label>
            </div>
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Please enter your password here"
            >
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="submitbtn focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            Submit
          </button>
          <p className="text-center text-sm text-gray-500">
            Not yet registered?{" "}
            <Link
              to={"/register"}
              className="font-semibold leading-6 secondarycolor"
            >
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;