"use client";

import {useEffect, useMemo, useContext, useState} from 'react'
import { CartContext } from '@/context/cart';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Select from 'react-select'
import { useLoader } from '@/context/LoaderContext';



export default function CheckoutClient(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const searchParams = useSearchParams();
    const key = searchParams.get("order_id")
    const orderId = key ? atob(key) : null;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, addToCart, removeFromCart, cartDetail, clearCart, getCartTotal, fetchCartFromApi, updateCartItemQuantity } = useContext(CartContext)
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);

    const [checkoutData, setCheckoutData] = useState({});
    const [shipAdds, setShipAdds] = useState("");
    const { startLoading, stopLoading } = useLoader();
    const [selectShip, setSelectShip] = useState();

    //const [cartLoading, setCartLoading] = useState(false);
    const [userFetched, setUserFetched] = useState(false);
    const [orderLimit, setOrderLimit] = useState(null);
    const [companyDetail, setCompanyDetail] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [poNumber, setPoNumber] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    const [coupon, setCoupon] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponLoading, setCouponLoading] = useState(false);

    const [billing_fname, setBfname] = useState("");
    const [billing_lname, setBlname] = useState("");
    const [billing_company, setBcompany] = useState("");
    const [billing_email, setBemail] = useState("");
    const [billing_phone, setBphone] = useState("");
    const [billing_address, setBaddress] = useState("");
    const [billing_address2, setBaddress2] = useState("");
    const [billing_country, setBcountry] = useState("United States");
    const [billing_city, setBcity] = useState("");
    const [billing_postcode, setBpostCode] = useState("");
    const [billing_state, setBstate] = useState("");
    const [billing_message, setBmessage] = useState("");

    const [shipping_fname, setSfname] = useState("");
    const [shipping_lname, setSlname] = useState("");
    const [shipping_company, setScompany] = useState("");
    const [shipping_email, setSemail] = useState("");
    const [shipping_phone, setSphone] = useState("");
    const [shipping_address, setSaddress] = useState("");
    const [shipping_address2, setSaddress2] = useState("");
    const [shipping_country, setScountry] = useState("United States");
    const [shipping_city, setScity] = useState("");
    const [shipping_postcode, setSpostCode] = useState("");
    const [shipping_state, setSstate] = useState("");
    const [shipping_message, setSmessage] = useState("");
    const [shipping_residential, setSresident] = useState(false);
    const [shipDiff, setShidpDiff] = useState(false);
    const [checkTerm, setCheckTerm] = useState(false);


    const [billErrors, setBillErrors] = useState({});
    const [messageType, setMessageType] = useState(false);
    const ownBrands = ["chemier", "tristains", "cusp", "lichrom", "bluster", "eks", "kappaa", "dsi"]

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

    useEffect(() => {
        if(!isLoggedIn){
            router.push('/login');
        }
    }, [])
    

    useEffect(() => {
        const getOrderDetail = async ()=>{
            startLoading();
            try{
                const response = await fetch(`${baseUrl}my-orders/${orderId}`,{
                    method: "GET",
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error("order Details Fetch Unsuccessful");
                }

                const result = await response.json();
                if(result.status){
                    stopLoading()
                    setOrderDetails(result.data?.order)
                    if(result?.data?.order?.details?.shipping_postcode){
                        setShidpDiff(true);
                        setSfname(result?.data?.order?.details?.shipping_first_name ?? "" )
                        setSlname(result?.data?.order?.details?.shipping_last_name ?? "" )
                        setScompany(result?.data?.order?.details?.shipping_company ?? "" )
                        setScity(result?.data?.order?.details?.shipping_city ?? "" )
                        setSstate(result?.data?.order?.details?.shipping_state ?? "" )
                        setScountry(result?.data?.order?.details?.shipping_country ?? "" )
                        setSemail(result?.data?.order?.details?.shipping_email ?? "" )
                        setSphone(result?.data?.order?.details?.shipping_phone ?? "" )
                        setSpostCode(result?.data?.order?.details?.shipping_postcode ?? "" )
                        setSaddress(result?.data?.order?.details?.shipping_address_1 ?? "" )
                        setSaddress2(result?.data?.order?.details?.shipping_address_2 ?? "" )
                    }
                }
            }catch(err){
                console.error(err)
            }
        }
        if(orderId){
            getOrderDetail();
        }
    }, [])


    useEffect(() => {
        const getShipAddresses = async ()=>{
            startLoading();
            try{
                const response = await fetch(`${baseUrl}user/addresses`,{
                    method: "GET",
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error("Shipping Address Fetch Unsuccessful");
                }

                const result = await response.json();
                if(result.status){
                    setShipAdds(result.data)
                    stopLoading();
                }
            }catch(err){
                console.error(err)
            }
        }
        if(isLoggedIn){
            getShipAddresses();
        }
    }, [])

    useEffect(() => {
        const fetchBill = async () => {
            try{
                const response = await fetch(`${baseUrl}user/address`,{
                    method : "GET",
                    headers: {  "Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error ("Update Bill Failed")
                }
                const result = await response.json();
                if(result.status){
                    setBfname(orderId ? orderDetails?.details?.billing_first_name : result.data.billing_first_name)
                    setBlname(orderId ? orderDetails?.details?.billing_last_name : result.data.billing_last_name)
                    setBemail(orderId ? orderDetails?.details?.billing_email : result.data.billing_email)
                    setBphone(orderId ? orderDetails?.details?.billing_phone : result.data.billing_phone)
                    setBcompany(orderId ? orderDetails?.details?.billing_company : result.data.billing_company ? result.data.billing_company : companyDetail?.company_name)
                    setBaddress(orderId ? orderDetails?.details?.billing_address_1 : result.data.billing_address_1)
                    setBaddress2(orderId ? orderDetails?.details?.billing_address_2 : result.data.billing_address_2)
                    setBcity(orderId ? orderDetails?.details?.billing_city : result.data.billing_city)
                    setBstate(orderId ? orderDetails?.details?.billing_state : result.data.billing_state)
                    setBpostCode(orderId ? orderDetails?.details?.billing_postcode : result.data.billing_postcode)
                }
            }catch(err){
                console.error(err)
            }
        }
        if(isLoggedIn){
            fetchBill();
        }
    }, [orderDetails])
    
    useEffect(() => {
        const fetchCartDetail = async ()=>{
            startLoading()
            const data = await cartDetail()
            const updated = data?.products?.reduce((item, product) => {
                if (!ownBrands.includes(product?.brand?.name.toLowerCase())) {
                    item['add'] = item['add'] || [];
                    item['add'].push(product)
                } else {
                    item['subtract'] = item['subtract'] || [];
                    item['subtract'].push(product)
                }
                return item;
            }, {})
            const addTariff = updated?.add?.reduce((acc, item) => acc + Number(item?.discounted_price), 0) || 0
            const subtractTariff = updated?.subtract?.reduce((acc, item) => acc + Number(item?.discounted_price), 0) || 0
            data.tariff = ((addTariff * data?.tariff_charge) / 100).toFixed(2)
            
            data.total = (Number(data?.total?.replace(/,/g, "")) - (((subtractTariff * data?.tariff_charge) / 100))).toFixed(2)
            setCheckoutData(data);
            stopLoading();
        }
        if(!orderId){
            fetchCartDetail();
        }
        
    }, [])


    useEffect(() => {
        const fetchCartDetail = async (add)=>{
            try{
                const response = await fetch(`${baseUrl}cart/detail`, {
                    method: 'POST',
                    headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    guest_token: localStorage.getItem("guest_key_token"),
                    address_id: selectShip,
                    city: add[4],
                    state: add[5],
                    postcode: add[6],
                    country: add[9],
                    address_1: add[7],
                    first_name: add[0],
                    last_name: add[1],
                    company: add[8],
                    phone: add[3],
                    email: add[2]
                    }),
                })

                if(!response.ok){
                    throw new Error("Cart Detail Ftech Unsuccessful");
                }
                const result = await response.json();
                const updated = result?.data?.products?.reduce((item, product) => {
                    if(!ownBrands.includes(product?.brand?.name.toLowerCase())){
                        item ['add'] = item['add'] || [];
                        item ['add'].push(product)
                    }else{
                        item ['subtract'] = item['subtract'] || [];
                        item ['subtract'].push(product)
                    }

                    return item;  
                }, {})
                const addTariff = updated?.add?.reduce((acc, item) =>  Number(acc)+Number(item?.subtotal), 0) || 0
                const subtractTariff = updated?.subtract?.reduce((acc, item) =>  Number(acc)+Number(item?.subtotal), 0) || 0;
                result.data.tariff = ((addTariff * result?.data?.tariff_charge) / 100).toFixed(2)
                result.data.total = (Number(result?.data?.total?.replace(/,/g, "")) - (((subtractTariff * result?.data?.tariff_charge) / 100))).toFixed(2)
                setCheckoutData(result.data)

            }catch(err){
                console.error(err)
            }
            setIsLoading(false);
        }

        if(!shipDiff && billing_fname && billing_lname && billing_email && billing_phone && billing_city && billing_state && billing_postcode){
            setIsLoading(true);
            fetchCartDetail([billing_fname, billing_lname, billing_email, billing_phone, billing_city, billing_state, billing_postcode, billing_address, billing_company, billing_country]);
        }
        if(shipDiff && (shipDiff && shipping_fname && shipping_lname && shipping_email && shipping_phone && shipping_city && shipping_state && shipping_postcode)){
            setIsLoading(true);
            fetchCartDetail([shipping_fname, shipping_lname, shipping_email, shipping_phone, shipping_city, shipping_state, shipping_postcode, shipping_address, shipping_company, shipping_country]);
        }
    }, [billing_fname, billing_lname, billing_email, billing_phone, billing_city, billing_state, billing_postcode, cartItems, shipDiff, shipping_fname, shipping_lname, shipping_email, shipping_phone, shipping_city, shipping_state, shipping_postcode, shipping_address, shipping_company])
    

    useEffect(() => {
        const hasCheckoutData = Object.keys(checkoutData || {}).length > 0;
        const hasOrderDetails = Object.keys(orderDetails || {}).length > 0;

        if (!hasCheckoutData && !hasOrderDetails) return;
        if (userFetched) return;

        const fetchUser = async () => {
            const getOptions = {
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            };
            startLoading();
            try {
                const response = await fetch(`${baseUrl}user`, getOptions);
                if (!response.ok) {
                    throw new Error("User Fetch Failed");
                }
                const result = await response.json();
                if(result?.data?.parent?.id) {
                    setCompanyDetail(result?.data?.parent)
                    setBcompany(result?.data?.parent?.company_name)
                    setScompany(result?.data?.parent?.company_name)
                }
                setUserDetail(result?.data)
                //this is for po commented is right for po
                //if(result?.data?.company_id || result?.data?.company?.id) setPaymentMethod(result?.data?.payment_method[0])
                if(result?.data?.company_id || result?.data?.company?.id) setPaymentMethod("credit_card")
                if(result?.data?.order_limit) setOrderLimit(result?.data?.order_limit)
                setUserFetched(true);
            } catch (err) {
                console.log(err)
            } finally {
                stopLoading();
            }
        }
        if(isLoggedIn){
            fetchUser();
        }
    }, [checkoutData, userFetched, orderDetails]); 


    const customerDetails = {
        coupon_code : coupon,
        billing_first_name : billing_fname,
        billing_last_name : billing_lname,
        billing_email : billing_email,
        billing_company : billing_company,
        billing_phone : billing_phone,
        billing_address_1 : billing_address,
        billing_city : billing_city,
        billing_country : billing_country,
        billing_postcode : billing_postcode,
        billing_state : billing_state,
        notes : billing_message,

        ship_to_different_address : shipDiff,
        shipping_first_name : shipping_fname,
        shipping_last_name : shipping_lname,
        shipping_company : shipping_company,
        shipping_email : shipping_email,
        shipping_phone : shipping_phone,
        shipping_address_1 : shipping_address,
        shipping_country : shipping_country,
        shipping_city : shipping_city,
        shipping_postcode : shipping_postcode,
        shipping_state : shipping_state,
        shipping_message : shipping_message,

        user_discount : !orderId ? checkoutData?.user_discount : orderDetails?.user_discount,
        tariff_charge : !orderId ? checkoutData?.tariff : orderDetails?.tariff_charge,
        fuel_surcharge : !orderId ? checkoutData?.fuel_surcharge : orderDetails?.fuel_surcharge,
        packing_handling_charges : !orderId ? checkoutData?.packing_handling_charges : orderDetails?.packing_handling_charges,
        hazmat_charges : !orderId ? checkoutData?.hazmat_charges : orderDetails?.hazmat_charges,
        coupon_discount : !orderId ? checkoutData?.coupon_discount : orderDetails?.coupon_discount,
        subtotal : !orderId ?  parseFloat(checkoutData?.sub_total?.replace(/,/g, '')) : parseFloat(orderDetails?.subtotal?.replace(/,/g, '')),
        total : !orderId ? checkoutData?.total : orderDetails?.total,
    } 

    async function placeOrder(e) {
        e.preventDefault();
        const errors = billingFormValidate(customerDetails);
        setBillErrors(errors)
        if(Object.keys(errors).length === 0)
        {
            setIsLoading(true);
                    const orderData = {
                        ...customerDetails,
                        amount: !orderId ? checkoutData.total : orderDetails?.total,
                        po_number : poNumber ? poNumber : null,
                        payment_method: ((paymentMethod && (Number(orderLimit) > Number(checkoutData?.total))) ? paymentMethod : (paymentMethod && !orderLimit) ? paymentMethod : !companyDetail?.id ? 'stripe' : null),
                        order_id : orderId ? Number(orderId) : null
                    };
                    const intentData = {
                        amount: !orderId ? checkoutData.total : orderDetails?.total,
                        currency: 'usd',
                        Order : customerDetails
                    };
                        let paymentIntent = "";
                        if (orderData?.payment_method=="stripe" || orderData?.payment_method=="credit_card") {
                            const res = await fetch(`${baseUrl}create-payment-intent`, {
                                method: 'POST',
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(intentData),
                            });
                            //here first intent api then get response client_secret and check successed
                            const data = await res.json();
                            if (res.ok) {
                                const result = await stripe.confirmCardPayment(data.clientSecret, {
                                    payment_method: {
                                        card: elements.getElement(CardElement),
                                    },
                                }); 
                                paymentIntent = result;
                                if (result.error) {
                                    alert(result.error.message);
                                    setIsLoading(false);
                                    return;
                                }
                            }
                        }
                        // Step 2: Call same checkout API again with payment_intent_id
                            const orderRes = await fetch(`${baseUrl}checkout`, {
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                ...orderData, payment_intent_id: (orderData?.payment_method=="stripe" || orderData?.payment_method=="credit_card") ? paymentIntent.paymentIntent.id : null
                            }),
                        });
 
                        const orderResult = await orderRes.json();
                        const clearCart = await fetchCartFromApi();
                        if(orderResult && orderResult.status){
                            router.push("/thankyou", { state: { data:orderResult } });
                        }
        }
            setIsLoading(false);
        }

    const billingFormValidate = (val) =>
    {
        const billingError = {}
        if(!val.billing_first_name)
        {
            billingError.fname = "The billing first name field is required."
        }
        if(!val.billing_last_name)
        {
            billingError.lname = "The billing last name field is required."
        }
        if(!val.billing_company)
        {
            billingError.company = "The billing company field is required."
        }
        if(!val.billing_email)
        {
            billingError.email = "The billing email field is required."
        }
        if(!val.billing_phone)
        {
            billingError.phone = "The billing phone field is required."
        }
        if(!val.billing_address_1)
        {
            billingError.address = "The billing address field is required."
        }
        if(!val.billing_city)
        {
            billingError.city = "The billing city field is required."
        }
        if(!val.billing_country)
        {
            billingError.country = "The billing country field is required."
        }
        if(!val.billing_postcode)
        {
            billingError.postcode = "The billing postcode field is required."
        }
        if(!val.billing_state)
        {
            billingError.state = "The billing state field is required."
        }
        if(!shipping_residential && !selectShip)
        {
            billingError.resdetial = "Please Confirm !"
        }
        if(!checkTerm)
        {
            billingError.checkTerm = "Please Confirm !"
        }
        if(!checkoutData?.products[0]?.charges?.net_charge && !orderId){
            billingError.fedexError = "Fedex Error !"
        }
        if(paymentMethod?.toLowerCase()=="against_po" && !poNumber && !orderLimit){
            billingError.poNumber = "PO Number is required !"
        }
        if(shipDiff){
            if(!shipping_fname)
            {
                billingError.sfname = "The Shipping first name field is required."
            }
            if(!shipping_lname)
            {
                billingError.slname = "The Shipping last name field is required."
            }
            if(!shipping_company)
            {
                billingError.scompany = "The Shipping company field is required."
            }
            if(!shipping_email)
            {
                billingError.semail = "The Shipping email field is required."
            }
            if(!shipping_phone)
            {
                billingError.sphone = "The Shipping phone field is required."
            }
            if(!shipping_address)
            {
                billingError.saddress = "The Shipping address field is required."
            }
            if(!shipping_city)
            {
                billingError.scity = "The Shipping city field is required."
            }
            if(!billing_country)
            {
                billingError.scountry = "The Shipping country field is required."
            }
            if(!shipping_postcode)
            {
                billingError.spostcode = "The Shipping postcode field is required."
            }
            if(!shipping_state)
            {
                billingError.sstate = "The Shipping state field is required."
            }
        }

        return billingError
    }    


    async function handleCoupon()
    {
        setCouponLoading(true);
        try{
            const response = await fetch(`${baseUrl}cart/coupon`, {
                method:"POST",
                headers:{"Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                body:JSON.stringify({coupon_code : coupon})
            })

            if(!response.ok){
                throw new Error("Coupon Fetch UnsuccessFul");
            }

            const result = await response.json();
            setMessageType((result.status) ? true : false)
            const newData = await cartDetail(coupon);
            setCheckoutData(newData)
            setCouponMessage(result.status ? "Coupon Added" : result.message)
            setCouponLoading(false);  
        }catch(err){
            console.error(err)
        }
    }

    const handleAdds = (id)=>{
        const newAdd = shipAdds.find(item => item.id === id)
        if(!orderId){
                setSfname(newAdd ? newAdd.first_name : "");
                setSlname(newAdd ? newAdd.last_name : "");
                setScompany(newAdd ? newAdd.company || companyDetail?.company_name || "" : "");
                setSemail(newAdd ? newAdd.email : "");
                setSphone(newAdd ? newAdd.phone : "");
                setSaddress(newAdd ? newAdd.address_1 : "");
                setSaddress2(newAdd ? newAdd.address_2 : "");
                setScity(newAdd ? newAdd.city : "");
                setSpostCode(newAdd ? newAdd.postcode : "");
                const foundState = states.find(st => st.value === newAdd.state);
                setSstate(newAdd ? foundState.value || "" : "");
            
        }
        
        
    }

    return (
        <>           
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>CHECKOUT</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout">
                <div className="container">
                    <div className="col-md-5">
                        <Link href="/cart" className="btn btn-secondary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                            Cart
                        </Link>
                    </div>
                    <form onSubmit={placeOrder}>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="accordion-item widget">
                                    <h2 className="accordion-header">
                                        <button type="button" className={`accordion-button collapsed`} aria-label="Toggle Billing Address">
                                            Your Billing Address 
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="18" height="18"><path d="M0,8.057l9.52,9.507a3.507,3.507,0,0,0,4.948,0L24,8.046,21.879,5.929l-9.531,9.517a.5.5,0,0,1-.707,0L2.121,5.94Z" fill="currentColor" /></svg>
                                        </button>
                                    </h2>
                                    <div className={`accordion-collapse  show`}>
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control" placeholder="First Name" value={billing_fname ?? ""} readOnly={companyDetail?.id || orderId} onChange={(e) => setBfname(e.target.value)} />
                                                        {billErrors.fname && <p className="error">{billErrors.fname}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control" placeholder="Last Name" value={billing_lname ?? ""} onChange={(e) => setBlname(e.target.value)} readOnly={companyDetail?.id || orderId} required />
                                                        {billErrors.lname && <p className="error">{billErrors.lname}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="email" className="form-control" placeholder="Email Address" value={billing_email ?? ""} onChange={(e) => setBemail(e.target.value)} readOnly={companyDetail?.id || orderId} required />
                                                        {billErrors.email && <p className="error">{billErrors.email}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="tel" className="form-control" placeholder="Phone Number" value={billing_phone ?? ""} onChange={(e) => setBphone(e.target.value)} readOnly={companyDetail?.id || orderId} />
                                                        {billErrors.phone && <p className="error">{billErrors.phone}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Company</label>
                                                        <input type="text" className="form-control" placeholder="Company" value={billing_company ?? ""} onChange={(e) => setBcompany(e.target.value)} readOnly={companyDetail?.id || orderId} />
                                                        {billErrors.company && <p className="error">{billErrors.company}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Country</label>
                                                        <input type="text" className="form-control" placeholder="Country" value={billing_country ?? ""} readOnly />
                                                        {billErrors.country && <p className="error">{billErrors.country}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Address Line 1</label>
                                                        <input type="text" className="form-control" placeholder="Address Line 1" value={billing_address ?? ""} onChange={(e) => setBaddress(e.target.value)} readOnly={companyDetail?.id || orderId}  />
                                                        {billErrors.address && <p className="error">{billErrors.address}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Address Line 2 (Optional)</label>
                                                        <input type="text" className="form-control" placeholder="Address Line 2 " value={billing_address2 ?? ""} onChange={(e) => setBaddress2(e.target.value)} readOnly={companyDetail?.id || orderId}  />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" className="form-control" placeholder="City" value={billing_city ?? ""} onChange={(e) => setBcity(e.target.value)} required readOnly={companyDetail?.id || orderId} />
                                                        {billErrors.city && <p className="error">{billErrors.city}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Postcode</label>
                                                        <input type="text" className="form-control" placeholder="Post Code" value={billing_postcode ?? ""} onChange={(e) => setBpostCode(e.target.value)} required readOnly={companyDetail?.id || orderId} />
                                                        {billErrors.postcode && <p className="error">{billErrors.postcode}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <Select options={states} value={states.find((option) => option.value === billing_state)} onChange={(selectedOption) => setBstate(selectedOption.value)} isDisabled={companyDetail?.id || orderId} />        
                                                        {billErrors.state && <p className="error">{billErrors.state}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-group">
                                                        <label>Your Message For Order</label>
                                                        <textarea maxLength="200" rows="5" onChange={(e) => setBmessage(e.target.value)} defaultValue={billing_message} readOnly={companyDetail?.id || orderId}></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-check">
                                                        <label htmlFor="shipdiff">
                                                            <input type="checkbox" id="shipdiff" checked={shipDiff} onChange={() => setShidpDiff((!orderId || orderDetails?.details?.shipping_postcode) ? !shipDiff : shipDiff)} className="form-check-input" />
                                                            <p>Ship to a different address?</p>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {shipDiff &&  
                                    <>
                                        <div className="widget">
                                            <div className="title">
                                                <h3>Shipping Address and Billing Address</h3>
                                            </div>
                                            <div className="previous-wrapper">
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <label className="address-radio">
                                                            <input type="radio" name="preAdd" defaultValue={""} onChange={() => handleAdds("")} selected={selectShip === ""} />
                                                            <div className="address">
                                                                <p>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="px-2" width="18" height="18"><path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor"></path><path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor"></path></svg>    
                                                                    Ship to a different address?
                                                                </p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    {shipAdds.length>0 && 
                                                        shipAdds.map((adds) => (
                                                            <div className="col-md-10" key={adds.id}>
                                                                <label className="address-radio">
                                                                    <input type="radio" name="preAdd"  defaultValue={adds.id} onChange={() => handleAdds(adds.id)} selected={adds.id === selectShip} />
                                                                    <div className="address">
                                                                        <p>Name : {adds.first_name}</p>
                                                                        <p>Email : {adds.email}</p>
                                                                        <p>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="px-2" width="18" height="18"><path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor"></path><path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor"></path></svg>    
                                                                            {adds.address_1}
                                                                        </p>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        ))
                                                    }  
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item widget">
                                            <h2 className="accordion-header">
                                                <button type="button" className={`accordion-button collapsed`} aria-label="Toggle Shipping Address">
                                                    Your Shipping Address 
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="18" height="18"><path d="M0,8.057l9.52,9.507a3.507,3.507,0,0,0,4.948,0L24,8.046,21.879,5.929l-9.531,9.517a.5.5,0,0,1-.707,0L2.121,5.94Z" fill="currentColor" /></svg>
                                                </button>
                                            </h2>
                                            <div className={`accordion-collapse ${ shipDiff ? "show" : ""} ${selectShip ? "loading-wrapper" : ""}`}>
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>First Name</label>
                                                                <input type="text" className="form-control" placeholder="First Name" value={shipping_fname} onChange={(e) => setSfname(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.sfname && <p className="error">{billErrors.sfname}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Last Name</label>
                                                                <input type="text" className="form-control" placeholder="Last Name" value={shipping_lname ?? ""} onChange={(e) => setSlname(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.slname && <p className="error">{billErrors.slname}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input type="email" className="form-control" placeholder="Email Address" value={shipping_email} onChange={(e) => setSemail(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.semail && <p className="error">{billErrors.semail}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Phone</label>
                                                                <input type="tel" className="form-control" placeholder="Phone Number" value={shipping_phone} onChange={(e) => setSphone(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.sphone && <p className="error">{billErrors.sphone}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Company</label>
                                                                <input type="text" className="form-control" placeholder="Company" value={shipping_company} onChange={(e) => setScompany(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.scompany && <p className="error">{billErrors.scompany}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Country</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 1" value={shipping_country} readOnly />
                                                                {billErrors.scountry && <p className="error">{billErrors.scountry}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Address Line 1</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 1" value={shipping_address} onChange={(e) => setSaddress(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.saddress && <p className="error">{billErrors.saddress}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Address Line 2 (Optional)</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 2 " value={shipping_address2} onChange={(e) => setSaddress2(e.target.value)} readOnly={companyDetail?.id} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>City</label>
                                                                <input type="text" className="form-control" placeholder="City" value={shipping_city} onChange={(e) => setScity(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.scity && <p className="error">{billErrors.scity}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Postcode</label>
                                                                <input type="text" className="form-control" placeholder="Post Code" value={shipping_postcode} onChange={(e) => setSpostCode(e.target.value)} readOnly={companyDetail?.id} />
                                                                {billErrors.spostcode && <p className="error">{billErrors.spostcode}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>State</label>
                                                                <Select options={states} value={states.find((option) => option.value === shipping_state)} onChange={(selectedOption) =>setSstate(selectedOption.value)}  isDisabled={companyDetail?.id} />        
                                                                {billErrors.sstate && <p className="error">{billErrors.sstate}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Your Message For Order</label>
                                                                <textarea maxLength="200" name="" rows="5" defaultValue={shipping_message} onChange={(e) => setSmessage(e.target.value)} readOnly={companyDetail?.id} ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                
                                
                            </div>
                            <div className="col-md-5">
                                { !orderId &&
                                    <div className={`widget ${couponLoading ? "loading-wrapper" : ""}`}>
                                        <div className="coupon-wrapper">
                                            <input type="text" placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                            <button className={`btn btn-primary ${couponLoading ? "loading" : ""}`} type="button" onClick={handleCoupon}  disabled={!coupon ? true : false} aria-label="Apply Coupon"> {!couponLoading ? "APPLY COUPON" : ""}</button>
                                        </div>
                                        {couponMessage &&  <p className={messageType ? "success" : "error"}>{couponMessage}</p>}
                                    </div>
                                }
                                <div className={`widget ${isLoading ? "loading-wrapper" : ""}`}>
                                    <h4>Cart totals</h4>
                                    <table className="cart-total">
                                        <tbody>
                                            <tr>
                                                <th>Product</th>
                                                <th>Subtotal</th>
                                            </tr>
                                            {!orderId ? (
                                                    checkoutData && (
                                                        checkoutData?.products?.map((product) => (
                                                            <tr key={product?.id}>
                                                                <th><Link href={`/product/${product?.slug}`}>{product?.name}</Link> x {product?.quantity} 
                                                                    <br /> 
                                                                    <span className="badge badge-yellow small">{product?.sku} </span>
                                                                </th>
                                                                <td>${product?.subtotal}</td>
                                                            </tr>
                                                        ))
                                                    )    
                                                ) :
                                                ( orderDetails && (
                                                        orderDetails?.items?.map((item) => (
                                                            <tr key={item?.id}>
                                                                <th><Link href={`/product/${item?.product?.slug}`}>{item?.product?.name}{item?.variation?.sku}</Link> x {item?.quantity} 
                                                                    <br /> 
                                                                    <span className="badge badge-yellow small">{item?.product?.sku} </span>
                                                                </th>
                                                                <td>${item?.total_price}</td>
                                                            </tr>
                                                        ))
                                                    )
                                                )

                                            } 
                                            <tr>
                                                <td colSpan="2">
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>&nbsp;&nbsp;${orderDetails?.subtotal ? orderDetails?.subtotal : checkoutData?.sub_total}</td>
                                            </tr>
                                            {!orderId ? 
                                                <>
                                                    {checkoutData?.products?.map((product, index) => (
                                                        (product?.charges?.net_charge ? 
                                                            <tr key={product?.id}>
                                                                <th>Shipping{index>0 ? index+1 : ''}</th>
                                                                <td>Fedex Ground : ${product?.charges?.net_charge} <br /><p className="small-name">{product?.name}</p></td>
                                                            </tr> :
                                                            null
                                                        )
                                                        
                                                    ))}
                                                </> : 
                                                <>
                                                    {orderDetails?.items?.map((item, index) => (
                                                        (item?.fedex_charge ? 
                                                            <tr key={item?.id}>
                                                                <th>Shipping{index>0 ? index+1 : ''}</th>
                                                                <td>Fedex Ground : ${item?.fedex_charge} <br /><p className="small-name">{item?.product?.name}{item?.variation?.sku}</p></td>
                                                            </tr> :
                                                            null
                                                        )
                                                        
                                                    ))}
                                                </>
                                            }
                                            
                                            {!orderId ?
                                                <>
                                                    {Number(checkoutData?.fuel_surcharge?.replace(/,/g, "")>0) ? 
                                                        <tr>
                                                            <th>Fuel Surcharges</th>
                                                            <td>+ ${checkoutData?.fuel_surcharge}</td>
                                                        </tr> : null
                                                    }
                                                    {Number(checkoutData?.packing_handling_charges?.replace(/,/g, "")>0) ?
                                                        <tr>
                                                            <th>Packing & Handling Charges</th>
                                                            <td>+ ${checkoutData?.packing_handling_charges}</td>
                                                        </tr> : null
                                                    }
                                                    {Number(checkoutData?.tariff)>0 ? 
                                                        <tr>
                                                            <th>Tariff Charge</th>
                                                            <td>+ ${checkoutData?.tariff} ({checkoutData?.tariff_charge}%)</td>
                                                        </tr> : null
                                                    }
                                                    {Number(checkoutData?.hazmat_charges?.replace(/,/g, ""))>0 ? 
                                                        <tr>
                                                            <th>Hazmat Charges</th>
                                                            <td>+ ${checkoutData?.hazmat_charges}</td>
                                                        </tr> : null
                                                    }
                                                    <tr>
                                                        <th>You Save</th>
                                                        <td className="price"> ${checkoutData?.user_discount}</td>
                                                    </tr>
                                                    {checkoutData?.coupon_discount != "0.00" && 
                                                        <tr>
                                                            <th>Coupon Discount</th>
                                                            <td>- ${checkoutData?.coupon_discount}</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <th>Total</th>
                                                        <td><b>&nbsp;&nbsp;${checkoutData?.total}</b></td>
                                                    </tr>
                                                </> :
                                                <>
                                                    {(Number(orderDetails?.fuel_surcharge?.replace(/,/g, ""))>0) ? 
                                                        <tr>
                                                            <th>Fuel Surcharges</th>
                                                            <td>+ ${orderDetails?.fuel_surcharge}</td>
                                                        </tr> : null
                                                    }
                                                    {(Number(orderDetails?.packing_handling_charges?.replace(/,/g, "")>0)) ?
                                                        <tr>
                                                            <th>Packing & Handling Charges</th>
                                                            <td>+ ${orderDetails?.packing_handling_charges}</td>
                                                        </tr> : null
                                                    }
                                                    {(Number(orderDetails?.tariff)>0) ? 
                                                        <tr>
                                                            <th>Tariff Charge</th>
                                                            <td>+ ${orderDetails?.tariff} ({orderDetails?.tariff_charge}%)</td>
                                                        </tr> : null
                                                    }
                                                    {(Number(orderDetails?.hazmat_charges?.replace(/,/g, ""))>0) ? 
                                                        <tr>
                                                            <th>Hazmat Charges</th>
                                                            <td>+ ${orderDetails?.hazmat_charges}</td>
                                                        </tr> : null
                                                    }
                                                    <tr>
                                                        <th>You Save</th>
                                                        <td className="price"> ${orderDetails?.user_discount}</td>
                                                    </tr>
                                                    {(orderDetails?.coupon_discount != "0.00") && 
                                                        <tr>
                                                            <th>Coupon Discount</th>
                                                            <td>- ${orderDetails?.coupon_discount}</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <th>Total</th>
                                                        <td><b>&nbsp;&nbsp;${orderDetails?.total}</b></td>
                                                    </tr>
                                                </>
                                            }
                                        </tbody>
                                    </table>
                                    <div className="payment-wrapper">
                                        {/*{(!userDetail?.company_id && !userDetail?.company?.id) ?*/}
                                        {(!userDetail?.company || userDetail?.company?.status=="Pending") ?
                                            <> 
                                                <div className="form-group">
                                                    <label>
                                                        <div className="title">
                                                            <img src="/assets/images/atm-card.webp" loading="lazy" />
                                                            Credit/Debit Card
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="form-group card-details">
                                                    <CardElement />
                                                </div>    
                                            </> : 
                                            <>
                                                {   
                                                    ((Number(orderLimit) > Number(checkoutData?.total)) || !orderLimit) ? 
                                                    (   
                                                        <>
                                                            <div className="row">
                                                                {
                                                                userDetail?.payment_method?.map((payment) => (
                                                                    <div className="col-md-5" key={payment}>
                                                                        <label className="payment-radio">
                                                                            <input type="radio" defaultValue={payment} name="payment" onChange={() => setPaymentMethod(payment)} checked={payment===paymentMethod} />
                                                                            <div className="payment-label">
                                                                                <p>
                                                                                    {payment==="against_po" ?
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" dataname="Layer 1" width="18" height="18"><path d="m17 14a1 1 0 0 1 -1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm-4 3h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2zm9-6.515v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515a6.958 6.958 0 0 1 4.95 2.05l3.484 3.486a6.951 6.951 0 0 1 2.051 4.949zm-6.949-7.021a5.01 5.01 0 0 0 -1.051-.78v4.316a1 1 0 0 0 1 1h4.316a4.983 4.983 0 0 0 -.781-1.05zm4.949 7.021c0-.165-.032-.323-.047-.485h-4.953a3 3 0 0 1 -3-3v-4.953c-.162-.015-.321-.047-.485-.047h-4.515a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3z" fill="currentColor" /></svg> :
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"  width="18" height="18"><circle cx="5.5" cy="15.5" r="1.5"/><path d="M19,3H5A5.006,5.006,0,0,0,0,8v8a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,5H19a3,3,0,0,1,3,3H2A3,3,0,0,1,5,5ZM19,19H5a3,3,0,0,1-3-3V10H22v6A3,3,0,0,1,19,19Z" fill="currentColor" /></svg>
                                                                                    }
                                                                                    {payment.replace("_", " ")}
                                                                                </p>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            { paymentMethod?.toLowerCase() === "credit_card" ?
                                                                <>
                                                                    <div className="form-group">
                                                                        <label>
                                                                            <div className="title">
                                                                                <img src="/assets/images/atm-card.webp" loading="lazy" />
                                                                                Credit/Debit Card
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-group card-details">
                                                                        <CardElement />
                                                                    </div>    
                                                                </> : 
                                                                <div className="form-group mt-1">
                                                                    <label>Enter PO Number</label>
                                                                    <input className="form-control" placeholder="Po Number" type="text" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} />
                                                                    {billErrors?.poNumber && <p className="error">{billErrors?.poNumber}</p>}
                                                                </div>
                                                            }
                                                        </>
                                                            
                                                    ) :
                                                     null
                                                }
                                            </>
                                        }
                                        
                                        <div className="confirmation mt-2">
                                            <div className="form-check mb-2">
                                                <label htmlFor="residential">
                                                    <input type="checkbox" id="residential" checked={shipping_residential} onChange={() => setSresident(!shipping_residential)} className="form-check-input" />
                                                    <p>Please Note that Dawn Scientific Inc DO NOT ship any chemicals to home / Residential address. It will be cancelled without Notice and issue a full refund to your account</p> 
                                                </label>
                                            </div>
                                            {billErrors.resdetial &&
                                                <div className="message">
                                                    <p className="error">{billErrors.resdetial}</p>
                                                </div>
                                            }
                                            <div className="form-check mt-2 mb-2">
                                                <label htmlFor="term">
                                                    <input type="checkbox" id="term" checked={checkTerm} onChange={() => setCheckTerm(!checkTerm)} className="form-check-input" />
                                                    <p>By placing an order, I am confirming that I understand that Dawn Scientific's products are not for human or animal use and are not shipped to residential address and have read and agree with the <Link href="/billing-terms-and-conditions">terms and conditions</Link>.</p> 
                                                </label>
                                            </div>
                                            {billErrors.checkTerm &&
                                                <div className="message">
                                                    <p className="error">{billErrors.checkTerm}</p>
                                                </div>
                                            }
                                            {checkoutData?.products?.length>0 &&
                                                !checkoutData?.products[0].charges?.net_charge && billErrors.fedexError &&
                                                
                                                    <div className="message mt-1">
                                                        <p className="error">{checkoutData?.products[0].charges}</p>
                                                    </div>
                                                }
                                        </div>
                                    </div>
                                        <button className={`btn btn-primary w-100 ${isLoading ? 'loading' : ''}`} type="submit" onClick={placeOrder} aria-label="Place Order">{!isLoading ? ` ${(Number(orderLimit) < Number(checkoutData?.total)) && (orderLimit) ? "Submit Draft Order" : "Place Order"}` : ""}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </>
    )
}
