import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { createOutline, trash } from 'ionicons/icons'
import React from 'react'

export const EducationCard = () => {
  return (
    <div  >
        <IonCard style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
    <IonCardContent style={{padding:"20px"}}>
 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
       <div>
         <span style={{fontSize:"18px",fontWeight:600}}>Saint University</span>
       </div>

       <div style={{display:"flex",justifyContent:"right",alignItems:"center"}}>
                {/* <IonIcon icon={createOutline} style={{fontSize:"22px"}}/> */}

                <IonIcon icon={trash} style={{fontSize:"22px",color:"#FF3939",marginLeft:"10px"}} />

       </div>
 </div>

 <div style={{marginTop:"3px"}}>
   <span style={{fontSize:"15px",color:"#575757",fontWeight:500}}>Jaipur (Raj.)</span>
 </div>

 <div style={{marginTop:"3px"}}>
   <span style={{fontSize:"15px",fontWeight:500}}>Bachelores in Hotel Management . 2020-2023</span>
 </div>

 <div style={{marginTop:"20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div style={{background:"#0054e9",borderRadius:"10px",width:"30%",padding:"10px",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <span style={{fontSize:"14px",color:"#fff",fontWeight:"bold"}}>Edit</span>
    </div>
 </div>
</IonCardContent>
 </IonCard>
</div>
  )
}
