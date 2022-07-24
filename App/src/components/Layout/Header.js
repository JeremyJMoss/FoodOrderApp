import { Fragment } from "react";
import TopHeader from "./TopHeader";
import MainImage from "./MainImage";

const Header = function(props){
    return (
        <Fragment>
            <TopHeader onShowCart={props.onShowCart}/>
            <MainImage />
        </Fragment>
    )
}

export default Header;