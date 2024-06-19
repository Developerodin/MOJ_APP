import React from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
const ChattingGroupRecivedCard = (props) => {
  const { Data, time } = props;
  return (
    <div
      style={{  marginBottom: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "15px",
          fontSize: "11px",
        }}
      >
        <IonText>{time}</IonText>
      </div>

      <div
        style={{
          display: "flex",
         
          alignItems: "center",
         marginLeft:"20px"
        }}
      >
        
        <IonCard style={{ backgroundColor: "#CEFEF9", borderRadius: "9px" }}>
          <IonCardContent>
            <IonText style={{ fontSize: "13px" }}>{Data}</IonText>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default ChattingGroupRecivedCard;
