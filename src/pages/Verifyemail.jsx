import React from 'react';
import { IonPage, IonContent,  IonButton, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { IonCheckbox } from '@ionic/react';

const Verifyemail = () => {
  return (
    <IonPage>
      

      <IonContent>
      
        <div style={{ padding: '20px' }}>
        <IonButton slot="start">
            <IonIcon icon={arrowBack} />
          
          </IonButton>
            <h1 style={{ color: '#232323', fontSize: '36px',fontFamily:'inter',fontWeight:'700' }}>Let’s verify your email
</h1>
          
            <IonLabel style={{color:'#575757',fontFamily:'inter',fontSize:'20px',fontWeight:'400',lineHeight:'30px'}} >Email</IonLabel>
          {/* <IonItem> */}
          <IonInput type="tel"   style={{  borderRadius: '50px', fontSize: '20px',border: '1px solid #E2E8F0' }} />

          {/* </IonItem> */}
          <div style={{marginTop:'20px',color:'#333333',fontFamily:'inter',fontWeight:'700',fontSize:'20px'}}>Already have an account? <span style={{color:'blue',fontFamily:'inter',fontWeight:'700',fontSize:'20px'}}>Sign In</span></div>
        
        </div>
        <div style={{position:'absolute',bottom:'10px',width:"100%"}}>
        <div style={{ display: 'flex', alignItems: 'center' ,marginBottom:'20px'}}>
  <IonCheckbox slot="start" style={{ marginRight: '10px' }} />
  <span style={{color:'#575757',fontFamily:'inter',fontSize:'20px',fontWeight:'400'}}>I prefer email as my primary form of <br /> feedback and contact</span>
</div>

        <IonButton expand="block" style={{ borderRadius:'50px'}}>Send Code</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Verifyemail;
