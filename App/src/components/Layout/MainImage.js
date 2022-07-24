import mealsImage from "../../assets/meals.jpg";
import classes from "./MainImage.module.css";

const MainImage = function(props){
    return (
        <figure className={classes["main-image"]}>
            <img src={mealsImage} alt="A table full of delicious food!"/>
        </figure>
    )
}
        
export default MainImage;