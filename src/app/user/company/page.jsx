"use client";

import {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext';
import AccountSidebar from '@/components/AccountSidebar';

export default function Page()
{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const [role, setRole] = useState("");
    const { startLoading, stopLoading } = useLoader();
    const [popStatus, setPopStatus] = useState(false);
    const [allowMethods, setAllowMethods] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        contact: "",
        order_limit: "",
        payment_method: ["credit_card"]
    })

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [orderLimit, setOrderLimit] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(["credit_card"]);
    const [formErrors, setFormErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [parentDetail, setParentDetail] = useState(null);
    const [upLoading, setUpLoading] = useState(false);
    const [refreshUsers, setRefreshUsers] = useState(false);
    
    const [textId, setTextId] = useState("");
    const [website, setWebsite] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [appLoading, setAppLoading] = useState(false);
    const [message, setMessage] = useState({
        type : "",
        value : "",
    });

    const [company, setCompany] = useState({
        name : "",
        tax_id : "",
        status : "",
        updated_at : "",
        website : ""
    });


    useEffect(() => {
                startLoading()
                fetch(`${baseUrl}user`, {
                    method: "GET",
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setRole(result.data.role || "")
                    setAllowMethods(result?.data?.payment_method)
                    if(result.data.company){
                        setCompany(prev => ({
                            ...prev,
                            id : result?.data?.company?.id,
                            name : result.data.company.company,
                            tax_id: result.data.company.tax_id,
                            status: result.data.company.status,
                            updated_at: result.data.company.updated_at,
                            website: result.data.company.website
                        }));
                    }
                    if(result?.data?.parent){
                        setParentDetail(result?.data?.parent)
                    }
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching User data:', error);
                });
            }, 
        []);   
        
        useEffect(() => {
            const fetchCompany = async ()=>{
                try{
                    const response = await fetch(`${baseUrl}company`, {
                        method: "GET",
                        headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                    });
                    if(!response.ok){
                        throw new Error("Company Fetch Failed");
                    }

                    const result = await response.json();
                    setCompany(prev => ({
                        ...prev,
                        name : result.data.company_name,
                        tax_id: result.data.tax_id,
                        status: result.data.status,
                        updated_at: result.data.updated_at,
                        website: result.data.website
                    }));
                }catch(err){
                    console.log(err)
                }
            }
                if(company?.id){
                    fetchCompany();
                }
            }, [company?.id]);   

        
        const applyCompany = async (e) => {
            e.preventDefault();
            setAppLoading(true);
            
            try{
                const response = await fetch(`${baseUrl}company`, {
                    method: "POST",
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                    body : JSON.stringify({
                        company_name : companyName,
                        tax_id : textId,
                        website : website,
                    })
                });
                if(!response.ok){
                    throw new Error("Company Create Failed");
                }

                const result = await response.json();
                setMessage({
                    type : result.status,
                    value : "Application Submitted Successfully"
                })
            }catch(err){
                console.error(err)
            }finally{
                setAppLoading(false);
            }
        }

    const handleUser = async (e) => {
        e.preventDefault();
        let errors = validate({name, email, contact, orderLimit, paymentMethod})
        setFormErrors(errors);
        console.log(paymentMethod)
        if(Object.keys(errors).length === 0)
        {
            setAppLoading(true);    
            try{
                const response = await fetch(`${baseUrl}company/user`, {
                    method: "POST",
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                    body : JSON.stringify({
                        name : name,
                        email : email,
                        contact : contact,
                        order_limit : orderLimit,
                        payment_method : paymentMethod
                    })
                })
                if(!response.ok){
                    throw new Error("Fecthed Failed User Resgister");
                }

                const result = await response.json();
                if(result.status){
                    setMessage({
                        type : result.status,
                        value : result.message
                    })
                }else{
                    setMessage({
                        type : result.status,
                        value : result.message.email[0]
                    })
                }
            }catch(err){
                console.error(err)
            }finally{
                setAppLoading(false);
            }
        }
    }   
    
    
    useEffect(() => {
        const getUsers = async () => {
            startLoading()
            try{
                const response = await fetch(`${baseUrl}company/users`, {
                    method : 'GET',
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error("Get Users Failed")
                }

                const result = await response.json();
                setUsers(result.data)
            }catch(err){
                console.log(err)
            }finally{
                stopLoading(); 
            }
        }
        if(company?.status === "Approved"){
            getUsers();
        }
    }, [company?.status, refreshUsers])

    const validate = (val) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if(!val.name){
            errors.name = "Name is required !"
        }
        if(!val.email){
            errors.email = "Email is required !"
        }else if(!regex.test(val.email)){
            errors.email = "Email is not valid"
        }
        if(!val.contact){
            errors.contact = "Contact Number is required !"
        }
        if(!val.orderLimit){
            errors.orderLimit = "Order Limit is required !"
        }
        if(!val.paymentMethod.length){
            errors.paymentMethod = "Payment Method is required !"
        }
        

        return errors
    }


     const handlePayment = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setPaymentMethod((prev) => {
        if (checked) {
            return [...prev, value];
        } else {
            return prev.filter((item) => item !== value);
        }
        });
    };

    function viewUser(userId) {
        if (userId) {
            const current = users.find(item => item.id === userId);
            setCurrentUser(prev => ({ ...prev, ["id"]: current.id }))
            setCurrentUser(prev => ({ ...prev, ["name"]: current.name }))
            setCurrentUser(prev => ({ ...prev, ["email"]: current.email }))
            setCurrentUser(prev => ({ ...prev, ["contact"]: current.contact }))
            setCurrentUser(prev => ({ ...prev, ["order_limit"]: current.order_limit }))
            setCurrentUser(prev => ({ ...prev, ["payment_method"]: current.payment_method }))

            document.documentElement.style.overflow = "hidden";
            setPopStatus(true);
        } else {
            document.documentElement.style.overflow = "auto";
            setPopStatus(false);
        }
    }

    const handleCurrent = (e) => {
        const { name, value } = e.target;
        setCurrentUser(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleCurrentPayment = (e) => {
        const { value, checked } = e.target;

        setCurrentUser((prev) => {
            const paymentMethods = Array.isArray(prev.payment_method)
                ? prev.payment_method
                : [];

            return {
                ...prev,
                payment_method: checked
                    ? [...paymentMethods, value]
                    : paymentMethods.filter((item) => item !== value)
            };
        });
    };



    const UpdateUser = async (e) => {
        setUpLoading(true);
        e.preventDefault();
        try{
            const response = await fetch(`${baseUrl}company/user/${currentUser?.id}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify(currentUser)
            });
            
            if(!response.ok){
                throw new Error("User Update Failed");
            }
            const result = await response.json()
            if(result?.status){
                setRefreshUsers((prev) => !prev)
                viewUser();
            }
        }catch(err){
            console.log(err)
        }finally{
            setUpLoading(false);
        }
    }

    return (
        <>
            <div className={`address-modal modal ${popStatus ? "active" : ""}`} id="demo-modal"
                onClick={(e) => {
                    if (e.target.classList.contains("address-modal")) {
                        const wrapper = document.querySelector(".form-wrapper");
                        wrapper.classList.add("animate-bounce");
                        wrapper.addEventListener("animationend", () => {
                            wrapper.classList.remove("animate-bounce");
                        }, { once: true });
                    }
                }}
            >
                <div className={`form-wrapper widget ${upLoading ? "loading-wrapper" : ""}`}>
                    <form onSubmit={UpdateUser}>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleCurrent} value={currentUser?.name} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder="Your Email" name="email" onChange={handleCurrent} value={currentUser?.email} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Contact</label>
                                    <input type="tel" className="form-control" placeholder="Your Contact Number" name="contact" onChange={handleCurrent} value={currentUser?.contact} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Order Limit</label>
                                    <input type="number" className="form-control" placeholder="Your Order Limit" min="0" name="order_limit" onChange={handleCurrent} value={currentUser?.order_limit} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <h5 className="label mb-2">Payment Method</h5>
                                {allowMethods?.length &&
                                    (allowMethods?.map((payment, index) => (
                                        <div className="form-check mb-2" key={index}>
                                            <input type="checkbox" id={payment + '_update'} className="form-check-input" value={payment?.toLowerCase()} checked={currentUser?.payment_method?.find((p) => p === payment)} onChange={handleCurrentPayment} />
                                            <label htmlFor={payment + '_update'}>{payment.replace("_", " ")}</label>
                                        </div>
                                    )))
                                }
                                {/* <div className="form-check">
                                    <input type="checkbox" id="po" className="form-check-input" value="Against_PO" checked={currentUser?.payment_method?.find((p) => p === "Against_PO") ? true : false} onChange={handleCurrentPayment} />
                                    <label htmlFor="po">Against PO</label>
                                </div>
                                <div className="form-check mt-2">
                                    <input type="checkbox" id="card" className="form-check-input" value="Credit_Card" checked={currentUser?.payment_method?.find((p) => p === "Credit_Card") ? true : false} onChange={handleCurrentPayment} />
                                    <label htmlFor="card">Credit Card</label>
                                </div> */}
                            </div>
                        </div>
                        <div className="d-flex gap-20">
                            <button className={`btn btn-primary ${upLoading ? "loading" : ""}`} aria-label="Submit">{!upLoading ? "Submit" : ""}</button>
                            <button className="btn btn-secondary" type="button" onClick={() => viewUser()} aria-label="Close Button">Close</button>
                        </div>
                    </form>
                    <button type="button" className="modal__close" onClick={() => viewUser()} aria-label="Modal Close">&times;</button>
                </div>
            </div>
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
                            {(!company?.tax_id && !parentDetail?.created_at) ? 
                                <>
                                <div className="widget">
                                    <h4>Apply For Corporate Account</h4>
                                    <div className={`form-wrapper ${appLoading ? "loading-wrapper" : ""}`}>
                                        <form onSubmit={applyCompany}>
                                            <div className="row">
                                                <div className="col-md-5 m_5_100">
                                                    <div className="form-group">
                                                        <label>Company Name</label>
                                                        <input type="text" className="form-control" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 m_5_100">
                                                    <div className="form-group">
                                                        <label>Tax ID</label>
                                                        <input type="text" className="form-control" placeholder="Tax ID" value={textId || ""} onChange={(e) => setTextId(e.target.value)} required={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 m_5_100">
                                                    <div className="form-group">
                                                        <label>Website URL</label>
                                                        <input type="url" className="form-control" placeholder="Website URL" value={website || ""} onChange={(e) => setWebsite(e.target.value)} required={true} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="message">
                                                <p className={message.type ? "success" : "error"}>{message.value}</p>
                                            </div>
                                            
                                            <div className="btn-area">
                                                <button className={`btn btn-primary ${appLoading ? "loading" : ""}`} aria-label="Submit">{!appLoading ? "Submit" : ""}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                </> :
                                <>
                                    <div className="widget">
                                        <h4>Company Details</h4>
                                        <div className="form-wrapper">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Company Name</label>
                                                            <input type="text" className="form-control" placeholder="Company Name" value={company?.name || parentDetail?.company_name} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Tax ID</label>
                                                            <input type="text" className="form-control" placeholder="Tax ID" value={company?.tax_id || parentDetail?.tax_id} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Website URL</label>
                                                            <input type="url" className="form-control" placeholder="Website URL" value={company?.website || parentDetail?.website} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Updated At</label>
                                                            <input type="text" className="form-control" placeholder="Updated At" value={new Date(company?.updated_at || parentDetail?.updated_at).toLocaleString("en-IN", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                second: "2-digit"
                                                            })} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label className="w-100">Status</label>
                                                            <div className="status mt-2">
                                                                {(company?.status || parentDetail?.status) ? 
                                                                    ((company?.status == 'Pending' || parentDetail?.status == 'Pending') ? 
                                                                        <span className="badge badge-primary">Pending</span> :
                                                                        (company?.status == 'Approved' || parentDetail?.status == 'Approved') ? 
                                                                        <span className="badge badge-success">Approved</span> :
                                                                        <span className="badge badge-danger">Unapproved</span>
                                                                    ) : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        {(company?.status === "Approved" && !parentDetail?.created_at) ?
                                            <>
                                                <h4>User Registration</h4>
                                                <div className={`form-wrapper ${appLoading ? "loading-wrapper" : ""}`}>
                                                    <form onSubmit={handleUser}>
                                                        <div className="row">
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label>Name</label>
                                                                    <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                                                    <p className="error">{ formErrors.name }</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label>Email Address</label>
                                                                    <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                                                    <p className="error">{ formErrors.email }</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label>Contact</label>
                                                                    <input type="tel" className="form-control" placeholder="Your Contact Number" onChange={(e) => setContact(e.target.value)} value={contact} />
                                                                    <p className="error">{ formErrors.contact }</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label>Order Limit</label>
                                                                    <input type="number" className="form-control" placeholder="Your Order Limit" min="0" onChange={(e) => setOrderLimit(e.target.value)} value={orderLimit} />
                                                                    <p className="error">{ formErrors.orderLimit }</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <h5 className="label mb-2">Payment Method</h5>
                                                                {allowMethods?.length &&
                                                                    (allowMethods?.map((payment, index) => (
                                                                        <div className="form-check mb-2" key={index}>
                                                                            <input type="checkbox" id={payment} className="form-check-input" value={payment?.toLowerCase()} checked={paymentMethod.find((p) => p===payment)} onChange={handlePayment} />
                                                                            <label htmlFor={payment}>{payment.replace("_", " ")}</label>
                                                                        </div>
                                                                    )))
                                                                }
                                                                
                                                                <p className="error mt-1">{ formErrors.paymentMethod }</p>
                                                            </div>
                                                        </div>
                                                        <div className="message mt-2">
                                                            <p className={message.type ? "success" : "error"}>{message.value}</p>
                                                        </div>
                                                        
                                                        <div className="btn-area mt-2">
                                                            <button className={`btn btn-primary ${appLoading ? "loading" : ""}`} aria-label="Submit">{!appLoading ? "Submit" : ""}</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </> : ""
                                        }    
                                    </div>
                                    {(company?.status === "Approved" && !parentDetail?.created_at) ? 
                                        <div className="widget">
                                            <h4>Users</h4>
                                            <div className='table_wrapper'>
                                                <table className="order">
                                                    <thead>
                                                        <tr>
                                                            <th>User ID</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Contact</th>
                                                            <th>Payment Method</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users?.length > 0 &&
                                                            users?.map((user) => (
                                                                <tr key={user?.id}>
                                                                    <td>#{user?.id}</td>
                                                                    <td>{user?.name}</td>
                                                                    <td>{user?.email}</td>
                                                                    <td>{user?.contact}</td>
                                                                    <td>{user?.payment_method?.map((p) => p.replace("_", " "))}</td>
                                                                    <td><button className="badge badge-info" onClick={() => viewUser(user?.id)}>Edit</button></td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            
                                        </div> : ""
                                    }
                                </>    
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
