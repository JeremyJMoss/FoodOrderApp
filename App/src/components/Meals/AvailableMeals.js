import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";



const AvailableMeals = function(props){
  const [meals, setMeals] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect(() => {
    fetch("http://localhost:5000/food")
    .then(response => {
      if(!response.ok){
        throw new Error("Could not retrieve data from server")
      }
      return response.json()
    })
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
      setIsLoading(false);
    })
    .catch(err => {
      setHttpError(err);
      setIsLoading(false);
    })
  }, [])
    
  if (isLoading){
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError){
    return (
      <section className={classes.error}>
        <p>{httpError.message}</p>
      </section>
    )
  }

  return (
      <section className={classes.meals}>
          <Card>
            <ul>
                {meals}
            </ul>
          </Card>
      </section>
  )
}


export default AvailableMeals;
