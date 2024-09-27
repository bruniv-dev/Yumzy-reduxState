// import React, { useState } from "react";
// import "./Add.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import SideBar from "../../components/SideBar/SideBar";

// const Add = ({ url }) => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad",
//   });

//   // useEffect(() => {
//   //   console.log(data);
//   // }, [data]);

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({
//       ...data,
//       [name]: value,
//     }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("image", image);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);
//     const response = await axios.post(`${url}/api/food/add`, formData);
//     console.log(response);
//     if (response.data.success) {
//       setData({
//         name: "",
//         description: "",
//         price: "",
//         category: "Salad",
//       });
//       setImage(false);
//       toast.success(response.data.message);
//     } else {
//       toast.error(response.data.message);
//     }
//   };

//   return (
//     <div className="add-full-page">
//       <SideBar />
//       <div className="add">
//         <form className="flex-col" onSubmit={onSubmitHandler}>
//           <div className="add-img-upload flex-col">
//             <p>Upload Image</p>
//             <label htmlFor="image">
//               <img
//                 src={image ? URL.createObjectURL(image) : assets.upload_grey}
//                 alt=""
//               />
//               <input
//                 type="file"
//                 id="image"
//                 onChange={(e) => {
//                   setImage(e.target.files[0]);
//                 }}
//                 hidden
//                 required
//               />
//             </label>
//           </div>
//           <div className="add-product-name flex-col">
//             <p>Product Name</p>
//             <input
//               type="text"
//               name="name"
//               placeholder="Type here"
//               onChange={onChangeHandler}
//               value={data.name}
//             />
//           </div>
//           <div className="add-product-description flex-col">
//             <p>Product Description</p>
//             <textarea
//               rows="6"
//               name="description"
//               placeholder="Write Content"
//               required
//               onChange={onChangeHandler}
//               value={data.description}
//             ></textarea>
//           </div>
//           <div className="add-category-price">
//             <div className="add-category flex-col">
//               <p>Product Category</p>
//               <select name="category" onChange={onChangeHandler}>
//                 <option value="Salad">Salad</option>
//                 <option value="Rolls">Rolls</option>
//                 <option value="Deserts">Deserts</option>
//                 <option value="Sandwich">Sandwich</option>
//                 <option value="Cake">Cake</option>
//                 <option value="Pure Veg">Pure veg</option>
//                 <option value="Pasta">Pasta</option>
//                 <option value="Noodles">Noodles</option>
//               </select>
//             </div>
//             <div className="add-price flex-col">
//               <p>Product Price</p>
//               <input
//                 type="Number"
//                 placeholder="&#8377;20"
//                 onChange={onChangeHandler}
//                 value={data.price}
//                 name="price"
//               />
//             </div>
//           </div>
//           <button type="submit" className="add-button">
//             Add
//           </button>
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
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
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
          category: "Salad",
        });
        setImage(null); // Reset the image state
        toast.success(response.data.message); // Show success message
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the food item."); // Show generic error message
    }
  };

  const onCancelHandler = (event) => {
    event.preventDefault();
    setData({
      name: "",
      description: "",
      price: "",
      category: "Salad",
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
              <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea
                  rows="3"
                  name="description"
                  required
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>
            </div>

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
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
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
            <button type="submit" className="add-button">
              Add
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

// return (
//   <div className="add-full-page">
//     <SideBar />
//     <div className="add">
//       <form className="flex-col" onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img
//               src={image ? URL.createObjectURL(image) : assets.upload_grey} // Preview the selected image
//               alt="Upload preview"
//             />
//             <input
//               type="file"
//               id="image"
//               onChange={onImageChange} // Handle image selection
//               hidden
//               required // Ensure image is required
//             />
//           </label>
//         </div>
//         <div className="add-product-name flex-col">
//           <p>Product Name</p>
//           <input
//             type="text"
//             name="name"
//             placeholder="Type here"
//             onChange={onChangeHandler}
//             value={data.name}
//             required // Ensure name is required
//           />
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product Description</p>
//           <textarea
//             rows="6"
//             name="description"
//             placeholder="Write Content"
//             required
//             onChange={onChangeHandler}
//             value={data.description}
//           ></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product Category</p>
//             <select
//               name="category"
//               onChange={onChangeHandler}
//               value={data.category}
//             >
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Deserts">Deserts</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">Cake</option>
//               <option value="Pure Veg">Pure Veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//             <p>Product Price</p>
//             <input
//               type="number"
//               placeholder="&#8377;20"
//               onChange={onChangeHandler}
//               value={data.price}
//               name="price"
//               required // Ensure price is required
//             />
//           </div>
//         </div>
//         <button type="submit" className="add-button">
//           Add
//         </button>
//       </form>
//     </div>
//   </div>
// );
