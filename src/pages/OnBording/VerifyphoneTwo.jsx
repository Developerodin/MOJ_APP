import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  useIonRouter,
  
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import OtpInput from "react-otp-input";
import { AppContext } from "../../Context/AppContext";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import logo from "/assets/moj.png";
const VerifyPhoneTwo = () => {
  const history = useIonRouter();
  const { showToast } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    phoneNumber: '',
    referralCode: ''
  });
  const [loading,setLoading] = useState(false);
  const handelBtnClick= ()=>{
       console.log("Otp",otp)
       LoginUsingOtp();

   
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  
  const LoginUsingOtp = async () => {
    try {
      setLoading(true)
      const url = `${Base_url}auth/verify_otp/${otp}`;
      const formData1 = new FormData();
      formData1.append('mobile_number', formData.phoneNumber);

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            if(data === "otp in valid"){
              showToast("error", "wrong otp", "");
              setLoading(false)
              return;
            }

          if(data.status === "success"){
            localStorage.setItem("Auth",true);
           
            localStorage.setItem("token",data.access_token);
            localStorage.setItem("userDetails",JSON.stringify(data.user));
            showToast("success", data.message, "");
            setLoading(false)
              history.push("/app", 'root','replace');
              return
          }

          if(response.data === "user not found"){
            history.push("/personal-details");
            setOtp("");
            setLoading(false)
            return;
          }

            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
      setLoading(false)
    }
  };
  
  useEffect(() => {
    // Get form data from local storage
    const storedFormData = localStorage.getItem('Mobile');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />

            <img src={logo} style={{height:"68px",width:"92px"}}/>
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
            Enter the security code we sent to <br /> +91 {formData && formData.phoneNumber}
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
                  border: "1px solid grey",
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

<CustomBtn1 fun={handelBtnClick} title={"Submit"} loading={loading}/>
</div>

        
      </IonContent>
    </IonPage>
  );
};

export default VerifyPhoneTwo;
