import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'

import { chevronDownOutline, documentTextOutline, eyeOutline } from 'ionicons/icons'

import { AppliedJobCard } from '../../components/Cards/JobCard/AppliedJobCard'
import { ProfileHeaders } from '../../components/Headers/ProfileHeaders'
import NoAppliedJobs from "/assets/appliedJobs.png";
import { isMobile } from '../../IsMobile/IsMobile'
export const ViewedJobs = () => {
  return (
<IonPage>
    <IonContent>
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
        
          <ProfileHeaders icon={<IonIcon icon={eyeOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Viewed jobs"}  />

          <div style={{marginTop:"20px"}}>


            <div style={{marginTop:"20px"}}>
            <AppliedJobCard/>
            </div>
          </div>

          </div>
    </IonContent>
</IonPage>
  )
}
