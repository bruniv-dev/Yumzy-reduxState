// import React, { useState } from "react";
// import "./ContactPopup.css";
// import { assets } from "../../assets/assets";

// const ContactPopup = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Form Submitted:", formData);
//     onClose();
//   };

//   const handleReset = () => {
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="contact-popup">
//       <div className="popup-content">
//         <div className="popup-left">
//           <img src={assets.contact} alt="Contact" />
//         </div>
//         <div className="popup-right">
//           <h3>GET IN TOUCH</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="name">
//               <div className="name-items">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="name-items">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <label>Phone</label>
//             <div className="phone-input">
//               <span className="phone-prefix">+91</span>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 pattern="[0-9]{10}"
//                 required
//               />
//             </div>
//             <label>Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             />
//             <div className="buttons">
//               <button type="submit" className="submit-button">
//                 Submit
//               </button>
//               <button
//                 type="button"
//                 className="reset-button"
//                 onClick={handleReset}
//               >
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContactPopup;

import React, { useState } from "react";
import "./ContactPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios"; // Import Axios for API requests
import { toast } from "react-toastify"; // Optional: for notifications
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

const ContactPopup = ({ onClose }) => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const { url } = useContext(StoreContext);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend
      const response = await axios.post(
        `${url}/api/contact/send-contact-form`,
        formData
      );
      if (response.status === 200) {
        toast.success("Your message has been sent!");
        onClose(); // Close the popup after success
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-popup">
      <div className="popup-content">
        <div className="popup-left">
          <img src={assets.contact} alt="Contact" />
        </div>
        <div className="popup-right">
          <h3>GET IN TOUCH</h3>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <div className="name-items">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="name-items">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Phone</label>
            <div className="phone-input">
              <span className="phone-prefix">+91</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                // placeholder="Enter your phone number"
              />
            </div>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
            <div className="buttons">
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default ContactPopup;
