import { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = function(props){
    const ctx = useContext(CartContext);
    const [checkoutOpened, setCheckoutOpened] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = Intl.NumberFormat(
        navigator.language, 
        {
            style: "currency",
            currency: "AUD"
        }
        ).format(ctx.totalAmount.toFixed(2));

    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        ctx.addItem({...item, amount: 1});
    }

    const openForm = function(){
        setCheckoutOpened(true);
    }

    const cartItems = ctx.items.map(item => {
        return (
            <CartItem 
            name={item.name}
            price={item.price}
            amount={item.amount}
            key={item.id}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}/>
        )
    });

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={openForm}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <Fragment>
            <ul className={classes["cart-items"]}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {
                checkoutOpened 
                ? <Checkout isSubmitting={setIsSubmitting} didSubmit={setDidSubmit} onCancel={setCheckoutOpened} checkoutOpened={checkoutOpened}/>
                : modalActions
            }
        </Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <p>Successfully sent the order!</p>;
    
    return (
        <Modal onClick={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;