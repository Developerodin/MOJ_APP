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
import { useHistory } from "react-router";

const Newphone = () => {
  const history = useHistory()
 
  const handelBtnClick= ()=>{
    history.push("/info")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <IonButton onClick={handelBackClick} slot="start">
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
            Enter your phone
number
          </h1>

          <h5
            style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "20px",
                fontWeight: "400",
                lineHeight: "30px",
            }}
          >
            Enter your phone number to receive OTP
          </h5>

          <IonLabel
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Phone Number
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

<IonLabel
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "30px",
              
            }}
          >
            Referral Code (optional)
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
          
        </div>
        <div style={{ position: "absolute", bottom: "20px", width: "100%",height:'50px',paddingLeft:'20px',paddingRight:'20px' }}>
          <button onClick={handelBtnClick}  style={{ borderRadius: "50px",width:'100%',height:'100%', backgroundColor: "#5356FF",color:'#ffffff',fontSize:'20px'}}>
            Continue
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Newphone;
