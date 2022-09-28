import { useContext } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/useInput";
import CheckoutFormInput from "./CheckoutFormInput";
import ErrorMessage from "./ErrorMessage";
import CartContext from "../../store/cart-context";

const STATES = ["ACT", "NSW", "WA", "SA", "TAS", "QLD", "NT"];

const Checkout = function(props){
    const ctx = useContext(CartContext);
    const checkForEmptyString = function(input){
        return input.trim() !== "";
    }

    //creating state variables outside of function using custom useInput hook
    const {
        value: firstName, 
        hasError: firstNameNotValid, 
        isValid: firstNameIsValid,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
        resetHandler: firstNameResetHandler} = useInput(checkForEmptyString);

    const {
        value: lastName,
        hasError: lastNameNotValid,
        isValid: lastNameIsValid,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
        resetHandler: lastNameResetHandler} = useInput(checkForEmptyString);
    
    const {
        value: street,
        hasError: streetNotValid,
        isValid: streetIsValid,
        changeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
        resetHandler: streetResetHandler} = useInput(checkForEmptyString);

    const {
        value: city,
        hasError: cityNotValid,
        isValid: cityIsValid,
        changeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
        resetHandler: cityResetHandler} = useInput(checkForEmptyString);
     
    const {
        value: postCode,
        hasError: postCodeNotValid,
        isValid: postCodeIsValid,
        changeHandler: postCodeChangeHandler,
        blurHandler: postCodeBlurHandler,
        resetHandler: postCodeResetHandler} = useInput((input) => {
            return checkForEmptyString(input) && input.trim().match(/^\d{4}$/);
        }) 
        
    const {
        value: state,
        hasError: stateNotValid,
        isValid: stateIsValid,
        changeHandler: stateChangeHandler,
        blurHandler: stateBlurHandler,
        resetHandler: stateResetHandler} = useInput((input) => {
            return checkForEmptyString(input) && STATES.includes(input.toUpperCase());
        })

    const formValid = firstNameIsValid && lastNameIsValid && streetIsValid && cityIsValid && postCodeIsValid && stateIsValid

    const cancel = function(event){
        event.preventDefault();
        props.onCancel(!props.checkoutOpened);
    }

    const confirmHandler = async function(event){
        event.preventDefault();

        props.isSubmitting(true);

        firstNameResetHandler();
        lastNameResetHandler();
        streetResetHandler();
        cityResetHandler();
        postCodeResetHandler();
        stateResetHandler();

        const userData = {
            userDetails: {
                firstName,
                lastName,
                street,
                city,
                postCode,
                state
            },
            foodOrder: ctx.items.map(item => {
                return {name: item.name, amount: item.amount, price: item.price};
            })
        }

        const response = await fetch("http://localhost:5000/order-details", {
            method: "POST",
            body: JSON.stringify(userData),
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        const data = await response.json();
        props.messageSetter(data.message);
        props.isSubmitting(false);
        props.didSubmit(true);
    }
    
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <CheckoutFormInput
            error={firstNameNotValid} 
            label="First Name" 
            type="text" 
            id="firstName" 
            value={firstName} 
            onBlur={firstNameBlurHandler} 
            onChange={firstNameChangeHandler}/>
            {firstNameNotValid && <ErrorMessage message="Please enter first name"/>}
            <CheckoutFormInput
            error={lastNameNotValid} 
            label="Last Name" 
            type="text" 
            id="lastName" 
            value={lastName} 
            onBlur={lastNameBlurHandler} 
            onChange={lastNameChangeHandler}/>
            {lastNameNotValid && <ErrorMessage message="Please enter last name"/>}
            <CheckoutFormInput
            error={streetNotValid} 
            label="Street"
            type="text" 
            id="street" 
            value={street} 
            onBlur={streetBlurHandler} 
            onChange={streetChangeHandler}/>
            {streetNotValid && <ErrorMessage message="Please enter street address"/>}
            <CheckoutFormInput 
            error={cityNotValid}
            label="City" 
            type="text" 
            id="city" 
            value={city} 
            onBlur={cityBlurHandler} 
            onChange={cityChangeHandler}/>
            {cityNotValid && <ErrorMessage message="Please enter city"/>}
            <CheckoutFormInput
            error={postCodeNotValid}
            label="PostCode"
            type="text"
            id="postCode"
            value={postCode}
            onBlur={postCodeBlurHandler}
            onChange={postCodeChangeHandler}/>
            {postCodeNotValid && <ErrorMessage message="Please enter valid postcode"/>}
            <CheckoutFormInput
            error={stateNotValid}
            label="State"
            type="text"
            value={state}
            onBlur={stateBlurHandler}
            onChange={stateChangeHandler}/>
            {stateNotValid && <ErrorMessage message="Please enter state"/>}
            <div className={classes.actions}>
                <button className={classes.submit} disabled={!formValid} type="submit">Confirm</button>
                <button type="button" onClick={cancel}>Cancel</button>
            </div>
        </form>
    )
}

export default Checkout;