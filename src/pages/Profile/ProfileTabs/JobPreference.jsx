


import React, { useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonButton,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { chevronBackOutline,arrowBack, bookOutline, bookSharp, callOutline, chevronForward, filterOutline, phoneLandscape, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";

export const ProfileJobPreference = () => {
  const history = useHistory();
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token =localStorage.getItem("token");
  const [department, setDepartment] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState({ lower: 0, upper: 100000 })
  const handleSaveClick = () => {
    // Save logic here
    console.log("DAta ==>",department,preferredCity,jobType,salaryRange)
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const AddWorkExperience = async () => {
    try {
      const url = `${Base_url}auth/user_work_ex/store`;
      const formData1 = new FormData();
      formData1.append('user_id', userDetails.user_id);
      formData1.append('organisation', department);
      formData1.append('designation', preferredCity);
      formData1.append('profile', jobType);
      formData1.append('location', salaryRange);

    

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check work experience",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
              //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
             
              return
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
        <div style={{ padding: "20px" }}>
          

        <ProfileHeaders icon={<IonIcon icon={filterOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Job preference"}  />

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
              Job Type
            </label>
            <IonSelect
              value={jobType}
              onIonChange={(e) => setJobType(e.detail.value)}
              interface="popover"
              placeholder="Select Job Type"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="Full Time">Full Time</IonSelectOption>
              <IonSelectOption value="Part Time">Part Time</IonSelectOption>
              {/* Add more job types as needed */}
            </IonSelect>
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
              Department
            </label>
            <IonSelect
              value={department}
              onIonChange={(e) => setDepartment(e.detail.value)}
              interface="popover"
              placeholder="Select Department"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="Housekeeping">Housekeeping</IonSelectOption>
              <IonSelectOption value="Supervisor">Supervisor</IonSelectOption>
              {/* Add more departments as needed */}
            </IonSelect>
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
              Preferred City
            </label>
            <IonSelect
              value={preferredCity}
              onIonChange={(e) => setPreferredCity(e.detail.value)}
              interface="popover"
              placeholder="Select Preferred City"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="Jaipur">Jaipur</IonSelectOption>
              <IonSelectOption value="Rajkot">Rajkot</IonSelectOption>
              {/* Add more preferred cities as needed */}
            </IonSelect>
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
              Expected Salary Range
            </label>
            {/* <IonRange
              min={0}
              max={100000}
              dualKnobs={true}
              pin={true}
              snaps={true}
              value={salaryRange}
              onIonChange={(e) => setSalaryRange(e.detail.value)}
            >
              <div slot="start">0</div>
              <div slot="end">100k</div>
            </IonRange> */}
              <IonRange
      aria-label="Dual Knobs Range"
      min={0}
              max={100000}
      dualKnobs={true}
      pin={true}
      value={salaryRange}
      onIonChange={(e) => setSalaryRange(e.detail.value)}
    >
      <div slot="start">0</div>
              <div slot="end">100k</div>
    </IonRange>
          </div>

          {/* Other job preference fields go here */}

          <div style={{ marginTop:"70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomBtn1 fun={handleSaveClick} title={"Save"} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

