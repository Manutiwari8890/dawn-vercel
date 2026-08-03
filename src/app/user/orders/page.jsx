"use client";
import {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import AccountSidebar from '@/components/AccountSidebar';
import { useLoader } from '@/context/LoaderContext';
import { AuthContext } from '@/context/AuthContext';

export default function Page()
{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const { startLoading, stopLoading } = useLoader();
    
    const [orders, setOrders] = useState([]); 


    useEffect(() => {
        startLoading();
                fetch(`${baseUrl}my-orders`, {
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
                    setOrders(result.data)
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching Orders data:', error);
                });
            }, 
        []);    

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
                                <h4>My Orders List</h4>
                                <div className='table_wrapper'>
                                    <table className="order">
                                        <thead>
                                            <tr>
                                                <th>#Order No</th>
                                                <th>Order Date</th>
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
                                                        })()}
                                                        </td>
                                                        <td>${order.total}</td>
                                                        <td>
                                                            {order.status=='pending' ? 
                                                                <span className="badge badge-info">Pending</span> : (order.status=='completed') ?
                                                                <span className="badge badge-success">Completed</span> : (order.status=='cancelled') ?
                                                                <span className="badge badge-danger">Canclled</span> :  (order.status=="draft") ?
                                                                <span className="badge badge-warning">Draft</span> :  (order.status=="processing") ?
                                                                <span className="badge badge-processing">Processing</span> : ''
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