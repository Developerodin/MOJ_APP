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
        <div style={{ width: "50px", height: "50px", borderRadius: "50px" }}>
          <img
            src={Data.Img}
            alt="user Image"
            style={{ width: "100%", height: "100%", borderRadius: "100px" }}
          />
        </div>
        <IonCard style={{ backgroundColor: "#CEFEF9", borderRadius: "9px" }}>
          <IonCardContent>
            <IonText style={{ fontSize: "13px" }}>{Data.text}</IonText>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default ChattingGroupRecivedCard;
