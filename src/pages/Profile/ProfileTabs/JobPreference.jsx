



import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp, callOutline, filterOutline, phoneLandscape, searchOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";

export const ProfileJobPreference = () => {
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

          <div style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={filterOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Job preference"}  />

          
     <div style={{marginTop:"30px"}}>
  
  <div>

  <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
             Search for your job preference
            </label>
            {/* <IonItem> */}
            <div style={{ position: 'relative' }}>
              <div style={{zIndex:999,position: 'absolute', left:10,top:14 }}>
              <IonIcon icon={searchOutline} style={{fontSize:"24px" }} />
              </div>
      
      <IonInput
        type="text"
        style={{
          borderRadius: "0px",
          padding:"10px",
          border: "1px solid #E2E8F0",
          height:"52px",
          backgroundColor:"#F4F4F4",
          paddingLeft: "40px", // Adjust paddingLeft to accommodate the icon
          borderRadius:"20px"
        }}
      />
    </div>
  </div>
  

  

 
      
      
            
  
            {/* </IonItem> */}

           
           


      
           
          </div>    
         

          <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelSaveClick} title={"Save"}/>
             </div>
           
          </div>
        </IonContent>
      </IonPage>
    );
}



