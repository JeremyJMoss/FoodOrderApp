import classes from "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(function(props, ref){
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} ref={ref}/>
        </div>
    )
})

export default Input;