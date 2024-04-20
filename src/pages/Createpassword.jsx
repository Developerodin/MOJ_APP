import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

const Createpassword = () => {
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <IonButton slot="start">
            <IonIcon icon={arrowBack} />
          </IonButton>
          <h1
            style={{
              color: "#232323",
              fontSize: "36px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Create Password
          </h1>

          <IonLabel
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Choose a password
          </IonLabel>
          {/* <IonItem> */}
          <IonInput
            type="tel"
            style={{
              borderRadius: "50px",
              fontSize: "20px",
              border: "1px solid #E2E8F0",
            }}
          />

          {/* </IonItem> */}
          <div
            style={{
              marginTop: "20px",
              color: "#575757",
              fontFamily: "inter",
              fontWeight: "400",
              fontSize: "20px",
            }}
          >
            At least <span style={{ color: "#232323" }}> 8 characters </span>,
            containing <span style={{ color: "#232323" }}>a letter</span> and{" "}
            <br />
            <span style={{ color: "#232323" }}>a number</span>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
          <IonButton expand="block" style={{ borderRadius: "50px" }}>
            Send Code
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Createpassword;
