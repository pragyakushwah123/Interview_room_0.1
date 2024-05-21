// import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import './appnavbar.css'
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import UserIcon from "../../assets/images/user.png";
// import Logo from '../../assets/images/brain.png';

// const AppNavBar = (props) => {
//     const navigate = useNavigate();
//     const { name, setName } = props;

//     const storedUseremail = localStorage.getItem('useremail');
//     const username = localStorage.getItem('name');

//     const isLoggedIn = !!storedUseremail;
//     console.log(name);
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/login");
//         toast.success("You are successfully logged out!");
//     };


//     return (
//         <>
//             <Navbar fluid className="bg-transprent">
//                 <Navbar.Brand href="#">
//                     <img src={Logo} className="me-2 logo" alt="interview Logo" />
//                 </Navbar.Brand>
//                 {/* Conditionally render based on login status */}
//                 {isLoggedIn ? (
//                     <div className="flex md:order-2 user-menu">
//                         <Dropdown arrowIcon={false} inline
//                             label={<Avatar alt="User settings" img={UserIcon} rounded className="avatar" />}>
//                             <Dropdown.Header>
//                                 <span className="block  font-medium text-center dropdown-name">{username}</span>

//                                 <span className="block truncate text-sm font-medium">{storedUseremail}</span>
//                             </Dropdown.Header>
//                             <hr className="py-0 my-0" />
//                             <Dropdown.Item>Settings</Dropdown.Item>
//                             <Dropdown.Item>
//                                 <Link to={{
//                                     pathname: "/profile",
//                                     state: { name: name, email: storedUseremail }
//                                 }}
//                                     className="text-decoration-none blackcolor">Profile</Link></Dropdown.Item>
//                             <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
//                         </Dropdown>
//                     </div>
//                 ) : (
//                     <>
//                         <Navbar.Toggle aria-controls="responsive-navbar-nav" className="menu-bar" />
//                         <Navbar.Collapse id="responsive-navbar-nav"  >
//                             <Navbar className="listing">
//                                 <Link to={"/"} className="text-lg mx-2 nav-links">Home</Link>
//                                 <Link to={"/faq"} className="text-lg mx-2 nav-links">Faq</Link>
//                                 <Link to={"/contact"} className="text-lg mx-2 nav-links">Contact</Link>
//                                 <Link to={"/login"} className="text-lg mx-2 nav-links">Login</Link>
//                             </Navbar>
//                         </Navbar.Collapse>
//                         <Navbar className="listing2 bg-transparent">
//                             <Link to={"/"} className="text-lg mx-2 nav-links">Home</Link>
//                             <Link to={"/faq"} className="text-lg mx-2 nav-links">Faq</Link>
//                             <Link to={"/contact"} className="text-lg mx-2 nav-links">Contact</Link>
//                             <Link to={"/login"} className="text-lg mx-2 nav-links">Login</Link>
//                         </Navbar>
//                     </>)}
//             </Navbar>
//         </>
//     );
// };

// export default AppNavBar;


import { Avatar, Dropdown, Navbar } from "flowbite-react";
import './appnavbar.css'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/images/user.png";
import Logo from '../../assets/images/brain.png';

const AppNavBar = (props) => {
    const navigate = useNavigate();
    const { name, setName } = props;

    const storedUseremail = localStorage.getItem('useremail');
    const username = localStorage.getItem('name');

    const isLoggedIn = !!storedUseremail;
    console.log(name);
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        toast.success("You are successfully logged out!");
    };

    return (
        <>
            <Navbar fluid className="bg-transparent">
                <Navbar.Brand href="#">
                    <img src={Logo} className="me-2 logo" alt="interview Logo" />
                </Navbar.Brand>
                {isLoggedIn ? (
                    <div className="flex md:order-2 user-menu">
                        <Dropdown arrowIcon={false} className="profile-menu" inline label={<Avatar alt="User settings" img={UserIcon} rounded className="avatar" />}>
                            <Dropdown.Header>
                                <span className="block font-medium text-center dropdown-name">{username}</span>
                                <span className="block truncate text-sm font-medium">{storedUseremail}</span>
                            </Dropdown.Header>
                            <hr className="py-0 my-0" />
                            {/* <Dropdown.Item>Settings</Dropdown.Item> */}
                            <Dropdown.Item>
                                <Link to="/profile" className="text-decoration-none w-100 text-start">Profile</Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout} className="w-100">Log out</Dropdown.Item>
                        </Dropdown>
                    </div>
                ) : (
                    <>
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={<button className=" menu-bar whitecolor "><i class='bx bx-menu hamburger'></i></button>}
                            className="nav-dropdown menu-bar"
                        >
                            <Dropdown.Item>
                                <Link to="/" className="text-lg nav-links w-100">Home</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/faq" className="text-lg  nav-links w-100">Faq</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/contact" className="text-lg nav-links w-100">Contact</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/login" className="text-lg nav-links w-100">Login</Link>
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar className="listing2 bg-transparent">
                            <Link to="/" className="text-lg mx-2 nav-links">Home</Link>
                            <Link to="/faq" className="text-lg mx-2 nav-links">Faq</Link>
                            <Link to="/contact" className="text-lg mx-2 nav-links">Contact</Link>
                            <Link to="/login" className="text-lg mx-2 nav-links">Login</Link>
                        </Navbar>
                    </>
                )}
            </Navbar>
        </>
    );
};

export default AppNavBar;