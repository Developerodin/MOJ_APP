import { IonCard, IonCardContent, IonText } from '@ionic/react'
import React from 'react'

const ChattingCardSender = (props) => {
    const {Data,time}=props;
  return (
    
<div style={{width:"fit-content",marginLeft:"auto",maxWidth:"70%"}}>
<IonCard style={{backgroundColor:"#00C9B5",borderRadius:"9px"}}>
        <IonCardContent style={{color:"#FFFFFF"}}>
        <IonText style={{fontSize:"13px"}}>{Data}</IonText>  
        </IonCardContent>
    </IonCard>
    <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",paddingRight:"15px",fontSize:"10px"}}>
        <IonText>{time}</IonText>
    </div>
</div>
    
  )
}

export default ChattingCardSender
