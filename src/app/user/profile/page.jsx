"use client";

import {useEffect, useState, useContext} from 'react';
import AccountSidebar from '@/components/AccountSidebar';
import { useLoader } from '@/context/LoaderContext';
import { AuthContext } from '@/context/AuthContext';

export default function page()
{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const[isLoading, setIsLoading] = useState(false);
    const { startLoading, stopLoading } = useLoader();
    const [passTogle, setPassToggle] = useState([false, false, false]);


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [passMessage, setPassMessage] = useState("");
    const [messageType, setMessageType] = useState(false);
    const [current_password, setCurrentPass] = useState("");
    const [new_password, setNewPass] = useState("");
    const [con_new_password, setConNewPass] = useState("");


    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`${baseUrl}user`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                name: fname,
                last_name: lname,
                company: company,
                email: email
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setMessage(result.message)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    

    useEffect(() => {
        const fetchUser = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}user`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setFname(result.data.name || "")
                setLname(result.data.last_name || "")
                setCompany(result?.data?.company?.company_name || "")
                setEmail(result.data.email || "")
                stopLoading();
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser();
    }, []);    


    const handlePassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${baseUrl}user/change-password`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                current_password: current_password,
                new_password: new_password,
                new_password_confirmation: con_new_password,
            })
        })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => { 
                    setMessageType((result.status) ? true : false)
                    setPassMessage(
                        Array.isArray(result.message?.new_password) && result.message.new_password.length > 0
                        ? result.message.new_password[0]
                        : result.message
                    );
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                });
    }

    return (
        <div className='alert_mgs_fix'>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>My Account</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="account-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-25">
                            <AccountSidebar />
                        </div>
                        <div className="col-md-75">
                            <div className="widget">
                                <h4>Profile Info</h4>
                                
                                <form onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input type="text" className="form-control" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} readOnly={true} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input type="email" className="form-control" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message">
                                        <p className="success">{message}</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary" aria-label="Submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" fill="currentColor"></path></svg>
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                            <div className={`widget ${isLoading ? "loading-wrapper" : ""}`}>
                                <h4>Change Password</h4>
                                <form onSubmit={handlePassword}>
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <input type={`${passTogle[0] ? "text" : "password"}`} className="form-control" placeholder="Old Password" value={current_password} onChange={(e) => setCurrentPass(e.target.value)} required />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 0 ? !val : val))
                                        )}>
                                            {!passTogle[0] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor" /></g></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                            }
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type={`${passTogle[1] ? "text" : "password"}`} className="form-control" placeholder="New Password" value={new_password} onChange={(e) => setNewPass(e.target.value)} required />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 1 ? !val : val))
                                        )}>
                                            {!passTogle[1] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor" /></g></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                            }
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Re-type Password</label>
                                        <input type={`${passTogle[2] ? "text" : "password"}`} className="form-control" placeholder="Re-Type Password" value={con_new_password} onChange={(e) => setConNewPass(e.target.value)} required />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 2 ? !val : val))
                                        )}>
                                            {!passTogle[2] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor" /></g></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                            }
                                        </span>
                                    </div>
                                    <div className="message">
                                       {passMessage &&  <p className={messageType ? "success" : "error"}>{passMessage}</p>}
                                    </div>
                                    <div className="btn-area mt-4">
                                        <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`} aria-label="Submit">
                                            {!isLoading && (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M7.505,24A7.5,7.5,0,0,1,5.469,9.283,7.368,7.368,0,0,1,9.35,9.235l7.908-7.906A4.5,4.5,0,0,1,20.464,0h0A3.539,3.539,0,0,1,24,3.536a4.508,4.508,0,0,1-1.328,3.207L22,7.415A2.014,2.014,0,0,1,20.586,8H19V9a2,2,0,0,1-2,2H16v1.586A1.986,1.986,0,0,1,15.414,14l-.65.65a7.334,7.334,0,0,1-.047,3.88,7.529,7.529,0,0,1-6.428,5.429A7.654,7.654,0,0,1,7.505,24Zm0-13a5.5,5.5,0,1,0,5.289,6.99,5.4,5.4,0,0,0-.1-3.3,1,1,0,0,1,.238-1.035L14,12.586V11a2,2,0,0,1,2-2h1V8a2,2,0,0,1,2-2h1.586l.672-.672A2.519,2.519,0,0,0,22,3.536,1.537,1.537,0,0,0,20.465,2a2.52,2.52,0,0,0-1.793.743l-8.331,8.33a1,1,0,0,1-1.036.237A5.462,5.462,0,0,0,7.5,11ZM5,18a1,1,0,1,0,1-1A1,1,0,0,0,5,18Z" fill="currentColor" /></svg>
                                                        Change Password
                                                    </>
                                                )}
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

