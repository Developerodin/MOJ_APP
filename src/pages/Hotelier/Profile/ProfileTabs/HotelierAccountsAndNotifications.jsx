import { IonButton, IonContent, IonIcon, IonPage, IonToggle, useIonRouter } from '@ionic/react'
import { bagHandleOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { CustomBtn1 } from '../../../components/Buttons/CustomBtn1'
import { useIonActionSheet } from '@ionic/react';
import { Base_url } from '../../../Config/BaseUrl'
import axios from 'axios'
import { isMobile } from '../../../IsMobile/IsMobile'
export const HotelierAccountsAndNotifications = () => {
  const history =  useIonRouter()
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
   const [deleteModel,setDeleteModel] = useState(false);
   const [present] = useIonActionSheet();
  const handelSave = () =>{
    console.log("save")
  }
 
  const handleDeleteClick =async()=>{
    try {

      const formData = new FormData()
    const url = `${Base_url}user_delete/${userDetails.user_id}`;
    
  

    const response = await axios.get(url,{
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization" :`Berear ${token}`,
   
      }
    });
    const data = response.data
     
        if(data){
          localStorage.clear();
        history.push("/Coninue");
        window.location.reload()
         return
        }
        

          
       
        
  } catch (error) {
    console.error('Error:', error);
    // showToast("error", "Try After Some Time", "");
  }
  }
  return (
    <IonPage>
        <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
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
                    {/* <IonButton color={"danger"}>Delete Account</IonButton> */}
                    <IonButton
                    color={"danger"}
      onClick={() =>
        present({
          // header: 'Confirmation',
          header:'Are you sure you want to delete your account? This action cannot be undone.',
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              handler: handleDeleteClick, // Call handleDeleteClick when Delete button is clicked
              data: {
                action: 'delete',
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
          ],
        })
      }
    >
      Delete Account
    </IonButton>
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
