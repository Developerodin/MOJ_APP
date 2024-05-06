import { IonBackdrop, IonIcon, IonModal } from '@ionic/react'
import { callOutline, logoWhatsapp, mailOutline, phoneLandscape } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext';

export const LanguageSelectModel = ({showModal, setShowModal}) => {
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
      setShowModal(false);
  }
  return (
    <IonModal
    initialBreakpoint={0.45} breakpoints={[0, 0.45]}
    isOpen={showModal}
 // Change 'root' to the ID of your root element
    swipeToClose={true}
    onDidDismiss={() => setShowModal(false)}
    
  >
    <div className="modal-content" style={{backgroundColor: "#395cff",height:"100%"}} >
      <div style={{ padding: "30px" }}>
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
              <button
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
              </button>

              <button
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
              </button>

              <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
          <div onClick={handelSave} 
      style={{
        background:"#fff",
        padding: "20px",
        border: "1px solid #E4E4E4",
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px",
        cursor: "pointer", // Change cursor to pointer when hovered
        transition: "background-color 0.3s, box-shadow 0.3s" // Add transition effect
      }}
      >
    <span style={{fontWeight:"bold"}}>Save</span>
 </div>
</div>
            </div>


      
      </div>
    
    </div>
    {/* <IonBackdrop
      onClick={() => setShowModal(false)}
      style={{ zIndex: '0' }}
    /> */}
  </IonModal>
  )
}
