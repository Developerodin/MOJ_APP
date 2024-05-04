import { IonButton, IonContent, IonIcon, IonPage, IonToggle } from '@ionic/react'
import { bagHandleOutline } from 'ionicons/icons'
import React from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { CustomBtn1 } from '../../../components/Buttons/CustomBtn1'

export const AccountsAndNotifications = () => {

  const handelSave = () =>{
    console.log("save")
  }
  return (
    <IonPage>
        <IonContent>
        <div style={{padding:"20px"}}>
          <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Accounts And Notifications"} />
          
           <div style={{marginTop:"50px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{width:"80%"}}>
                    <div>
                      <span style={{fontSize:"18px",fontWeight:"bold"}}>SMS notification</span>
                    </div>
                    <div>
                      <span style={{fontSize:"13px"}}>Enable SMS to get notification for unread messages</span>
                    </div>
                    <div>

                    </div>
                  </div>

                  <div style={{width:"20%",display:"flex",justifyContent:"right",alignItems:"center"}}>
                  <IonToggle></IonToggle>
                  </div>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"40px"}}>
                  <div style={{width:"80%"}}>
                    <div>
                      <span style={{fontSize:"18px",fontWeight:"bold"}}>Notification</span>
                    </div>
                    <div>
                      <span style={{fontSize:"13px"}}>Enable Push notification to get position recommendations based on your job preference.</span>
                    </div>
                    <div>

                    </div>
                  </div>

                  <div style={{width:"20%",display:"flex",justifyContent:"right",alignItems:"center"}}>
                  <IonToggle></IonToggle>
                  </div>
            </div>


            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"50px"}}>
                  <div >
                   
                 
                  </div>

                  <div style={{display:"flex",justifyContent:"right",alignItems:"center"}}>
                    <IonButton color={"danger"}>Delete Account</IonButton>
                  </div>
            </div>
           </div>


           <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handelSave} title={"Save"}/>

         </div>
          </div>
        
        </IonContent>
    </IonPage>
  )
}
