import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagHandleOutline } from 'ionicons/icons'

export const PrivacyAndPolicy = () => {
  return (
   <IonPage>
    <IonContent>
    <div style={{padding:"20px"}}>
          <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Privacy Policy"} />
          <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
          {/* Main title */}
          {/* <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Privacy Policy</h1> */}

          {/* Introduction */}
          <p style={{ marginBottom: '15px' }}>Our privacy policy outlines how we collect, use, and protect your personal information when you use our services.</p>

          {/* Information Collection */}
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Information Collection</h2>
          <p style={{ marginBottom: '15px' }}>We collect personal information such as name, email address, and contact details when you register or interact with our platform.</p>

          {/* Use of Information */}
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Use of Information</h2>
          <p style={{ marginBottom: '15px' }}>We use your personal information to provide and improve our services, communicate with you, and personalize your experience.</p>

          {/* Data Security */}
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Data Security</h2>
          <p style={{ marginBottom: '15px' }}>We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

          {/* Third-Party Disclosure */}
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Third-Party Disclosure</h2>
          <p style={{ marginBottom: '15px' }}>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>

          {/* Changes to Policy */}
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Changes to Policy</h2>
          <p style={{ marginBottom: '15px' }}>We reserve the right to update or modify our privacy policy at any time. Any changes will be communicated to you through our platform.</p>
        </div>
          </div>
        
    </IonContent>
   </IonPage>
  )
}
