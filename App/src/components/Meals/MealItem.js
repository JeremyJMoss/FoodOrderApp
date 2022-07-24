import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = function(props){
    const ctx = useContext(CartContext);

    const price = Intl.NumberFormat(navigator.language, 
        {style: "currency", currency: "AUD"}).format(props.price);
    
    const addToCartHandler = function(amount){
        ctx.addItem({
            id: props.id,
            name: props.title,
            amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.title}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem;