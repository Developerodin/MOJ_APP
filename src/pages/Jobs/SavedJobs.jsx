import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'

import { bookmark, bookmarkOutline, chevronBackOutline, chevronDownOutline, documentTextOutline, filterOutline } from 'ionicons/icons'

import { AppliedJobCard } from '../../components/Cards/JobCard/AppliedJobCard'
import { useHistory } from 'react-router'
import { ProfileHeaders } from '../../components/Headers/ProfileHeaders'
import NoAppliedJobs from "/assets/appliedJobs.png";
import { isMobile } from '../../IsMobile/IsMobile'
export const SavedJobs = () => {
  const history = useHistory()
 
  return (
<IonPage>
    <IonContent>
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
          
          <ProfileHeaders icon={<IonIcon icon={bookmark} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Saved jobs"}  />

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
