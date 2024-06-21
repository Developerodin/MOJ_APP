import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,

  IonLabel,
  useIonRouter,
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { Base_url } from "../../Config/BaseUrl";
import axios from 'axios';
import { AppContext } from "../../Context/AppContext";
import logo from "/assets/moj.png";
import { isMobile } from "../../IsMobile/IsMobile";
const OnBordingCompletePage = () => {
  const history = useIonRouter()
  const [formData, setFormData] = useState({
    phoneNumber: '',
    referralCode: ''
  });
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  const [loading,setLoading] = useState(false);

  const checkMobile = async () => {
    try {
      setLoading(true)
      const url = `${Base_url}auth/number_check`;
      const formData1 = new FormData();
      formData1.append('mobile_number', formData.phoneNumber);

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
          console.log("Response check mobile",response.data)

          if(response.data.status === "success"){
            setLoading(false)
            history.push("/verify-otp", 'root','replace')
            setFormData({
              phoneNumber: '',
              referralCode: ''
            })
            return;
          }
          
          else{
            showToast("error", "Try After Some Time", "");
            setLoading(false)
          }
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };

  const handelBtnClick = ()=>{
    checkMobile()
    
  }

  useEffect(()=>{
    const storedFormData = localStorage.getItem('Mobile');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  },[])


  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"70%" }}>
        


           <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

            <div style={{textAlign:"center"}}>
            <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
           
           {selectedLanguage === "English" ? "Congratulations!" : "अपना फोन नंबर डालें"}
          </h1>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {/* <IonIcon  icon={chevronBackOutline} style={{fontSize:"24px"}} /> */}

            <img src={logo} style={{height:"200px",width:"200px"}}/>
           </div>
          <h5
            style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "30px",
            }}
          >
            
            {selectedLanguage === "English" ? "Your account has been successfully created. You can now log in to start using our app" : "OTP प्राप्त करने के लिए अपना फ़ोन नंबर दर्ज करें"}
          </h5>
            </div>
        

          <div>
     

     
    </div>

{
  !isMobile &&  <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"50px"}}>

  <CustomBtn1 fun={handelBtnClick} title={selectedLanguage === "English" ? "Login" : "लॉग इन करें"} loading={loading}/>
  
  
  </div>
}
   

           </div>

        


          {/* </IonItem> */}
          
        </div>
        {
  isMobile &&   <div style={{width:"100%",position:"fixed",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

  <CustomBtn1 fun={handelBtnClick} title={selectedLanguage === "English" ? "Login" : "लॉग इन करें"} loading={loading}/>
  
  
  </div>
  
  }
      
      </IonContent>
    </IonPage>
  );
};

export default OnBordingCompletePage;
