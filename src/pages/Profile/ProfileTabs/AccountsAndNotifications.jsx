import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonToggle,
  useIonRouter,
} from "@ionic/react";
import { bagHandleOutline } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { useIonActionSheet } from "@ionic/react";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import { isMobile } from "../../../IsMobile/IsMobile";
import { AppContext } from "../../../Context/AppContext";
export const AccountsAndNotifications = () => {
  const history = useIonRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [deleteModel, setDeleteModel] = useState(false);
  const [present] = useIonActionSheet();
  const { languageUpdate } = useContext(AppContext);
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
  const handelSave = () => {
    console.log("save");
  };

  const handleDeleteClick = async () => {
    try {
      const formData = new FormData();
      const url = `${Base_url}user_delete/${userDetails.user_id}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;

      if (data) {
        localStorage.clear();
        history.push("/Coninue");
        window.location.reload();
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };
  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <ProfileHeaders
            icon={
              <IonIcon
                icon={bagHandleOutline}
                style={{ fontSize: "24px", color: "#395CFF" }}
              />
            }
            title={
              selectedLanguage === "English"
                ? "Accounts & Notifications"
                : "खाते और सूचनाएं"
            }
          />

          <div style={{ marginTop: "50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "80%" }}>
                <div>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {selectedLanguage === "English"
                      ? "SMS notification"
                      : "एसएमएस अधिसूचना"}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "13px" }}>
                    {selectedLanguage === "English"
                      ? "Enable SMS to get notification for unread messages"
                      : "अपठित संदेशों की सूचना पाने के लिए SMS सक्षम करें"}
                  </span>
                </div>
                <div></div>
              </div>

              <div
                style={{
                  width: "20%",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <IonToggle></IonToggle>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <div style={{ width: "80%" }}>
                <div>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {selectedLanguage === "English"
                      ? "Notification"
                      : "अधिसूचना"}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "13px" }}>
                    {selectedLanguage === "English"
                      ? "Enable Push notification to get position recommendations based on your job preference."
                      : "अपनी नौकरी वरीयता के आधार पर पद अनुशंसाएं प्राप्त करने के लिए पुश अधिसूचना सक्षम करें।"}
                  </span>
                </div>
                <div></div>
              </div>

              <div
                style={{
                  width: "20%",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <IonToggle></IonToggle>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              <div></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                {/* <IonButton color={"danger"}>Delete Account</IonButton> */}
                <IonButton
      color={"danger"}
      onClick={() =>
        present({
          header: selectedLanguage === "English"
            ? "Are you sure you want to delete your account? This action cannot be undone."
            : "क्या आप वाकई अपना खाता हटाना चाहते हैं? इस क्रिया को पूर्ववत नहीं किया जा सकता।",
          buttons: [
            {
              text: selectedLanguage === "English" ? "Delete" : "हटाएं",
              role: "destructive",
              handler: handleDeleteClick, // Call handleDeleteClick when Delete button is clicked
              data: {
                action: "delete",
              },
            },
            {
              text: selectedLanguage === "English" ? "Cancel" : "रद्द करें",
              role: "cancel",
              data: {
                action: "cancel",
              },
            },
          ],
        })
      }
    >
      {selectedLanguage === "English" ? "Delete Account" : "खाता हटा दो"}
    </IonButton>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CustomBtn1
              fun={handelSave}
              title={selectedLanguage === "English" ? "Save" : "अपडेट करो"}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
