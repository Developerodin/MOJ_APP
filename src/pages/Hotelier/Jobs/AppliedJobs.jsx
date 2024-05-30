import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import { CandidateCard } from '../../../components/Cards/CandidateCard'
import { isMobile } from '../../../IsMobile/IsMobile'

export const HotelierAppliedJobs = () => {
  return (
    <IonPage>
        <IonContent>
           <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}> 
               <div>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>Candidates Applied</span>
               </div>

               <div style={{marginTop:"60px"}}>
                <CandidateCard />
               </div>


               
           </div>
        </IonContent>
    </IonPage>
  )
}
