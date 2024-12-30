import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonRouter, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline, chevronBackOutline} from 'ionicons/icons';
import ContactsChat from '../../components/Chats/ContactsChat';
import GroupsChat from '../../components/Chats/GroupsChat';
import Threds from '../../components/Chats/Threds';
import { useHistory, useLocation } from 'react-router';
import { AppContext } from '../../Context/AppContext';
import icon from "/assets/Coin.png";
import { History } from './History';
import { HowItworks } from './HowItworks';
import { MyPoints } from './MyPoints';
export const Reward = () => {
  const{MarkerData,setTabBarVisibility,TabBarVisibility,itemData,languageUpdate}=useContext(AppContext);

    const [selectedTab, setSelectedTab] = useState('MyPoints');
    const location = useLocation();
    const history=useIonRouter()
    const path=location.pathname;
    // console.log("path from chats",TabBarVisibility);
    
    setTabBarVisibility(path);

     const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("selectedLanguage") || "English"
      );
      useEffect(() => {
        
        const languageFromStorage = localStorage.getItem("selectedLanguage");
        if (languageFromStorage) {
          setSelectedLanguage(languageFromStorage);
        }
      }, [languageUpdate]);

    const renderComponent = () => {
        switch (selectedTab) {
          case 'MyPoints':
            return <MyPoints />;
          case 'History':
            return <History />;
          case 'Howitworks':
            return <HowItworks />;
          default:
            return null;
        }
      };

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


      const handelBackClick= ()=>{
        history.goBack();
          console.log("Back Presss")
      }
  return (
    <IonPage>
        <IonContent>
            <div style={{padding:"20px"}}>
            <div>
            <IonIcon onClick={handelBackClick}  icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
              <div style={{marginTop:"20px",display:"flex",justifyContent:"left",alignItems:"center"}}>
              
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                
                <img src={icon} style={{width:"40px",height:"40px"}} />
               
                  </div>
              
              <div style={{marginLeft:"10px",marginTop:"-5px"}} >
                <span style={{fontSize:"24px",fontWeight:"bold"}}>
                  
                  {
                    selectedLanguage === "English" ? "Reward points" : "अर्जित अंक"
                  }
                  </span>
               </div>
             
           
        
        
        </div>

{/* search bar */}
               {/* <div>
                <IonList style={{width:"95%"}}>
                    <IonItem>
                        <IonInput placeholder='search...'></IonInput>
                        <IonIcon icon={searchOutline} size='small' slot='end'></IonIcon>
                    </IonItem>
                </IonList>
               </div> */}
            </div>



            <div>
            <IonToolbar>
        <IonSegment  value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
          <IonSegmentButton value="MyPoints" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >
              
              {
                    selectedLanguage === "English" ? "My points" : "अर्जित अंक"
                  }
              </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="History" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >
             
              {
                    selectedLanguage === "English" ? "History" : "इतिहास"
                  }
              </IonLabel>
          </IonSegmentButton> 
          <IonSegmentButton value="Howitworks" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >
              
              {
                    selectedLanguage === "English" ? "How it works" : "यह कैसे काम करता है?"
                  }
              </IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
            </div>

          <div style={{marginTop:"30px",width:"95%",margin:"auto"}}>

            {
                renderComponent()
            }
            
          </div>



        </IonContent>
    </IonPage>
  )
}



