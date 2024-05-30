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
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>In touch</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
            <AppliedJobCard/>
            </div>
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>In review</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
            <AppliedJobCard/>
            </div>
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>Not selected</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
            <AppliedJobCard />
            </div>
          </div>
{/* 
<div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src={NoAppliedJobs}
            alt="Globe Icon"
          
          />
          </div> */}
          </div>
    </IonContent>
</IonPage>
  )
}
