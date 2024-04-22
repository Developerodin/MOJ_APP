/* eslint-disable react/prop-types */
import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import { caretForwardOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'

const ProfileListItem = ({Data}) => {
    const history=useHistory();
    const handelClick=()=>{
        history.push(Data.link)
    }
  return (
    <IonItem lines='none' button onClick={handelClick} style={{marginTop:"10px"}}>
                  <IonIcon icon={Data.icon} style={{color:`${Data.color}`}} slot="start"></IonIcon>
                  <IonLabel style={{fontWeight:"bold"}}>{Data.title}</IonLabel>
                  {/* <IonIcon icon={caretForwardOutline} slot="end"></IonIcon> */}
                </IonItem>
  )
}

export default ProfileListItem
