import { IonCard, IonCardContent, IonText } from '@ionic/react'
import React from 'react'

const ChattingCardRecived = (props) => {
    const {Data,time} =props
  return (


<div style={{width:"fit-content",maxWidth:"70%",marginBottom:"20px"}}>
<IonCard style={{backgroundColor:"#CEFEF9",borderRadius:"9px"}}>
        <IonCardContent>
            <IonText style={{fontSize:"13px"}}>{Data}</IonText>  
        </IonCardContent>
    </IonCard>

<div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",paddingRight:"15px",fontSize:"11px"}}>
        <IonText>{time}</IonText>
    </div>
    </div>
   
  )
}

export default ChattingCardRecived
