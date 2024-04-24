import React, { useState } from 'react'

export const CustomBtn1 = ({fun,title}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Call the function passed as a prop
    if (fun) {
      fun();
    }
  };
  return (
    <div onClick={handleClick} 
      style={{
        padding: "20px",
        border: "1px solid #E4E4E4",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
        background: clicked ? "#3351CC" : "#395CFF", // Change background color when clicked
        boxShadow: clicked ? "0px 0px 8px rgba(0, 0, 0, 0.3)" : "none", // Add box shadow when clicked
        cursor: "pointer", // Change cursor to pointer when hovered
        transition: "background-color 0.3s, box-shadow 0.3s" // Add transition effect
      }}
      >
    <span style={{color:"#fff",fontWeight:"bold"}}>{title}</span>
 </div>
  )
}
