import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";



const HeaderCartButton = function(props){
    const ctx = useContext(CartContext);

    const totalItems = ctx.items.reduce((acc, item) => acc += item.amount, 0);

    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;

    useEffect(() => {
        if (ctx.items.length === 0) return;
        
        setBtnHighlighted(true);
        
        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);
        
        return () => {
            clearTimeout(timer);
        }
        
    }, [ctx.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {totalItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;