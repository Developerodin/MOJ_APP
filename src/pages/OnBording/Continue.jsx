import React, { useContext, useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import globeicon from "/assets/globe.png";
import { useHistory } from "react-router";
import { AppContext } from "../../Context/AppContext";

const Continue = () => {
  const history = useHistory()
  const { showToast ,languageUpdate,setLanguageUpdate} = useContext(AppContext);

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  const handelBtnClick= (value)=>{
    if(value === "Job Seeker"){
      localStorage.setItem("role",value)
      history.push("/phone");
      return
    }
    console.log("Tost ")
    showToast("success", "Comming Soon ", "");
  }



  const handelSelectLanguageCLick =() =>{
      history.push("/select-lang")
  }
  return (
    <IonPage>
      <IonContent style={{ backgroundColor: "#395cff" }}>
        <div style={{ backgroundColor: "#395cff", position: "relative", height: "100vh" }}>
          <img
          onClick={handelSelectLanguageCLick}
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
              {selectedLanguage === "English" ? "Continue as" : "जारी रखें"}
               
            </h1>

            <div style={{ marginTop:'30px', width: "100%", height: "50px" }}>
              <button
              onClick={()=>handelBtnClick("Job Seeker")}
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
                 {selectedLanguage === "English" ? "Job Seeker" : "रोजगार चाहने वाला"}
                
              </button>
              <button
                    onClick={()=>handelBtnClick("Employers")}
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
                {selectedLanguage === "English" ? "Employers" : "नियोक्ता"}
             
              </button>
              <button
                 onClick={()=>handelBtnClick("Agent")}
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
                 {selectedLanguage === "English" ? "Agent" : "एजेंट"}
                
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Continue;
