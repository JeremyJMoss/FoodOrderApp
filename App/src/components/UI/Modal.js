import classes from "./Modal.module.css";
import { Fragment } from "react";
import { createPortal } from "react-dom";

const Backdrop = function(props){
    return <div className={classes.backdrop} onClick={props.onClick}/>;
}

const ModalOverlay = function(props){
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>

        </div>
    )
    
}

const portalEl = document.getElementById("overlays");
const Modal = function(props){
    
    return (
        <Fragment>
            {createPortal(<Backdrop onClick={props.onClick}/>, portalEl)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
        </Fragment>
    )
}

export default Modal;