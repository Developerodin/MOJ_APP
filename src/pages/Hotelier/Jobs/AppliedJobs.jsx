import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import { CandidateCard } from '../../../components/Cards/CandidateCard'

export const HotelierAppliedJobs = () => {
  return (
    <IonPage>
        <IonContent>
           <div style={{padding:"20px"}}> 
               <div>
                <span style={{fontSize:"24px"}}>Candidates Applied</span>
               </div>

               <div style={{marginTop:"60px"}}>
                <CandidateCard />
               </div>


               
           </div>
        </IonContent>
    </IonPage>
  )
}
