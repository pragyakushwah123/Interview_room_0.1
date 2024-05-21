// pages/Profile.js

import { useEffect } from "react";
import UserIcon from "../../assets/images/user.png";
import { redirect } from "react-router-dom";
import './profile.css'
import { Link } from "react-router-dom";
const Profile = (props) => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('useremail');
    const phone = localStorage.getItem('phone');
    const { isLoggedIn } = props;
    useEffect(() => {
        if (isLoggedIn === false) redirect("/");
    }, []);

    return (
        <div className="flex items-center justify-center mt-5">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10">
                    <img alt="User Icon" width="96" height="96" src={UserIcon} className="mb-3 rounded-full shadow-lg" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                    <div className="mt-4  lg:mt-6 w-100">
                        <div className="userprofile">
                            <h6>Name:</h6>
                            <span className="details"><h6>{name}</h6></span>
                        </div>
                        <hr />
                        <div className="userprofile">
                            <h6>Email:</h6>
                            <span className="details"><h6>{email}</h6></span>
                        </div>
                        <hr />
                        <div className="userprofile">
                            <h6>Phone:</h6>
                            <span className="details"><h6>{phone}</h6></span>
                        </div>
                    </div>
                    <button className="backbtn"><Link to={"/termscondition"}>Back</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Profile;