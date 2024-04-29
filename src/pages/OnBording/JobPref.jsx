import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonRange,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";

export const JobPref = () => {
  const history = useHistory();
  const [department, setDepartment] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState({ lower: 0, upper: 100000 })
  const handleSaveClick = () => {
    // Save logic here
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <div>
            <IonIcon
              onClick={handleBackClick}
              icon={chevronBackOutline}
              style={{ fontSize: "24px" }}
            />
          </div>

          <div style={{ marginTop: "30px", display: "flex", justifyContent: "left", alignItems: "center" }}>
            <div style={{ marginLeft: "20px" }}>
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>Job preference</span>
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

          <div style={{  marginTop:"70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomBtn1 fun={handleBackClick} title={"Save"} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
