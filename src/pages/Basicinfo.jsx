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
import icon from "/assets/left.png";
import { useHistory } from "react-router";

const Basicinfo = () => {
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
          <button onClick={handelBackClick} style={{backgroundColor:'transparent'}} >
          <img
            src={icon}
            style={{
              width: "30px",
              height: "30px",

              
            }}
            />
          </button>
          <h1
            style={{
              color: "#232323",
              fontSize: "32px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Add your personal information
          </h1>

          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            First name
          </label>
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
            Last name
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
          <IonLabel
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Gender
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
            Email Address(optional)
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
            State
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
            City
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

export default Basicinfo;
