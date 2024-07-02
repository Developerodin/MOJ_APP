
import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp, callOutline, clipboardOutline, eyeOffOutline, globeOutline, lockClosedOutline, logOutOutline, personOutline, phoneLandscape, settingsOutline, shareOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../../components/Buttons/CustomBtn1";
import ProfileListItem from "../../../../components/ProfileItem/ProfileItem";
import { isMobile } from "../../../../IsMobile/IsMobile";
import { AppContext } from "../../../../Context/AppContext";

export const AgentSettings = () => {
    const history = useHistory()
    const {languageUpdate } = useContext(AppContext);
    const [selectedLanguage, setSelectedLanguage] = useState(
      localStorage.getItem("selectedLanguage") || "English"
    );
    useEffect(() => {
      // Code to update selectedLanguage from localStorage
      const languageFromStorage = localStorage.getItem("selectedLanguage");
      if (languageFromStorage) {
        setSelectedLanguage(languageFromStorage);
      }
    }, [languageUpdate]);

    const handelSaveClick= ()=>{
    //   history.push("/home")
    }
    const handelBackClick = ()=>{
      history.goBack()
    }

    const ProfileTabs=[
    
        {icon:personOutline,
          title:selectedLanguage === "English" ? "Accounts & Notifications" : "खाते और सूचनाएं",
          link:"/accounts-notification",color:"#395CFF"},
        {icon:globeOutline,
          title:selectedLanguage === "English" ? "Change language" : "भाषा बदलें"
          ,link:"/select-lang",color:"#395CFF"},
        // {icon:shareOutline,title:"Invite your friend",link:"/",color:"#395CFF"},
        {icon:clipboardOutline,
          title:selectedLanguage === "English" ? "Term & Services" : "शर्तें और सेवाएं"
          ,link:"/term-services",color:"#395CFF"},
        {icon:eyeOffOutline,
          title:selectedLanguage === "English" ? "Privacy Policy" : "गोपनीयता नीति"
          ,link:"/privacy-policy",color:"#395CFF"},
        {icon:logOutOutline,
          title:selectedLanguage === "English" ? "Logout" : "लॉग आउट"
          ,
          link:"/logout",color:"#395CFF"},
      ]
    return (
      <IonPage>
        <IonContent>

          <div className={isMobile ? "" : 'sw'} style={{ padding: "10px" }}>

               <ProfileHeaders icon={<IonIcon icon={settingsOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={ selectedLanguage === "English" ? "Settings" : "समायोजन"}  />

          
     <div style={{marginTop:"30px"}}>
  
 
     <div style={{marginTop:"20px"}}>

<IonGrid>
  <IonRow>
  <IonCol size='12'>
<IonList>


      {
        ProfileTabs.map((el,index)=>{
          return <div key={index} style={{marginTop:"20px"}}>
            <ProfileListItem key={index} Data={el} />
            </div>
        })
      }

      

     


</IonList>
</IonCol>
  </IonRow>
</IonGrid>
</div>

           
           


      
           
          </div>    
         

           
          </div>
        </IonContent>
      </IonPage>
    );
}



