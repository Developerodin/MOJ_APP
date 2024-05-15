import React, { useContext, useState } from "react";
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
const Newphone = () => {
  const history = useHistory()
  const { showToast } = useContext(AppContext);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    referralCode: ''
  });
  const [response, setResponse] = useState('');
  const [loading,setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handelBtnClick= ()=>{
    console.log('Phone Number:', formData);
       if(formData.phoneNumber.length === 10){
        localStorage.setItem('Mobile', JSON.stringify(formData));
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
          Phone Number
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
          Referral Code (optional)
        </IonLabel>
        <input
        className="round-input"
          type="tel"
          name="referralCode"
          value={formData.referralCode}
          onChange={handleChange}
         
        />
      </div>

     
    </div>


          {/* </IonItem> */}
          
        </div>
       
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

<CustomBtn1 fun={handelBtnClick} title={"Continue"} loading={loading}/>
</div>
      </IonContent>
    </IonPage>
  );
};

export default Newphone;
