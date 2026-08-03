"use client";

import {useEffect, useState, useContext} from 'react';
import { AuthContext } from '@/context/AuthContext';
import Select from 'react-select'
import { useLoader } from '@/context/LoaderContext';
import AccountSidebar from '@/components/AccountSidebar';

export default function Page()
{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { startLoading, stopLoading } = useLoader();
    const { user, logout, isLoggedIn } = useContext(AuthContext);

    const [loading, setInLoading] = useState(false);
    const [upLoading, setUpLoading] = useState(false);
    const [popStatus, setPopStatus] = useState(false);
    const [billLoading, setBillLoading] = useState(false);
    const [billMessage, setBillMessage] = useState({
        type : false,
        value : "",
    });
    
    const [adds, setAdds] = useState([]);
    const [addForm, setAddForm] = useState(false);


    const[billErrors, setBillErrors] = useState({});
    const[shipErrors, setShipErrors] = useState({});

    const[address_fname, setAfname] = useState("");
    const[address_lname, setAlname] = useState("");
    const[address_email, setAemail] = useState("");
    const[address_phone, setAphone] = useState("");
    const[address_address, setAaddress] = useState("");
    const[address_address2, setAaddress2] = useState("");
    const[address_country, setAcountry] = useState("United States");
    const[address_city, setAcity] = useState("");
    const[address_postcode, setApostCode] = useState("");
    const[address_state, setAstate] = useState("");
    const[shipping_residential, setSresident] = useState(false);

    const [message,setMessage] = useState("");
    const [refreshAddresses, setRefreshAddresses] = useState(false);
    const [UpMessage,setUmessage] = useState("");
    const [parentDetail, setParentDetail] = useState(null);
    const [billingAdd, setBillingAdd] = useState({
        billing_first_name : "",
        billing_last_name : "",
        billing_email : "",
        billing_phone: "",
        billing_address_1: "",
        billing_address_2: "",
        billing_city: "",
        billing_country: "United States",
        billing_postcode: "",
        billing_state: "",
    });

    const[currentAdd, setCurrentAdd] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address_1: "",
        city: "",
        country: "United States",
        postcode: "",
        state: "",
    });

    const handleCurrent = (e) => {
        const { name, value } = e.target;
        setCurrentAdd(prev => ({
            ...prev,
            [name]: value
        }));
    }
   
    const handleBilling = (e) => {
        const { name, value } = e.target;
        setBillingAdd((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const states = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
    ];


    const handleAddress = (e) => {
        e.preventDefault();
        setInLoading(true);
        
        const customerDetails = {
            type : "shipping",
            first_name : address_fname,
            last_name : address_lname,
            email : address_email,
            phone : address_phone,
            address_1 : address_address,
            address_2 : address_address2,
            city : address_city,
            country : address_country,
            postcode : address_postcode,
            state : address_state,
            is_default : true,
        }

        const errors = shippingFormValidate(customerDetails);
        setShipErrors(errors)

        if(Object.keys(errors).length === 0)
        {

            fetch(`${baseUrl}user/addresses`, {
                    method:"POST",
                    headers:{"Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                    body:JSON.stringify(customerDetails)
                }).then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                }).then(({ status, body })=>{
                    setAddForm(false)
                    if(!body.status) throw new Error(body.message)
                    setMessage(body.message)  
                    setRefreshAddresses(prev => !prev); 
                    setInLoading(false);                  
                }).catch((err)=>{
                    console.error("Validation error: " + err.message);
                })
        }else{
            setInLoading(false);
        }
    }


    
    const shippingFormValidate = (val) =>
    {
        const shippingError = {}

        if(!val.first_name)
        {
            shippingError.fname = "The first name field is required."
        }
        if(!val.last_name)
        {
            shippingError.lname = "The last name field is required."
        }
        if(!val.email)
        {
            shippingError.email = "The email field is required."
        }
        if(!val.phone)
        {
            shippingError.phone = "The phone field is required."
        }
        if(!val.address_1)
        {
            shippingError.address = "The address field is required."
        }
        if(!val.city)
        {
            shippingError.city = "The city field is required."
        }
        if(!val.country)
        {
            shippingError.country = "The country field is required."
        }
        if(!val.postcode)
        {
            shippingError.postcode = "The postcode field is required."
        }
        if(!val.state)
        {
            shippingError.state = "The state field is required."
        }
        if(!shipping_residential)
        {
            shippingError.resdetial = "We donot ship to residential address. Please confirm your given address is not residential address"
        }

        return shippingError
    }

    const billingFormValidate = (val) =>
    {
        const billingError = {}
        if(!val.billing_first_name)
        {
            billingError.fname = "The first name field is required."
        }
        if(!val.billing_last_name)
        {
            billingError.lname = "The last name field is required."
        }
        if(!val.billing_email)
        {
            billingError.email = "The email field is required."
        }
        if(!val.billing_phone)
        {
            billingError.phone = "The phone field is required."
        }
        if(!val.billing_address_1)
        {
            billingError.address = "The address field is required."
        }
        if(!val.billing_city)
        {
            billingError.city = "The city field is required."
        }
        if(!val.billing_country)
        {
            billingError.country = "The country field is required."
            console.log(val.billing_country)
        }
        if(!val.billing_postcode)
        {
            billingError.postcode = "The postcode field is required."
        }
        if(!val.billing_state)
        {
            billingError.state = "The state field is required."
        }

        return billingError
    }


    useEffect(() => {
        const fetchAddress = async () => {
        startLoading();
        
          try {
            const response = await fetch(`${baseUrl}user/addresses`, {
                method: "GET",
                headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
            }); // Example API endpoint
            if (!response.ok) {
              throw new Error('Failed to fetch product data');
            }
            const data = await response.json();
            setAdds(data.data);
          } catch (err) {
                console.error(err.message);
          } finally {
                stopLoading();
          }
        };

          fetchAddress();

      }, [refreshAddresses]); // Re-run effect when slug changes


    function deleteAdd(id){
        fetch(`${baseUrl}user/addresses/${id}`, {
                    method:"DELETE",
                    headers:{"Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                }).then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                }).then(({ status, body })=>{
                    setRefreshAddresses(prev => !prev); 
                }).catch((err)=>{
                    console.error("Validation error: " + err.message);
                })
    }  


    function viewAdd(addId)
    {
        if(addId){
            const current = adds.find(item => item.id === addId);
            setUmessage("");
            setCurrentAdd(prev => ({...prev,["id"]: current.id}))
            setCurrentAdd(prev => ({...prev,["type"]: current.type}))
            setCurrentAdd(prev => ({...prev,["first_name"]: current.first_name}))
            setCurrentAdd(prev => ({...prev,["last_name"]: current.last_name}))
            setCurrentAdd(prev => ({...prev,["email"]: current.email}))
            setCurrentAdd(prev => ({...prev,["phone"]: current.phone}))
            setCurrentAdd(prev => ({...prev,["address_1"]: current.address_1}))
            setCurrentAdd(prev => ({...prev,["country"]: current.country}))
            setCurrentAdd(prev => ({...prev,["state"]: current.state}))
            setCurrentAdd(prev => ({...prev,["postcode"]: current.postcode}))
            setCurrentAdd(prev => ({...prev,["city"]: current.city}))
            
            document.documentElement.style.overflow = "hidden";
            setPopStatus(true);
        }else{
            document.documentElement.style.overflow = "auto";
            setPopStatus(false);
        }
    }

    const updateAdd = (e) => {
        e.preventDefault();
        const id = currentAdd.id;
        const customerDetails = {
            type : "shipping",
            first_name : currentAdd.first_name,
            last_name : currentAdd.last_name,
            email : currentAdd.email,
            phone : currentAdd.phone,
            address_1 : currentAdd.address_1,
            city : currentAdd.city,
            country : currentAdd.country,
            postcode : currentAdd.postcode,
            state : currentAdd.state,
            is_default : true,
        }

        if(!parentDetail?.id){
            setUpLoading(true);
            fetch(`${baseUrl}user/addresses/${id}`, {
                method: "PUT",
                headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                body : JSON.stringify(customerDetails)
            }).then(
                    (response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                }).then(({ status, body }) => {
                    setUmessage(body.message)
                    setRefreshAddresses(prev => !prev); 
                    viewAdd()
                }).catch((err) => {
                    console.error("Validation error: " + err.message);
                }).finally(() => {
                    setUpLoading(false);
                })
        }
            
    }

    useEffect(() => {
        const getBillAdd = async () => {
        startLoading();

          try {
            const response = await fetch(`${baseUrl}user/address`, {
                method: "GET",
                headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
            }); // Example API endpoint
            if (!response.ok) {
              throw new Error('Failed to fetch product data');
            }
            const data = await response.json();
            setBillingAdd({
                  billing_first_name: data.data?.billing_first_name || "",
                    billing_last_name: data.data?.billing_last_name || "",
                    billing_email: data.data?.billing_email || "",
                    billing_phone: data.data?.billing_phone || "",
                    billing_address_1: data.data?.billing_address_1 || "",
                    billing_address_2: data.data?.billing_address_2 || "",
                    billing_city: data.data?.billing_city || "",
                    billing_country: data.data?.billing_country || "United States",
                    billing_postcode: data.data?.billing_postcode || "",
                    billing_state: data.data?.billing_state || "",
            });
          } catch (err) {
                console.error(err.message);
          } finally {
                stopLoading();
          }
        };

          getBillAdd();

      }, [refreshAddresses]); // Re-run effect when slug changes

    useEffect(() => {
        startLoading()
        fetch(`${baseUrl}user`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                if (result?.data?.parent) {
                    setParentDetail(result?.data?.parent)
                }
                stopLoading();
            })
            .catch(error => {
                console.error('Error fetching User data:', error);
            });
    },
        []);


      const updateBillAdd = async (e) => {
            e.preventDefault();
            const errors = billingFormValidate(billingAdd);
            setBillErrors(errors)

            if((Object.keys(errors).length === 0) && !parentDetail?.id){
                setBillLoading(true);
                try{
                    const response = await fetch(`${baseUrl}user/address/billing`,{
                        method : "POST",
                        headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                        body : JSON.stringify(billingAdd)
                    })

                    if(!response.ok){
                        throw new Error ("Update Bill Failed")
                    }
                    const result = await response.json();
                    if(result){
                        setBillMessage({
                            type : result.status,
                            value : result.message
                        })
                    }

                }catch(err){
                    console.error(err)
                }finally{
                    setBillLoading(false)
                }
            }
            
      }

    return (
        <>
            <div className={`address-modal modal ${ popStatus ? "active" : ""}`} id="demo-modal"
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
                    <form onSubmit={updateAdd}>
                        <div className="row">
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="first_name" placeholder="First Name" value={currentAdd.first_name} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="last_name" placeholder="Last Name" value={currentAdd.last_name} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email Address" value={currentAdd.email} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="tel" className="form-control" name="phone" placeholder="Phone Number" value={currentAdd.phone} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <input type="text" className="form-control" name="address_1" placeholder="Address Line 1" value={currentAdd.address_1} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Address Line 2</label>
                                    <input type="text" className="form-control" name="address_2" placeholder="Address Line 1" value={currentAdd.address_2} onChange={handleCurrent} readOnly={parentDetail?.id} />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Country</label>
                                    <input type="text" className="form-control" name="country" placeholder="Country" value={currentAdd.country} readOnly />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>State</label>
                                    <Select options={states}  name="state" value={states.find((option) => option.value === currentAdd.state)} onChange={(selectedOption) =>
                                        setCurrentAdd((prev) => ({
                                        ...prev,
                                        state: selectedOption.value,
                                        }))
                                    }  readOnly={parentDetail?.id} />        
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-control" name="city" placeholder="City" value={currentAdd.city} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Postcode</label>
                                    <input type="text" className="form-control" name="postcode" placeholder="Post Code" value={currentAdd.postcode} onChange={handleCurrent} readOnly={parentDetail?.id} required />
                                </div>
                            </div>
                            
                        </div>
                        <div className="message">
                            {UpMessage && <p className="success">{UpMessage}</p>}
                        </div>
                        <div className="d-flex gap-20">
                            {!parentDetail?.id &&
                                <button className={`btn btn-primary ${upLoading ? "loading" : ""}`} aria-label="Submit Button">{!upLoading ? "Submit" : ""}</button>                            
                            }
                            <button className="btn btn-secondary" type="button" onClick={() => viewAdd()} aria-label="Close Button">Close</button>
                        </div>
                    </form>
                    <button type="button" className="modal__close" onClick={() => viewAdd()} aria-label="Modal Close">&times;</button>
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
                        <div className="col-md-75 address_box">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="widget address">
                                        <h4>{parentDetail?.id && "Company"} Shipping Address & Billing Address</h4>
                                        <div className="table_wrapper">
                                            <table className="address-wrapper">
                                                <thead>
                                                    <tr>
                                                        <th>Sr No.</th>
                                                        <th>First Name</th>
                                                        <th>Address</th>
                                                        <th>City</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {adds && 
                                                        adds.map((add, index) => (
                                                            <tr key={add.id}>
                                                                <td>{index+1}.</td>
                                                                <td>{add.first_name}</td>
                                                                <td>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14" className="svg-icon"><path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor"></path><path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor"></path></svg>
                                                                    {add.address_1}
                                                                </td>
                                                                <td>{add.city}</td>
                                                                <td>
                                                                    <button className="badge badge-success" onClick={() => viewAdd(add.id)} aria-label="Edit Add">{!parentDetail?.id ? "Edit" : "View"}</button>
                                                                    {!parentDetail?.id &&
                                                                        <button className="badge badge-danger" onClick={() =>  deleteAdd(add.id)} aria-label="Delete Add">Delete</button>                                                                    
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                <div className="col-md-10">
                                    <div className={`widget ${billLoading ? "loading-wrapper" : ""}`}>
                                        <h4>{parentDetail?.id && "Company"} Billing Address</h4>
                                        <form onSubmit={updateBillAdd}>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_first_name">First Name</label>
                                                        <input type="text" className="form-control" id="billing_first_name" placeholder="First Name" name="billing_first_name" value={billingAdd?.billing_first_name || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.fname && <p className="error">{billErrors.fname}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_last_name">Last Name</label>
                                                        <input type="text" className="form-control" id="billing_last_name" placeholder="Last Name" name="billing_last_name" value={billingAdd?.billing_last_name || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.lname && <p className="error">{billErrors.lname}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_email">Email</label>
                                                        <input type="email" className="form-control" id="billing_email" placeholder="Email Address" name="billing_email" value={billingAdd?.billing_email || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.email && <p className="error">{billErrors.email}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_phone">Phone</label>
                                                        <input type="tel" className="form-control" id="billing_phone" placeholder="Phone Number" name="billing_phone" value={billingAdd?.billing_phone || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.phone && <p className="error">{billErrors.phone}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_address">Address Line 1</label>
                                                        <input type="text" className="form-control" id="billing_address" placeholder="Address Line 1" name="billing_address_1" value={billingAdd?.billing_address_1 || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.address && <p className="error">{billErrors.address}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_address">Address Line 2 (Optional)</label>
                                                        <input type="text" className="form-control" id="billing_address2" placeholder="Address Line 2 " name="billing_address_2" value={billingAdd?.billing_address_2 || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_ccountry">Country</label>
                                                        <input type="text" className="form-control" id="billing_country" placeholder="Country" name="billing_country" value={billingAdd?.billing_country || "United States"} readOnly />
                                                        {billErrors.country && <p className="error">{billErrors.country}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="billing_state">State</label>
                                                        <Select options={states} name="billing_state"  value={states.find(option => option.value === billingAdd?.billing_state)} onChange={(selectedOption) =>
                                                            setBillingAdd((prev) => ({
                                                            ...prev,
                                                            billing_state: selectedOption.value,
                                                            }))
                                                        } 
                                                             readOnly={parentDetail?.id}
                                                        />
                                                        {billErrors.state && <p className="error">{billErrors.state}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" className="form-control" placeholder="City" name="billing_city" value={billingAdd?.billing_city || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.city && <p className="error">{billErrors.city}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Postcode</label>
                                                        <input type="text" className="form-control" placeholder="Post Code" name="billing_postcode" value={billingAdd?.billing_postcode || ""} readOnly={parentDetail?.id} onChange={handleBilling} />
                                                        {billErrors.postcode && <p className="error">{billErrors.postcode}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            {billMessage && 
                                                <div className="message">
                                                    <p className={billMessage.type ? "success" : "error"}>{billMessage.value}</p>
                                                </div>
                                            }
                                            <div className="d-flex gap-20">
                                               {!parentDetail?.id && <button className={`btn btn-primary ${billLoading ? "loading" : ""}`} aria-label="Submit">{!billLoading ? "Submit" : ""}</button>}
                                            </div>
                                        </form>
                                    </div>
                                </div>                                
                                {!parentDetail?.id &&
                                    <div className="col-md-10">
                                        <div className={`widget ${loading ? "loading-wrapper" : ""}`}>
                                            {addForm && 
                                                <form onSubmit={handleAddress}>
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>First Name</label>
                                                                <input type="text" className="form-control" placeholder="First Name" value={address_fname} onChange={(e) => setAfname(e.target.value)} />
                                                                {shipErrors.fname && <p className="error">{shipErrors.fname}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Last Name</label>
                                                                <input type="text" className="form-control" placeholder="Last Name" value={address_lname} onChange={(e) => setAlname(e.target.value)} />
                                                                {shipErrors.lname && <p className="error">{shipErrors.lname}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input type="email" className="form-control" placeholder="Email Address" value={address_email} onChange={(e) => setAemail(e.target.value)} />
                                                                {shipErrors.email && <p className="error">{shipErrors.email}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Phone</label>
                                                                <input type="tel" className="form-control" placeholder="Phone Number" value={address_phone} onChange={(e) => setAphone(e.target.value)} />
                                                                {shipErrors.phone && <p className="error">{shipErrors.phone}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Address Line 1</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 1" value={address_address} onChange={(e) => setAaddress(e.target.value)} />
                                                                {shipErrors.address && <p className="error">{shipErrors.address}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Address Line 2 (Optional)</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 2 " value={address_address2} onChange={(e) => setAaddress2(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Country</label>
                                                                <input type="text" className="form-control" placeholder="Country" value={address_country} readOnly />
                                                                {shipErrors.country && <p className="error">{shipErrors.country}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>State</label>
                                                                <Select options={states}  name="state" value={states.find((s) => s.value === address_state)} onChange={(selectedOption) => setAstate(selectedOption.value)
                                                                }  />
                                                                {shipErrors.state && <p className="error">{shipErrors.state}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>City</label>
                                                                <input type="text" className="form-control" placeholder="City" value={address_city} onChange={(e) => setAcity(e.target.value)} />
                                                                {shipErrors.city && <p className="error">{shipErrors.city}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Postcode</label>
                                                                <input type="text" className="form-control" placeholder="Post Code" value={address_postcode} onChange={(e) => setApostCode(e.target.value)} />
                                                                {shipErrors.postcode && <p className="error">{shipErrors.postcode}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-check toggle">
                                                                <label htmlFor="residential">Given address is not residential address
                                                                    <div className="checkbox toggle"></div>
                                                                    <input type="checkbox" id="residential" defaultValue={shipping_residential} onChange={() => setSresident(!shipping_residential)} className="form-check-input toggle" />
                                                                </label>
                                                            </div>
                                                            {shipErrors.resdetial && 
                                                                <div className="message">
                                                                    <p className="error">{shipErrors.resdetial}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="message">
                                                        {message && <p className="success">{message}</p>}
                                                    </div>
                                                    <div className="d-flex gap-20">
                                                        <button className={`btn btn-primary ${loading ? "loading" : ""}`} aria-label="Submit">{!loading ? "Submit" : ""}</button>
                                                        <button className="btn btn-secondary" onClick={() => setAddForm(false)} aria-label="Close">Close</button>
                                                    </div>
                                                    
                                                </form>
                                            }
                                            {!addForm && <button className="btn btn-secondary" onClick={() => setAddForm(true)} aria-label="Add New">Add New Shipping Address</button> }
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

