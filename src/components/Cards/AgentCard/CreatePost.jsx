import React, { useState, useContext } from "react";
import { IonContent, IonPage, IonIcon, useIonActionSheet } from "@ionic/react";
import { AppContext } from "../../../Context/AppContext";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import DepartmentSelectModel from "../../../components/Models/DepartmentSelectModel";
import SelectMulipalCityModel from "../../../components/Models/SelectMulipalCityModel";
import { isMobile } from "../../../IsMobile/IsMobile";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { arrowBackOutline, trashOutline } from "ionicons/icons";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import AddIcon from './addicon.png';


const CreatePostModal = ({ onClose }) => {
  const { showToast,setPostUpdate , setProfileHealthUpdate } = useContext(AppContext);
  const [present] = useIonActionSheet();

  const [departmentModel, setDepartmentModel] = useState(false);
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [staffDetails, setStaffDetails] = useState([
    { department: "", departmentValue: "", positionTitle: "", availableStaff: "" }
  ]);

  const handleSaveClick = () => {
    addPost();
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
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonIcon icon={arrowBackOutline} size="large" onClick={onClose} style={{ cursor: "pointer" }} />
          </div>
          <h2 style={{ marginLeft: "10px", fontWeight: 'bold' }}>Post Manpower Availability</h2>
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
                  <span style={{ color: "grey" }}>Select Preferred City</span>
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
                  Department{staff.department !== "" && ` (${staff.department})`}<span style={{ color: "red" }}>*</span>
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
                  Available Staff<span style={{ color: "red" }}>*</span>
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
                  placeholder="Enter Available Staff"
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
            <CustomBtn1 fun={handleSaveClick} title="Save" />
            <button onClick={presentDeleteActionSheet} style={{ marginTop: "10px", width: "90%", borderRadius: "30px", padding: "10px", border: "none", height: "52px", display: "flex", justifyContent: "center", alignItems: "center", color: "red", background: "#fff", transition: "background-color 0.3s", fontSize: "16px" }}>
              <IonIcon icon={trashOutline} />
              Delete
            </button>
          </div>
        </div>

        <SelectStateModel
          isOpen={isStateModelOpen}
          onClose={handelStateModleClose}
          selectedState={preferredState}
          setSelectedState={setPreferredState}
          
        />
        <SelectMulipalCityModel
          isOpen={isCityModelOpen}
          onClose={handelCityModleClose}
          preferredCity={preferredCity}
          setPreferredCity={setPreferredCity}
          selectedState={preferredState}
        />
        {departmentModel !== false && (
          <DepartmentSelectModel
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

export default CreatePostModal;
