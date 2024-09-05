import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import React from "react";

const HistoryCard = (props) => {
  const { Data } = props;

  
  const profile = Data.profile || {};
  const name = profile.name || "Unknown";
  // const role = profile.role || "Unknown Role";
  const createdAt = profile.created_at || "Unknown Date";

 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
  };

  
  let points = 0;
  const role = Data?.profile?.role;

  if (role === "Job Seeker") {
    points = 10;
  } else if (role === "Agent" || role === "Employers") {
    points = 50;
  }

  return (
    <div style={{ marginBottom: "50px",marginTop:'10px' }}>
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
          <div style={{ width: "50px", height: "50px", borderRadius: "100px", backgroundColor: "orange" }}>
            
          </div>

          <div style={{ marginLeft: "20px" }}>
            <div>
              <IonText
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {name}
              </IonText>
            </div>
            <div style={{ marginTop: "3px" }}>
              <IonText style={{ fontSize: "14px", color: "grey" }}>
                {role}
              </IonText>
            </div>
            <div style={{ marginTop: "3px" }}>
              <IonText style={{ fontSize: "12px", color: "grey" }}>
                {formatDate(createdAt)}
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
          <div
            style={{
              height: "45px",
              width: "45px",
              border: "1px solid #E4E4E4",
              borderRadius: "30px",
              background: "#F7A708",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: "14px" }}>{points}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
