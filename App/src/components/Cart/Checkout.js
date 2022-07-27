import classes from "./Checkout.module.css";

const Checkout = function(props){
    const cancel = function(event){
        event.preventDefault();
        props.onCancel(!props.checkoutOpened);
    }

    const sendToServer = function(event){
        event.preventDefault();
        console.log(event);
    }
    
    return (
        <form onSubmit={sendToServer}>
            <div className={classes.control}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName"/>
            </div>
            <div className={classes.control}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName"/>
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street"/>
            </div>
            <div className={classes.control}>
                <label htmlFor="postcode">PostCode</label>
                <input type="text" id="postcode"/>
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" id="city"/>
            </div>
            <div className={classes.control}>
                <label htmlFor="state">State</label>
                <input type="text" id="state"/>
            </div>
            <button type="submit">Confirm</button>
            <button onClick={cancel}>Cancel</button>
        </form>
    )
}

export default Checkout;