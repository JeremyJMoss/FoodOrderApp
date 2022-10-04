import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD"){
        let updatedItems, updatedItem;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        if (existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem   
        }
        else {
            updatedItems = state.items.concat(action.item);
        }
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    if (action.type === "REMOVE"){
        let updatedItems;
        const cartItemIndex = state.items.findIndex(item => item.id === action.id);
        const cartItem = state.items[cartItemIndex];
        const updatedTotalAmount = state.totalAmount - cartItem.price;
        if(cartItem.amount > 1){
            const updatedItem = {...cartItem, amount: cartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.filter((_, index) => index !== cartItemIndex);
        }
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    }
    if (action.type === "CLEAR"){
        return defaultCartState;
    }    
    return defaultCartState;   
}

const CartProvider = function(props){
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)
    
    const addItem = function(item){
        dispatchCart({type: "ADD", item})
    }
    
    const removeItem = function(id){
        dispatchCart({type: "REMOVE", id})
    }

    const clearCart = function(){
        dispatchCart({type: "CLEAR"});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem,
        removeItem,
        clearCart 
    }
    
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;