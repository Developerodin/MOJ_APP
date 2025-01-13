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
import { isMobile } from "../../IsMobile/IsMobile";
import { Keyboard } from '@capacitor/keyboard';
const VerifyPhoneTwo = () => {
  const history = useIonRouter();
  const { showToast,languageUpdate } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    phoneNumber: '',
    referralCode: ''
  });
  const [loading,setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const showHandler = Keyboard.addListener('keyboardWillShow', () => {
      setIsKeyboardOpen(true);
    });

    const hideHandler = Keyboard.addListener('keyboardWillHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);
  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);
  const handelBtnClick = () => {
    if (!otp) {
      showToast("error", selectedLanguage === "English" ? "OTP is required" : "ओटीपी आवश्यक है", "");
      return;
    } else if (otp.length < 6) {
      showToast("error", selectedLanguage === "English" ? "Please enter a valid 6-digit OTP" : "कृपया एक मान्य 6-अंकीय ओटीपी दर्ज करें", "");
      return;
    }
    console.log("Otp", otp);
    LoginUsingOtp();
  };
  const handelBackClick = ()=>{
    history.goBack()
  }

  const handelEditClick = () => {
    history.push("/phone");
  };

  const checkMobile = async () => {
    try {
      setLoading(true);
      const url = `${Base_url}auth/number_check`;
      const formData1 = new FormData();
      formData1.append('mobile_number', formData.phoneNumber);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.data.status === "success") {
        localStorage.setItem("userotps", response.data.otp);
                showToast("success", selectedLanguage === "English" ? "OTP Resent successfully" : "ओटीपी फिर से भेजा गया", "");
        setLoading(false);
        // No need to navigate to another page, just resend the OTP
        return;
      } else {
        showToast("error", selectedLanguage === "English" ? "Try After Some Time" : "कुछ समय बाद पुनः प्रयास करें", "");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      showToast("error", selectedLanguage === "English" ? "Try After Some Time" : "कुछ समय बाद पुनः प्रयास करें", "");
      setLoading(false);
    }
  };
  
  const LoginUsingOtp = async () => {
    try {
      setLoading(true)
      const url = `${Base_url}auth/verify_otp/${otp}`;
      const otpuser = localStorage.getItem("userotps")
      const formData1 = new FormData();
      formData1.append('mobile_number', formData.phoneNumber);
      formData1.append('otp',otpuser );
      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            if(data === "otp in valid"){
              showToast("error", selectedLanguage === "English" ? "Wrong OTP" : "गलत ओटीपी", "");
              setLoading(false)
              return;
            }

          if(data.status === "success"){
            localStorage.setItem("Auth",true);
           
            localStorage.setItem("token",data.access_token);
            localStorage.setItem("userDetails",JSON.stringify(data.user));
            localStorage.setItem("role",data.user.role);
            
            showToast("success", data.message, "");
            setLoading(false)
              history.push("/app", 'root','replace');
              window.location.reload();
              return
          }

          if(response.data === "user not found"){
            history.push("/basic-info");
            setOtp("");
            setLoading(false)
            return;
          }

            
         
          
    } catch (error) {
      console.error('Error:', error);
          showToast("error", selectedLanguage === "English" ? "Try After Some Time" : "कुछ समय बाद पुनः प्रयास करें", "");
      setLoading(false)
    }
  };
  
  useEffect(() => {
    // Get form data from local storage
    const storedFormData = localStorage.getItem('Mobile');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', (e) => {
        const ac = new AbortController();
        navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: ac.signal
        }).then((otp) => {
          setOtp(otp.code);
        }).catch(err => {
          console.error(err);
        });
      });
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

           <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <div>
            <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            
            {selectedLanguage === "English" ? "We just sent you an SMS" : "हमने अभी आपको एक एसएमएस भेजा है"}
          </h1>
                                    <p
                    style={{
                      color: "#575757",
                      fontFamily: "inter",
                      fontSize: "18px",
                      fontWeight: "400",
                      margin: 0,
                    }}
                  >
                    {selectedLanguage === "English" ? "Enter the security code we sent to" : "हमारे द्वारा भेजा गया सुरक्षा कोड दर्ज करें"}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>+91 {formData && formData.phoneNumber}</span>
                    <button style={{ background: "transparent", border: "none", color: "#000", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }} onClick={handelEditClick}>
                      {selectedLanguage === "English" ? "Edit" : "संपादित करें"}
                    </button>
                  </div>
            </div>
          

          {/* <IonItem> */}
          <div style={{display:"flex",justifyContent:"center", alignItems:"center",marginTop:"20px"}}>
             <OtpInput
             
                inputType="number"
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
           
            {selectedLanguage === "English" ? "Didn't not get the code " : "कोड नहीं मिला"}  ?{" "}
            <button
              style={{
                color: "black",
                fontFamily: "inter",
                fontWeight: "700",
                fontSize: "16px",
              }}
            onClick={checkMobile}
              
            >
              
              {selectedLanguage === "English" ? "Resend it" : "फिर से भेजें"}
            </button>
          </div>

{
  !isMobile &&    <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"50px"}}>

  <CustomBtn1 fun={handelBtnClick} title={selectedLanguage === "English" ? "Submit" : "सबमिट करें"} loading={loading}/>
  </div>
}
       

           </div>
        
        </div>

        {
          
  isMobile && 
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:'43vh'}}>

<CustomBtn1 fun={handelBtnClick} title={selectedLanguage === "English" ? "Submit" : "सबमिट करें"} loading={loading}/>
</div>
}

        
      </IonContent>
    </IonPage>
  );
};

export default VerifyPhoneTwo;
