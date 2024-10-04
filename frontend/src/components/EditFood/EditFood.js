// // import React, { useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import "./EditFood.css";

// // const Edit = ({ url, food, onClose, fetchList }) => {
// //   const [image, setImage] = useState(null); // State for the selected file
// //   const [data, setData] = useState({
// //     name: food.name,
// //     description: food.description,
// //     price: food.price,
// //     category: food.category,
// //   });

// //   const onChangeHandler = (event) => {
// //     const { name, value } = event.target;
// //     setData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const onImageChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       setImage(file); // Set the selected file
// //     }
// //   };

// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();

// //     // Create FormData object to hold form data and file
// //     const formData = new FormData();
// //     formData.append("id", food._id); // Include food ID
// //     formData.append("name", data.name);
// //     formData.append("description", data.description);
// //     formData.append("price", Number(data.price)); // Ensure price is a number
// //     formData.append("category", data.category);
// //     if (image) {
// //       formData.append("image", image); // Append the new image if selected
// //     }

// //     try {
// //       const response = await axios.put(
// //         `${url}/api/food/edit/${food._id}`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data", // Set content type for file uploads
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         toast.success("Food item updated successfully!");
// //         fetchList(); // Refresh the food list
// //         onClose(); // Close the popup
// //       } else {
// //         toast.error("Error updating food item");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("An error occurred while updating the food item.");
// //     }
// //   };

// //   return (
// //     <form onSubmit={onSubmitHandler}>
// //       <div className="edit-img-upload">
// //         <p>Upload Image</p>
// //         <label htmlFor="image">
// //           <img
// //             src={image ? URL.createObjectURL(image) : food.image} // Display existing image or uploaded image
// //             alt="Upload preview"
// //             style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust the image size as needed
// //           />
// //           <input type="file" id="image" onChange={onImageChange} hidden />
// //         </label>
// //       </div>
// //       <div>
// //         <label>Name</label>
// //         <input
// //           type="text"
// //           name="name"
// //           value={data.name}
// //           onChange={onChangeHandler}
// //         />
// //       </div>
// //       <div>
// //         <label>Description</label>
// //         <textarea
// //           name="description"
// //           value={data.description}
// //           onChange={onChangeHandler}
// //         ></textarea>
// //       </div>
// //       <div>
// //         <label>Price</label>
// //         <input
// //           type="number"
// //           name="price"
// //           value={data.price}
// //           onChange={onChangeHandler}
// //         />
// //       </div>
// //       <div>
// //         <label>Category</label>
// //         <select
// //           name="category"
// //           value={data.category}
// //           onChange={onChangeHandler}
// //         >
// //           <option value="Salad">Salad</option>
// //           <option value="Rolls">Rolls</option>
// //           <option value="Deserts">Deserts</option>
// //           <option value="Sandwich">Sandwich</option>
// //           <option value="Cake">Cake</option>
// //           <option value="Pure Veg">Pure Veg</option>
// //           <option value="Pasta">Pasta</option>
// //           <option value="Noodles">Noodles</option>
// //         </select>
// //       </div>
// //       <button type="submit">Save</button>
// //       <button type="button" onClick={onClose}>
// //         Cancel
// //       </button>
// //     </form>
// //   );
// // };

// // export default Edit;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import "./EditFood.css"; // Make sure this file exists with correct styles

// // const EditFood = ({ url, food, onClose, fetchList }) => {
// //   const [image, setImage] = useState(null); // State for the selected file
// //   const [data, setData] = useState({
// //     name: food.name,
// //     description: food.description,
// //     price: food.price,
// //     category: food.category,
// //   });

// //   const onChangeHandler = (event) => {
// //     const { name, value } = event.target;
// //     setData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const onImageChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       setImage(file); // Set the selected file
// //     }
// //   };

// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();

// //     // Create FormData object to hold form data and file
// //     const formData = new FormData();
// //     formData.append("id", food._id); // Include food ID
// //     formData.append("name", data.name);
// //     formData.append("description", data.description);
// //     formData.append("price", Number(data.price)); // Ensure price is a number
// //     formData.append("category", data.category);
// //     if (image) {
// //       formData.append("image", image); // Append the new image if selected
// //     }

// //     try {
// //       const response = await axios.put(
// //         `${url}/api/food/edit/${food._id}`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data", // Set content type for file uploads
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         toast.success("Food item updated successfully!");
// //         fetchList(); // Refresh the food list
// //         onClose(); // Close the popup
// //       } else {
// //         toast.error("Error updating food item");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("An error occurred while updating the food item.");
// //     }
// //   };

// //   return (
// //     <form onSubmit={onSubmitHandler} className="edit-food-form">
// //       <div className="row-1">
// //         <div className="right">
// //           <div>
// //             <label>Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={data.name}
// //               onChange={onChangeHandler}
// //             />
// //           </div>

// //           <div>
// //             <label>Category</label>
// //             <select
// //               name="category"
// //               value={data.category}
// //               onChange={onChangeHandler}
// //             >
// //               <option value="Starters">Starters</option>
// //               <option value="Biriyani">Biriyani</option>
// //               <option value="Desserts">Desserts</option>
// //               <option value="Meals">Meals</option>
// //               <option value="Pizza">Pizza</option>
// //               <option value="Tiffin">Tiffin</option>
// //               <option value="Pasta">Pasta</option>
// //               <option value="Noodles">Noodles</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label>Description</label>
// //             <textarea
// //               name="description"
// //               value={data.description}
// //               onChange={onChangeHandler}
// //               rows={3}
// //             ></textarea>
// //           </div>
// //         </div>
// //         <div className="left">
// //           <div className="edit-img-upload">
// //             <label>Upload Image</label>
// //             <label htmlFor="image">
// //               <img
// //                 src={image ? URL.createObjectURL(image) : food.image} // Display existing image or uploaded image
// //                 alt="Upload preview"
// //                 className="image-preview" // Use a class for consistent styling
// //               />
// //               <input type="file" id="image" onChange={onImageChange} hidden />
// //             </label>
// //           </div>
// //           <div>
// //             <label>Price</label>
// //             <input
// //               type="number"
// //               name="price"
// //               value={data.price}
// //               onChange={onChangeHandler}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <div className="buttons">
// //         <button type="submit">Save</button>
// //         <button type="button" onClick={onClose}>
// //           Cancel
// //         </button>
// //       </div>
// //     </form>
// //   );
// // };

// // export default EditFood;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./EditFood.css"; // Make sure this file exists with correct styles

// const EditFood = ({ url, food, onClose, fetchList }) => {
//   const [image, setImage] = useState(null); // State for the selected file
//   const [data, setData] = useState({
//     name: food.name,
//     description: food.description,
//     price: food.price,
//     category: food.category,
//   });

//   const maxDescriptionLength = 250; // Set max length for description

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;

//     // For description, restrict to max length
//     if (name === "description" && value.length > maxDescriptionLength) {
//       return; // Prevent updating if it exceeds max length
//     }

//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const onImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file); // Set the selected file
//     }
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     // Create FormData object to hold form data and file
//     const formData = new FormData();
//     formData.append("id", food._id); // Include food ID
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price)); // Ensure price is a number
//     formData.append("category", data.category);
//     if (image) {
//       formData.append("image", image); // Append the new image if selected
//     }

//     try {
//       const response = await axios.put(
//         `${url}/api/food/edit/${food._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Set content type for file uploads
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("Food item updated successfully!");
//         fetchList(); // Refresh the food list
//         onClose(); // Close the popup
//       } else {
//         toast.error("Error updating food item");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while updating the food item.");
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="edit-food-form">
//       <div className="row-1">
//         <div className="right">
//           <div>
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={onChangeHandler}
//             />
//           </div>

//           <div>
//             <label>Category</label>
//             <select
//               name="category"
//               value={data.category}
//               onChange={onChangeHandler}
//             >
//               <option value="Starters">Starters</option>
//               <option value="Biriyani">Biriyani</option>
//               <option value="Desserts">Desserts</option>
//               <option value="Meals">Meals</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Tiffin">Tiffin</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//           </div>

//           <div>
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={data.description}
//               onChange={onChangeHandler}
//               rows={3}
//             ></textarea>
//             <p className="char-counter">
//               {data.description.length}/{maxDescriptionLength} characters
//             </p>
//           </div>
//         </div>
//         <div className="left">
//           <div className="edit-img-upload">
//             <label>Upload Image</label>
//             <label htmlFor="image">
//               <img
//                 src={image ? URL.createObjectURL(image) : food.image} // Display existing image or uploaded image
//                 alt="Upload preview"
//                 className="image-preview" // Use a class for consistent styling
//               />
//               <input type="file" id="image" onChange={onImageChange} hidden />
//             </label>
//           </div>
//           <div>
//             <label>Price</label>
//             <input
//               type="number"
//               name="price"
//               value={data.price}
//               onChange={onChangeHandler}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="buttons">
//         <button type="submit">Save</button>
//         <button type="button" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditFood;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditFood.css"; // Make sure this file exists with correct styles

const EditFood = ({ url, food, onClose, fetchList }) => {
  const [image, setImage] = useState(null); // State for the selected file
  const [data, setData] = useState({
    name: food.name,
    description: food.description,
    price: food.price,
    category: food.category,
  });
  const [isLoading, setIsLoading] = useState(false);
  const maxDescriptionLength = 250; // Set max length for description

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    // For description, restrict to max length including paste
    if (name === "description") {
      // Slice the value to the max length
      const trimmedValue = value.slice(0, maxDescriptionLength);
      setData((prevData) => ({
        ...prevData,
        [name]: trimmedValue,
      }));
      return;
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set the selected file
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Create FormData object to hold form data and file
    const formData = new FormData();
    formData.append("id", food._id); // Include food ID
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price)); // Ensure price is a number
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image); // Append the new image if selected
    }

    try {
      const response = await axios.put(
        `${url}/api/food/edit/${food._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file uploads
          },
        }
      );

      if (response.data.success) {
        toast.success("Food item updated successfully!");
        fetchList(); // Refresh the food list
        onClose(); // Close the popup
      } else {
        toast.error("Error updating food item");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the food item.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="edit-food-form">
      <div className="row-1">
        <div className="right">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label>Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Starters">Starters</option>
              <option value="Biriyani">Biriyani</option>
              <option value="Desserts">Desserts</option>
              <option value="Meals">Meals</option>
              <option value="Pizza">Pizza</option>
              <option value="Tiffin">Tiffin</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows={3}
            ></textarea>
            <p className="char-counter">
              {data.description.length}/{maxDescriptionLength} characters
            </p>
          </div>
        </div>
        <div className="left">
          <div className="edit-img-upload">
            <label>Upload Image</label>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : food.image} // Display existing image or uploaded image
                alt="Upload preview"
                className="image-preview" // Use a class for consistent styling
              />
              <input type="file" id="image" onChange={onImageChange} hidden />
            </label>
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditFood;
