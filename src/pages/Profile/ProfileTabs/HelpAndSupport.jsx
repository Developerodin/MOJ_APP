
import React, { useContext, useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { arrowBack, bookOutline, bookSharp, callOutline, clipboardOutline, phoneLandscape } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { isMobile } from "../../../IsMobile/IsMobile";
import { ContactUsModel } from "../../../components/Models/ContactUsModel";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";

export const HelpAndSupport = () => {
    const history = useHistory()
    const { editUpdate, setEditUpdate, profileHealthUpdate,languageUpdate } =
        useContext(AppContext);
const [contactUsModel, setContatUsModel] = useState(false);
const [basicData, setBasicData] = useState(null);
 const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

    const handelSaveClick= ()=>{
    //   history.push("/home")
    }
    const handelBackClick = ()=>{
      history.goBack()
    }
    const faqs = selectedLanguage === "English" ? [
      {
        question: 'How can I change profile pic?',
        answer: 'To change your profile pic, go to the profile tab and click on "Profile pic edit icon".',
      },
      {
        question: 'How can I contact customer support?',
        answer: 'You can contact customer support by clicking the "Contact Us" button below.',
      },
      {
        question: 'Where can I complete my profile?',
        answer: 'You can find profile health section under your account profile.',
      },
      {
        question: 'How do I update my profile information?',
        answer: 'To update your profile information, go to the "Profile" section and select the profile tab to edit it.',
      },
    ] : [
      {
        question: 'मैं अपनी प्रोफ़ाइल तस्वीर कैसे बदल सकता हूँ?',
        answer: 'अपनी प्रोफ़ाइल तस्वीर बदलने के लिए, प्रोफ़ाइल टैब पर जाएं और "प्रोफ़ाइल पिक एडिट आइकन" पर क्लिक करें।',
      },
      {
        question: 'मैं ग्राहक सहायता से कैसे संपर्क कर सकता हूँ?',
        answer: 'आप ग्राहक सहायता से संपर्क करने के लिए नीचे दिए गए "हमसे संपर्क करें" बटन पर क्लिक कर सकते हैं।',
      },
      {
        question: 'मैं अपनी प्रोफ़ाइल कहाँ पूरा कर सकता हूँ?',
        answer: 'आप अपने खाते की प्रोफ़ाइल के तहत प्रोफ़ाइल हेल्थ सेक्शन पा सकते हैं।',
      },
      {
        question: 'मैं अपनी प्रोफ़ाइल जानकारी कैसे अपडेट कर सकता हूँ?',
        answer: 'अपनी प्रोफ़ाइल जानकारी अपडेट करने के लिए, "प्रोफ़ाइल" सेक्शन में जाएं और प्रोफ़ाइल टैब का चयन करें।',
      },
    ];

    const handelContactUs = () => {
      setContatUsModel(true);
    };

    const getWebBasic = async () => {
      try {
        const url = `${Base_url}basic/web`;
  
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
          },
        });
        const data = response.data;
        // console.log("Response check work experience data",data,response)
  
        if (data) {
          console.log("Basic data", data.post);
          setBasicData(data.post[0]);
        }
      } catch (error) {
        console.error("Error:", error);
        // showToast("error", "Try After Some Time", "");
      }
    };

    useEffect(()=>{
      getWebBasic()

      const languageFromStorage = localStorage.getItem("selectedLanguage");
      if (languageFromStorage) {
        setSelectedLanguage(languageFromStorage);
      }
    },[languageUpdate])


    return (
      <IonPage>
        <IonContent>

          <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={clipboardOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={selectedLanguage === "English" ? "Help & Support" : "सहायता और समर्थन"}  />

          
     <div style={{marginTop:"30px"}}>
     <h4 style={{marginBottom:"30px"}}>
     {selectedLanguage === "English" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
      </h4>
        <IonList>
          {faqs.map((faq, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={handelContactUs} style={{marginTop:"60px"}} expand="full" color="primary" shape="round" >
         
          {selectedLanguage === "English" ? "Contact Us" : "हमसे संपर्क करें"}
        </IonButton>
          </div>    

           
          </div>
           <ContactUsModel
                      showModal={contactUsModel}
                      setShowModal={setContatUsModel}
                      data={basicData}
                    />
        </IonContent>
      </IonPage>
    );
}



