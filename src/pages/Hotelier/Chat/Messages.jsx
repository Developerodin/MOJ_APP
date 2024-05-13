import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { chatboxEllipsesOutline } from 'ionicons/icons'
import Nochat from "/assets/coming-soon.png";
import React from 'react'

export const HotelierMessages = () => {
  return (
    <IonPage>
        <IonContent>
        <div style={{padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
          <IonIcon icon={chatboxEllipsesOutline} style={{fontSize:"30px"}} />
          <span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"15px",marginTop:"0px"}}>Messages</span>
          </div>
{/* 
          <div style={{marginTop:"20px"}}>

{
    <ContactsChat />
}

</div> */}
 <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src={Nochat}
            alt="Globe Icon"
          
          />
          </div>

          </div>
        </IonContent>
    </IonPage>
  )
}
