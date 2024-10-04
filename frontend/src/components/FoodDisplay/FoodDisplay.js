// // // // // import React, { useContext, useEffect } from "react";
// // // // // import "./FoodDisplay.css";
// // // // // import { StoreContext } from "../../context/StoreContext";
// // // // // import FoodItem from "../FoodItem/FoodItem";

// // // // // const FoodDisplay = ({ category }) => {
// // // // //   const { food_list, fetchFoodList, loading } = useContext(StoreContext);

// // // // //   // Re-fetch food list every time the category changes
// // // // //   useEffect(() => {
// // // // //     fetchFoodList();
// // // // //   }, [category]);

// // // // //   // If loading, show a loading indicator
// // // // //   if (loading) {
// // // // //     return <p>Loading food items...</p>;
// // // // //   }

// // // // //   return (
// // // // //     <div className="food-display" id="food-display">
// // // // //       <div className="line-heading">
// // // // //         <hr />
// // // // //         <h2>Our Signature Dishes</h2>
// // // // //         <hr />
// // // // //       </div>

// // // // //       <div className="food-display-list">
// // // // //         {food_list.map((item, index) => {
// // // // //           if (category === "All" || category === item.category) {
// // // // //             return (
// // // // //               <FoodItem
// // // // //                 key={index}
// // // // //                 id={item._id}
// // // // //                 name={item.name}
// // // // //                 description={item.description}
// // // // //                 price={item.price}
// // // // //                 image={item.image}
// // // // //               />
// // // // //             );
// // // // //           }
// // // // //           return null; // Explicit return when no match
// // // // //         })}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default FoodDisplay;

// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import "./FoodDisplay.css";
// // // // import { StoreContext } from "../../context/StoreContext";
// // // // import FoodItem from "../FoodItem/FoodItem";

// // // // const FoodDisplay = ({ category }) => {
// // // //   const { food_list, fetchFoodList, loading } = useContext(StoreContext);
// // // //   const [searchTerm, setSearchTerm] = useState(""); // State for search input

// // // //   // Re-fetch food list every time the category changes
// // // //   useEffect(() => {
// // // //     fetchFoodList();
// // // //   }, [category]);

// // // //   // Handle search input change
// // // //   const handleSearchChange = (e) => {
// // // //     setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
// // // //   };

// // // //   // Filter food list based on search term and category
// // // //   const filteredFoodList = food_list.filter((item) => {
// // // //     const isInCategory = category === "All" || item.category === category;
// // // //     const matchesSearch = item.name.toLowerCase().includes(searchTerm);
// // // //     return isInCategory && matchesSearch;
// // // //   });

// // // //   // If loading, show a loading indicator
// // // //   if (loading) {
// // // //     return <p>Loading food items...</p>;
// // // //   }

// // // //   return (
// // // //     <div className="food-display" id="food-display">
// // // //       <div className="line-heading">
// // // //         <hr />
// // // //         <h2>Our Signature Dishes</h2>
// // // //         <hr />
// // // //       </div>

// // // //       {/* Search Input */}
// // // //       <div className="search-container">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search by dish name"
// // // //           value={searchTerm}
// // // //           onChange={handleSearchChange}
// // // //         />
// // // //       </div>

// // // //       <div className="food-display-list">
// // // //         {filteredFoodList.map((item, index) => (
// // // //           <FoodItem
// // // //             key={index}
// // // //             id={item._id}
// // // //             name={item.name}
// // // //             description={item.description}
// // // //             price={item.price}
// // // //             image={item.image}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default FoodDisplay;

// // // import React, { useContext, useEffect, useState } from "react";
// // // import "./FoodDisplay.css";
// // // import { StoreContext } from "../../context/StoreContext";
// // // import FoodItem from "../FoodItem/FoodItem";

// // // const FoodDisplay = ({ category }) => {
// // //   const { food_list, fetchFoodList, loading } = useContext(StoreContext);
// // //   const [searchTerm, setSearchTerm] = useState(""); // State for search input

// // //   // Re-fetch food list every time the category changes
// // //   useEffect(() => {
// // //     fetchFoodList();
// // //   }, [category]);

// // //   // Handle search input change
// // //   const handleSearchChange = (e) => {
// // //     setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
// // //   };

// // //   // Split the search term by spaces and filter food list based on search term and category
// // //   const filteredFoodList = food_list.filter((item) => {
// // //     const isInCategory = category === "All" || item.category === category;

// // //     // Check if all words in the search term are present in the food name
// // //     const matchesSearch = searchTerm
// // //       .split(" ")
// // //       .every((term) => item.name.toLowerCase().includes(term));

// // //     return isInCategory && matchesSearch;
// // //   });

// // //   // If loading, show a loading indicator
// // //   if (loading) {
// // //     return <p>Loading food items...</p>;
// // //   }

// // //   return (
// // //     <div className="food-display" id="food-display">
// // //       <div className="line-heading">
// // //         <hr />
// // //         <h2>Our Signature Dishes</h2>
// // //         <hr />
// // //       </div>

// // //       {/* Search Input */}
// // //       <div className="search-container">
// // //         <input
// // //           type="text"
// // //           placeholder="Search by dish name"
// // //           value={searchTerm}
// // //           onChange={handleSearchChange}
// // //         />
// // //       </div>

// // //       <div className="food-display-list">
// // //         {filteredFoodList.map((item, index) => (
// // //           <FoodItem
// // //             key={index}
// // //             id={item._id}
// // //             name={item.name}
// // //             description={item.description}
// // //             price={item.price}
// // //             image={item.image}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default FoodDisplay;
// // import React, { useContext, useEffect, useState } from "react";
// // import "./FoodDisplay.css";
// // import { StoreContext } from "../../context/StoreContext";
// // import FoodItem from "../FoodItem/FoodItem";
// // import { FaSearch } from "react-icons/fa";

// // const FoodDisplay = ({ category }) => {
// //   const { food_list, fetchFoodList, loading } = useContext(StoreContext);
// //   const [searchTerm, setSearchTerm] = useState(""); // State for search input

// //   // Re-fetch food list every time the category changes
// //   useEffect(() => {
// //     fetchFoodList();
// //   }, [category]);

// //   // Handle search input change
// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
// //   };

// //   // Split the search term by spaces and filter food list based on search term, dish name, and category
// //   const filteredFoodList = food_list.filter((item) => {
// //     const isInCategory = category === "All" || item.category === category;

// //     // Check if all words in the search term are present in either the food name or the category
// //     const matchesSearch = searchTerm
// //       .split(" ")
// //       .every(
// //         (term) =>
// //           item.name.toLowerCase().includes(term) ||
// //           item.category.toLowerCase().includes(term)
// //       );

// //     return isInCategory && matchesSearch;
// //   });

// //   // If loading, show a loading indicator
// //   if (loading) {
// //     return <p>Loading food items...</p>;
// //   }

// //   return (
// //     <div className="food-display" id="food-display">
// //       <div className="line-heading">
// //         <hr />
// //         <h2>Our Signature Dishes</h2>
// //         <hr />
// //       </div>

// //       {/* Search Input */}
// //       <div className="search-container">
// //         <input
// //           type="text"
// //           placeholder="Search by dish name or category"
// //           value={searchTerm}
// //           onChange={handleSearchChange}
// //         />
// //         <FaSearch className="search-icon" />
// //       </div>

// //       <div className="food-display-list">
// //         {filteredFoodList.map((item, index) => (
// //           <FoodItem
// //             key={index}
// //             id={item._id}
// //             name={item.name}
// //             description={item.description}
// //             price={item.price}
// //             image={item.image}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FoodDisplay;

// import React, { useContext, useEffect, useState } from "react";
// import "./FoodDisplay.css";
// import { StoreContext } from "../../context/StoreContext";
// import FoodItem from "../FoodItem/FoodItem";
// import { FaSearch } from "react-icons/fa";

// const FoodDisplay = ({ category }) => {
//   const { food_list, fetchFoodList, loading } = useContext(StoreContext);
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const itemsPerPage = 6; // Number of items per page

//   // Re-fetch food list every time the category changes
//   useEffect(() => {
//     fetchFoodList();
//   }, [category]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
//   };

//   // Filter food list based on search term, dish name, and category
//   const filteredFoodList = food_list.filter((item) => {
//     const isInCategory = category === "All" || item.category === category;

//     // Check if all words in the search term are present in either the food name or the category
//     const matchesSearch = searchTerm
//       .split(" ")
//       .every(
//         (term) =>
//           item.name.toLowerCase().includes(term) ||
//           item.category.toLowerCase().includes(term)
//       );

//     return isInCategory && matchesSearch;
//   });

//   // Pagination: Calculate the indices for the current page's items
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentFoodItems = filteredFoodList.slice(startIndex, endIndex);

//   // Handle pagination click (prev/next)
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // If loading, show a loading indicator
//   if (loading) {
//     return <p>Loading food items...</p>;
//   }

//   // Calculate total number of pages
//   const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

//   return (
//     <div className="food-display" id="food-display">
//       <div className="line-heading">
//         <hr />
//         <h2>Our Signature Dishes</h2>
//         <hr />
//       </div>

//       {/* Search Input */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by dish name or category"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <FaSearch className="search-icon" />
//       </div>

//       <div className="food-display-list">
//         {currentFoodItems.map((item, index) => (
//           <FoodItem
//             key={index}
//             id={item._id}
//             name={item.name}
//             description={item.description}
//             price={item.price}
//             image={item.image}
//           />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="pagination">
//         <button
//           className="pagination-button"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           &lt;
//         </button>

//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={`pagination-button ${
//               index + 1 === currentPage ? "active" : ""
//             }`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           className="pagination-button"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;

import React, { useContext, useEffect, useState, useRef } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { FaSearch } from "react-icons/fa";

const FoodDisplay = ({ category }) => {
  const { food_list, fetchFoodList, loading } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 6; // Number of items per page
  const topRef = useRef(null); // Ref for scrolling

  // Re-fetch food list every time the category changes
  useEffect(() => {
    fetchFoodList();
  }, [category]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  // Filter food list based on search term, dish name, and category
  const filteredFoodList = food_list.filter((item) => {
    const isInCategory = category === "All" || item.category === category;

    // Check if all words in the search term are present in either the food name or the category
    const matchesSearch = searchTerm
      .split(" ")
      .every(
        (term) =>
          item.name.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term)
      );

    return isInCategory && matchesSearch;
  });

  // Pagination: Calculate the indices for the current page's items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFoodItems = filteredFoodList.slice(startIndex, endIndex);

  // Handle pagination click (prev/next)
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll to top
    }
  };

  // If loading, show a loading indicator
  if (loading) {
    return <p>Loading food items...</p>;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

  return (
    <div className="food-display" id="food-display">
      <div ref={topRef}></div> {/* This is the ref to scroll to */}
      <div className="line-heading">
        <hr />
        <h2>Our Signature Dishes</h2>
        <hr />
      </div>
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by dish name or category"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" />
      </div>
      <div className="food-display-list">
        {currentFoodItems.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              index + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FoodDisplay;
