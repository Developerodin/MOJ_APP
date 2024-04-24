import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, bagHandleOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";

export const ProfileWorkExperience = () => {
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

               <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Work experience"} />

          
     <div style={{marginTop:"30px",marginBottom:"100px"}}>
  <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Designation
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              placeholder="e.g fnb manager"
              style={{
                borderRadius: "0px",
                padding:"10px",
                border: "1px solid #E2E8F0",
                height:"52px",
                backgroundColor:"#F4F4F4"
              }}
            />
      
      <div style={{marginTop:"10px"}}>
      <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Profile
            </IonLabel>
            {/* <IonItem> */}
            <IonInput
              type="text"
              placeholder="e.g operations"
              style={{
                borderRadius: "0px",
                padding:"10px",
                border: "1px solid #E2E8F0",
                height:"52px",
                backgroundColor:"#F4F4F4"
              }}
            />
      </div>
            
  
            {/* </IonItem> */}

            <div style={{marginTop:"10px"}}>

            <IonLabel
              
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Organisation
            </IonLabel>
            {/* <IonItem> */}
            <IonInput
              type="text"
              placeholder="e.g Hotel xyz"
              style={{
                borderRadius: "0px",
                padding:"10px",
                border: "1px solid #E2E8F0",
                height:"52px",
                backgroundColor:"#F4F4F4"
              }}
            />
            </div>
           

<div style={{marginTop:"10px"}}>

<IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Location
            </IonLabel>
            {/* <IonItem> */}
            <IonInput
             type="text"
            
             style={{
               borderRadius: "0px",
               padding:"10px",
               border: "1px solid #E2E8F0",
               height:"52px",
               backgroundColor:"#F4F4F4"
             }}
            />

</div>
           

           <div style={{marginTop:"10px"}}>
           <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Start Date
            </IonLabel>
            {/* <IonItem> */}
            <IonInput
             type="date"
            
             style={{
               borderRadius: "0px",
               padding:"10px",
               border: "1px solid #E2E8F0",
               height:"52px",
               backgroundColor:"#F4F4F4"
             }}
            />

           </div>
           
           <div style={{marginTop:"10px"}}>
              
           <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              End Date
            </IonLabel>
            {/* <IonItem> */}
            <IonInput
              type="date"
            
              style={{
                borderRadius: "0px",
                padding:"10px",
                border: "1px solid #E2E8F0",
                height:"52px",
                backgroundColor:"#F4F4F4"
              }}
            />

           </div>
           
          </div>    
         

          <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelSaveClick} title={"Save"}/>
             </div>
           
          </div>
        </IonContent>
      </IonPage>
    );
}



