import classes from "./Checkout.module.css";
import useInput from "../../hooks/useInput";
import CheckoutFormInput from "./CheckoutFormInput";

const STATES = ["ACT", "NSW", "WA", "SA", "TAS", "QLD", "NT"];

const Checkout = function(props){
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
        IsValid: stateIsValid,
        changeHandler: stateChangeHandler,
        blurHandler: stateBlurHandler,
        resetHandler: stateResetHandler} = useInput((input) => {
            return checkForEmptyString(input) && STATES.includes(input.toUpperCase());
        })

    const cancel = function(event){
        event.preventDefault();
        props.onCancel(!props.checkoutOpened);
    }

    const confirmHandler = function(event){
        event.preventDefault();
        firstNameResetHandler();
        lastNameResetHandler();
        streetResetHandler();
        cityResetHandler();
        postCodeResetHandler();
        stateResetHandler();
    }
    
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <CheckoutFormInput 
            label="First Name" 
            type="text" 
            id="firstName" 
            value={firstName} 
            onBlur={firstNameBlurHandler} 
            onChange={firstNameChangeHandler}/>
            <CheckoutFormInput 
            label="Last Name" 
            type="text" 
            id="lastName" 
            value={lastName} 
            onBlur={lastNameBlurHandler} 
            onChange={lastNameChangeHandler}/>
            <CheckoutFormInput 
            label="Street"
            type="text" 
            id="street" 
            value={street} 
            onBlur={streetBlurHandler} 
            onChange={streetChangeHandler}/>
            <CheckoutFormInput 
            label="City" 
            type="text" 
            id="city" 
            value={city} 
            onBlur={cityBlurHandler} 
            onChange={cityChangeHandler}/>
            <CheckoutFormInput
            label="PostCode"
            type="text"
            id="postCode"
            value={postCode}
            onBlur={postCodeBlurHandler}
            onChange={postCodeChangeHandler}/>
            <CheckoutFormInput
            label="State"
            type="text"
            value={state}
            onBlur={stateBlurHandler}
            onChange={stateChangeHandler}/>
            <div className={classes.actions}>
                <button className={classes.submit} type="submit">Confirm</button>
                <button type="button" onClick={cancel}>Cancel</button>
            </div>
        </form>
    )
}

export default Checkout;