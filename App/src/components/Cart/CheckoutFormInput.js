import classes from "./CheckoutFormInput.module.css";

const CheckoutFormInput = function(props){
    return (
        <div className={classes.control}>
            <label htmlFor={props.id}>{props.label}</label>
            <input 
            type={props.type} 
            id={props.id} 
            value={props.value} 
            onBlur={props.onBlur} 
            onChange={props.onChange}/>
        </div>
    )
}

export default CheckoutFormInput;