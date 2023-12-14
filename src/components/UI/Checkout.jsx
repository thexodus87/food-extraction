import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import Button from "./Button";
import { UserProgressContext } from "../../store/UserProgress";
import useHttp from "../../hooks/useHTTP";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 0
    );
    function handleClose() {
        userProgressCtx.hideCheckOut();
    }
    function handleFinish(){
        userProgressCtx.hideCheckOut();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                },
            })
        );

    }

    let actions = (
        <>
            <Button type='button' textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );
    if(isSending){
        actions = <span>
            Fatih gönderiliyor
        </span>
    }
    if(data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose} >
            <h2>Fatih</h2>
            <p>Siparişiniz Ballım</p>
            <p>bla bla</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Tamam</Button>
            </p>
        </Modal>
    }
    return <Modal open={userProgressCtx.progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label='Full Name' type='text' id='name' />
            <Input label='E-Mail' type='email' id='email' />
            <Input label='Street' type='text' id='street' />
            <div className="control-row">
                <Input label='Postal Code' type='text' id='postal-code' />
                <Input label='City' type='text' id='city' />
            </div>
            {error && <Error title='failed to submit orders' message={error} />}
            <p className="modal-actions">
            {actions}
            </p>
        </form>
    </Modal>
}