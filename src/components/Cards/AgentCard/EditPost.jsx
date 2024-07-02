import React, { useState, useContext } from "react";
import { IonContent, IonPage, IonIcon } from "@ionic/react";
import { AppContext } from "../../../Context/AppContext";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import DepartmentSelectModel from "../../../components/Models/DepartmentSelectModel";
import SelectMulipalCityModel from "../../../components/Models/SelectMulipalCityModel";
import { isMobile } from "../../../IsMobile/IsMobile";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { arrowBackOutline, trashOutline } from "ionicons/icons";

const EditPostModal = ({ onClose }) => {
  const { showToast } = useContext(AppContext);
  
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
    // Save logic here
    console.log("Data ==>", preferredCity, preferredState, department, positionTitle, availabilityDates, availableStaff);
    // Close modal after saving
    onClose();
  };

  const handleDeleteClick = () => {
    // Delete logic here
    console.log("Delete Clicked");
    // Close modal after deleting
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

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonIcon icon={arrowBackOutline} size="large" onClick={onClose} style={{ cursor: "pointer" }} />
            <h2 style={{ marginLeft: "10px" }}>Edit Post</h2>
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
            <button onClick={handleDeleteClick} style={{ marginTop: "10px", width: "90%", borderRadius: "30px", padding: "10px", border: "none", height: "52px", display: "flex", justifyContent: "center", alignItems: "center", color: "red", background: "#fff", transition: "background-color 0.3s", fontSize: "16px" }}>
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

export default EditPostModal;
