import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
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
  starOutline,
  colorFill,
  star,
  helpCircleOutline,
  settingsOutline,
  createOutline,
  bookmark,
  eye,
  lockClosedOutline,
  callOutline,
  bookOutline,
  gitPullRequestOutline,
  bagHandleOutline,
  cloudUploadOutline,
  shareOutline,
  chevronForwardOutline,
  headsetOutline,
  copyOutline,
  linkOutline,
} from "ionicons/icons";
import cs from "./th.jpg";
import profileImg from "./profileImg2.png";
import ProfileListItem from "../../components/ProfileItem/ProfileItem";
import { useHistory } from "react-router";
import { ResumeUplodeProfile } from "../../components/Models/ResumeUplodeProfile";

import { AppContext } from "../../Context/AppContext";
import { ContactUsModel } from "../../components/Models/ContactUsModel";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { isMobile } from "../../IsMobile/IsMobile";



export const Profile = () => {
  const history = useHistory();
  const { editUpdate, setEditUpdate, profileHealthUpdate,languageUpdate } =
    useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [profilePic, setProfilePic] = useState(null);

  const [basicData, setBasicData] = useState(null);
  const [contactUsModel, setContatUsModel] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [phHeathPercentage, setPhHeathPercentage] = useState(0);
  const [userProfileHealthData, setUserProfileHealthData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  const [isPressed, setIsPressed] = useState(false);



  const [rewardPoints,setRewardPoints] = useState(0)
  function encodeUserID(userID) {
    const userIDStr = userID.toString();
    const encodedUserID = btoa(userIDStr) ;
    return userDetails.name.substring(0,2).toUpperCase() + encodedUserID ;
  }

  function decodeReferenceID(referenceID) {
    const refid = referenceID.substring(2, referenceID.length);
    const decodedUserIDStr = atob(refid);
    const userID = parseInt(decodedUserIDStr, 10);
    return userID;
  }

const copyToClipboard = () => {
  let referralCode = encodeUserID(userDetails.user_id)
  navigator.clipboard.writeText(referralCode).then(() => {
    console.log('Referral code copied to clipboard:', referralCode);
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  });
};

  useEffect(() => {
    const button = document.querySelector('[data-share]');
    if (button) {
      button.addEventListener('click', function () {
       var refCode = encodeUserID(userDetails.user_id);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'buttonPressed', ref: refCode }));
      });
    }
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);
  const Data = [
    {
      name: "user_Job_pref",
      value: 0,
      route: "/profile-job-preference",
      name2: "Job Preference",
    },
    {
      name: "user_edu",
      value: 0,
      route: "/profile-eduction",
      name2: "Eduction",
    },
    {
      name: "user_img",
      value: 0,
      route: "/update-profile-photo",
      name2: "Profile Photo",
    },
    {
      name: "user_pro",
      value: 0,
      route: "/profile-personal-details",
      name2: "Personal Details",
    },
    {
      name: "user_resume",
      value: 0,
      route: "/profile-resume",
      name2: "Resume",
    },
    {
      name: "user_work",
      value: 0,
      route: "/profile-work-experience",
      name2: "Work Experience",
    },
    {
      name: "users",
      value: 0,
      route: "/profile-contact-details",
      name2: "Contact Details",
    },
  ];
  const [dataPh, setDataPh] = useState(Data);
  const ProfileTabs = [
    {
      icon: lockClosedOutline,
      title: selectedLanguage === "English" ? "Personal Details" : "व्यक्तिगत विवरण",
      link: "/profile-personal-details",
      color: "#395CFF",
    },
    {
      icon: callOutline,
      title: selectedLanguage === "English" ? "Contact Details" : "सम्पर्क करने का विवरण",
      link: "/profile-contact-details",
      color: "#395CFF",
    },
    {
      icon: bookOutline,
      title: selectedLanguage === "English" ? "Education" : "शिक्षा",
      link: "/profile-eduction",
      color: "#395CFF",
    },
    {
      icon: gitPullRequestOutline,
      title: selectedLanguage === "English" ? "Job preference" : "काम प्राथमिकताएं",
      link: "/profile-job-preference",
      color: "#395CFF",
    },
    {
      icon: bagHandleOutline,
      title: selectedLanguage === "English" ? "Work experience" : "कार्य अनुभव",
      link: "/profile-work-experience",
      color: "#395CFF",
    },
    {
      icon: cloudUploadOutline,
      title: selectedLanguage === "English" ? "Resume" : "बायोडाटा",
      link: "/profile-resume",
      color: "#395CFF",
    },
  ];

  const handelRewardClick = () => {
    history.push("/rewards");
  };

  const handelProfileHealthClick = () => {
    history.push("/profile-health");
  };

  const handelProfilePhotoClick = () => {
    history.push("/update-profile-photo");
  };

  const handelTabClick = (value) => {
    history.push(value);
  };

  const handelContactUs = () => {
    setContatUsModel(true);
  };

  const getWebBasic = async () => {
    try {
      const url = `${Base_url}basic/web`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      // console.log("Response check work experience data",data,response)

      if (data) {
        console.log("Basic data", data.post);
        setBasicData(data.post[0]);
      }
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelPointsDataGet = async()=>{
    try {
     
      console.log("In Cahnge status ==>")
    
      
      const url = `${Base_url}auth/points/${userDetails.user_id}`;
      // console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('point',10);
    

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data1 = response.data
          console.log("Response check work experience",data1,response)
         

          if(data1.status === "success"){
              console.log("Points Data ============================================>",data1);
              const points = data1.data.points
              setRewardPoints(points);
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  }

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

  const getProfileHealth = async () => {
    try {
      const formData = new FormData();
      const url = `${Base_url}basic/profile_health_userid/${userDetails.user_id}`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      // console.log("Response check work experience data",data,response)

      if (data) {
        console.log("Basic data", data.post);
        const Data = data.post;
        setUserProfileHealthData(Data);
        const updatedData = dataPh.map((item) => {
          if (Data.hasOwnProperty(item.name)) {
            return { ...item, value: Data[item.name] };
          }
          return item;
        });

        setDataPh(updatedData);

        const totalCount = updatedData.length;
        const pendingCount = updatedData.filter(
          (item) => item.value === 1
        ).length;
        const healthPercentage =
          ((totalCount - pendingCount) / totalCount) * 100;
        const formattedPercentage = healthPercentage.toFixed(2);
        setPhHeathPercentage(formattedPercentage);
      }
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  useEffect(() => {
    getWebBasic();
    getProfileHealth();
  }, [profileHealthUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (completionPercentage < parseInt(phHeathPercentage)) {
        setCompletionPercentage(completionPercentage + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [phHeathPercentage, completionPercentage, profileHealthUpdate]);

  const width = 100;
  const height = 100;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 6;
  const offset = ((100 - completionPercentage) / 100) * circumference;

  useEffect(() => {
    getProfileImg();
    handelPointsDataGet()
  }, [editUpdate]);
  return (
    <IonPage>
      <IonContent>
        <div  className={isMobile ? "" : 'sw'} style={{ padding: "23px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IonIcon
                icon={star}
                style={{ fontSize: "22px", color: "#ffdc64" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginLeft: "3px",
                  marginTop: "2px",
                }}
              >
                4.5
              </span>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonIcon
                  onClick={() => handelTabClick("/help-and-support")}
                  icon={helpCircleOutline}
                  style={{ fontSize: "24px", marginRight: "10px" }}
                />
                <IonIcon
                  onClick={() => handelTabClick("/settings")}
                  icon={settingsOutline}
                  style={{ fontSize: "21px" }}
                />
              </div>
            </div>
          </div>

          <div>
            <div onClick={handelProfilePhotoClick}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "86px",
                    width: "86px",
                  }}
                >
                  <img
                    src={profilePic || profileImg}
                    alt="Globe Icon"
                    style={{
                      boxShadow: "6px 14px 28px rgba(0, 0, 255, 0.2)",
                      border: "1px solid grey",
                      height: "86px",
                      width: "86px",
                      borderRadius: "60px",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      bottom: 3,
                      left: "78%",
                      transform: "translateX(-50%)",
                      background: "#395CFF",
                      width: "28px",
                      height: "28px",
                      borderRadius: "20px",
                    }}
                  >
                    <IonIcon icon={createOutline} style={{ color: "#fff" }} />
                  </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 600 }}>
                    {userDetails && userDetails.name}{" "}
                    {userDetails && userDetails.last_name}
                  </span>
                </div>
              </div>
            </div>

            <div
              
              style={{ marginTop: "30px" }}
            >
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-md="6">
                  <div
              onClick={handelProfileHealthClick}
                style={{
                  background: "#ffffff",
                  padding: "10px",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  height:"120px"
                }}
              >
                <div>
                  <div className="profile-progress">
                    <svg width={width} height={height}>
                      <circle
                        r={radius}
                        cx={width / 2}
                        cy={height / 2}
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        r={radius}
                        cx={width / 2}
                        cy={height / 2}
                        fill="none"
                        stroke={phHeathPercentage < 30 ? "crimson" : "#51B248"}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                      />
                      <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="13"
                        fill="#000"
                      >
                        {phHeathPercentage}%
                      </text>
                    </svg>
                  </div>
                </div>

                <div style={{ marginLeft: "20px" }}>
                  <div>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      
                      { selectedLanguage === "English" ? "Profile health" : "प्रोफ़ाइल स्वास्थ्य"}
                    </span>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <span style={{ color: "#575757", fontSize: "14px" }}>
                      {phHeathPercentage > 99
                        ? "Completed"
                        : 
                         selectedLanguage === "English" ? "Complete your profile  !" : "अपनी प्रोफ़ाइल पूरी करें"
                        }
                    </span>
                  </div>
                </div>
              </div>
                  </IonCol>


                  <IonCol size="12" size-md="6">
                  <div
                onClick={handelRewardClick}
                style={{
                
                  background: `url('/assets/rewardBG.png')`, // Add your image path here
                  
                  backgroundRepeat:"no-repeat",
                  backgroundSize:"cover",
                  backgroundPosition:"center",
                  padding: "10px",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  height:"120px",
                  position:"relative"
                }}
              >
                <div style={{width:"110px",textAlign:"center"}} >
                  <img src="/assets/reward1.png" style={{height:"80px",width:"80px"}} />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <div>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      
                      { selectedLanguage === "English" ? "Points earned" : "अर्जित अंक"}
                    </span>
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <span style={{ color: "#575757", fontSize: "14px" }}>
                     {rewardPoints}
                    </span>
                  </div>
                </div>
               
              </div>
             
                  </IonCol>
                  <IonCol>
  <div
    onClick={copyToClipboard}
    style={{
      display: 'flex',
      alignItems: 'center',
      background: '#F5F5F5', 
      padding: '10px 20px', 
      borderRadius: '12px', 
      
      cursor: 'pointer', 
      transition: 'background 0.2s', 
      border: '1px solid #E0E0E0', 
      background: isPressed ? "#E0E0E0" : "#F5F5F5",
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <IonIcon
        icon={linkOutline}
        style={{
          color: '#3B82F6', 
          fontSize: '24px', 
          marginRight: '10px', 
          
        }}
      />
      <span
        style={{
          color: '#333', 
          fontSize: '16px',
          fontWeight: 'bold', 
        }}
      >
       
        {encodeUserID(userDetails.user_id)}
      </span>
    </div>
    <div
      style={{
        marginLeft: 'auto', 
        background: '#3B82F6', 
        color: '#fff',
        padding: '8px 20px',
        borderRadius: '15px ', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold', 
        fontSize: '16px', 
      }}
    >
      Copy
    </div>
  </div>
</IonCol>
                </IonRow>
              </IonGrid>
             

              

            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                  <div
                onClick={() => handelTabClick("/saved-jobs")}
                style={{
                  borderRadius: "15px",
                  padding: "15px",
                  background: "#F3F5FE",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <div>
                  <IonIcon
                    icon={bookmark}
                    style={{ fontSize: "28px", color: "#395CFF" }}
                  />
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>
                    
                    { selectedLanguage === "English" ? "Saved Jobs" : "बचाई गई नौकरियाँ"}
                    </span>
                </div>
              </div>
                  </IonCol>

                  <IonCol size="6">
                  <div
                onClick={() => handelTabClick("/viewed-jobs")}
                style={{
                  borderRadius: "15px",
                  padding: "15px",
                  background: "#F3F5FE",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <div>
                  <IonIcon
                    icon={eye}
                    style={{ fontSize: "28px", color: "#395CFF" }}
                  />
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <span style={{ fontWeight: "bold" }}>
                    
                    { selectedLanguage === "English" ? "Viewed Jobs" : "देखी गई नौकरियाँ"}
                    </span>
                </div>
              </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            

              
              <div></div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div style={{ marginTop: "20px" }}>
                      <IonItem
                        onClick={handelContactUs}
                        button
                        style={{ marginTop: "10px" }}
                      >
                        <IonIcon
                          icon={headsetOutline}
                          style={{ color: `#395CFF` }}
                          slot="start"
                        ></IonIcon>
                        <IonLabel style={{ fontWeight: "bold" }}>
                          
                          { selectedLanguage === "English" ? "Contact us" : "संपर्क करें"}
                        </IonLabel>
                        {/* <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon> */}
                      </IonItem>
                    </div>
                    </IonCol>
                  {/* <IonList> */}
                   
                 

                    {ProfileTabs.map((el, index) => {
                      return (
                        <IonCol  size="12" size-md="6" >
<div key={index} style={{ marginTop: "20px" }}>
                          <ProfileListItem key={index} Data={el} />
                        </div>
                        </IonCol>
                        
                      );
                    })}

<IonCol size="12" size-md="6">
  <div style={{ marginTop: "20px" }}>
    <IonItem
     data-share // Add this href attribute
      button
      style={{ marginTop: "10px" }}
    >
      <IonIcon
        icon={shareOutline}
        style={{ color: `#395CFF` }}
        slot="start"
      ></IonIcon>
      <IonLabel style={{ fontWeight: "bold" }}>
        {selectedLanguage === "English" ? "Invite your friend" : "अपने मित्र को निमंत्रित करो"}
      </IonLabel>
      {/* <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon> */}
    </IonItem>
  </div>
</IonCol>

                   
                  {/* </IonList> */}
               
              </IonRow>
            </IonGrid>
          </div>

          <ContactUsModel
            showModal={contactUsModel}
            setShowModal={setContatUsModel}
            data={basicData}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
