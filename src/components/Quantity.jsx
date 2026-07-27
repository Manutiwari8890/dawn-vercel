import React, { useState, useEffect } from 'react';

function Quantity({ quantity, setQuantity, label})
{
    //const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState(null)
    const handleIncrement = () => {
        if(quantity <10)
        {
            const qty = quantity+1;
            setQuantity(qty);
        }
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            const qty = quantity-1;
            setQuantity(qty);
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        /*let val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1) {
                        setQuantity(val);
                    }*/
    };

   /* useEffect(() => {
        if (onChange) {
            onChange(quantity);
        }
    }, [quantity, onChange]);
*/

    return (
            <div className="quantity">
                <input type="button" className="minus" value="-" onClick={handleDecrement} aria-label="Decrease Number" />
                <input type="number" min="1" className="q-value" value={quantity} onChange={handleInputChange} readOnly />
                <input type="button" className="plus" value="+" onClick={handleIncrement} aria-label="Increase Number" />
                {label && <h5>Quantity</h5>}
            </div>        
    )
}

export default Quantity;