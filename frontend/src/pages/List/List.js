import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "../../components/SideBar/SideBar";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Edit from "../../components/EditFood/EditFood";
import { RiEdit2Fill } from "react-icons/ri";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false); // To control popup visibility
  const [selectedFood, setSelectedFood] = useState(null); // To hold the selected food data

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    console.log(`in list.js -> removeFood ${foodId}`);
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.error);
    }
  };

  const editFood = async (foodId) => {
    // Find the food item in the list to populate the edit form
    const foodToEdit = list.find((item) => item._id === foodId);
    setSelectedFood(foodToEdit); // Set the selected food
    setShowEditPopup(true); // Show the popup
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-full-page">
      <SideBar />
      <div className="list flex-col">
        <h3>Food List</h3>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>&#8377;{item.price}</p>
                <p className="action-icons">
                  <RiEdit2Fill
                    className="edit"
                    onClick={() => editFood(item._id)}
                  />
                  <RiDeleteBinFill
                    className="cross"
                    onClick={() => removeFood(item._id)}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conditionally render the Edit popup */}
      {showEditPopup && selectedFood && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            {/* Pass the selectedFood and URL as props to Edit component */}
            <Edit
              url={url}
              food={selectedFood}
              onClose={() => setShowEditPopup(false)} // Close the popup
              fetchList={fetchList} // Fetch list after editing
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
