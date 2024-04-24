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

const Personalinfo = ({handelContinue}) => {
  const history = useHistory()

  const handelBtnClick= ()=>{
    history.push("/home")
    // handelContinue("/home")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }

  const handelButtonSelected = (value) =>{
        history.push(value)
                  
  }
  return (
   
        <div>
        <div >
       
          <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Tell us a bit about yourself
          </h1>
          <div style={{ marginTop:'30px', width: "100%", height: "50px" }}>
              <button
              onClick={()=>{handelButtonSelected("/edu")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  border: "1px solid black"
                }}
              >
                Education
              </button>
              <button
              onClick={()=>{handelButtonSelected("/job-pref")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                Job Preference
              </button>
              <button
              onClick={()=>{handelButtonSelected("/work")}}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                Work Experience
              </button>
              <button
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                Resume
              </button>
            </div>

          
          
        </div>
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <CustomBtn1 fun={handelBtnClick} title={"Finish"} />
          <div style={{marginTop:"20px"}}>
    <span style={{color:"black",fontSize:"16px",fontWeight:"bold"}}>Skip</span>
</div>
          
        </div>

        </div>

  );
};

export default Personalinfo;
