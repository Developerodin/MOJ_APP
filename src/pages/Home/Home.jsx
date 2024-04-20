import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline} from 'ionicons/icons';
import './Home.css';
import { JobCard } from '../../components/Cards/JobCard/JobCard';
import card from "./card.png"
import wm from "./wm.png"
import frame from "./Frame1.png"
export const Home = () => {
  return (
    <IonPage>
        <IonContent >

        <div style={{padding:"10px"}}>
          <div>
          <span style={{fontSize:"26px",fontWeight:"bold"}}>offers</span> 

          <div style={{position:"relative"}}>
          <div style={{textAlign:"center",marginTop:"20px"}}>
               <img
            src={frame}
            alt="Globe Icon"
            style={{
             width:"100%"
            }}
          />
           <div style={{position:"absolute",left:0,top:0}}>
               <img
            src={wm}
            alt="Globe Icon"
            style={{
             
            }}
          />
               </div>
               </div>
              
          </div>
               
          </div>
           
          </div>

          <div style={{padding:"10px"}}>
            <span style={{fontSize:"26px",fontWeight:"bold"}}>Featured jobs</span> 
            <br/>
            <span style={{color:"grey",fontSize:"12px"}}>Showing results based on your added preference</span>
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px",flexDirection:"column",gap:"20px"}}>
          <img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

          
<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

          
<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />

          
<img
            src={card}
            alt="Globe Icon"
            style={{
             
            }}
          />
          </div>
          
       
        </IonContent>
       </IonPage>
  )
}
