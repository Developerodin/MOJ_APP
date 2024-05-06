import { IonLoading, IonSpinner } from '@ionic/react';
import React, { useState } from 'react'

export const CustomBtn1 = ({fun,title,loading=false}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Call the function passed as a prop
    if (fun) {
      fun();
    }
  };

  const handelLoadingClick = () =>{
   console.log("Loading");
  }
  return (
    <>
    {
      loading ?     
      <div onClick={handelLoadingClick} 
      style={{
        padding: "10px",
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
          <IonSpinner name="dots" style={{color:"#fff"}}></IonSpinner>
        
   
     
 </div>
 :
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
   {/* {
     true &&   <IonSpinner name="dots"></IonSpinner>
   } */}
<span style={{color:"#fff",fontWeight:"bold"}}>{title}</span>

</div>
    }
       
    </>
   
  )
}
