import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline, documentTextOutline, chatboxEllipsesOutline} from 'ionicons/icons';
import JobContactsChat from '../../../components/Chats/JobChat/JobContactsChat';
import JobGroupsChat from '../../../components/Chats/JobChat/JobGroupsChat';
import JobThreds from '../../../components/Chats/JobChat/JobThreds';
import { useHistory, useLocation } from 'react-router';
import { AppContext } from '../../../Context/AppContext';
import Nochat from "/assets/coming-soon.png";
import { isMobile } from '../../../IsMobile/IsMobile';
import ContactsChat from '../../../components/Chats/ContactsChat';
export const AgentChats = () => {
  const{MarkerData,setTabBarVisibility,TabBarVisibility,itemData}=useContext(AppContext);

    const [selectedTab, setSelectedTab] = useState('Contacts');
    const location = useLocation();
    const history=useHistory()
    const path=location.pathname;
    // console.log("path from chats",TabBarVisibility);
    
    setTabBarVisibility(path);



      const handleBackButtonClick = () => {
        
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
          <span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"15px",marginTop:"0px"}}>Messages</span>
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



