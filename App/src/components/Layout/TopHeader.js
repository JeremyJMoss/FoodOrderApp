import HeaderCartButton from "./HeaderCartButton";
import classes from "./TopHeader.module.css"

const TopHeader = function(props){
    return (
        <header className={classes.header}>
            <h1>Chefs Kiss Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
    )
}

export default TopHeader;