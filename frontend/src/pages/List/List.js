import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "../../components/SideBar/SideBar";

const List = ({ url }) => {
  const [list, setList] = useState([]);

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

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-full-page">
      <SideBar />
      <div className="list add flex-col">
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
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>&#8377;{item.price}</p>
                <p className="cross" onClick={() => removeFood(item._id)}>
                  x
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
