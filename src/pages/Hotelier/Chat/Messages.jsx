import { IonContent, IonIcon, IonPage, IonSegment, IonSegmentButton, IonLabel, IonToolbar } from '@ionic/react';
import { chatboxEllipsesOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { isMobile } from '../../../IsMobile/IsMobile';
import ContactsChat from '../../../components/Chats/ContactsChat';

export const HotelierMessages = () => {
  const [selectedTab, setSelectedTab] = useState('JobSeeker');

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginTop: "10px" }}>
            <IonIcon icon={chatboxEllipsesOutline} style={{ fontSize: "30px" }} />
            <span style={{ fontSize: "26px", fontWeight: "bold", marginLeft: "15px", marginTop: "0px" }}>Messages</span>
          </div>

          <IonToolbar style={{marginTop:'10px'}}>
            <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
              <IonSegmentButton value="JobSeeker">
                <IonLabel style={{ color: "#2D3F65", fontSize: "15px", fontWeight: "500" }}>Job Seeker</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Agent">
                <IonLabel style={{ color: "#2D3F65", fontSize: "15px", fontWeight: "500" }}>Agent</IonLabel>
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
