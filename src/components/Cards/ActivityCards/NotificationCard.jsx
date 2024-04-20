import { IonButton, IonCard, IonCardContent, IonIcon, IonImg, IonText } from "@ionic/react";
import React from "react";
import { heartOutline, sendOutline, chatbubbleOutline } from "ionicons/icons";

const NotificationCard = (props) => {
  const { Data } = props;


  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "60px", height: "60px" }}>
            <img
              src={Data.userImg}
              alt="user Image"
              style={{ width: "100%", height: "100%", borderRadius: "100px" }}
            />
          </div>

          <div style={{ marginLeft: "6px" }}>
            <div>
              <IonText
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#2D3F65",
                }}
              >
                {Data.name}
              </IonText>
              <IonText style={{fontSize:"13px",color: "#2D3F65"}}> Liked your post</IonText>
            </div>
            <div>
              <IonText style={{ fontSize: "13px", color: "grey" }}>
               3H
              </IonText>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{width:"50px",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"10px"}}>
            <IonImg src={Data.img} style={{width:"100%"}} alt="img"/>
          </div>
        </div>
      </div>
      </div>

  );
};

export default NotificationCard;
