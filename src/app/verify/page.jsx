"use client"
import { useEffect, useState } from 'react';
import { useLoader } from '@/context/LoaderContext';

export default function Page()
{
    const { startLoading, stopLoading } = useLoader();
    
    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get('uid');
    const hash = searchParams.get('hash');

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [message, setMessage] = useState({
        type : true,
        value : "",
    })

    useEffect(() => {
        startLoading();
        const verfiyEmail = async ()=>{
            try{
                const response = await fetch(`${baseUrl}email/verify/${uid}/${hash}`);

                if(!response.ok){
                    throw new Error("Verification Failed");
                }
                const result = await response.json();
                    setMessage({
                        type : result.status,
                        value : result.message
                    })
            }catch(err){
                console.error(err)
            }finally{
                stopLoading();
            }
        }

        if(uid && hash){
            verfiyEmail();
        }
    }, [])
    return (
        <>
            <section className="thankyou page-title">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="thankyou-wrapper widget">
                            <div className="icon">
                                {message?.type ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="48" height="48"><path d="m16.298,8.288l1.404,1.425-5.793,5.707c-.387.387-.896.58-1.407.58s-1.025-.195-1.416-.585l-2.782-2.696,1.393-1.437,2.793,2.707,5.809-5.701Zm7.702,3.712c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z" fill="currentColor" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="48" height="48"><path d="m15.707,9.707l-2.293,2.293,2.293,2.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm8.293,2.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z" fill="currentColor" /></svg>
                                }
                            </div>
                            <div className="title">
                                {message?.type ? 
                                    <h2>{message.value}</h2> :      
                                    <div className="message">
                                        <h2 className="error">{message.value}</h2>
                                    </div>                         
                                }
                            </div>
                            <div className="btn-area">
                                {message?.type ? 
                                <NavLink to="/product-category" className="btn btn-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" fill="currentColor" /></svg>
                                    Go To Shopping 
                                </NavLink> :
                                <NavLink to="/register" className="btn btn-secondary">Register</NavLink>                             
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


