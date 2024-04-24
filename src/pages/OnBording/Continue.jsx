import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import globeicon from "/assets/globe.png";
import { useHistory } from "react-router";

const Continue = () => {
  const history = useHistory()

  const handelBtnClick= ()=>{
    history.push("/phone")
  }
  return (
    <IonPage>
      <IonContent style={{ backgroundColor: "#395cff" }}>
        <div style={{ backgroundColor: "#395cff", position: "relative", height: "100vh" }}>
          <img
            src={globeicon}
            alt="Globe Icon"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "30px",
              height: "30px",
              marginTop: "20px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "25%", 
              padding: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "35px",
                fontWeight: "700",
                fontFamily: "inter",
                color: "#ffffff",
                marginTop: "30%", 
              }}
            >
              Continue as 
            </h1>

            <div style={{ marginTop:'30px', width: "100%", height: "50px" }}>
              <button
              onClick={handelBtnClick}
                style={{
                  backgroundColor: "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  fontSize: "17px",
                 
                  border: "1px solid #ffffff"
                }}
              >
                Job Seeker
              </button>
              <button
                onClick={handelBtnClick}
                style={{
                  backgroundColor: "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  fontSize: "17px",
                
                  marginTop: "15px",
                  border: "1px solid #ffffff",
                }}
              >
               Employers
              </button>
              <button
                onClick={handelBtnClick}
                style={{
                  backgroundColor: "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: "#ffffff",
                  fontSize: "17px",
                  
                  marginTop: "15px",
                  border: "1px solid #ffffff",
                }}
              >
                Agent
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Continue;
