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

import { useHistory } from "react-router";
import ProfileListItem from "../../../components/ProfileItem/ProfileItem";
import axios from "axios";
import { Base_url } from "../../../Config/BaseUrl";
import { AppContext } from "../../../Context/AppContext";
import profileImg from "./profileImg2.png";
import { ContactUsModel } from "../../../components/Models/ContactUsModel";
import { isMobile } from "../../../IsMobile/IsMobile";
import { Share } from "@capacitor/share";

async function shareApp() {
  const { value } = await Share.canShare();
  if (value) {
    await Share.share({
      title: "Check out this job platform!",
      text: "Join me on this awesome job platform!",
      url: "https://your-app-url.com",
      dialogTitle: "Share with buddies",
    });
  } else {
    // Fallback if sharing is not supported
    console.log("Sharing not supported on this platform.");
    // You can provide alternative methods for sharing here
  }
}

export const HotelierProfile = () => {
  const history = useHistory();
  const { editUpdate, setEditUpdate, profileHealthUpdate,languageUpdate } =
    useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const updatedImg = localStorage.getItem("updatedImg") || null;
  const [profilePic, setProfilePic] = useState(null);

  const [basicData, setBasicData] = useState(null);
  const [contactUsModel, setContatUsModel] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [phHeathPercentage, setPhHeathPercentage] = useState(0);
  const [userProfileHealthData, setUserProfileHealthData] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  const [rewardPoints, setRewardPoints] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);
  function encodeUserID(userID) {
    if (userID === null) {
        return '';
    }
    const userIDStr = userID.toString();
    const encodedUserID = btoa(userIDStr);
    return userDetails.name.substring(0,2).toUpperCase() + encodedUserID;
}

  function decodeReferenceID(referenceID) {
    const refid = referenceID.substring(2, referenceID.length);
    const decodedUserIDStr = atob(refid);
    const userID = parseInt(decodedUserIDStr, 10);
    return userID;
  }

  const copyToClipboard = () => {
    let referralCode = encodeUserID(userDetails.user_id);
    navigator.clipboard.writeText(referralCode).then(() => {
      console.log("Referral code copied to clipboard:", referralCode);
      setIsPressed(true);
      setTimeout(() => {
        setIsPressed(false);
      }, 200);
    });
  };

  useEffect(() => {
    const button = document.querySelector("[data-share]");
    if (button) {
      button.addEventListener("click", function () {
        var refCode = encodeUserID(userDetails.user_id);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: "buttonPressed", ref: refCode })
        );
      });
    }

  //  console.log("Id of decoded user ===============================>",decodeReferenceID(encodeUserID(83)) )

  }, []);

  

  const Data = [
    {
      name: "user_img",
      value: 0,
      route: "/update-profile-photo",
      name2: "Profile Photo",
    },
    {
      name: "user_pro",
      value: 0,
      route: "/employers-personal-details",
      name2: "Personal Details",
    },
    {
      name: "users",
      value: 0,
      route: "/employers-contact-details",
      name2: "Contact Details",
    },
  ];
  const [dataPh, setDataPh] = useState(Data);
  const ProfileTabs = [
    {
      icon: lockClosedOutline,
      title: selectedLanguage === "English" ? "Personal Details" : "व्यक्तिगत विवरण",
      link: "/employers-personal-details",
      color: "#395CFF",
    },
    {
      icon: callOutline,
      title: selectedLanguage === "English" ? "Contact Details" : "सम्पर्क करने का विवरण",
      link: "/employers-contact-details",
      color: "#395CFF",
    },
    {
      icon: bookOutline,
      title: selectedLanguage === "English" ? "Your Current Selected Package" : "आपका वर्तमान चयनित पैकेज",
      link: "/employers-package",
      color: "#395CFF",
    },
    {
      icon: gitPullRequestOutline,
      title: selectedLanguage === "English" ? "Terms and Services" : "नियम और सेवाएँ",
      link: "/term-services",
      color: "#395CFF",
    },
    {
      icon: bagHandleOutline,
      title: selectedLanguage === "English" ? "Privacy Policy" : "गोपनीयता नीति",
      link: "/privacy-policy",
      color: "#395CFF",
    },
  ];
  const handelPointsDataGet = async () => {
    try {
      console.log("In Cahnge status ==>");

      const url = `${Base_url}auth/points/${userDetails.user_id}`;
      // console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('point',10);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data1 = response.data;
      console.log("Response check work experience", data1, response);

      if (data1.status === "success") {
        console.log(
          "Points Data ============================================>",
          data1
        );
        const points = data1.data.points;
        setRewardPoints(points);
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelRewardClick = () => {
    history.push("/rewards")
  };

  const handelProfileHealthClick = () => {
    history.push("/hotelier-profile-health");
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
      const url = `${Base_url}basic/Hotelprofile_health_userid/${userDetails.user_id}`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      // console.log("Response check work experience data",data,response)

      if (data) {
        console.log("Basic data profile health   ==>", data.post);
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
   
  }, [editUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      handelPointsDataGet();
    }, 20000); 

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);
  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "23px 23px 0px 23px" }}>
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

          <div style={{ marginTop: "30px" }}>
            <div onClick={handelProfilePhotoClick}>
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={profilePic || updatedImg}
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
                      left: "58%",
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

            <div style={{ marginTop: "30px" }}>
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
                        height: "120px",
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
                              stroke={
                                phHeathPercentage < 30 ? "crimson" : "#51B248"
                              }
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
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {selectedLanguage === "English" ? "Profile Health" : "प्रोफ़ाइल स्वास्थ्य"}
                          </span>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <span style={{ color: "#575757", fontSize: "14px" }}>
                            {phHeathPercentage > 99
                              ? selectedLanguage === "English" ? "Completed" : "पूरा हो गया"
                              : selectedLanguage === "English" ? "Complete your profile!" : "अपनी प्रोफ़ाइल पूरी करें!"}
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

                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        padding: "10px",
                        borderRadius: "16px",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        height: "120px",
                        position: "relative",
                      }}
                    >
                      <div style={{ width: "110px", textAlign: "center" }}>
                        <img
                          src="/assets/reward1.png"
                          style={{ height: "80px", width: "80px" }}
                        />
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {selectedLanguage === "English" ? "Points Earned" : "अर्जित अंक"}
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
      // padding: '10px 20px', 
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
        padding:"20px"
      }}
    >
      <IonIcon
        icon={linkOutline}
        style={{
          color: '#3B82F6', 
          fontSize: '24px', 
          marginRight: '10px', 
          transform:'rotate(45deg)'
        }}
      />
      <span style={{marginRight:"10px",fontSize:"14px"}}>
      {selectedLanguage === "English" ? "Referral Code" : "रेफरल कोड"}
      </span>
      <span
        style={{
          color: '#333', 
          fontSize: '16px',
          fontWeight: 'bold', 
        }}
      >
       
         {encodeUserID(userDetails &&  userDetails.user_id)}
      </span>
    </div>
    <div
      style={{
        marginLeft: 'auto', 
        background: '#3B82F6', 
        color: '#fff',
        padding: '8px 20px',
        borderTopRightRadius:"10px",
        borderBottomRightRadius:"10px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold', 
        fontSize: '16px', 
        height:"60px",
        
      }}
    >
      {selectedLanguage === "English" ? "Copy" : "कॉपी करें"}
    </div>

  </div>
</IonCol>

                </IonRow>
              </IonGrid>
            </div>
          </div>
          </div>

          <div style={{ marginTop: "0px" }}>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <IonList>
                    <div style={{ marginTop: "0px" }}>
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
                        {selectedLanguage === "English" ? "Contact Us" : " संपर्क करें"}
                        </IonLabel>
                      </IonItem>
                    </div>

                    {ProfileTabs.map((el, index) => {
                      return (
                        <div key={index} style={{ marginTop: "20px" }}>
                          <ProfileListItem key={index} Data={el} />
                        </div>
                      );
                    })}

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
                        {selectedLanguage === "English" ? "Invite your Friend" : "अपने मित्र को आमंत्रित करें"}
                        </IonLabel>
                        {/* <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon> */}
                      </IonItem>
                      <IonCol size="12" size-md="6"></IonCol>
                    </div>
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <ContactUsModel
            showModal={contactUsModel}
            setShowModal={setContatUsModel}
            data={basicData}
          />
        {/* </div> */}
      </IonContent>
    </IonPage>
  );
};
