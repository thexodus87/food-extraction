import React from 'react';
import { currencyFormatter } from "../../util/formatting";

export default function CartItem({ item, onIncrease, onDecrease }) {
    const handleDecrease = () => {
        console.log("Decrease clicked", item);
        onDecrease(item);
    };

    // console.log("Rendering CartItem", item);

    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={handleDecrease}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item)}>+</button>
            </p>
        </li>
    );
}
