"use client";

import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext';
import AccountSidebar from '@/components/AccountSidebar';

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const { startLoading, stopLoading } = useLoader();

    const [orders, setOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}my-orders`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setOrders(result.data)
                setPendingOrders(result.data.filter((order) => {
                    return order.status == 'processing'
                }))
                setCompletedOrders(result.data.filter((order) => {
                    return order.status == 'completed'
                }))
            } catch (err) {
                console.log(err)
            }
        }
        fetchOrder();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${baseUrl}user`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setRole(result.data.role || "")
            stopLoading()
        }
        fetchUser();
    }, []);


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
                            <div className="widget">
                                <h4>Summary</h4>
                                <div className="row">
                                    <div className="col-md-33">
                                        <div className="dashboard-card violet">
                                            <div className="detail">
                                                <h2>{pendingOrders.length}</h2>
                                                <p>Pending Orders</p>
                                            </div>
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="28" height="28"><path d="M8,7H22.5a1.5,1.5,0,0,0,0-3H8A1.5,1.5,0,0,0,8,7Z" fill="currentColor" /><path d="M22.5,11H8a1.5,1.5,0,0,0,0,3H22.5a1.5,1.5,0,0,0,0-3Z" fill="currentColor" /><path d="M22.5,18H8a1.5,1.5,0,0,0,0,3H22.5a1.5,1.5,0,0,0,0-3Z" fill="currentColor" /><circle cx="2.5" cy="5.5" r="2.5" fill="currentColor" /><circle cx="2.5" cy="12" r="2.5" fill="currentColor" /><circle cx="2.5" cy="19" r="2.5" fill="currentColor" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-33">
                                        <div className="dashboard-card green">
                                            <div className="detail">
                                                <h2>{completedOrders.length}</h2>
                                                <p>Completed Orders</p>
                                            </div>
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><g id="_01_align_center" data-name="01 align center" fill="currentColor" ><path d="M20.164,13H5.419L4.478,5H12V3H4.242L4.2,2.648A3,3,0,0,0,1.222,0H0V2H1.222a1,1,0,0,1,.993.883L3.8,16.351A3,3,0,0,0,6.778,19H20V17H6.778a1,1,0,0,1-.993-.884L5.654,15H21.836l.9-5H20.705Z" fill="currentColor" /><circle cx="7" cy="22" r="2" fill="currentColor" /><circle cx="17" cy="22" r="2" fill="currentColor" /><path d="M17.078,8.542h.033a1.873,1.873,0,0,0,1.335-.553l5.261-5.261L22.293,1.314,17.112,6.5,14.868,4.16,13.427,5.546l2.306,2.4A1.872,1.872,0,0,0,17.078,8.542Z" fill="currentColor" /></g></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-33">
                                        <div className="dashboard-card red">
                                            <div className="detail">
                                                <h2>{role}</h2>
                                                <p>User Type</p>
                                            </div>
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="28">
                                                    <path d="M8,12c3.309,0,6-2.691,6-6S11.309,0,8,0,2,2.691,2,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm1.99,13.211c-.078,.547-.581,.927-1.131,.85-.284-.041-.574-.061-.859-.061-3.309,0-6,2.691-6,6v1c0,.552-.448,1-1,1s-1-.448-1-1v-1c0-4.411,3.589-8,8-8,.379,0,.763,.027,1.141,.081,.547,.078,.927,.584,.85,1.131Zm12.01-1.161v-.051c0-2.206-1.794-4-4-4s-4,1.794-4,4v.051c-1.14,.232-2,1.242-2,2.449v3.5c0,2.206,1.794,4,4,4h4c2.206,0,4-1.794,4-4v-3.5c0-1.207-.86-2.217-2-2.449Zm-4-2.051c1.103,0,2,.897,2,2h-4c0-1.103,.897-2,2-2Zm4,8c0,1.103-.897,2-2,2h-4c-1.103,0-2-.897-2-2v-3.5c0-.276,.224-.5,.5-.5h7c.276,0,.5,.224,.5,.5v3.5Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget">
                                <h4>Recent Orders</h4>
                                <div className='table_wrapper'>
                                    <table className="order">
                                        <thead>
                                            <tr>
                                                <th>#Order No</th>
                                                <th>Purchased Date</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders?.length ? (
                                                orders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td><span className="table-list-code">#{order.id}</span></td>
                                                        <td>{
                                                            (() => {
                                                                const [day, month, year] = order.created_date.split("T")[0].split("-");
                                                                return `${day}-${month}-${year}`;
                                                            })()}</td>
                                                        <td>${order.total}</td>
                                                        <td>
                                                            {order.status == 'processing' ?
                                                                <span className="badge badge-info">Processing</span> : (order.status == 'success') ?
                                                                    <span className="badge badge-success">Completed</span> : (order.status == 'cancelled') ?
                                                                        <span className="badge badge-dange">Canclled</span> : ''
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link href={`/user/order/${order.id}`} className="btn btn-outline btn-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) :
                                                <tr>
                                                    <td colSpan="5">
                                                        <h2 className="text-center">No Previous Orders</h2>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}