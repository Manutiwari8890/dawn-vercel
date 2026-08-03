import Link from 'next/link';
import { useContext, useState } from 'react'
import { CartContext } from '../context/cart'
import { AuthContext } from '../context/AuthContext';

function Sidebar({ isActive, onClose }){
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, isCartOpen } = useContext(CartContext)
    const { user, logout, isLoggedIn } = useContext(AuthContext);

    const [loadingButton, setLoadingButton] = useState(null);
    const handleRemove = async (id)=>{
        setLoadingButton(id);
        let res = await removeFromCart(id)
        if(res){
            setLoadingButton(null)
        }
    }
    return (
        <>
            <div className={`cart-sidebar ${(isActive || isCartOpen) ? 'active' : ''}`}>
                <div className="sidebar-wrapper">
                    <div className="products-wrapper">
                        <div className="wrap-title">
                            <h2>Shopping Cart</h2>
                            <button className="close-cart" onClick={onClose} aria-label="Close Cart">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>
                            </button>      
                        </div>
                        {(cartItems && cartItems.length < 1 && (
                            <div className="empty">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="100px" width="100px" version="1.1" id="Capa_1" viewBox="0 0 231.523 231.523" xmlSpace="preserve">
                                    <g>
                                        <path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231   l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z"/>
                                        <path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468   c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468   C147.235,148.377,150.23,152.062,154.351,152.488z"/>
                                        <path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221   c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523   c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215   C104.494,212.835,100.808,216.523,96.278,216.523z"/>
                                        <path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221   c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523   c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215   C181.937,212.835,178.251,216.523,173.719,216.523z"/>
                                        <path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046   c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z    M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z"/>
                                        <path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607   L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z"/>
                                        <path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606   c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607   C155.338,54.314,157.256,55.045,159.174,55.045z"/>
                                        <path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502   c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z"/>
                                    </g>
                                </svg>
                            </div>
                        ))}
                        
                        {(cartItems && cartItems.length > 0 && (
                            <ul className="cart-list">
                                {cartItems.map((item) => ( 
                                    <li key={item.id}>
                                        <div className="cart-item">
                                            <div className="item-details">
                                                <div className="cart-img">
                                                    <Link href={`/product/${item?.slug}`} onClick={onClose}><img src={item?.image_url} width="60" height="60"  loading="lazy"  /></Link>
                                                </div>
                                                <div className="cart-info">
                                                    <h4><Link href={`/product/${item?.slug}`} onClick={onClose}>{item?.name}</Link></h4>
                                                    <p className="cart-qty">{item?.quantity}x - <span className="cart-amount">
                                                        ${isLoggedIn ? 
                                                            item.discounted_price :
                                                            item.price
                                                        }
                                                        </span></p>
                                                </div>
                                            </div>
                                            <button className="remove-item" title="Remove this item" onClick={() => handleRemove(item?.id)} aria-label="Remove Cart Item">
                                                {loadingButton === item?.id ? 
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="loading" width="16" height="16"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>
                                                }
                                            </button>
                                        </div>
                                    </li>
                                ))}
                                
                                
                            </ul>
                        ))}
                    </div>
                    {(cartItems && cartItems.length > 0 && (
                        <div className="wrap-footer">
                            <div className="total">
                                <h3>Total</h3>
                                <h3 className="price">${getCartTotal()}</h3>
                            </div>
                            <div className="d-flex gap-20">
                                <Link href="/cart" className="btn btn-primary" onClick={onClose}>View Cart</Link>
                                <Link href="/checkout" className="btn btn-secondary" onClick={onClose}>Checkout</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar;