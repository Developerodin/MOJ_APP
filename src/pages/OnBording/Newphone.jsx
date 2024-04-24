import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";

const Newphone = () => {
  const history = useHistory()
 
  const handelBtnClick= ()=>{
    history.push("/verify-otp")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
        <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>

          <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Enter your phone number
          </h1>

          <h5
            style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "30px",
            }}
          >
            Enter your phone number to receive OTP
          </h5>

<div style={{marginTop:"20px"}}>

<IonLabel
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "15px",
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
             
              border: "1px solid #E2E8F0",
            }}
          />

</div>
      

<div style={{marginTop:"20px"}}>

<IonLabel
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "15px",
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

</div>


          {/* </IonItem> */}
          
        </div>
       
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

<CustomBtn1 fun={handelBtnClick} title={"Continue"}/>
</div>
      </IonContent>
    </IonPage>
  );
};

export default Newphone;
