import React from 'react'
import icon from "/assets/Coin.png";
import { RewardCard } from '../../components/Cards/RewardCard/RewardCard';
import { RewardCard2 } from '../../components/Cards/RewardCard/RewardCard2';
export const MyPoints = () => {
  return (
    <div style={{padding:"20px"}}>
         
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               
                  <img src={icon} alt='' />
                  <span style={{fontWeight:"bold",fontSize:"22px"}}>470</span>
             
         </div>

         <div style={{textAlign:"center",marginTop:"10px"}}>
           <span style={{fontSize:"15px"}}>
           To earn more, invite a friend/colleague by clicking here
           </span>
         </div>


         <div>
         <div  style={{marginTop:"20px",padding:"20px",border:"1px solid #E4E4E4",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"30px",background:"#F7A708"}}>
    <span style={{color:"#fff",fontWeight:"bold"}}>Refer and Earn</span>
 </div>
         </div>


         <div style={{marginTop:"30px"}}>
             <RewardCard />
         </div>
         <div style={{marginTop:"30px"}}>
             <RewardCard2 />
         </div>
    </div>
  )
}
