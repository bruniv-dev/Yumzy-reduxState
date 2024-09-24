import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";

const FoodItem = ({ id, name, price, description, image }) => {
  // const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-container-img">
        <div className="image-div">
          <img
            className="food-item-image"
            src={`${url}/images/${image}`}
            alt=""
          />
          {/* <img className="food-item-image" src={image} alt="" /> */}
        </div>

        {!cartItems[id] ? (
          // <img
          //   className="add"
          //   src={assets.add_icon_white}
          //   alt=""
          //   onClick={() => addToCart(id)}
          // />
          <FaCirclePlus className="add" onClick={() => addToCart(id)} />
        ) : (
          <div className="food-item-counter">
            {/* <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            /> */}
            <FaCircleMinus
              className="remove-icon icon"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            {/* <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            /> */}
            <FaCirclePlus
              className="add-icon icon"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {/* <img src={assets.rating_starts} alt="" /> */}
          <img src={assets.rating_stars_yellow} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">&#8377; {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

//with itemcount
// return (
//   <div className="food-item">
//     <div className="food-item-container-img">
//       <img className="food-item-image" src={image} alt="" />
//       {!itemCount ? (
//         <img
//           className="add"
//           src={assets.add_icon_white}
//           alt=""
//           onClick={() => setItemCount((prev) => prev + 1)}
//         />
//       ) : (
//         <div className="food-item-counter">
//           <img
//             onClick={() => setItemCount((prev) => prev - 1)}
//             src={assets.remove_icon_red}
//             alt=""
//           />
//           <p>{itemCount}</p>
//           <img
//             onClick={() => setItemCount((prev) => prev + 1)}
//             src={assets.add_icon_green}
//             alt=""
//           />
//         </div>
//       )}
//     </div>
//     <div className="food-item-info">
//       <div className="food-item-name-rating">
//         <p>{name}</p>
//         <img src={assets.rating_starts} alt="" />
//       </div>
//       <p className="food-item-description">{description}</p>
//       <p className="food-item-price">&#8377; {price}</p>
//     </div>
//   </div>
// );
// };

// export default FoodItem;
