import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonSearchbar,
  useIonRouter,
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { IonSelect, IonSelectOption } from "@ionic/react";
import { State, City } from "country-state-city";
import "./BasicInfo.css";
import { AppContext } from "../../Context/AppContext";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import SelectStateModel from "../../components/Models/SelectStateModel";
import SelectCityModel from "../../components/Models/SelectCityModel";
import { isMobile } from "../../IsMobile/IsMobile";
import logo from "/assets/moj.png";
const Basicinfo = ({ handelContinue }) => {
  const history = useIonRouter();
  const Role = localStorage.getItem("role") || "";
  const details = JSON.parse(localStorage.getItem("Mobile"));
  const { showToast, languageUpdate } = useContext(AppContext);
  const [Citys, setCitys] = useState([]);
  const [States, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincode2, setPincode2] = useState("");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
  const [AddressData, setAddressData] = useState([]);
  // const [selectedCity, setSelectedCity] = useState('');
  // const [selectedGender, setSelectedGender] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    dob: "",
  });
  const [formData2, setFormData2] = useState({
    hotelName: "",
    location: "",
    email: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    gstin: "",
    gstemail: "",
    gstHotelName: "",
    gstAddress: "",
  });
  const [formData3, setFormData3] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    dob: "",
    gstin: "",
    gstFirmName: "",
  });
  
  const [formValid, setFormValid] = useState(false);
  const [formValid2, setFormValid2] = useState(false);
  const [formValid3, setFormValid3] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  const handelStateModelOpen = () => {
    setIsStateModelOpen(true);
  };

  const handelCityModelOpen = () => {
    setIsCityModelOpen(true);
  };

  const handlePincodeChange = (e) => {
    const newPincode = e.target.value;
    setPincode(newPincode);
    console.log("Enter Pin code ==>", newPincode);
    // Search for the pincode in the data array
    const pinData = AddressData.find((item) => item.pincode === newPincode);

    console.log("Pincode Data", pinData);
    if (pinData) {
      setSelectedCity(pinData.city_name);
      setSelectedState(pinData.state_name);
    } else {
      setSelectedCity("");
      setSelectedState("");
    }
  };

  const handlePincodeChange2 = (e) => {
    const newPincode = e.target.value;
    setPincode2(newPincode);
    console.log("Enter Pin code ==>", newPincode);
    // Search for the pincode in the data array
    const pinData = AddressData.find((item) => item.pincode === newPincode);

    console.log("Pincode Data", pinData);
    if (pinData) {
      setSelectedCity(pinData.city_name);
      setSelectedState(pinData.state_name);
    } else {
      setSelectedCity("");
      setSelectedState("");
    }
  };

  const handelStateModleClose = () => {
    setIsStateModelOpen(false);
  };

  const handelCityModleClose = () => {
    setIsCityModelOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setFormData3(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handelBtnClick = () => {
    console.log("Form Data ==>", formData);
    const currentYear = new Date().getFullYear();
    const selectedYear = new Date(formData.dob).getFullYear();

   
    if (!formData.firstName) {
      showToast("error", selectedLanguage === "English" ? "First name is required" : "पहला नाम आवश्यक है", "");
      return;
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      showToast("error", selectedLanguage === "English" ? "First name should contain only alphabetic characters" : "पहले नाम में केवल वर्णमाला के अक्षर होने चाहिए", "");
      return;
    } else if (!formData.lastName) {
      showToast("error", selectedLanguage === "English" ? "Last name is required" : "अंतिम नाम आवश्यक है", "");
      return;
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      showToast("error", selectedLanguage === "English" ? "Last name should contain only alphabetic characters" : "अंतिम नाम में केवल वर्णमाला के अक्षर होने चाहिए", "");
      return;
    } else if (!formData.gender) {
      showToast("error", selectedLanguage === "English" ? "Gender is required" : "लिंग आवश्यक है", "");
      return;
    } else if (!formData.dob) {
      showToast("error", selectedLanguage === "English" ? "Date of Birth is required" : "जन्म तिथि आवश्यक है", "");
      return;
    } else if (selectedYear === currentYear) {
      showToast("error", selectedLanguage === "English" ? "Date of Birth cannot be the current year" : "जन्म तिथि वर्तमान वर्ष नहीं हो सकती", "");
      return;
    }
    console.log("Data", formData);
    RegisterUser();
  };


  const handelBtnClick2 = () => {
    console.log("Form Data ==>", formData2);
    

   
    if (!formData2.hotelName) {
      showToast("error", "Hotel name is required", "");
      return;
    } else if (!formData2.email) {
      showToast("error", "Email is required", "");
      return;
    }
    else if (!pincode2) {
      showToast("error", "Pincode is required", "");
      return;
    } else if (!selectedState) {
      showToast("error", "State is required", "");
      return;
    }
    else if (!selectedCity) {
      showToast("error", "City is required", "");
      return;
    }
    
    handelEmployersBtnClick();
  };

  const handelBtnClick3 = () => {
    console.log("Form Data ==>", formData3);
    

   
    if (!formData3.firstName) {
      showToast("error", "First name is required", "");
      return;
    } else if (!/^[a-zA-Z]+$/.test(formData3.firstName)) {
      showToast("error", "First name should contain only alphabetic characters", "");
      return;
    } else if (!formData3.lastName) {
      showToast("error", "Last name is required", "");
      return;
    } else if (!/^[a-zA-Z]+$/.test(formData3.lastName)) { 
      showToast("error", "Last name should contain only alphabetic characters", "");
      return;
    } else if (!formData3.gender) {
      showToast("error", "Gender is required", "");
      return;
    } else if (!formData3.email) {
      showToast("error", "Email is required", "");
      return;
    }
  
    AgentbtnClick();
  };

  const AddAddressData = async () => {
    try {
      const url = `${Base_url}basic/all_city`;
      // const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('degree', formData.degree);
      // formData1.append('university', formData.university);
      // formData1.append('year', formData.yearGraduated);

      const response = await axios.get(url, {
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

        console.log("Data main ==>", data.post);
        const Data = data.post;

        // Set the unique states in the state variable
        setAddressData(Data);

        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelPointsAdd = async (value,route) => {
    console.log("In Points status ==>",route);
    try {
      const UserId = localStorage.getItem("refCode");
      console.log("In Cahnge status ==>");

      const url = `${Base_url}auth/user_refer/${UserId}`;
      // console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      formData1.append("point", value);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data1 = response.data;
      console.log("Response check work experience", data1, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data1.status === "success") {
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const RegisterUser = async () => {
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email !== "" && !emailPattern.test(formData.email)) {
        showToast("error", "Email is not valid", "");
        return;
      }
      const refId = localStorage.getItem("refCode");
      setLoading(true);
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append("role", Role);
      formData1.append("mobile_number", details.phoneNumber);
      formData1.append("name", formData.firstName);
      formData1.append("last_name", formData.lastName || "");
      formData1.append("gender", formData.gender || "");
      formData1.append("email", formData.email || "");
      formData1.append("state", selectedState || "");
      formData1.append("city", selectedCity || "");
      formData1.append("address", formData.address || "");
      formData1.append("dob", formData.dob || "");
      formData1.append("pin_code", pincode || "");
      formData1.append("ref_id", refId || "");
      formData1.append("country", "India");

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      console.log("Response check mobile", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        setLoading(false);
        localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        handelPointsAdd(50,"jobseekers");
        history.push("/personal-details");
        return;
      }
      // showToast("error", "Try After Some Time", "");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };

  const handelEmployersBtnClick = async () => {
    if (formValid2 === false) {
      console.log("In if=============================>", formData2);
      showToast("error", "Fill the required fields", "");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData2.email)) {
      showToast("error", "Email is not valid", "");
      return;
    }
    const refId = localStorage.getItem("refCode");
    try {
      setLoading(true);
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append("role", Role);
      formData1.append("mobile_number", details.phoneNumber);
      formData1.append("name", formData2.hotelName);
      formData1.append("location", formData2.location || "");
      formData1.append("email", formData2.email || "");
      formData1.append("gst_number", formData2.gstin || "");
      formData1.append("reg_email", formData2.gstemail || "");
      formData1.append("gst_name", formData2.gstHotelName || "");
      formData1.append("reg_hadd", formData2.gstAddress || "");
      formData1.append("state", selectedState || "");
      formData1.append("city", selectedCity || "");
      formData1.append("address", formData2.address || "");
      formData1.append("pin_code", pincode2 || "");
      formData1.append("ref_id", refId || "");
      formData1.append("country", "India");

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      console.log("Response check mobile", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        handelPointsAdd(1000,"Employess")
        setLoading(false);
        localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        
        //  history.push("/phone", 'root','replace')
        history.push("/hotelier-package");
        return;
      }
      // showToast("error", "Try After Some Time", "");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };

  const RegisterHotelier = async () => {
    try {
      setLoading(true);
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append("role", Role);
      formData1.append("mobile_number", details.phoneNumber);
      formData1.append("name", formData.firstName);
      formData1.append("last_name", formData.lastName || "");
      formData1.append("gender", formData.gender || "");
      formData1.append("email", formData.email || "");
      formData1.append("state", selectedState || "");
      formData1.append("city", selectedCity || "");
      formData1.append("address", formData.address || "");
      formData1.append("dob", formData.dob || "");
      formData1.append("pin_code", pincode || "");
      formData1.append("country", "India");

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      console.log("Response check mobile", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        setLoading(false);
        localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        handelContinue("ProfilePic");
        return;
      }
      // showToast("error", "Try After Some Time", "");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };

  const AgentbtnClick = async () => {
    if (!formValid3) {
      console.log("Validation failed", formData3);
      showToast("error", "Fill the required fields", "");
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData3.email)) {
      showToast("error", "Email is not valid", "");
      return;
    }
  
    try {
      setLoading(true);
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
  
      const fullName = `${formData3.firstName} ${formData3.lastName}`;
      const refId = localStorage.getItem("refCode");
      formData1.append('role', Role);
      formData1.append('mobile_number', details.phoneNumber);
      formData1.append('name', fullName); 
      formData1.append('gender', formData3.gender || "");
      formData1.append('email', formData3.email || "");
      formData1.append('state', selectedState || "");
      formData1.append('city', selectedCity || "");
      formData1.append('address', formData3.address || "");
      formData1.append('dob', formData3.dob || "");
      formData1.append('pin_code', pincode || "");
      formData1.append('gst_number', formData3.gstin || "");
      formData1.append('gst_name', formData3.gstFirmName || "");
      formData1.append("ref_id", refId || "");
      formData1.append('country', "India");
  
      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
  
      const data = response.data;
      console.log("Response check mobile", data, response);
  
      if (data.status === "success") {
        handelPointsAdd(1000,"Agent");
        setLoading(false);
        localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
       
        history.push("/complete");
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const isValid = formData3.firstName !== "" && formData3.lastName !== "" && formData3.gender !== "";
    console.log("FormData 3===>", formData3);
    console.log("Form is valid===>", isValid);
    setFormValid3(isValid);
  }, [formData3]);
  
  

  useEffect(() => {
    const isValid =
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.gender !== "";
    setFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    const isValid =
      formData2.hotelName !== "" &&
      formData2.email !== "" &&
      pincode2 !== "" &&
      selectedState !== "" &&
      selectedCity !== "";
    console.log("FormData 2===>", formData2,pincode2,selectedState,selectedCity,isValid);
    setFormValid2(isValid);
  }, [formData2]);

  // useEffect(() => {
  //   const isValid =
  //     formData3.firstName !== "" &&
    
  //     formData3.gender !== "";
  
  //   console.log("FormData 3===>", formData3);
  //   console.log("Form is valid===>", isValid);
  //   setFormValid3(isValid);
  // }, [formData3]);
  

  useEffect(() => {
    AddAddressData();
    // console.log("States:", statesOfIndia)
  }, []);

  const handelBackClick = () => {
    history.goBack();
  };

  // useEffect(()=>{
  //   console.log("In City Data  ===>",formData.state)
  //   if(formData.state !== ""){
  //     const cityData= City.getCitiesOfState('IN', formData.state);
  //     console.log("City Data  ==>",cityData)
  //     setCitys(cityData);
  //   }

  // },[formData.state])
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IonIcon
              onClick={handelBackClick}
              icon={chevronBackOutline}
              style={{ fontSize: "24px" }}
            />

            <div>
              <img src={logo} style={{ height: "68px", width: "92px" }} />
            </div>
          </div>
          <div
            className={isMobile ? "" : "sw"}
            style={{
              display: `${isMobile ? "block" : "flex"}`,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div> */}
            <h1
              style={{
                color: "#232323",
                fontSize: "30px",
                fontFamily: "inter",
                fontWeight: "700",
              }}
            >
              {selectedLanguage === "English"
                ? "Add your personal information"
                : "अपनी व्यक्तिगत जानकारी जोड़ें"}
            </h1>

            {Role === "Job Seeker" && (
              <div style={{ marginTop: "30px" }}>
                <div>
                  <label
                    style={{
                      color: "#575757",
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "30px",
                    }}
                  >
                    {selectedLanguage === "English" ? "First name" : "पहला नाम"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
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
                    {selectedLanguage === "English" ? "Last name" : "उपनाम"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
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
                    {selectedLanguage === "English"
                      ? "Date of Birth"
                      : "जन्म की तारीख"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    style={{ paddingRight: "20px" }}
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
                    {selectedLanguage === "English" ? "Gender" : "लिंग"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div
                    style={{
                      border: "1px solid #31363F",
                      borderRadius: "50px",
                      paddingLeft: "10px",
                    }}
                  >
                    <IonSelect
                      name="gender"
                      interface="popover"
                      value={formData.gender}
                      onIonChange={handleInputChange}
                      placeholder={selectedLanguage === "English" ? "Gender" : "लिंग"}
                    >
                      <IonSelectOption defaultChecked value={""}>
                        {selectedLanguage === "English" ? "Select Gender" : "लिंग चुनें"}
                      </IonSelectOption>
                      <IonSelectOption value="male">
                        {selectedLanguage === "English" ? "Male" : "पुरुष"}
                      </IonSelectOption>
                      <IonSelectOption value="female">
                        {selectedLanguage === "English" ? "Female" : "महिला"}
                      </IonSelectOption>
                      <IonSelectOption value="other">
                        {selectedLanguage === "English" ? "Other" : "अन्य"}
                      </IonSelectOption>
                    </IonSelect>
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
                    {selectedLanguage === "English" ? "Email" : "ईमेल"}
                    
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    {selectedLanguage === "English" ? "Address" : "पता"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
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
                    {selectedLanguage === "English" ? "Pincode" : "पिन कोड"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="pincode"
                    value={pincode}
                    onChange={handlePincodeChange}
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
                    {selectedLanguage === "English" ? "State" : "राज्य"}
                  </label>
                  <div
                  // style={{
                  //   border: "1px solid #E2E8F0",
                  //   borderRadius: "50px",
                  //   paddingLeft: "10px",
                  // }}
                  >
                    {/* <IonSelect
        name="state"
        interface="action-sheet"
        value={formData.state}
        onIonChange={handleInputChange}
        placeholder="State"
      >
        <IonSelectOption defaultChecked value={""}>
          Select State
        </IonSelectOption>
        {States.map((state) => (
          <IonSelectOption key={state.isoCode} value={state.name}>
            {state.name}
          </IonSelectOption>
        ))}
      </IonSelect> */}
                    <div onClick={handelStateModelOpen}>
                      <div
                        style={{
                          padding: "10px",

                          height: "48px",
                          width: "100%",
                          borderRadius: "50px",
                          border: "1px solid #31363F ",
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <span>{selectedState && selectedState}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedState !== "" && (
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
                      {selectedLanguage === "English" ? "City" : "शहर"}
                    </label>

                    <div onClick={handelCityModelOpen}>
                      <div
                        style={{
                          padding: "10px",

                          height: "48px",
                          width: "100%",
                          borderRadius: "50px",
                          border: "1px solid #E2E8F0 ",
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <span>{selectedCity && selectedCity}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* </IonItem> */}
              </div>
            )}

            {Role === "Employers" && (
              <div style={{ marginTop: "30px" }}>
                <div>
                  <label
                    style={{
                      color: "#575757",
                      fontFamily: "inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "30px",
                    }}
                  >
                    {selectedLanguage === "English"
                      ? "Hotel Name"
                      : "होटल का नाम"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="hotelName"
                    value={formData2.hotelName}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English"
                      ? "Hotel Location"
                      : "होटल का स्थान"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="location"
                    value={formData2.location}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English" ? "Email" : "ईमेल"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="email"
                    value={formData2.email}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English" ? "Address" : "पता"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="address"
                    value={formData2.address}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English" ? "Pincode" : "पिन कोड"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="pincode"
                    value={pincode2}
                    onChange={handlePincodeChange2}
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
                    {selectedLanguage === "English" ? "State" : "राज्य"}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div
                  // style={{
                  //   border: "1px solid #E2E8F0",
                  //   borderRadius: "50px",
                  //   paddingLeft: "10px",
                  // }}
                  >
                    {/* <IonSelect
        name="state"
        interface="action-sheet"
        value={formData.state}
        onIonChange={handleInputChange}
        placeholder="State"
      >
        <IonSelectOption defaultChecked value={""}>
          Select State
        </IonSelectOption>
        {States.map((state) => (
          <IonSelectOption key={state.isoCode} value={state.name}>
            {state.name}
          </IonSelectOption>
        ))}
      </IonSelect> */}
                    <div onClick={handelStateModelOpen}>
                      <div
                        style={{
                          padding: "10px",

                          height: "48px",
                          width: "100%",
                          borderRadius: "50px",
                          border: "1px solid #31363F ",
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <span>{selectedState && selectedState}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedState !== "" && (
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
                      {selectedLanguage === "English" ? "City" : "शहर"}
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <div onClick={handelCityModelOpen}>
                      <div
                        style={{
                          padding: "10px",

                          height: "48px",
                          width: "100%",
                          borderRadius: "50px",
                          border: "1px solid #31363F ",
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <span>{selectedCity && selectedCity}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: "40px", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>
                    {selectedLanguage === "English"
                      ? "GST Details"
                      : "जीएसटी विवरण"}
                  </span>
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
                    {selectedLanguage === "English" ? "GSTIN" : "जस्टिन"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="gstin"
                    value={formData2.gstin}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English"
                      ? "Registered email address"
                      : "पंजीकृत ईमेल पता"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="gstemail"
                    value={formData2.gstemail}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English"
                      ? "Registered hotel name under GST"
                      : "जीएसटी के अंतर्गत पंजीकृत होटल का नाम"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="gstHotelName"
                    value={formData2.gstHotelName}
                    onChange={handleInputChange2}
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
                    {selectedLanguage === "English"
                      ? "Registered hotel address "
                      : "पंजीकृत होटल का पता"}
                  </label>
                  {/* <IonItem> */}
                  <input
                    className="round-input"
                    type="text"
                    name="gstAddress"
                    value={formData2.gstAddress}
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
            )}

           {Role === "Agent" && (
  <div style={{ marginTop: "30px" }}>
    <div>
      <label
        style={{
          color: "#575757",
          fontFamily: "inter",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "30px",
        }}
      >
        {selectedLanguage === "English" ? "First name" : "पहला नाम"}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        className="round-input"
        type="text"
        name="firstName"
        value={formData3.firstName}
        onChange={handleInputChange3}
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
        {selectedLanguage === "English" ? "Last name" : "उपनाम"}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        className="round-input"
        type="text"
        name="lastName"
        value={formData3.lastName}
        onChange={handleInputChange3}
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
        {selectedLanguage === "English"
          ? "Date of Birth"
          : "जन्म की तारीख"}
      </label>
      <input
        className="round-input"
        type="date"
        name="dob"
        value={formData3.dob}
        onChange={handleInputChange3}
        max={new Date().toISOString().split("T")[0]}
        style={{ paddingRight: "20px" }}
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
        {selectedLanguage === "English" ? "Gender" : "लिंग"}
        <span style={{ color: "red" }}>*</span>
      </label>
      <div
        style={{
          border: "1px solid #31363F",
          borderRadius: "50px",
          paddingLeft: "10px",
        }}
      >
        <IonSelect
          name="gender"
          interface="popover"
          value={formData3.gender}
          onIonChange={handleInputChange3}
          placeholder="Gender"
        >
          <IonSelectOption defaultChecked value={""}>
            {selectedLanguage === "English"
              ? "Select Gender"
              : "लिंग चुनें"}
          </IonSelectOption>
          <IonSelectOption value="male">Male</IonSelectOption>
          <IonSelectOption value="female">Female</IonSelectOption>
          <IonSelectOption value="other">Other</IonSelectOption>
        </IonSelect>
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
        {selectedLanguage === "English" ? "Email" : "ईमेल"}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        className="round-input"
        type="text"
        name="email"
        value={formData3.email}
        onChange={handleInputChange3}
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
        {selectedLanguage === "English" ? "Address" : "पता"}
      </label>
      <input
        className="round-input"
        type="text"
        name="address"
        value={formData3.address}
        onChange={handleInputChange3}
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
        {selectedLanguage === "English" ? "Pincode" : "पिन कोड"}
      </label>
      <input
        className="round-input"
        type="text"
        name="pincode"
        value={pincode}
        onChange={handlePincodeChange}
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
        {selectedLanguage === "English" ? "State" : "राज्य"}
      </label>
      <div onClick={handelStateModelOpen}>
        <div
          style={{
            padding: "10px",
            height: "48px",
            width: "100%",
            borderRadius: "50px",
            border: "1px solid #31363F ",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <span>{selectedState && selectedState}</span>
        </div>
      </div>
    </div>

    {selectedState !== "" && (
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
          {selectedLanguage === "English" ? "City" : "शहर"}
        </label>
        <div onClick={handelCityModelOpen}>
          <div
            style={{
              padding: "10px",
              height: "48px",
              width: "100%",
              borderRadius: "50px",
              border: "1px solid #31363F ",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <span>{selectedCity && selectedCity}</span>
          </div>
        </div>
      </div>
    )}

    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <span style={{ fontWeight: "bold" }}>
        {selectedLanguage === "English"
          ? "GST Details"
          : "जीएसटी विवरण"}
      </span>
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
        {selectedLanguage === "English" ? "GSTIN" : "जस्टिन"}
      </label>
      <input
        className="round-input"
        type="text"
        name="gstin"
        value={formData3.gstin}
        onChange={handleInputChange3}
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
        {selectedLanguage === "English"
          ? "Firm Name"
          : "फर्म का नाम"}
      </label>
      <input
        className="round-input"
        type="text"
        name="gstFirmName"
        value={formData3.gstFirmName}
        onChange={handleInputChange3}
      />
    </div>
  </div>
)}

            {
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Role === "Job Seeker" && (
                  <CustomBtn1
                    fun={handelBtnClick}
                    title={
                      selectedLanguage === "English" ? "Continue" : "जारी रखें"
                    }
                    loading={loading}
                  />
                )}

                {Role === "Employers" && (
                  <CustomBtn1
                    fun={handelBtnClick2}
                    title={
                      selectedLanguage === "English" ? "Continue" : "जारी रखें"
                    }
                    loading={loading}
                  />
                )}
                {Role === "Agent" && (
                  <CustomBtn1
                    fun={handelBtnClick3}
                    title={
                      selectedLanguage === "English" ? "Continue" : "जारी रखें"
                    }
                    loading={loading}
                  />
                )}
              </div>
            }
            <SelectStateModel
              isOpen={isStateModelOpen}
              onClose={handelStateModleClose}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              setPreferredCity={setSelectedCity}
            />
            <SelectCityModel
              isOpen={isCityModelOpen}
              onClose={handelCityModleClose}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedState={selectedState}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Basicinfo;
