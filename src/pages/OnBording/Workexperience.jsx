import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";

const  Workexperience = () => {
  const history = useHistory()

  const handelBtnClick= ()=>{
    history.replace('/home');
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
        <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
          <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Work experience
          </h1>
             
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
          
        </div>
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

<CustomBtn1 fun={handelBtnClick} title={"Save"}/>
</div>
      
      </IonContent>
    </IonPage>
  );
};

export default Workexperience;
