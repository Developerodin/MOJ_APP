import { IonButton, IonContent, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import { JobCard } from '../../../components/Cards/JobCard/JobCard'
import { PostJobCard } from '../../../components/Cards/JobCard/PostJobCard';

export const HotelierJobPost = () => {
  const history = useIonRouter();
  const handelPostJob=()=>{
    history.push("/post-job")
  }
  return (
     <IonPage>
        <IonContent>
           
            <div style={{padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"24px",fontWeight:"bold"}}>Jobs posted by you</span>

                <IonButton onClick={handelPostJob}>Post a job</IonButton>
            </div>


            <div style={{marginTop:"40px"}}>
            
              <PostJobCard fun={()=>console.log("click on post job")}/>
            </div>

            <div style={{marginTop:"20px"}}>
            <PostJobCard fun={()=>console.log("click on post job")}/>

            </div>
            </div>
        </IonContent>
     </IonPage>
  )
}
