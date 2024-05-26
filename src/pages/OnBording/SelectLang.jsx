
import React, { useContext, useState } from "react";
import { IonContent, IonIcon, IonPage, useIonRouter } from "@ionic/react";
import globeicon from "/assets/globe.png";
import { useHistory } from "react-router";
import { chevronBackOutline } from "ionicons/icons";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { AppContext } from "../../Context/AppContext";

const SelectLang = () => {
  const history = useIonRouter()
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { showToast ,languageUpdate,setLanguageUpdate} = useContext(AppContext);
  const handleBtnClick = (language) => {
    setSelectedLanguage(language);
  };

  const handelSave=()=>{
      if(selectedLanguage){
        localStorage.setItem("selectedLanguage", selectedLanguage)
      }
      setLanguageUpdate((prev)=>prev+1);
      handelBackClick()
  }

  const handelBackClick = ()=>{
    history.goBack()
  }

  return (
    <IonPage>
      <IonContent style={{ backgroundColor: "#395cff", height: "100vh" }}>
        <div style={{ backgroundColor: "#395cff", position: "relative", height: "100vh",padding:"20px" }}>
        
        <div >
            <IonIcon  onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px",marginTop:"20px",color:"#fff"}} />
           </div>
        
           <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <h1
              style={{
                fontSize: "35px",
                fontWeight: "700",
                fontFamily: "inter",
                color: "#ffffff",
                marginTop: "30px",
              }}
            >
              Select your Language
            </h1>

            <div style={{ marginTop: '30px', width: "100%", height: "50px" }}>
              <button
                onClick={() => handleBtnClick("Hindi")}
                style={{
                  backgroundColor: selectedLanguage === "Hindi" ? "#fff" : "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: selectedLanguage === "Hindi" ? "#395cff" : "#ffffff",
                  fontSize: "17px",
                  border: "1px solid #ffffff"
                }}
              >
                हिन्दी
              </button>
              <button
                onClick={() => handleBtnClick("English")}
                style={{
                  backgroundColor: selectedLanguage === "English" ? "#fff" : "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: selectedLanguage === "English" ? "#395cff" : "#ffffff",
                  fontSize: "17px",
                  marginTop: "15px",
                  border: "1px solid #ffffff",
                }}
              >
                English
              </button>
              {/* <button
                onClick={() => handleBtnClick("Gujarati")}
                style={{
                  backgroundColor: selectedLanguage === "Gujarati" ? "#fff" : "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: selectedLanguage === "Gujarati" ? "#395cff" : "#ffffff",
                  fontSize: "17px",
                  marginTop: "15px",
                  border: "1px solid #ffffff",
                }}
              >
                Gujarati
              </button> */}

              {/* <button
                onClick={() => handleBtnClick("Nepali")}
                style={{
                  backgroundColor: selectedLanguage === "Nepali" ? "#fff" : "#395cff",
                  borderRadius: "50px",
                  width: "100%",
                  height: "100%",
                  color: selectedLanguage === "Nepali" ? "#395cff" : "#ffffff",
                  fontSize: "17px",
                  marginTop: "15px",
                  border: "1px solid #ffffff",
                }}
              >
                Nepali
              </button> */}
            </div>
          </div>
          <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div onClick={handelSave} 
      style={{
        background:"#fff",
        padding: "20px",
        border: "1px solid #E4E4E4",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
        cursor: "pointer", // Change cursor to pointer when hovered
        transition: "background-color 0.3s, box-shadow 0.3s" // Add transition effect
      }}
      >
    <span style={{fontWeight:"bold"}}>Continue</span>
 </div>
</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectLang;
