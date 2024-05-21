import React, { useState } from 'react';
import Image_Gif from "../../assets/images/cont-anm.gif";
import axios from 'axios';
const URL = process.env.REACT_APP_BACKEND_URL + "/api/contact_us/";
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the backend API
            const response = await axios.post(URL, formData);
            console.log(response.data); // Log the response from the backend
            const data = response.data
            if(data.success===true)
            {
                alert("form submitted successfully")
            }
            
           
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Failed to submit form. Please try again later.");
        }
    };

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <img src={Image_Gif} alt="Contact" className="img-fluid" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <h2 className="mb-4 whitecolor">Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label whitecolor">Name</label>
                            <input type="text" className="form-control contact-input" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label whitecolor">Email address</label>
                            <input type="email" className="form-control contact-input" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label whitecolor">Message</label>
                            <textarea className="form-control contact-input" id="message" name="message" value={formData.message} onChange={handleChange} rows="4"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
