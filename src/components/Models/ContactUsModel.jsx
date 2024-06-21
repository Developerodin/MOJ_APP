import { IonBackdrop, IonIcon, IonModal } from '@ionic/react'
import { callOutline, logoWhatsapp, mailOutline, phoneLandscape } from 'ionicons/icons'
import React, { useState } from 'react'

export const ContactUsModel = ({showModal, setShowModal,data}) => {
  const Role = localStorage.getItem("role") || "";
  return (
    <IonModal
    initialBreakpoint={0.25} breakpoints={[0, 0.25]}
    isOpen={showModal}
 // Change 'root' to the ID of your root element
    swipeToClose={true}
    onDidDismiss={() => setShowModal(false)}
    
  >
    <div className="modal-content" >
      {Role === "Employers" ?
      <div style={{ padding: "30px" }}>
      <div onClick={() => window.open(`https://wa.me/${data && data.whatsapp}`, '_blank')} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <IonIcon icon={logoWhatsapp}  style={{fontSize:"24px"}} color='success'/>

             <span>{data && data.h_mobile}</span>
      </div>

      <div onClick={() => window.location.href = `tel:${data && data.mobile}`} style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <IonIcon icon={callOutline} color='primary'  style={{fontSize:"24px"}}/>

             <span>{data && data.h_mobile}</span>
      </div>

      <div onClick={() => window.location.href = `mailto:${data && data.email}`} style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <IonIcon icon={mailOutline} color='danger' style={{fontSize:"24px"}}/>

             <span>{data && data.h_email}</span>
      </div>
     </div>
     :
     <div style={{ padding: "30px" }}>
       <div onClick={() => window.open(`https://wa.me/${data && data.whatsapp}`, '_blank')} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <IonIcon icon={logoWhatsapp}  style={{fontSize:"24px"}} color='success'/>

              <span>{data && data.whatsapp}</span>
       </div>

       <div onClick={() => window.location.href = `tel:${data && data.mobile}`} style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <IonIcon icon={callOutline} color='primary'  style={{fontSize:"24px"}}/>

              <span>{data && data.mobile}</span>
       </div>

       <div onClick={() => window.location.href = `mailto:${data && data.email}`} style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <IonIcon icon={mailOutline} color='danger' style={{fontSize:"24px"}}/>

              <span>{data && data.email}</span>
       </div>
      </div>
      }
      
    </div>
    {/* <IonBackdrop
      onClick={() => setShowModal(false)}
      style={{ zIndex: '0' }}
    /> */}
  </IonModal>
  )
}
