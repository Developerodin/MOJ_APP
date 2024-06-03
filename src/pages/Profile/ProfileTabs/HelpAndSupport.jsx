
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
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { isMobile } from "../../../IsMobile/IsMobile";

export const HelpAndSupport = () => {
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
         

          {/* <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelSaveClick} title={"Contact us"}/>
             </div> */}
           
          </div>
        </IonContent>
      </IonPage>
    );
}



