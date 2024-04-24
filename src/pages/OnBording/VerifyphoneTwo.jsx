import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import OtpInput from "react-otp-input";
const VerifyPhoneTwo = () => {
  const history = useHistory()
  const [otp, setOtp] = useState("");
  const handelBtnClick= ()=>{
    history.push("/personal-details")
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
            We just sent you an SMS
          </h1>
          <p
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "18px",
              fontWeight: "400",
            }}
          >
            Enter the security code we sent to <br /> +91 9876543210
          </p>

          {/* <IonItem> */}
          <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
             <OtpInput
                inputType="password"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span style={{ margin: "10px" }}></span>}
                inputStyle={{
                  background: "transparent",
                  border: "1px solid #E2E8F0",
                  width: "44px",
                  height: "48px",
                  borderRadius:"8px"
                }}
                renderInput={(props) => <input {...props} />}
              />
             </div>
          {/* </IonItem> */}
          <div
            style={{
              marginTop: "20px",
              color: "#575757",
              fontFamily: "inter",
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            Didn't not get the code ?{" "}
            <span
              style={{
                color: "black",
                fontFamily: "inter",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              Resend it
            </span>
          </div>
        </div>
           
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

<CustomBtn1 fun={handelBtnClick} title={"Submit"}/>
</div>

        
      </IonContent>
    </IonPage>
  );
};

export default VerifyPhoneTwo;
