import { IonBadge, IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import React from "react";
import { heartOutline, sendOutline, chatbubbleOutline } from "ionicons/icons";

const ActivityFR = (props) => {
  const { Value,Img } = props;


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
        <div style={{position:"relative"}}>
        <div style={{ width: "60px", height: "60px" }}>
            <img
              src={Img}
              alt="user Image"
              style={{ width: "100%", height: "100%", borderRadius: "100px" }}
            />
          </div>
          <div style={{position:"absolute",top:"0",marginLeft:"40px"}}>
          <IonBadge color="danger" >{Value}</IonBadge>
          </div>
          
        </div>
        

          <div style={{ marginLeft: "6px",marginTop:"20px" }}>
            <div>
              <IonText
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  
                }}
              >
                Follow requests
              </IonText>
            </div>
            <div>
              <IonText style={{ fontSize: "13px", color: "grey" }}>
                Approve or Ignore requests
              </IonText>
            </div>
          </div>
        </div>

      </div>
      </div>

  );
};

export default ActivityFR;
