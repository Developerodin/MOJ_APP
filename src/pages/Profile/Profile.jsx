
import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline} from 'ionicons/icons';
import cs from "./th.jpg"

export const Profile = () => {
  return (
   <IonPage>
    <IonContent>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px",flexDirection:"column",gap:"20px"}}>
        <img
            src={cs}
            alt="Globe Icon"
            style={{
             
            }}
          />
        </div>
    </IonContent>
   </IonPage>
  )
}
