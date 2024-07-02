import React, { useState, useContext, useEffect } from "react";
import { IonContent, IonPage, IonIcon, useIonActionSheet } from "@ionic/react";
import { AppContext } from "../../../Context/AppContext";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import DepartmentSelectModel from "../../../components/Models/DepartmentSelectModel";
import SelectMulipalCityModel from "../../../components/Models/SelectMulipalCityModel";
import { isMobile } from "../../../IsMobile/IsMobile";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { arrowBackOutline, trashOutline, createOutline } from "ionicons/icons";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";

const CreatePostModal = ({ onClose }) => {
  const { showToast, userDetails, setProfileHealthUpdate } = useContext(AppContext);
  const [present] = useIonActionSheet();

  const [departmentModel, setDepartmentModel] = useState(false);
  const [department, setDepartment] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
  const [positionTitle, setPositionTitle] = useState("");
  const [availabilityDates, setAvailabilityDates] = useState("");
  const [availableStaff, setAvailableStaff] = useState("");

  const handleSaveClick = () => {
    addPost();
  };

  const handleDeleteClick = () => {
    // Delete logic here
    console.log("Delete Clicked");
    // Close modal after deleting
    onClose();
  };

  const handleEditClick = () => {
    // Edit logic here
    console.log("Edit Clicked");
    // Open edit post modal
    // Implement the function to open the edit post modal
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

  const handelSelectedDepartment = (selectedDepartment, subDepartments) => {
    handelDepartmentModelClose();
    const namesString = subDepartments
      .map((subDepartment) => subDepartment.sub_department)
      .join(", ");
    setDepartment(selectedDepartment);
    setDepartmentValue(namesString);
  };

  const handelDepartmentModelOpen = () => {
    setDepartmentModel(true);
  };

  const handelDepartmentModelClose = () => {
    setDepartmentModel(false);
  };

  const presentDeleteActionSheet = () => {
    present({
      header: 'Are you sure you want to delete your post? This action cannot be undone.',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: handleDeleteClick, // Call handleDeleteClick when Delete button is clicked
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
    if (!preferredState || !preferredCity || !department || !positionTitle || !availabilityDates || !availableStaff) {
      if (!preferredState) {
        showToast("error", "Preferred State is mandatory", "");
        return;
      }
      if (!preferredCity) {
        showToast("error", "Preferred City is mandatory", "");
        return;
      }
      if (!department) {
        showToast("error", "Department is mandatory", "");
        return;
      }
      if (!positionTitle) {
        showToast("error", "Position Title is mandatory", "");
        return;
      }
      if (!availabilityDates) {
        showToast("error", "Availability Dates are mandatory", "");
        return;
      }
      if (!availableStaff) {
        showToast("error", "Available Staff is mandatory", "");
        return;
      }
      return;
    }

    try {
      const url = `${Base_url}user_post/store`;
      const formData = new FormData();
      formData.append('user_id', userDetails.user_id);
      formData.append('preferred_state', preferredState);
      formData.append('preferred_city', preferredCity);
      formData.append('department', department);
      formData.append('sub_department', departmentValue);
      formData.append('position_title', positionTitle);
      formData.append('availability_dates', availabilityDates);
      formData.append('available_staff', availableStaff);

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
        onClose(); // Close modal after saving
        return;
      }

      showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonIcon icon={arrowBackOutline} size="large" onClick={onClose} style={{ cursor: "pointer" }} />
            <h2 style={{ marginLeft: "10px" }}>Create Post</h2>
          </div>
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
              Preferred State<span style={{ color: "red" }}>*</span>
            </label>
            <div
              onClick={handelStateModleOpen}
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                borderRadius: "0px",
                padding: "10px",
                border: "1px solid #E2E8F0",
                height: "52px",
                backgroundColor: "#F4F4F4",
              }}
            >
              {preferredState !== "" ? (
                <span>{preferredState}</span>
              ) : (
                <span style={{ color: "grey" }}>Select Preferred State</span>
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
                Preferred City<span style={{ color: "red" }}>*</span>
              </label>
              <div
                onClick={handelCityModelOpen}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  borderRadius: "0px",
                  padding: "10px",
                  border: "1px solid #E2E8F0",
                  height: "52px",
                  backgroundColor: "#F4F4F4",
                }}
              >
                {preferredCity !== "" ? (
                  <span>{preferredCity}</span>
                ) : (
                  <span style={{ color: "grey" }}>Select Preferred City</span>
                )}
              </div>
            </div>
          )}

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
              Department{department !== "" && ` (${department})`}<span style={{ color: "red" }}>*</span>
            </label>
            <div
              onClick={handelDepartmentModelOpen}
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                borderRadius: "0px",
                padding: "10px",
                border: "1px solid #E2E8F0",
                height: "52px",
                backgroundColor: "#F4F4F4",
              }}
            >
              {departmentValue !== "" ? (
                <span>{departmentValue}</span>
              ) : (
                <span style={{ color: "grey" }}>Select Department</span>
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
              Position Title<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)}
              style={{
                width: "100%", // Ensure input takes full width
                borderRadius: "0px",
                padding: "10px",
                border: "1px solid #E2E8F0",
                height: "52px",
                backgroundColor: "#F4F4F4",
              }}
              placeholder="Enter Position Title"
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
              Availability Dates<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              value={availabilityDates}
              onChange={(e) => setAvailabilityDates(e.target.value)}
              style={{
                width: "100%", // Ensure input takes full width
                borderRadius: "0px",
                padding: "10px",
                border: "1px solid #E2E8F0",
                height: "52px",
                backgroundColor: "#F4F4F4",
              }}
            />
          </div>

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
              Available Staff<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              value={availableStaff}
              onChange={(e) => setAvailableStaff(e.target.value)}
              style={{
                width: "100%", // Ensure input takes full width
                borderRadius: "0px",
                padding: "10px",
                border: "1px solid #E2E8F0",
                height: "52px",
                backgroundColor: "#F4F4F4",
              }}
              placeholder="Enter Available Staff"
            />
          </div>

          <div style={{ marginTop: "70px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CustomBtn1 fun={handleSaveClick} title="Save" />
            <button onClick={presentDeleteActionSheet} style={{ marginTop: "10px", width: "90%", borderRadius: "30px", padding: "10px", border: "none", height: "52px", display: "flex", justifyContent: "center", alignItems: "center", color: "red", background: "#fff", transition: "background-color 0.3s", fontSize: "16px" }}>
              <IonIcon icon={trashOutline} />
              Delete
            </button>
          </div>

          <SelectStateModel
            isOpen={isStateModelOpen}
            onClose={handelStateModleClose}
            selectedState={preferredState}
            setSelectedState={setPreferredState}
          />
          <DepartmentSelectModel
            isOpen={departmentModel}
            onClose={handelDepartmentModelClose}
            onSubmit={handelSelectedDepartment}
            department={department}
            departmentValue={departmentValue}
          />
          <SelectMulipalCityModel
            isOpen={isCityModelOpen}
            onClose={handelCityModleClose}
            preferredCity={preferredCity}
            setPreferredCity={setPreferredCity}
            selectedState={preferredState}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePostModal;
