import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./aiassist.css";
import InterviewRoom from "./InterviewRoom";
import AIimg from "../../assets/images/GIFvoiceassistant.gif";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/start-interview/";
const STOP_ASSISTANT_URL = process.env.REACT_APP_BACKEND_URL + "/api/stop-assistant/";

const AIAssist = () => {
    const [recordingInProgress, setRecordingInProgress] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [abortController, setAbortController] = useState(null);
    const stopRecordingRef = useRef(null);

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const storedEmail = localStorage.getItem("useremail");
        const storedPhone = localStorage.getItem("phone");

        setName(storedName || "");
        setEmail(storedEmail || "");
        setPhone(storedPhone || "");
    }, []);

    useEffect(() => {
        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [abortController]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                stopRecordingAndSubmit();
                stopAssistant();
            }
        };

        const handleBeforeUnload = (event) => {
            if (recordingInProgress || buttonClicked) {
                const confirmationMessage = "Are you sure you want to leave? Any unsaved changes will be lost.";
                event.returnValue = confirmationMessage;
                stopRecordingAndSubmit();
                stopAssistant();
                return confirmationMessage;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [recordingInProgress, buttonClicked]);

    const startInterview = async () => {
        try {
            if (!buttonClicked) {
                setButtonClicked(true);
                const controller = new AbortController();
                setAbortController(controller);
                setRecordingInProgress(true);

                const formData = { value: true };

                const res = await axios.post(URL, formData, { signal: controller.signal });
                const data = res.data;
                console.log(data);
                if (data.call === true) {
                    stopRecordingAndSubmit();
                    stopAssistant();
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.error("Error starting interview:", error);
            }
        }
    };

    const stopRecordingAndSubmit = async () => {
        setRecordingInProgress(false);
        if (stopRecordingRef.current) {
            await stopRecordingRef.current();
        }
        navigate("/success");
    };

    const stopAssistant = async () => {
        try {
            await axios.post(STOP_ASSISTANT_URL);
        } catch (error) {
            console.error('Error stopping assistant:', error);
        }
    };

    return (
        <>
            <div className="col-12 AIpage">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="cam-recorder">
                                <InterviewRoom 
                                    recordingInProgress={recordingInProgress} 
                                    stopRecordingRef={stopRecordingRef} 
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div>
                                <div className="ai-img">
                                    <img src={AIimg} className="img-fluid w-100 h-100" alt="AI Assistant" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button
                                className="btn btn-primary"
                                onClick={startInterview}
                                disabled={buttonClicked}
                            >
                                Start Interview
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6 userdetails">
                            <span className="d-block">{name}</span>
                            <span className="d-block">{email}</span>
                            <span className="d-block">{phone}</span>
                        </div>
                        <div className="col-lg-6 spclass"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIAssist;
