import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonLabel, IonIcon } from "@ionic/react";
import { calendarOutline, chevronBackOutline } from 'ionicons/icons';
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";

const Personalinfoedu = () => {
  const history = useHistory()
  const [yearGraduated, setYearGraduated] = useState('');

  const handleYearChange = (event) => {
    setYearGraduated(event.target.value);
  };



  const handelBtnClick= ()=>{
    history.push("/work")
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
            Education
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
              Degree
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
              University
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
  </div>
 
      
      
            
  
            {/* </IonItem> */}

           
           


           

        
           
           <div style={{marginTop:"20px"}}>
              
           <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year graduated
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
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <CustomBtn1 fun={handelBtnClick} title={"Proceed"} />
          
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Personalinfoedu;
