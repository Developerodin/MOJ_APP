import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline } from 'ionicons/icons'

export const InActiveJobs = () => {
  return (
    <IonPage>
        <IonContent>
        <div style={{padding:"20px"}}>
            <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Inactive Jobs"}  />
            </div>
        </IonContent>
    </IonPage>
  )
}
