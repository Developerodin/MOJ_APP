import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';
import icon from "/assets/Coin.png";
export const RewardCard = () => {
  return (
    <div style={{ width: "100%",position:"relative" }}>
         <img src={icon} alt="Coin" style={{ position: "absolute", top: 0, left: 0, opacity: 0.37, width: "50%", zIndex: 1 }} />
      <IonCard style={{
        padding: "10px",
        border: "1px solid #E4E4E4",
        borderRadius: "15px",
        margin: 0,
        background: "linear-gradient(#F7A708, #F77700)",
        height:"178px" // Linear gradient background
      }}>
        <IonCardContent style={{ padding: "10px" }}>
          {/* Content goes here */}
          <div>
             
             <div style={{display:"flex",justifyContent:"right",alignItems:"center"}}>
                  <div style={{textAlign:"right"}}>
                    <span style={{color:"#fff",fontWeight:"bold",fontSize:"24px"}}>₹1000</span> <br/>
                    <span style={{fontSize:"12px",color:"#fff"}}>Card Value</span>
                  </div>
             </div>

           <div style={{marginTop:"20px"}}>
               
           <div style={{width:"80%",margin:"auto",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            
            <span style={{fontSize:"18px",color:"#fff",fontWeight:"bold"}}>470/1000</span>
     
        <span style={{fontSize:"11px"}}>Click to redeem</span>
       </div>

       <div
            style={{
              width:"75%",
              marginTop:"10px",
              height: "12px",
              position: "absolute",
              
              left: "43px",
              borderRadius: "60px",
              background: "#FFE6A945",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: "47%",
                height: "100%",
                background: "#fff" // Loading progress color
              }}
            ></div>
          </div>
           </div>
          


          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};