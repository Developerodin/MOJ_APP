import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,

  IonLabel,
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { Base_url } from "../../Config/BaseUrl";
import axios from 'axios';
import { AppContext } from "../../Context/AppContext";
import logo from "/assets/moj.png";
import { isMobile } from "../../IsMobile/IsMobile";
import { Keyboard } from '@capacitor/keyboard';
const Newphone = () => {
  const history = useHistory()
  
  const { showToast,languageUpdate } = useContext(AppContext);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    referralCode: ''
  });
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  function encodeUserID(userID) {
    const userIDStr = userID.toString();
    const encodedUserID = btoa(userIDStr) ;
    return userDetails.name.substring(0,2).toUpperCase() + encodedUserID ;
  }

  function decodeReferenceID(referenceID) {
    const refid = referenceID.substring(2, referenceID.length);
    const decodedUserIDStr = atob(refid);
    const userID = parseInt(decodedUserIDStr, 10);
    return userID;
  }
  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);
 
  const handelBtnClick= ()=>{
    console.log('Phone Number:', formData);
       if(formData.phoneNumber.length === 10){
        localStorage.setItem('Mobile', JSON.stringify(formData));
        // const eCode = encodeUserID("70");
        const dCode = decodeReferenceID(formData.referralCode);

        console.log("DCode ===>",dCode)
        localStorage.setItem('refCode', JSON.stringify(dCode));
        checkMobile();
       }
       else{
        showToast("error", "wrong mobile number", "");
       }
         
   
  }
  const handelBackClick = ()=>{
    history.goBack()
  }

 
  
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
              console.log("respos dat==>",response.data.otp)
              localStorage.setItem("userotps",response.data.otp)
              setLoading(false)
              history.push("/verify-otp");
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


    useEffect(()=>{
           console.log("Is Mobile ==>",isMobile)
    },[])


  return (
    <IonPage >
      <IonContent>
        <div style={{ padding: "20px"}}>
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
           
           {selectedLanguage === "English" ? "Enter your phone number" : "अपना फोन नंबर डालें"}
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
            
            {selectedLanguage === "English" ? "Enter your phone number to receive OTP" : "OTP प्राप्त करने के लिए अपना फ़ोन नंबर दर्ज करें"}
          </h5>
            </div>
        

          <div>
      <div style={{ marginTop: "20px" }}>
        <IonLabel
          style={{
            color: "#575757",
            fontFamily: "inter",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "30px",
          }}
        >
          
          {selectedLanguage === "English" ? "Phone Number" : "फ़ोन नंबर"}
        </IonLabel>
        <br/>
        <input
        className="round-input"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <IonLabel
          style={{
            color: "#575757",
            fontFamily: "inter",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "30px",
          }}
        >
          
          {selectedLanguage === "English" ? "Referral Code (optional)" : "रेफरल कोड (वैकल्पिक)"}
        </IonLabel>
        <input
        className="round-input"
        
          name="referralCode"
          value={formData.referralCode}
          onChange={handleChange}
         
        />
      </div>

     
    </div>

{
  !isMobile &&  <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"50px"}}>

  <CustomBtn1 fun={handelBtnClick} title={"Continue"} loading={loading}/>
  
  
  </div>
}
   

           </div>

        


          {/* </IonItem> */}
          
        </div>
        {
        
  isMobile &&   <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:'33vh'}}>

  <CustomBtn1 fun={handelBtnClick} title={selectedLanguage === "English" ? "Continue" : "जारी रखना"} loading={loading}/>
  
  
  </div>
  
  }
      
      </IonContent>
    </IonPage>
  );
};

export default Newphone;
