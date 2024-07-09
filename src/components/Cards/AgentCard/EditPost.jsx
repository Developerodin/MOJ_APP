import React, { useState, useContext, useEffect } from "react";
import { IonContent, IonPage, IonIcon, useIonActionSheet } from "@ionic/react";
import { AppContext } from "../../../Context/AppContext";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import SelectMulipalCityModel from "../../../components/Models/SelectMulipalCityModel";
import DepartmentSelectModel from "../../../components/Models/DepartmentSelectModel";
import { isMobile } from "../../../IsMobile/IsMobile";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { arrowBackOutline } from "ionicons/icons";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import AddIcon from "./addicon.png";
import deleteIcon from "./deleteicon.png";
import { useHistory, useParams } from "react-router";

const EditPostModal = () => {
  const { showToast, setProfileHealthUpdate ,setPostUpdate} = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [present] = useIonActionSheet();
  const history = useHistory();
  const { id } = useParams();
  const [departmentModel, setDepartmentModel] = useState(false);
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
  const [post,setPost ] = useState(null);
  const [staffDetails, setStaffDetails] = useState([
    {
      department: "",
      departmentValue: "",
      positionTitle: "",
      availableStaff: "",
    },
  ]);

  useEffect(() => {
    if (id) {
      fetchPostData();
    }
  }, [id]);

  const fetchPostData = async () => {
    try {
      const url = `${Base_url}auth/agent_post/show_byid/${id}`;
      const response = await axios.post(url);

      if (response.status === 200) {
        const data = response.data;
        console.log("Data by id ==>", data);
        if (data.status === "success") {
          const post = data.Post[0];
          setPost(post);
          setPreferredState(post.preferred_state);
          setPreferredCity(post.preferred_city);
          setStaffDetails(JSON.parse(post.staff_details));
        } else {
          showToast("error", "Error fetching post data", "");
        }
      } else {
        console.error("Error fetching post data. Status:", response.status);
        showToast("error", "Error fetching post data", "");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
      showToast("error", "Error fetching post data", "");
    }
  };

  useEffect(() => {
    if (post && post.pref_city !== "") {
      return;
    } else {
      setPreferredCity("");
    }
  }, [preferredState, post]);

  const handleSaveClick = async () => {
    try {
      const url = `${Base_url}auth/agent_post/update/${id}`;
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
      if (data.status === "success") {
        showToast("success", "Post updated successfully", "");
        setProfileHealthUpdate((prev) => prev + 1);
        setPostUpdate((prev) => prev + 1);
      } else {
        showToast("error", "Error updating post", "");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      showToast("error", "Error updating post", "");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const url = `${Base_url}auth/agent_post/destroy/${id}`;
      const response = await axios.post(url); 

      const data = response.data;
      if (response.status === 200 ) {
        showToast("success", "Post deleted successfully", "");
        setPostUpdate((prev) => prev + 1);
        history.push("/app/home"); 
        
      } else {
        showToast("error", "Error deleting post", "");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      showToast("error", "Error deleting post", "");
    }
  };

  const presentDeleteActionSheet = () => {
    present({
      header:
        "Are you sure you want to delete your post? This action cannot be undone.",
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

  const addMoreFields = () => {
    setStaffDetails([
      ...staffDetails,
      {
        department: "",
        departmentValue: "",
        positionTitle: "",
        availableStaff: "",
      },
    ]);
  };

  const handelSelectedDepartment = (
    selectedDepartment,
    subDepartments,
    index
  ) => {
    handelDepartmentModelClose();
    const namesString = subDepartments
      .map((subDepartment) => subDepartment.sub_department)
      .join(", ");
    const newStaffDetails = [...staffDetails];
    newStaffDetails[index].department = selectedDepartment;
    newStaffDetails[index].departmentValue = namesString;
    setStaffDetails(newStaffDetails);
  };

  const handelDepartmentModelOpen = (index) => {
    setDepartmentModel(index);
  };

  const handelDepartmentModelClose = () => {
    setDepartmentModel(false);
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

  

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              icon={arrowBackOutline}
              size="large"
              onClick={history.goBack}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>Edit Post</h2>
            <img
              src={deleteIcon}
              alt="Delete"
              onClick={presentDeleteActionSheet}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
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
                cursor: "pointer",
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
                  cursor: "pointer",
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
            <div
              key={index}
              style={{ marginTop: "20px", paddingBottom: "20px" }}
            >
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
                  Department
                  {staff.department !== "" && ` (${staff.department})`}
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
                  {staff.departmentValue !== "" ? (
                    <span>{staff.departmentValue}</span>
                  ) : (
                    <span style={{ color: "grey" }}>Select Department</span>
                  )}
                </div>
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
                />
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={AddIcon}
              alt="Add More"
              onClick={addMoreFields}
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
            />
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomBtn1 fun={handleSaveClick} title="Save" />
          </div>
        </div>

        {isStateModelOpen && (
          <SelectStateModel
            isOpen={isStateModelOpen}
            onClose={handelStateModleClose}
            setSelectedState={setPreferredState}
            setPreferredCity={setPreferredCity}
          />
        )}
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

export default EditPostModal;
