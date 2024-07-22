import React, { useState, useContext ,useEffect} from "react";
import { IonModal, IonIcon, IonButton,IonContent } from "@ionic/react";
import { AppContext } from "../../../Context/AppContext";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import DepartmentSelectSingle from "../../../components/Models/DepartmentSelectSingle";
import SelectMulipalCityModel from "../../../components/Models/SelectMulipalCityModel";
import { isMobile } from "../../../IsMobile/IsMobile";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { arrowBackOutline, trashOutline } from "ionicons/icons";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import AddIcon from "./addicon.png";
import { set } from "mongoose";


const CreatePostModal = ({ isOpen, onClose }) => {
  const { showToast, setPostUpdate, setProfileHealthUpdate ,languageUpdate} = useContext(AppContext);
  const [departmentModel, setDepartmentModel] = useState(false);
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  
  const [staffDetails, setStaffDetails] = useState([
    { department: "", departmentValue: "", positionTitle: "", availableStaff: "" }
  ]);

  

  const handleClose = () => {
    // setStaffDetails('');
    setPreferredCity('');
    setPreferredState('');
    setStaffDetails([{ department: "", departmentValue: "", positionTitle: "", availableStaff: "" }]);
    onClose();
  };

  const handleSaveClick = () => {
    addPost();
    handleClose();
  };
  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  const handleDeleteClick = () => {
    console.log("Delete Clicked");
    onClose();
  };

  const handelStateModleOpen = () => {
    setIsStateModelOpen(true);
  };

  const handelStateModleClose = () => {
    setIsStateModelOpen(false);
  };

  const handelCityModelOpen = () => {
    setIsCityModelOpen(true);
  };

  const handelCityModleClose = () => {
    setIsCityModelOpen(false);
  };

  const handelDepartmentModelOpen = (index) => {
    setDepartmentModel(index);
  };

  const handelDepartmentModelClose = () => {
    setDepartmentModel(false);
  };

  const handelSelectedDepartment = (selectedDepartment, subDepartments, index) => {
    const namesString = subDepartments
      .map((subDepartment) => subDepartment.sub_department)
      .join(", ");
    const newStaffDetails = [...staffDetails];
    newStaffDetails[index].department = selectedDepartment;
    newStaffDetails[index].departmentValue = namesString;
    setStaffDetails(newStaffDetails);
    handelDepartmentModelClose();
  };

  const presentDeleteActionSheet = () => {
    present({
      header: 'Are you sure you want to delete your post? This action cannot be undone.',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: handleDeleteClick,
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
  };

  const addPost = async () => {
    if (!preferredState || !preferredCity || staffDetails.some(detail => !detail.department || !detail.positionTitle || !detail.availableStaff)) {
      showToast("error", "All fields are mandatory", "");
      return;
    }

    try {
      const url = `${Base_url}auth/agent_post/store`;
      const formData = new FormData();
      formData.append('user_id', userDetails.user_id);
      formData.append('preferred_state', preferredState);
      formData.append('preferred_city', preferredCity);
      formData.append('staff_details', JSON.stringify(staffDetails));
            
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      const data = response.data;
      console.log("Response from addPost:", data, response);

      if (data.status === "success") {
        showToast("success", "Post created successfully", "");
        setProfileHealthUpdate((prev) => prev + 1);
        setPostUpdate((prev) => prev + 1);
        onClose();
        return;
      }

      showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
    } 
  };

  const addMoreFields = () => {
    setStaffDetails([...staffDetails, { department: "", departmentValue: "", positionTitle: "", availableStaff: "" }]);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
      <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IonIcon icon={arrowBackOutline} size="large" onClick={handleClose} style={{ cursor: "pointer" }} />
        </div>
        <h2 style={{ marginLeft: "10px", fontWeight: 'bold' }}>{selectedLanguage === "English" ? "Post Manpower Availability" : "मानव शक्ति उपलब्धता पोस्ट करें"}</h2>
        <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            {selectedLanguage === "English" ? "Preferred State" : "पसंदीदा राज्य"}<span style={{ color: "red" }}>*</span>
          </label>
          <div
            onClick={handelStateModleOpen}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              borderRadius: "7px",
              padding: "10px",
              border: "1px solid #E2E8F0",
              height: "52px",
              backgroundColor: "#F4F4F4",
              cursor: "pointer"
            }}
          >
            {preferredState !== "" ? (
              <span>{preferredState}</span>
            ) : (
              <span style={{ color: '#575757' }}>
                {selectedLanguage === "English" ? "Select Preferred State" : "पसंदीदा राज्य चुनें"}
              </span>
            )}
          </div>
        </div>

        {preferredState !== "" && (
          <div style={{ marginTop: "20px" }}>
            <label
              
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              {selectedLanguage === "English" ? "Preferred City" : "पसंदीदा शहर"}<span style={{ color: "red" }}>*</span>
            </label>
            <div
              onClick={handelCityModelOpen}
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                borderRadius: "7px",
                padding: "10px",
                border: "1px solid #E2E8F0",
                height: "52px",
                backgroundColor: "#F4F4F4",
                cursor: "pointer"
              }}
            >
              {preferredCity !== "" ? (
                <span>{preferredCity}</span>
              ) : (
                <span style={{color:'#575757'}}>{selectedLanguage === "English" ? "Preferred City" : "पसंदीदा शहर"}</span>
              )}
            </div>
          </div>
        )}

        {staffDetails.map((staff, index) => (
          <div key={index} style={{ marginTop: "20px", paddingBottom: "20px" }}>
            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  color: "#575757",
                  fontFamily: "inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "30px",
                }}
              >
                <span style={{color:'#575757'}}>{selectedLanguage === "English" ? "Department" : "विभाग"}</span>{staff.department !== "" && ` (${staff.department})`}<span style={{ color: "red" }}>*</span>
              </label>
              <div
                onClick={() => handelDepartmentModelOpen(index)}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  borderRadius: "7px",
                  padding: "10px",
                  border: "1px solid #E2E8F0",
                  height: "52px",
                  backgroundColor: "#F4F4F4",
                  cursor: "pointer"
                }}
              >
                {staff.departmentValue !== "" ? (
                  <span>{staff.departmentValue}</span>
                ) : (
                  <span style={{color:'#575757'}}>{selectedLanguage === "English" ? "Select Department" : "विभाग चुनें"}</span>
                )}
              </div>
            </div>

            <div style={{ marginTop: "20px", width: "100%" }}>
              <label
                style={{
                  color: "#575757",
                  fontFamily: "inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "30px",
                }}
              >
                {selectedLanguage === "English" ? "Position Title" : "पद का नाम"}<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={staff.positionTitle}
                onChange={(e) => {
                  const newStaffDetails = [...staffDetails];
                  newStaffDetails[index].positionTitle = e.target.value;
                  setStaffDetails(newStaffDetails);
                }}
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  padding: "10px",
                  border: "1px solid #E2E8F0",
                  height: "52px",
                  backgroundColor: "#F4F4F4",
                }}
                placeholder={selectedLanguage === "English" ? "Enter Position Title" : "पद का नाम दर्ज करें"}
              />
            </div>

            <div style={{ marginTop: "20px", width: "100%" }}>
              <label
                style={{
                  color: "#575757",
                  fontFamily: "inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "30px",
                }}
              >
                {selectedLanguage === "English" ? "Available Staff" : "उपलब्ध कर्मचारी"}<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                value={staff.availableStaff}
                onChange={(e) => {
                  const newStaffDetails = [...staffDetails];
                  newStaffDetails[index].availableStaff = e.target.value;
                  setStaffDetails(newStaffDetails);
                }}
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  padding: "10px",
                  border: "1px solid #E2E8F0",
                  height: "52px",
                  backgroundColor: "#F4F4F4",
                }}
                placeholder={selectedLanguage === "English" ? "Enter Available Staff" : "उपलब्ध कर्मचारी दर्ज करें"}
              />
            </div>
          </div>
        ))}

        <div
          onClick={addMoreFields}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "#0000EE",
            textDecoration: "underline",
          }}
        >
          <img src={AddIcon} alt="Add More" style={{ width: "50px", height: "50px", marginRight: "5px" }} />
        </div>

        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CustomBtn1 fun={handleSaveClick} title={selectedLanguage === "English" ? "Save" : "सहेजें"} />
          <button onClick={presentDeleteActionSheet} style={{ marginTop: "10px", width: "90%", borderRadius: "30px", padding: "10px", border: "none", height: "52px", display: "flex", justifyContent: "center", alignItems: "center", color: "red", background: "#fff", transition: "background-color 0.3s", fontSize: "16px" }}>
            <IonIcon icon={trashOutline} />
            {selectedLanguage === "English" ? "Delete" : "हटाएं"}
          </button>
        </div>
      </div>

      <SelectStateModel
        isOpen={isStateModelOpen}
        onClose={handelStateModleClose}
        selectedState={preferredState}
        setSelectedState={setPreferredState}
        setPreferredCity={setPreferredCity}
      />
      <SelectMulipalCityModel
        isOpen={isCityModelOpen}
        onClose={handelCityModleClose}
        preferredCity={preferredCity}
        setPreferredCity={setPreferredCity}
        selectedState={preferredState}
      />
      {departmentModel !== false && (
        <DepartmentSelectSingle
          isOpen={true}
          onClose={handelDepartmentModelClose}
          onSubmit={(selectedDepartment, subDepartments) => handelSelectedDepartment(selectedDepartment, subDepartments, departmentModel)}
          department={staffDetails[departmentModel]?.department}
          departmentValue={staffDetails[departmentModel]?.departmentValue}
        />
      )}
      </IonContent>
    </IonModal>
  );
};

export default CreatePostModal;
