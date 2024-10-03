import React, { useContext, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, fetchFoodList, loading } = useContext(StoreContext);

  // Re-fetch food list every time the category changes
  useEffect(() => {
    fetchFoodList();
  }, [category]);

  // If loading, show a loading indicator
  if (loading) {
    return <p>Loading food items...</p>;
  }

  return (
    <div className="food-display" id="food-display">
      <div className="line-heading">
        <hr />
        <h2>Our Signature Dishes</h2>
        <hr />
      </div>

      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Explicit return when no match
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
