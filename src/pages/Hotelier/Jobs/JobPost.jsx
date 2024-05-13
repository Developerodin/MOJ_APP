import { IonButton, IonContent, IonPage } from '@ionic/react'
import React from 'react'
import { JobCard } from '../../../components/Cards/JobCard/JobCard'

export const HotelierJobPost = () => {
  return (
     <IonPage>
        <IonContent>
           
            <div style={{padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"24px",fontWeight:"bold"}}>Jobs posted by you</span>

                <IonButton>Post a job</IonButton>
            </div>


            <div style={{marginTop:"40px"}}>
             <JobCard fun={()=>console.log("click on post job")} />

            </div>

            <div style={{marginTop:"20px"}}>
             <JobCard fun={()=>console.log("click on post job")} />

            </div>
            </div>
        </IonContent>
     </IonPage>
  )
}
