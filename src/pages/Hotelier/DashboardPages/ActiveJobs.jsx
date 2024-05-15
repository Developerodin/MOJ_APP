import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline, callOutline } from 'ionicons/icons'
import { PostJobCard } from '../../../components/Cards/JobCard/PostJobCard'

export const ActiveJobs = () => {
  return (
    <IonPage>
        <IonContent>
            <div style={{padding:"20px"}}>
            <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Active Jobs"}  />
            

            <div style={{marginTop:"40px"}}>
            
              <PostJobCard fun={()=>console.log("click on post job")}/>
            </div>

            <div style={{marginTop:"40px"}}>
            
              <PostJobCard fun={()=>console.log("click on post job")}/>
            </div>

            
            
            </div>
        </IonContent>
    </IonPage>
  )
}
