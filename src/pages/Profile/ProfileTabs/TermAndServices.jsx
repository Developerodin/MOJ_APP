import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagHandleOutline } from 'ionicons/icons'

export const TermAndServices = () => {
  return (
    <IonPage>
        <IonContent>
          <div style={{padding:"20px"}}>
          <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Term And Services"} />
           
          <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
          {/* Main title */}
          {/* <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Master of Jobs Terms and Services</h1> */}

          {/* Section 1: Use to be in Conformity with the Purpose */}
          <div className="section" style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Use to be in Conformity with the Purpose</h2>
            <p style={{ marginBottom: '15px' }}>By accessing and using Masterofjobs.in and related services, you agree to abide by these terms and conditions. The platform is intended for individuals and businesses seeking employment opportunities, career enhancement services, and genuine job vacancies. It is strictly prohibited to misuse the platform for any illegal or unauthorized purpose.</p>
            <p style={{ marginBottom: '15px' }}>Users must ensure that their use of the platform aligns with its intended purpose and refrain from any actions that may cause harm, disruption, or unauthorized access.</p>
            <p style={{ marginBottom: '15px' }}>Master of Jobs reserves the right to take appropriate action against users who violate these terms, including suspension or termination of access and legal recourse.</p>
          </div>

          {/* Section 2: Quality and Genuineness of Responses */}
          <div className="section" style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Quality and Genuineness of Responses</h2>
            <p style={{ marginBottom: '15px' }}>While Master of Jobs strives to provide a platform for genuine job vacancies and career enhancement services, we do not guarantee the accuracy, quality, or genuineness of responses received through the platform.</p>
            <p style={{ marginBottom: '15px' }}>Users are advised to conduct their own due diligence and verification processes before engaging with any responses or information provided on Masterofjobs.in. We disclaim any liability for the outcomes of interactions or transactions resulting from the use of our platform.</p>
          </div>

          {/* Section 3: Permission to Use Information */}
          <div className="section" style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Permission to Use Information</h2>
            <p style={{ marginBottom: '15px' }}>By using Masterofjobs.in, you grant us permission to use the information and actions you take on the platform for the purpose of providing personalized content, advertisements, and offers across our services. This may include analyzing user behavior, preferences, and interactions to improve our services and enhance user experience.</p>
            <p style={{ marginBottom: '15px' }}>We may also share aggregated or anonymized data with third-party partners for research, analysis, and marketing purposes. Your personal information will be handled in accordance with our Privacy Policy.</p>
          </div>
        </div>
          </div>
      
        </IonContent>
    </IonPage>
  )
}
