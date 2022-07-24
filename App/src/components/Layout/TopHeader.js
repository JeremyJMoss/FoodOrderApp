import HeaderCartButton from "./HeaderCartButton";
import classes from "./TopHeader.module.css"

const TopHeader = function(props){
    return (
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
    )
}

export default TopHeader;