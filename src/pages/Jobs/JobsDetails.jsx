import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import cs from "./th.jpg"
export const JobsDetails = () => {
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
