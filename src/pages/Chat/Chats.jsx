import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline} from 'ionicons/icons';
import ContactsChat from '../../components/Chats/ContactsChat';
import GroupsChat from '../../components/Chats/GroupsChat';
import Threds from '../../components/Chats/Threds';
import { useHistory, useLocation } from 'react-router';
import { AppContext } from '../../Context/AppContext';
export const Chats = () => {
  const{MarkerData,setTabBarVisibility,TabBarVisibility,itemData}=useContext(AppContext);

    const [selectedTab, setSelectedTab] = useState('Contacts');
    const location = useLocation();
    const history=useHistory()
    const path=location.pathname;
    // console.log("path from chats",TabBarVisibility);
    
    setTabBarVisibility(path);

    const renderComponent = () => {
        switch (selectedTab) {
          case 'Contacts':
            return <ContactsChat />;
          case 'Group':
            return <GroupsChat />;
          case 'Threads':
            return <Threds />;
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

  return (
    <IonPage>
        <IonContent>
            <div style={{width:"90%",margin:"auto"}}>

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{marginTop:"30px"}}>
                <IonText style={{fontSize:"48px",color:"#2D3F65",fontWeight:"500"}}>Chats</IonText>
               </div>
               <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {/* <div>
            <IonIcon onClick={handleBackButtonClick}  style={{margin:"5px 3px 0px"}} icon={closeOutline} size="large" color="dark"></IonIcon>
            
            
              </div> */}
                
               
            </div>
           
        
        
        </div>

{/* search bar */}
               <div>
                <IonList style={{width:"95%"}}>
                    <IonItem>
                        <IonInput placeholder='search...'></IonInput>
                        <IonIcon icon={searchOutline} size='small' slot='end'></IonIcon>
                    </IonItem>
                </IonList>
               </div>
            </div>



            <div>
            <IonToolbar>
        <IonSegment  value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
          <IonSegmentButton value="Contacts" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >CONTACTS</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Group" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >GROUPS</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Threads" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >THREADS</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
            </div>

          <div style={{marginTop:"10px",width:"95%",margin:"auto"}}>

            {
                renderComponent()
            }
            
          </div>



        </IonContent>
    </IonPage>
  )
}



