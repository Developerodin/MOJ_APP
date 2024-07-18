import React from 'react';
import { IonAlert } from '@ionic/react';

export const OfflineAlert = ({ isOpen, onClose }) => {
  const handleTryAgain = () => {
    window.location.reload();
  };

  const alertStyles = {
    '--background': '#ffffff',  
    '--color': '#333',          
     
    '--width': '70%',           
    '--max-width': '500px',     
    
    
  };

  const buttonStyles = {
    '--color': '#007bff',      
    '--background': 'none',    
    '--border': 'none',        
    'font-weight': 'bold',     
  };

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header={'No Connection'}
      message={'You are currently offline, please connect to the internet.'}
      buttons={[
        {
          text: 'OK',
          role: 'cancel',
          
          cssClass: 'alert-button',
          style: buttonStyles,
        },
        {
          text: 'Try Again',
          handler: handleTryAgain,
          cssClass: 'alert-button',
          style: buttonStyles,
        }
      ]}
      cssClass="offline-alert"
      style={alertStyles}
    />
  );
};
