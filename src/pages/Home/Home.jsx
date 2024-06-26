import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import {
  heartOutline,
  sendOutline,
  chatbubbleOutline,
  notificationsOutline,
  chatbubbleEllipsesOutline,
  searchOutline,
  closeOutline,
  refresh,
} from "ionicons/icons";
import "./Home.css";
import { JobCard } from "../../components/Cards/JobCard/JobCard";
import FilterModal from "../../components/Models/FilterModal";

import wm from "./wm.png";
import frame from "./Frame1.png";
import noOffer from "/assets/noOffer.png";
import NoJobs from "/assets/home1.png";
import equilizer from "./equalizer.png";
import refreshicon from "./refresh.png";
import { useHistory } from "react-router";
import { App as MainApp } from "@capacitor/app";
import profileImg from "./profileImg2.png";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { isMobile } from "../../IsMobile/IsMobile";

// import { StatusBar } from '@capacitor/status-bar';
export const Home = () => {
  const history = useIonRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { editUpdate, jobUpdate, setJobUpdate, languageUpdate } =
    useContext(AppContext);
  const [backPressCount, setBackPressCount] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [allJobData, setAllJobData] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [userPrefData, setUserPrefData] = useState({});
  const [filteredJobData, setFilteredJobData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("featured");

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handelJobCardClick = (id) => {
    history.push(`/job-details/${id}`);
  };

  const handelProfileClick = () => {
    history.push("/app/profile");
  };

  const outerRout = () => {
    history.push("/job-details/1");
  };

  const getProfileImg = async () => {
    try {
      const url = `${Base_url}profile_img_saved/Byuserid/${userDetails.user_id}`;
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('resume', selectedFile);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      console.log("Response check work experience", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        // setUpdate((prev)=>prev+1);
        const Data = data.img;
        setProfilePic(Data.image_path);

        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const getJobs = async () => {
    try {
      const url = `${Base_url}job`;
      const formData1 = new FormData();

      const response = await axios.get(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log("Data get from job ==>", data);

      if (data.status === "success") {
        const formatedData = data.post.filter((el) => el.status === "1");
        setAllJobData(formatedData); // Store all job data
        setJobData(formatedData);
        // Set the job data to be displayed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getuserref = async () => {
    try {
      const url = `${Base_url}job/user_prf/${userDetails.user_id}`;

      const formData = new FormData();
      formData.append("id", userDetails.user_id);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      console.log("user pref-->", data, response);

      if (data.status === "success") {
        console.log("Data get from job pref ==++++++++++++++++++++++++>", data);
        setFilteredJobData(data.post);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getuserref();
  }, [jobUpdate]);

  useEffect(() => {
    getJobs();
  }, [jobUpdate]);

  useEffect(() => {
    getProfileImg();
  }, [editUpdate]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredJobs = jobData.filter(
      (job) =>
        job.job_title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.sub_department.toLowerCase().includes(query)
    );

    setAllJobData(filteredJobs);
    setFilteredJobData(filteredJobs);
  };

  const handleFilterApply = (filters) => {
    const filteredJobs = jobData.filter((job) => {
      const matchesCity = filters.city
        ? job.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;
      const matchesState = filters.state
        ? job.state.toLowerCase().includes(filters.state.toLowerCase())
        : true;

      const salaryRange = job.off_salery
        .split("-")
        .map((s) => parseInt(s.trim().replace(/,/g, "")));
      const minSalary = salaryRange[0];
      const maxSalary = salaryRange[1];
      const matchesSalary =
        (!filters.minSalary || minSalary >= filters.minSalary) &&
        (!filters.maxSalary || maxSalary <= filters.maxSalary);

      const matchesProfile = filters.jobProfile
        ? job.job_title.toLowerCase().includes(filters.jobProfile.toLowerCase())
        : true;
      const matchesJobType = filters.jobType
        ? job.job_type === filters.jobType
        : true;
      const matchesEducation = filters.education
        ? job.education === filters.education
        : true;
      const matchesExperience = filters.experience
        ? job.experience.toLowerCase() === filters.experience.toLowerCase()
        : true;

      return (
        matchesCity &&
        matchesState &&
        matchesSalary &&
        matchesProfile &&
        matchesJobType &&
        matchesEducation &&
        matchesExperience
      );
    });
    console.log("Filtered Jobs+++++++++++++++++++++++++++12:", filteredJobs);
    setAllJobData(filteredJobs);
    setFilteredJobData(filteredJobs);
    setIsFilterApplied(true); // Set filter
  };

  const handleResetFilters = () => {
    setAllJobData(jobData);
    setFilteredJobData(jobData);
    setIsFilterApplied(false); // Reset filter
  };

  // useEffect(() => {
  //   const backButtonHandler = async () => {
  //     console.log("Back Press ==>")
  //     if (backPressCount < 1) {
  //       console.log("Back Press ==> 1")
  //       setBackPressCount(1);
  //       setTimeout(() => {
  //         setBackPressCount(0);
  //         console.log("Back Press ==> 0")
  //       }, 2000); // Reset the counter after 2 seconds
  //     } else {
  //       console.log("Back Press ==> exit app")
  //       await MainApp.exitApp(); // Exit the app using the App plugin
  //     }
  //   };

  //   MainApp.addListener("backButton", backButtonHandler);

  //   return () => {
  //     MainApp.removeAllListeners("backButton");
  //   };
  // }, [backPressCount]);

  // useEffect(()=>{
  //   StatusBar.setBackgroundColor({ color: '#FFFFFF' });
  //   StatusBar.setStyle({ style: 'dark' });
  // },[])
  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          {/* <IonButton onClick={outerRout}  expand='full'>
  Go job details
</IonButton> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div onClick={handelProfileClick} style={{ position: "relative" }}>
              <div>
                <img
                  src={profilePic || profileImg}
                  style={{
                    width: "62px",
                    height: "62px",
                    border: "2px solid #F0F3FF",
                    borderRadius: "40px",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -5,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    background: "#51B248",
                    borderRadius: "17px",
                  }}
                >
                  Available
                </span>
              </div>
            </div>

            <div>
              <img
                src={equilizer}
                onClick={() => setIsModalOpen(true)}
                alt="Filter"
              />
              {isFilterApplied && (
                <img
                  src={refreshicon}
                  onClick={handleResetFilters}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              )}
            </div>
            <FilterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onApply={handleFilterApply}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
                border: "1px solid #E5E5E5",
                background: "#F4F4F4",
                height: "48px",
                borderRadius: "50px",
              }}
            >
              <div>
                <IonIcon icon={searchOutline} style={{ fontSize: "24px" }} />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="text"
                  placeholder="eg.cook, f&b..."
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div>
              <span style={{ fontSize: "26px", fontWeight: "bold" }}>
                {selectedLanguage === "English" ? "Offers" : "ऑफर"}
              </span>

              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <div style={{ width: `100%` }}>
                      <div
                        style={{
                          position: "relative",
                          textAlign: "center",
                          marginTop: "20px",
                        }}
                      >
                        <img
                          src={frame}
                          alt="Globe Icon"
                          style={{
                            width: "100%",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            // right: 0,
                            bottom: 0,
                          }}
                        >
                          <img
                            src={wm}
                            alt="Globe Icon"
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </IonCol>

                  {!isMobile && (
                    <IonCol size="12" size-md="6">
                      <div style={{ width: `100%` }}>
                        <div
                          style={{
                            position: "relative",
                            textAlign: "center",
                            marginTop: "20px",
                          }}
                        >
                          <img
                            src={frame}
                            alt="Globe Icon"
                            style={{
                              width: "100%",
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              // right: 0,
                              bottom: 0,
                            }}
                          >
                            <img
                              src={wm}
                              alt="Globe Icon"
                              style={{
                                height: "100%",
                                width: "100%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </IonCol>
                  )}
                </IonRow>
              </IonGrid>
            </div>
          </div>

          {/* <div style={{display:`${isMobile ? "block" : "flex"}`,justifyContent:"left",alignItems:"flex-start",flexDirection:"column",marginTop:"20px"}}>
            <span style={{fontSize:"26px",fontWeight:"bold"}}>
              
              { selectedLanguage === "English" ? "Featured jobs" : "चुनिंदा नौकरियां"}
              </span> 
            <br/>
          
          </div> */}
         <div style={{  }}>
          {filteredJobData.length > 0 ? (
            <>
              <IonToolbar style={{ backgroundColor: "none" }}>
                <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
                  <IonSegmentButton value="featured">
                    <IonLabel style={{ color: "black", fontSize: "16px", fontWeight: "500" }}>
                      {selectedLanguage === "English" ? "Featured jobs" : "चुनिंदा नौकरियां"}
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="recommendations">
                    <IonLabel style={{ color: "black", fontSize: "16px", fontWeight: "500" }}>
                      {selectedLanguage === "English" ? "Other Jobs" : "अन्य नौकरियां"}
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonToolbar>

              {selectedTab === "featured" && (
                <IonGrid style={{ padding: 0, margin: 0 }}>
                  <IonRow>
                    {filteredJobData.map((el, index) => (
                      <IonCol size="12" size-md="6" key={index}>
                        <JobCard data={el} fun={() => handelJobCardClick(el.id)} />
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              )}

              {selectedTab === "recommendations" && (
                <IonGrid style={{ padding: 0, margin: 0 }}>
                  <IonRow>
                    {allJobData.map((el, index) => (
                      <IonCol size="12" size-md="6" key={index}>
                        <JobCard data={el} fun={() => handelJobCardClick(el.id)} />
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              )}
            </>
          ) : (
            <>
            <IonText style={{ padding: "10px", fontSize: "24px", fontWeight: "400",marginTop:'10px' }}>All Jobs</IonText>
            <IonGrid style={{ padding: 0, margin: 0 }}>
              <IonRow>
                {allJobData.map((el, index) => (
                  <IonCol size="12" size-md="6" key={index}>
                    <JobCard data={el} fun={() => handelJobCardClick(el.id)} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </>
          )}
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
