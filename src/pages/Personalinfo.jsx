import React from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";

const Personalinfo = () => {
  const history = useHistory()

  const handelBtnClick= ()=>{
    history.push("/edu")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
        <button onClick={handelBackClick} style={{backgroundColor:'transparent'}} >
          <img

            src={icon}
            style={{
              width: "30px",
              height: "30px",

              
            }}
            />
          </button>
          <h1
            style={{
              color: "#232323",
              fontSize: "36px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Tell us a bit about yourself
          </h1>
          <div style={{ marginTop:'15px', width: "100%", height: "50px" }}>
              <button
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "bold",
                  border: "1px solid black"
                }}
              >
                Education
              </button>
              <button
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "15px",
                  border: "1px solid black",
                }}
              >
                Job Preference
              </button>
              <button
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "15px",
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
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "15px",
                  border: "1px solid black",
                }}
              >
                Resume
              </button>
            </div>

          
          
        </div>
        <div style={{ position: "absolute", bottom: "50px", width: "100%",height:'50px',paddingLeft:'20px',paddingRight:'20px' }}>
          <button onClick={handelBtnClick}  style={{ borderRadius: "50px",width:'100%',height:'100%', backgroundColor: "#5356FF",color:'#ffffff',fontSize:'20px'}}>
            Continue
          </button>
          <button onClick={handelBtnClick}  style={{ borderRadius: "50px",width:'100%',height:'100%', backgroundColor: "transparent",color:'black',fontSize:'20px',fontWeight:'700'}}>
            Skip
          </button>
          
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Personalinfo;
