
import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp, callOutline, clipboardOutline, phoneLandscape } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../../components/Buttons/CustomBtn1";
import { isMobile } from "../../../../IsMobile/IsMobile";

export const AgentHelpAndSupport = () => {
    const history = useHistory()

    const handelSaveClick= ()=>{
    //   history.push("/home")
    }
    const handelBackClick = ()=>{
      history.goBack()
    }
    return (
      <IonPage>
        <IonContent>

          <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={clipboardOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Help & support"}  />

          
     <div style={{marginTop:"30px"}}>
  
 

 
      
      
            
  
            {/* </IonItem> */}

           
           


      
           
          </div>    

           
          </div>
        </IonContent>
      </IonPage>
    );
}



