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

const Basicinfo = ({handelContinue}) => {
  const history = useHistory()

  const handelBtnClick= ()=>{
    handelContinue("Details")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
  
        <div>
         
        {/* <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div> */}
          <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Add your personal information
          </h1>

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
             First name
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
             
              style={{
              
               
                border: "1px solid #E2E8F0",
                borderRadius: "50px",
              
              }}
            />
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
              Last name
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              
              style={{
              
               
                border: "1px solid #E2E8F0",
                borderRadius: "50px",
              
              }}
            />
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
              Gender
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              
              style={{
              
               
                border: "1px solid #E2E8F0",
                borderRadius: "50px",
              
              }}
            />
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
              State
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              
              style={{
              
               
                border: "1px solid #E2E8F0",
                borderRadius: "50px",
              
              }}
            />
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
              City
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              
              style={{
              
               
                border: "1px solid #E2E8F0",
                borderRadius: "50px",
              
              }}
            />
  </div>
 
      
      
            
  
            {/* </IonItem> */}

           
           


      
           
          </div>    
         

          <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelBtnClick} title={"Continue"}/>
             </div>

             </div>
      
  );
};

export default Basicinfo;
