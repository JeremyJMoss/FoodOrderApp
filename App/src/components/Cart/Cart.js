import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = function(props){
    const ctx = useContext(CartContext);
    
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

    const sendToServer = async function(){
        console.log(ctx.items);
        const response = await fetch("http://localhost:5000/food", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ctx.items)
        })
        const data = await response.json();
        console.log(data);

    }
    
    return (
        <Modal onClick={props.onHideCart}>
            <ul className={classes["cart-items"]}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={classes.button} onClick={sendToServer}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;