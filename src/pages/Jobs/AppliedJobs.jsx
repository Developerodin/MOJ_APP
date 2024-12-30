import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";

import { documentTextOutline } from "ionicons/icons";
import noData from "/assets/nodata.png";

import { AppliedJobCard } from "../../components/Cards/JobCard/AppliedJobCard";
import { isMobile } from "../../IsMobile/IsMobile";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { AppContext } from "../../Context/AppContext";

export const AppliedJobs = () => {
  const history = useIonRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [jobData, setJobData] = useState([]);
  const [InTouch, setInTouchData] = useState([]);
  const [InReview, setInReviewData] = useState([]);
  const [NotSelected, setNotSelectedData] = useState([]);
  const [SelectedData, setSelectedData] = useState([]);
  const { languageUpdate } = useContext(AppContext);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

  const [selectedCategory, setSelectedCategory] = useState("InTouch");
  const [accordionValue, setAccordionValue] = useState(null);

  useEffect(() => {
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  const getAppliedJobs = async () => {
    try {
      const url = `${Base_url}job_apply/userByid/${userDetails.user_id}`;
      const formData1 = new FormData();

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log("Response check work experience", data, response);

      if (data.status === "success") {
        const Data = data.Job;
        console.log("jobs Data  ==> ", Data);

        const InTouchData = Data.filter((el) => el.status === "In Touch");
        const InReviewData = Data.filter((el) => el.status === "In Review");
        const NotSelectedData = Data.filter((el) => el.status === "Not Selected");
        const SelectedData = Data.filter((el) => el.status === "Selected");

        setInTouchData(InTouchData);
        setInReviewData(InReviewData);
        setNotSelectedData(NotSelectedData);
        setSelectedData(SelectedData);
        setJobData(Data);

        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handelJobCardClick = (id) => {
    history.push(`/job-details/${id}`);
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  const renderJobData = () => {
    let data = [];
    if (selectedCategory === "InTouch") {
      data = InTouch;
    } else if (selectedCategory === "Selected") {
      data = SelectedData;
    } else if (selectedCategory === "InReview") {
      data = InReview;
    } else if (selectedCategory === "NotSelected") {
      data = NotSelected;
    }

    if (data.length === 0) {
      return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img src={noData} alt="No Data" style={{ width: "300px" }} />
          <p>{selectedLanguage === "English" ? "No Data Available" : "कोई डेटा उपलब्ध नहीं है"}</p>
        </div>
      );
    }

    return (
      <IonGrid>
        <IonRow>
          {data.map((el, index) => (
            <IonCol size="12" size-md="6" key={index}>
              <AppliedJobCard
                data={el}
                fun={() => handelJobCardClick(el.job_id)}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    );
  };

  const getJobStatusLabel = () => {
    switch (selectedCategory) {
      case "InTouch":
        return selectedLanguage === "English" ? "In Touch" : "संपर्क में";
      case "Selected":
        return selectedLanguage === "English" ? "Selected" : "चयनित";
      case "InReview":
        return selectedLanguage === "English" ? "In Review" : "समीक्षा में";
      case "NotSelected":
        return selectedLanguage === "English" ? "Not Selected" : "चयनित नहीं";
      default:
        return selectedLanguage === "English" ? "Job Status" : "नौकरी की स्थिति";
    }
  };

  const handleAccordionChange = (value) => {
    setAccordionValue(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAccordionValue(null); // Close the accordion
  };

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <IonIcon icon={documentTextOutline} style={{ fontSize: "30px" }} />
            <span
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginLeft: "10px",
                marginTop: "3px",
              }}
            >
              {selectedLanguage === "English" ? "Applied" : "लागू नौकरियां"}
            </span>
          </div>

          <IonAccordionGroup value={accordionValue} onIonChange={(e) => handleAccordionChange(e.detail.value)} style={{ marginTop: "20px" }}>
            <IonAccordion value="jobStatus">
              <IonItem slot="header" color="light">
                <IonLabel>{getJobStatusLabel()}</IonLabel>
              </IonItem>
              <IonList slot="content">
                <IonItem
                  button
                  onClick={() => handleCategoryChange("InTouch")}
                  color={selectedCategory === "InTouch" ? "primary" : "light"}
                >
                  <IonLabel>
                    {selectedLanguage === "English" ? "In Touch" : "संपर्क में"}
                  </IonLabel>
                </IonItem>
                <IonItem
                  button
                  onClick={() => handleCategoryChange("Selected")}
                  color={selectedCategory === "Selected" ? "primary" : "light"}
                >
                  <IonLabel>
                    {selectedLanguage === "English" ? "Selected" : "चयनित"}
                  </IonLabel>
                </IonItem>
                <IonItem
                  button
                  onClick={() => handleCategoryChange("InReview")}
                  color={selectedCategory === "InReview" ? "primary" : "light"}
                >
                  <IonLabel>
                    {selectedLanguage === "English" ? "In Review" : "समीक्षा में"}
                  </IonLabel>
                </IonItem>
                <IonItem
                  button
                  onClick={() => handleCategoryChange("NotSelected")}
                  color={selectedCategory === "NotSelected" ? "primary" : "light"}
                >
                  <IonLabel>
                    {selectedLanguage === "English" ? "Not Selected" : "चयनित नहीं"}
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonAccordion>
          </IonAccordionGroup>
          {renderJobData()}
        </div>
      </IonContent>
    </IonPage>
  );
};