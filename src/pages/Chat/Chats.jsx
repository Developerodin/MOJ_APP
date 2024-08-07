import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useState ,useEffect } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline, documentTextOutline, chatboxEllipsesOutline} from 'ionicons/icons';
import JobContactsChat from '../../components/Chats/JobChat/JobContactsChat';
import JobGroupsChat from '../../components/Chats/JobChat/JobGroupsChat';
import JobThreds from '../../components/Chats/JobChat/JobThreds';
import { useHistory, useLocation } from 'react-router';
import { AppContext } from '../../Context/AppContext';
import Nochat from "/assets/coming-soon.png";
import { isMobile } from '../../IsMobile/IsMobile';
import ContactsChat from '../../components/Chats/ContactsChat';
export const Chats = () => {
  const{MarkerData,setTabBarVisibility,TabBarVisibility,itemData,languageUpdate}=useContext(AppContext);

    const [selectedTab, setSelectedTab] = useState('Contacts');
    const location = useLocation();
    const history=useHistory()
    const [selectedLanguage, setSelectedLanguage] = useState(
      localStorage.getItem("selectedLanguage") || "English"
    );
    useEffect(() => {
      
      const languageFromStorage = localStorage.getItem("selectedLanguage");
      if (languageFromStorage) {
        setSelectedLanguage(languageFromStorage);
      }
    }, [languageUpdate]);
    const path=location.pathname;
    // console.log("path from chats",TabBarVisibility);
    
    setTabBarVisibility(path);



      const handleBackButtonClick = () => {
        // Replace 'Tab2' with the appropriate route name for your tab
        history.push('/home');
      };
      
      const handleHardwareBackButton = (event) => {
        event.detail.register(1, () => {
          handleBackButtonClick();
        });
      };
      
      useIonViewDidEnter(() => {
        document.addEventListener('ionBackButton', handleHardwareBackButton);
      
        return () => {
          document.removeEventListener('ionBackButton', handleHardwareBackButton);
        };
      });
      
      useIonViewDidLeave(() => {
        document.removeEventListener('ionBackButton', handleHardwareBackButton);
      });

  return (
    <IonPage>
        <IonContent>
            
           
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
          <IonIcon icon={chatboxEllipsesOutline} style={{fontSize:"30px"}} />
          <span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"15px",marginTop:"0px"}}>{selectedLanguage === "English" ? "Messages" : "संदेश"}</span>
          </div>

          <div style={{marginTop:"20px"}}>

{
    <JobContactsChat />
}

</div>
 {/* <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src={Nochat}
            alt="Globe Icon"
          
          />
          </div> */}

          </div>


           

         



        </IonContent>
    </IonPage>
  )
}



