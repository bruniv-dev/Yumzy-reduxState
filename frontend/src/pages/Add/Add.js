// import React, { useState } from "react";
// import "./Add.css"; // Make sure your CSS file is correctly linked
// import { assets } from "../../assets/assets"; // Adjust according to your project structure
// import axios from "axios";
// import { toast } from "react-toastify";
// import SideBar from "../../components/SideBar/SideBar";

// const Add = ({ url }) => {
//   const [image, setImage] = useState(null); // Use null to indicate no image selected
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Starters",
//   });

//   const maxDescriptionLength = 280;

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     if (name === "description" && value.length > maxDescriptionLength) {
//       return; // Do not update the state if it exceeds max length
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

//     // Create a FormData object to hold the form data
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("image", image); // Append the image file
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);

//     try {
//       // Make the API request to add food
//       const response = await axios.post(`${url}/api/food/add`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Important for file uploads
//         },
//       });

//       console.log(response);
//       if (response.data.success) {
//         // Reset form fields
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Starters",
//         });
//         setImage(null); // Reset the image state
//         toast.success(response.data.message); // Show success message
//       } else {
//         toast.error(response.data.message); // Show error message
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while adding the food item."); // Show generic error message
//     }
//   };

//   const onCancelHandler = (event) => {
//     event.preventDefault();
//     setData({
//       name: "",
//       description: "",
//       price: "",
//       category: "Starters",
//     });
//     setImage(null);
//     toast.info("Form reset successfully!");
//   };

//   return (
//     <div className="add-full-page">
//       <SideBar />
//       <div className="add">
//         <form onSubmit={onSubmitHandler}>
//           <div className="row-1">
//             <div className="add-right">
//               <div className="add-product-name flex-col">
//                 <p>Product Name</p>
//                 <input
//                   type="text"
//                   name="name"
//                   onChange={onChangeHandler}
//                   value={data.name}
//                   required
//                 />
//               </div>

//               <div className="add-category flex-col">
//                 <p>Product Category</p>
//                 <select
//                   name="category"
//                   onChange={onChangeHandler}
//                   value={data.category}
//                 >
//                   <option value="Starters">Starters</option>
//                   <option value="Biriyani">Biriyani</option>
//                   <option value="Desserts">Desserts</option>
//                   <option value="Meals">Meals</option>
//                   <option value="Pizza">Pizza</option>
//                   <option value="Tiffin">Tiffin</option>
//                   <option value="Pasta">Pasta</option>
//                   <option value="Noodles">Noodles</option>
//                 </select>
//               </div>
//               {/* <div className="add-product-description flex-col">
//                 <p>Product Description</p>
//                 <textarea
//                   rows="3"
//                   name="description"
//                   required
//                   onChange={onChangeHandler}
//                   value={data.description}
//                 ></textarea>
//               </div> */}
//               <div className="add-product-description flex-col">
//                 <p>Product Description</p>
//                 <textarea
//                   rows="3"
//                   name="description"
//                   maxLength={maxDescriptionLength}
//                   required
//                   onChange={onChangeHandler}
//                   value={data.description}
//                 ></textarea>
//                 <p className="char-counter">
//                   {data.description.length}/{maxDescriptionLength} characters
//                 </p>
//               </div>
//             </div>
//             <div className="add-left">
//               <div className="add-img-upload">
//                 <p>Upload Image</p>
//                 <label htmlFor="image">
//                   <img
//                     src={
//                       image ? URL.createObjectURL(image) : assets.upload_grey
//                     }
//                     alt="Upload preview"
//                   />
//                   <input
//                     type="file"
//                     id="image"
//                     onChange={onImageChange}
//                     hidden
//                     required
//                   />
//                 </label>
//               </div>
//               <div className="add-price flex-col">
//                 <p>Product Price</p>
//                 <input
//                   type="number"
//                   onChange={onChangeHandler}
//                   value={data.price}
//                   name="price"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="add-form-buttons">
//             <button type="submit" className="add-button">
//               Add
//             </button>
//             <button onClick={onCancelHandler} className="cancel-button">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add;

import React, { useState } from "react";
import "./Add.css"; // Make sure your CSS file is correctly linked
import { assets } from "../../assets/assets"; // Adjust according to your project structure
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "../../components/SideBar/SideBar";

const Add = ({ url }) => {
  const [image, setImage] = useState(null); // Use null to indicate no image selected
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Starters",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const maxDescriptionLength = 250;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "description" && value.length > maxDescriptionLength) {
      return; // Do not update the state if it exceeds max length
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

    setIsSubmitting(true); // Set isSubmitting to true during form submission

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image); // Append the image file
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    try {
      // Make the API request to add food
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      console.log(response);
      if (response.data.success) {
        // Reset form fields
        setData({
          name: "",
          description: "",
          price: "",
          category: "Starters",
        });
        setImage(null); // Reset the image state
        toast.success(response.data.message); // Show success message
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the food item."); // Show generic error message
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after form submission completes
    }
  };

  const onCancelHandler = (event) => {
    event.preventDefault();
    setData({
      name: "",
      description: "",
      price: "",
      category: "Starters",
    });
    setImage(null);
    toast.info("Form reset successfully!");
  };

  return (
    <div className="add-full-page">
      <SideBar />
      <div className="add">
        <form onSubmit={onSubmitHandler}>
          <div className="row-1">
            <div className="add-right">
              <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input
                  type="text"
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
              </div>

              <div className="add-category flex-col">
                <p>Product Category</p>
                <select
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
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

              <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea
                  rows="3"
                  name="description"
                  maxLength={maxDescriptionLength}
                  required
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
                <p className="char-counter">
                  {data.description.length}/{maxDescriptionLength} characters
                </p>
              </div>
            </div>

            <div className="add-left">
              <div className="add-img-upload">
                <p>Upload Image</p>
                <label htmlFor="image">
                  <img
                    src={
                      image ? URL.createObjectURL(image) : assets.upload_grey
                    }
                    alt="Upload preview"
                  />
                  <input
                    type="file"
                    id="image"
                    onChange={onImageChange}
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="add-price flex-col">
                <p>Product Price</p>
                <input
                  type="number"
                  onChange={onChangeHandler}
                  value={data.price}
                  name="price"
                  required
                />
              </div>
            </div>
          </div>

          <div className="add-form-buttons">
            <button
              type="submit"
              className="add-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
            <button onClick={onCancelHandler} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
