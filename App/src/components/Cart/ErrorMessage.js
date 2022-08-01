import classes from "./ErrorMessage.module.css";

const ErrorMessage = function(props){
    return (
        <p className={classes.error}>{props.message}</p>
    )
}

export default ErrorMessage;