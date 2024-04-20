import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

const VerifyPhoneTwo = () => {
  const history = useHistory()

  const handelBtnClick= ()=>{
    history.push("/Basicinfo")
  }
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
            We just sent you an SMS
          </h1>
          <p
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            Enter the security code we sent to <br /> +91 9876543210
          </p>

          {/* <IonItem> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IonInput
              type="text"
              maxLength={1}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginRight: "3px",
              }}
            />
            <IonInput
              type="text"
              maxLength={1}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            />
            <IonInput
              type="text"
              maxLength={1}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            />
            <IonInput
              type="text"
              maxLength={1}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            />
            <IonInput
              type="text"
              maxLength={1}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            />
            <IonInput
              type="text"
              maxLength={1}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                marginLeft: "3px",
              }}
            />
          </div>
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
            Didn't not get the code ?{" "}
            <span
              style={{
                color: "black",
                fontFamily: "inter",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Resend it
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "20px", width: "100%",height:'50px',paddingLeft:'20px',paddingRight:'20px' }}>
          <button onClick={handelBtnClick} style={{ borderRadius: "50px",width:'100%',height:'100%', backgroundColor: "#5356FF",color:'#ffffff',fontSize:'20px'}}>
            Submit
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerifyPhoneTwo;
