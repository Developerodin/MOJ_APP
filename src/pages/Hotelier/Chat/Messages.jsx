import { IonContent, IonIcon, IonPage, IonSegment, IonSegmentButton, IonLabel, IonToolbar } from '@ionic/react';
import { chatboxEllipsesOutline } from 'ionicons/icons';
import React, { useState,useContext,useEffect } from 'react';
import { isMobile } from '../../../IsMobile/IsMobile';
import ContactsChat from '../../../components/Chats/ContactsChat';
import { AppContext } from '../../../Context/AppContext';

export const HotelierMessages = () => {
  const { languageUpdate} = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState('Job Seeker');
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
            <IonIcon icon={chatboxEllipsesOutline} style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "26px", fontWeight: "bold", marginLeft: "15px", marginTop: "0px" }}>
              {selectedLanguage === "English" ? "Messages" : "संदेश"}
            </span>
          </div>

          <IonToolbar style={{marginTop:'10px'}}>
            <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
              <IonSegmentButton value="Job Seeker">
                <IonLabel style={{ color: "#2D3F65", fontSize: "15px", fontWeight: "500" }}>
                  {selectedLanguage === "English" ? "Job Seeker" : "नौकरी चाहने वाला"}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Agent">
                <IonLabel style={{ color: "#2D3F65", fontSize: "15px", fontWeight: "500" }}>
                  {selectedLanguage === "English" ? "Agent" : "एजेंट"}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>

          <div style={{ marginTop: "20px" }}>
            <ContactsChat userType={selectedTab} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
