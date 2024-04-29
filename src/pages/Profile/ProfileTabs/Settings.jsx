
import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp, callOutline, clipboardOutline, eyeOffOutline, globeOutline, lockClosedOutline, logOutOutline, personOutline, phoneLandscape, settingsOutline, shareOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import ProfileListItem from "../../../components/ProfileItem/ProfileItem";

export const Settings = () => {
    const history = useHistory()

    const handelSaveClick= ()=>{
    //   history.push("/home")
    }
    const handelBackClick = ()=>{
      history.goBack()
    }

    const ProfileTabs=[
    
        {icon:personOutline,title:"Accounts & Notifications",link:"/",color:"#395CFF"},
        {icon:globeOutline,title:"Change language",link:"/",color:"#395CFF"},
        // {icon:shareOutline,title:"Invite your friend",link:"/",color:"#395CFF"},
        {icon:clipboardOutline,title:"Term & Services",link:"/",color:"#395CFF"},
        {icon:eyeOffOutline,title:"Privacy Policy",link:"/",color:"#395CFF"},
        {icon:logOutOutline,title:"Logout",link:"/logout",color:"#395CFF"},
      ]
    return (
      <IonPage>
        <IonContent>

          <div style={{ padding: "10px" }}>

               <ProfileHeaders icon={<IonIcon icon={settingsOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Settings"}  />

          
     <div style={{marginTop:"30px"}}>
  
 
     <div style={{marginTop:"20px"}}>

<IonGrid>
  <IonRow>
  <IonCol size='12'>
<IonList>


      {
        ProfileTabs.map((el,index)=>{
          return <div style={{marginTop:"20px"}}>
            <ProfileListItem key={index} Data={el} />
            </div>
        })
      }

      

     


</IonList>
</IonCol>
  </IonRow>
</IonGrid>
</div>

           
           


      
           
          </div>    
         

           
          </div>
        </IonContent>
      </IonPage>
    );
}



