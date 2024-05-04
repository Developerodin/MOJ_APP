/* eslint-disable react/prop-types */
import { IonIcon, IonItem, IonLabel, useIonRouter } from '@ionic/react'
import { caretForwardOutline, chevronForwardOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'

const ProfileListItem = ({Data}) => {
    const history=useIonRouter();
    const handelClick=()=>{

       if(Data.link === "/logout"){
       console.log("Logout clicked")
       localStorage.clear();
        history.push("/Coninue");
        
         return
         
       }
      if(Data.link ==="/"){
        return history.replace('/app');
      }
        history.push(Data.link)
    }
  
  return (
    <IonItem  button onClick={handelClick} style={{marginTop:"10px"}}>
                  <IonIcon icon={Data.icon} style={{color:`${Data.color}`}} slot="start"></IonIcon>
                  <IonLabel style={{fontWeight:"bold"}}>{Data.title}</IonLabel>
                  <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon>
      </IonItem>
  )
}

export default ProfileListItem
