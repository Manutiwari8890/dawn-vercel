"use client"

import {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext';
import AccountSidebar from '@/components/AccountSidebar';


export default function Page()
{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const token = user?.access_token;
    const { startLoading, stopLoading } = useLoader();
    const [userDetail, setUserDetail] = useState(null);
    let {id} = useParams()

    const [orderDetails, setOrderDetails]  = useState([]);

    const getOptions = {
        method: "GET",
        headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
    };

    useEffect(() => {
        startLoading();
                fetch(`${baseUrl}my-orders/${id}`, getOptions)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setOrderDetails(result.data.order)
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                });
            }, 
        []);

    useEffect(() => {
        const fetchUser = async () => {
            startLoading();
            try{
                const response = await fetch(`${baseUrl}user`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                })

                if(!response.ok){
                    throw new Error("User Fetch Failed !")
                }

                const result = await response.json();
                setUserDetail(result?.data)
            }catch(err){
                console.log(err)
            }finally{
                stopLoading();
            }
        }

        fetchUser();
    }, [])    

    return (
        <>
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
                            {orderDetails?.status == "draft" && userDetail?.company?.id && orderDetails?.user?.id &&
                                <div className="widget">
                                    <h3>Order By <span className="text-orange-500">{orderDetails?.user?.name}</span></h3>
                                </div>
                            }
                            <div className="widget">
                                <h4>Order Details (#{orderDetails?.details?.order_id})</h4>
                                <table className="order">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Sub Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails && orderDetails?.items?.map((item) => (
                                            <tr key={item.id}>
                                                <td><Link href=""><img src={item?.product.image_url} alt=""  loading="lazy" /></Link></td>
                                                <td><Link href={`/product/${item.product.slug}`}>{item.product.name}</Link></td>
                                                <td>${item.discounted_price}</td>
                                                <td><span className="quan">x {item.quantity}</span></td>
                                                <td><b>${item.total_price}</b></td>
                                            </tr>
                                        ))}
                                        
                                        
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-md-10">
                                    <div className="widget">
                                        <h4>Billing Address</h4>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_first_name || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_last_name || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Company</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_company || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_phone || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_email || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Conutry</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_country || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Address 1</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_address_1 || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_city || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_state || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Postcode</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.billing_postcode || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </form>
                                    </div>
                                    
                                    <div className="widget">
                                        <h4>Shipping Address</h4>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_first_name || orderDetails?.details?.billing_first_name || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_last_name || orderDetails?.details?.billing_last_name || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Company</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_company || orderDetails?.details?.billing_company || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Conutry</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_country || orderDetails?.details?.billing_country || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Address 1</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_address_1 || orderDetails?.details?.billing_address_1 || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_city || orderDetails?.details?.shipping_city || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_state || orderDetails?.details?.billing_state || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Postcode</label>
                                                        <input className="form-control" type="text" value={orderDetails?.details?.shipping_postcode || orderDetails?.details?.billing_postcode || ""} readOnly={true} />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </form>
                                    </div>

                                </div>
                                <div className="col-md-5">
                                    <div className="widget">
                                        <h4>Order Summary</h4>
                                        <table className="order">
                                            <tbody>
                                                {Number(orderDetails?.fuel_surcharge?.replace(/,/g, ""))>0 ? 
                                                    <tr>
                                                        <th>Fuel Surcharges</th>
                                                        <td>+ ${orderDetails?.fuel_surcharge}</td>
                                                    </tr> : null
                                                }
                                                {Number(orderDetails?.packing_handling_charges?.replace(/,/g, "")>0) ?
                                                    <tr>
                                                        <th>Packing & Handling Charges</th>
                                                        <td>+ ${orderDetails?.packing_handling_charges}</td>
                                                    </tr> : null
                                                }
                                                {Number(orderDetails?.tariff?.replace(/,/g, ""))>0 ? 
                                                    <tr>
                                                        <th>Tariff Charge</th>
                                                        <td>+ ${orderDetails?.tariff} ({orderDetails?.tariff_charge}%)</td>
                                                    </tr> : null
                                                }
                                                {Number(orderDetails?.hazmat_charges?.replace(/,/g, ""))>0 ? 
                                                    <tr>
                                                        <th>Hazmat Charges</th>
                                                        <td>+ ${orderDetails?.hazmat_charges}</td>
                                                    </tr> : null
                                                }
                                                <tr>
                                                    <th>You Save</th>
                                                    <td className="price"> ${orderDetails?.user_discount}</td>
                                                </tr>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td>${orderDetails.subtotal}</td>
                                                </tr>
                                                {orderDetails.coupon_discount != "0.00" && 
                                                    <tr>
                                                        <th>Coupon Discount</th>
                                                        <td>-${orderDetails.coupon_discount} <span className="badge badge-primary">{orderDetails.coupon_code}</span></td>
                                                    </tr>
                                                }
                                                <tr>
                                                    <th>Total</th>
                                                    <td><b>${orderDetails.total}</b></td>
                                                </tr>
                                                <tr>
                                                    <th>status</th>
                                                    <td>
                                                        {orderDetails.status == 'pending' || orderDetails.status == 'processing' ?
                                                            <span className="badge badge-info">{orderDetails.status}</span> : (orderDetails.status == 'success') ?
                                                                <span className="badge badge-success">Completed</span> : (orderDetails.status == 'cancelled') ?
                                                                    <span className="badge badge-dange">Canclled</span> : (orderDetails.status == 'draft') ?
                                                                    <span className="badge badge-warning">Draft</span> : ''
                                                        }
                                                    </td>
                                                </tr>
                                                {(orderDetails?.status == "draft" && userDetail?.company?.id) ?
                                                    <tr>
                                                        <td colSpan="2">
                                                            <Link href={`/checkout?order_id=${btoa(orderDetails?.id)}`} className="btn btn-primary w-100">Checkout</Link>
                                                        </td>
                                                    </tr> : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
