import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgress"; // Update this line
import Button from "./UI/Button";
import CartItem from "./UI/CartItem";

// ... (imports)

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckOut();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}>
      <h2>Sepetiniz</h2>
      <ul>
        {cartCtx.items.map((item, index) => {
          const key = `${item.id}-${item.name.replace(/\s+/g, '-')
            .toLowerCase()}-quantity${item.quantity}-${index}`;
          // console.log('Item:', item);
          // console.log('Key:', key);

          return (
            <CartItem
              key={key}
              item={item}  // Pass the entire item object
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {cartCtx.items.length > 0 && (
        <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
        
      </p>
    </Modal>
  );
}
