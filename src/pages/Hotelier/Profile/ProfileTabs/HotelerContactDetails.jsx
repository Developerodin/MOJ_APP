
import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp, callOutline, phoneLandscape } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../../components/Headers/ProfileHeaders";


export const HotelerContactDetails = () => {
    const history = useHistory()
    const userDetails = JSON.parse( localStorage.getItem("userDetails"));
    const details = JSON.parse( localStorage.getItem("Mobile"));
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

               <ProfileHeaders icon={<IonIcon icon={callOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Contact details"}  />

          
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
             Phone number
            </label>
            {/* <IonItem> */}
            <div
           
           
              style={{
                display:"flex",
                justifyContent:"left",
                alignItems: "center",
                borderRadius: "0px",
                padding:"10px",
                border: "1px solid #E2E8F0",
                height:"52px",
                backgroundColor:"#F4F4F4"
              }}
            > 
            <span>{details && details.phoneNumber}</span>
            </div>
  </div>
  

  <div style={{marginTop:"20px"}}>

  <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Email address
            </label>
            {/* <IonItem> */}
            {/* <IonInput
              type="text"
              value={userDetails && userDetails.email}
              style={{
                borderRadius: "0px",
                padding:"10px",
                border: "1px solid #E2E8F0",
                height:"52px",
                backgroundColor:"#F4F4F4"
              }}
            /> */}
            <div
           
           
           style={{
             display:"flex",
             justifyContent:"left",
             alignItems: "center",
             borderRadius: "0px",
             padding:"10px",
             border: "1px solid #E2E8F0",
             height:"52px",
             backgroundColor:"#F4F4F4"
           }}
         > 
         <span>{userDetails && userDetails.email}</span>
         </div>
  </div>

 
      
      
            
  
            {/* </IonItem> */}

           
           


      
           
          </div>    
         
{/* 
          <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelSaveClick} title={"Save"}/>
             </div> */}
           
          </div>
        </IonContent>
      </IonPage>
    );
}



