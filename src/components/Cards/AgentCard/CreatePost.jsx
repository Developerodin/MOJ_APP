import React, { useState, useContext, useEffect } from "react";
import {
  IonModal,
  IonIcon,
  IonButton,
  IonContent,
  IonPage,
  useIonRouter,
  IonCard,
  IonCardContent,
} from "@ionic/react";
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

const CreatePost = () => {
  const history = useIonRouter();
  const { showToast, setPostUpdate, setProfileHealthUpdate, languageUpdate } =
    useContext(AppContext);
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
    { department: "", departmentValue: "", positionTitle: "", availableStaff: "" },
  ]);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    updatePositionTitleWithDepartmentValue();
  }, [staffDetails]);
  

  const updatePositionTitleWithDepartmentValue = () => {
    setStaffDetails(staffDetails.map(item => ({
      ...item,
      positionTitle: item.departmentValue,
    })));
  };

  useEffect(() => {
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  const handleNextStep = () => {
    if (currentStep === 1 && (!preferredState || !preferredCity)) {
      showToast("error", "State and City are mandatory", "");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveClick = () => {
    addPost();
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setPreferredCity("");
    setPreferredState("");
    setStaffDetails([
      { department: "", departmentValue: "", positionTitle: "", availableStaff: "" },
    ]);
    history.push(`/app/home`);
  };

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
      header: "Are you sure you want to delete your post? This action cannot be undone.",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          handler: handleDeleteClick,
          data: {
            action: "delete",
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  const addPost = async () => {
    

    try {
      updatePositionTitleWithDepartmentValue();
      const url = `${Base_url}auth/agent_post/store`;
      const formData = new FormData();
      formData.append("user_id", userDetails.user_id);
      formData.append("preferred_state", preferredState);
      formData.append("preferred_city", preferredCity);
      formData.append("staff_details", JSON.stringify(staffDetails));

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      
      console.log("Response from addPost:", data, response);

      if (data.status === "success") {
        showToast("success", "Post created successfully", "");
        setProfileHealthUpdate((prev) => prev + 1);
        setPostUpdate((prev) => prev + 1);
     
        return;
      }

      showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Try After Some Time", "");
    }
  };

  const addMoreFields = () => {
    const lastEntry = staffDetails[staffDetails.length - 1];
    // Check if the last entry is filled
    if (lastEntry.department && lastEntry.departmentValue && lastEntry.positionTitle && lastEntry.availableStaff) {
      setStaffDetails([
        ...staffDetails,
        { department: "", departmentValue: "", positionTitle: "", availableStaff: "" },
      ]);
    } else {
      // Optionally, alert the user to fill the previous fields first
      showToast("error", "Fill the previous fields first", "");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              icon={arrowBackOutline}
              size="large"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <h2 style={{ marginLeft: "10px", fontWeight: "bold" }}>
            {selectedLanguage === "English"
              ? "Post Manpower Availability"
              : "मानव शक्ति उपलब्धता पोस्ट करें"}
          </h2>

          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center",justifyItems:'center' }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "50%",
                  backgroundColor: currentStep === 1 ? "#007bff" : "#ccc",
                  color: "#fff",
                  marginRight: "10px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                1
              </div>
              <span>Location</span>
            </div>
            <div style={{ width: "50px", height: "3px", backgroundColor: "#ccc",color: currentStep === 1 ? "#007bff" : "initial" , margin: "12px 10px" }}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "50%",
                  backgroundColor: currentStep === 2 ? "#007bff" : "#ccc",
                  color: "#fff",
                  marginRight: "10px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                2
              </div>
              <span>Vacancy</span>
            </div>
          </div>
          </div>

          {currentStep === 1 && (
            <>
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
                  {selectedLanguage === "English" ? "Preferred State" : "पसंदीदा राज्य"}
                  <span style={{ color: "red" }}>*</span>
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
                    cursor: "pointer",
                  }}
                >
                  {preferredState !== "" ? (
                    <span>{preferredState}</span>
                  ) : (
                    <span style={{ color: "#575757" }}>
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
                    {selectedLanguage === "English" ? "Preferred City" : "पसंदीदा शहर"}
                    <span style={{ color: "red" }}>*</span>
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
                      cursor: "pointer",
                    }}
                  >
                    {preferredCity !== "" ? (
                      <span>{preferredCity}</span>
                    ) : (
                      <span style={{ color: "#575757" }}>
                        {selectedLanguage === "English" ? "Select Preferred City" : "पसंदीदा शहर चुनें"}
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div style={{ display: "flex",flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <CustomBtn1 fun={handleNextStep} title={selectedLanguage === "English" ? "Next" : "अगला"}/>
                  
                
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div style={{ marginTop: "20px" }}>
                {staffDetails.map((staffDetail, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <IonCard style={{ width: '100%', padding: '10px', border: "1px solid #E4E4E4", borderRadius: "15px", background: "white",margin:'12px 0px' }}>
                    <IonCardContent style={{ padding: '10px' }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                     <div style={{ display: "flex", flexDirection: "column",width:'65%' }}> 
                    <label
                      style={{
                        color: "#575757",
                        fontFamily: "inter",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "30px",
                      }}
                    >
                      {selectedLanguage === "English" ? "Department" : "विभाग"}
                      <span style={{ color: "red" }}>*</span>
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
                        cursor: "pointer",
                      }}
                    >
                      {staffDetail.department !== "" ? (
                        <span>{staffDetail.department}</span>
                      ) : (
                        <span style={{ color: "#575757" }}>
                          {selectedLanguage === "English" ? "Select Department" : "विभाग चुनें"}
                        </span>
                      )}
                    </div>
                    </div>
                    
                        
                        <div style={{ width: "30%", display: "flex", flexDirection: "column" }}>
                          <label
                            style={{
                              color: "#575757",
                              fontFamily: "inter",
                              fontSize: "14px",
                              fontWeight: "400",
                              lineHeight: "30px",
                            }}
                          >
                            {selectedLanguage === "English" ? "Available Staff" : "उपलब्ध कर्मचारी"}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            value={staffDetail.availableStaff}
                            onChange={(e) => {
                              const newStaffDetails = [...staffDetails];
                              newStaffDetails[index].availableStaff = e.target.value;
                              setStaffDetails(newStaffDetails);
                            }}
                            style={{
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                              borderRadius: "7px",
                              padding: "10px",
                              border: "1px solid #E2E8F0",
                              height: "52px",
                              backgroundColor: "#F4F4F4",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        </div>
                        </IonCardContent>
                        </IonCard>
                        
                      
                  
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
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <IonButton onClick={handlePreviousStep} style={{width:'100px'}}>
                  {selectedLanguage === "English" ? "Previous" : "पिछला"}
                </IonButton>
                <IonButton onClick={handleSaveClick} style={{width:'100px'}}>
                  {selectedLanguage === "English" ? "Save" : "सहेजें"}
                </IonButton>
              </div>
            </>
          )}
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
    </IonPage>
  );
};

export default CreatePost;
