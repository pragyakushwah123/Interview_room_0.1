// pages/Register.js
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css'
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import CountryInput from "../component/CountryInput";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/register";
const Register = (props) => {
    const [phone, setPhone] = useState("");
    const { isLoggedIn, setIsLoggedIn, setName } = props;
    let navigate = useNavigate();
    const [email, setEmail] = useState("");

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to manage button enable/disable

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setIsButtonEnabled(event.target.checked); // Update button state when checkbox is changed
    };

    // useEffect(() => {
    //     if (isLoggedIn) navigate("profile");
    // });

    const handleRegister = async (ev) => {
        ev.preventDefault();
        const name = ev.target.name.value;
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const confirmpassword = ev.target.confirmpassword.value;

        if (password !== confirmpassword) toast.error("Passwords do not match !");
        else {
            const formData = {
                name: name,
                email: email,
                password: password,
                phone: phone,
            };
            try {
                const res = await axios.post(URL, formData);
                const data = res.data;
                if (data.success === true) {
                    toast.success(data.message);
                    setIsLoggedIn(true);
                    setName(name);
                    setEmail(email);
                    navigate("/login");
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                console.log("Some error occured", err);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-4 px-4">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Create an account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-"
                        action="POST"
                        onSubmit={handleRegister}
                    >
                        <div>
                            <div className="mb-2 block">
                                <label htmlFor="name" className="text-sm font-medium required">
                                    Name
                                </label>
                            </div>
                            <div data-bs-toggle="tooltip" data-bs-placement="bottom" title="Please enter your name here">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <label htmlFor="email" className="text-sm font-medium required">
                                    Email
                                </label>
                            </div>
                            <div data-bs-toggle="tooltip" data-bs-placement="bottom" title="Please enter your email here">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <div className="mb-2 block">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium required"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div data-bs-toggle="tooltip" data-bs-placement="bottom" title="Please enter your password here">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label
                                        htmlFor="confirmpassword"
                                        className="text-sm font-medium required"
                                    >
                                        Confirm Password
                                    </label>
                                </div>
                                <div data-bs-toggle="tooltip" data-bs-placement="bottom" title="Please Re-enter your password here">
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        placeholder="Re-enter Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <CountryInput /> */}
                        <div className="max-w-xl">
                            <div className="mb-2 block">
                                <label htmlFor="phone" className="text-sm font-medium">
                                    Phone Number
                                </label>
                            </div>
                            <div data-bs-toggle="tooltip" data-bs-placement="bottom" title="Please enter your phone number here">
                                <PhoneInput
                                    className="number bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                    country={"in"}
                                    value={phone}
                                    id="phone"
                                    onChange={(value) => setPhone(value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 secondarycolor bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                    aria-describedby="terms"
                                    onChange={handleCheckboxChange}

                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="terms"
                                    className="font-light text-gray-500 dark:text-gray-300 "
                                >
                                    I accept the{" "}
                                    <Link
                                        className="font-medium secondarycolor hover:underline"
                                        to={"/termscondition"}
                                    >
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`createaccbtn w-full focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5   ${!isButtonEnabled && 'opacity-50 cursor-not-allowed'} `}
                            disabled={!isButtonEnabled}
                        >
                            Create an account
                        </button>
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold leading-6 secondarycolor"
                            >
                                Login Here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;