import { IonContent, IonIcon, IonPage, IonSearchbar } from '@ionic/react'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline } from 'ionicons/icons'
import { CandidateCard } from '../../../components/Cards/CandidateCard'

export const CandidateSearch = () => {
  return (
    <IonPage>
        <IonContent>
        <div style={{padding:"20px"}}>
            <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Candidate Search"}  />
           
           <div style={{marginTop:"30px"}}>
           <IonSearchbar></IonSearchbar>
           </div>

           <div style={{marginTop:"30px"}}>
            <CandidateCard />
            </div>

            <div style={{marginTop:"30px"}}>
            <CandidateCard />
            </div>

            <div style={{marginTop:"30px"}}>
            <CandidateCard />
            </div>
           
            </div>
        </IonContent>
    </IonPage>
  )
}
