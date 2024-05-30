import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react'
import React from 'react'

import { chevronDownOutline, documentTextOutline } from 'ionicons/icons'

import { AppliedJobCard } from '../../components/Cards/JobCard/AppliedJobCard'
import NoAppliedJobs from "/assets/appliedJobs.png";
import { isMobile } from '../../IsMobile/IsMobile';
export const AppliedJobs = () => {
  return (
<IonPage>
    <IonContent>
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <IonIcon icon={documentTextOutline} style={{fontSize:"30px"}} />
          <span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"10px",marginTop:"3px"}}>Applied</span>
          </div>
          
          {/* <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src={NoAppliedJobs}
            alt="Globe Icon"
          
          />
          </div> */}
          <div style={{marginTop:"20px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>In touch</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>
             <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
              </IonRow>
             </IonGrid>
             </div>
             
            
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>In review</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
              </IonRow>
             </IonGrid>
             </div>
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>Not selected</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
              </IonRow>
             </IonGrid>
             </div>
          </div>
          </div>

          
    </IonContent>
</IonPage>
  )
}
