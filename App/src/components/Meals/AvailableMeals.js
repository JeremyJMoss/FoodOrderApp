import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";



const AvailableMeals = function(props){
  const [meals, setMeals] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5000/food")
    .then(response => response.json())
    .then(food => {
    setMeals(food.map(meal => {
        return (
            <MealItem 
            key={meal.id}
            id={meal.id}
            title={meal.name}
            description={meal.description}
            price={meal.price} />
        )
      }))
    })
  }, [])
    
    return (
        <section className={classes.meals}>
            <Card>
              <ul>
                  {meals ? meals : <p className={classes.loading}>Loading...</p>}
              </ul>
            </Card>
        </section>
    )
}


export default AvailableMeals;
