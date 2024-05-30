import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline } from 'ionicons/icons'
import { CandidateCard } from '../../../components/Cards/CandidateCard'
import { isMobile } from '../../../IsMobile/IsMobile'

export const InterestedCandidates = () => {
  return (
    <IonPage>
        <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
            <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Interested Candidates"}  />
           
            <div style={{marginTop:"30px"}}>
            <CandidateCard />
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
