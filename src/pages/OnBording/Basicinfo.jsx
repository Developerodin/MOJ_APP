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

const Basicinfo = ({ handelContinue }) => {
  const history = useIonRouter();
  const Role = localStorage.getItem("role") || "";
  const details = JSON.parse( localStorage.getItem("Mobile"));
  const { showToast,languageUpdate } = useContext(AppContext);
  const [Citys, setCitys] = useState([]);
  const [States, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pincode,setPincode] = useState("")
  const [pincode2,setPincode2] = useState("")
  const [isStateModelOpen,setIsStateModelOpen] = useState(false);
  const [isCityModelOpen,setIsCityModelOpen] = useState(false);
  const [AddressData,setAddressData] = useState([]);
  // const [selectedCity, setSelectedCity] = useState('');
  // const [selectedGender, setSelectedGender] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    state: "",
    city: "",
    pincode:"",
    address:"",
    dob:""
  });
  const [formData2, setFormData2] = useState({
    hotelName: "",
    location: "",
    email: "",
    address: "",
    pincode: "",
    state: "",
    city:"",
    gstin:"",
    gstemail:"",
    gstHotelName:"",
    gstAddress:""
  });
  const [formValid, setFormValid] = useState(false);
 const [loading,setLoading] = useState(false);
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
 
 const handelStateModelOpen =() =>{
  setIsStateModelOpen(true);
 }

 const handelCityModelOpen =() =>{
  setIsCityModelOpen(true);
 }

 const handlePincodeChange = (e) => {
  const newPincode = e.target.value;
  setPincode(newPincode);
  console.log("Enter Pin code ==>",newPincode)
  // Search for the pincode in the data array
  const pinData = AddressData.find(item => item.pincode === newPincode);

  console.log("Pincode Data",pinData);
  if (pinData) {
    setSelectedCity(pinData.city_name);
    setSelectedState(pinData.state_name);
  } else {
    setSelectedCity('');
    setSelectedState('');
  }
};


const handlePincodeChange2 = (e) => {
  const newPincode = e.target.value;
  setPincode2(newPincode);
  console.log("Enter Pin code ==>",newPincode)
  // Search for the pincode in the data array
  const pinData = AddressData.find(item => item.pincode === newPincode);

  console.log("Pincode Data",pinData);
  if (pinData) {
    setSelectedCity(pinData.city_name);
    setSelectedState(pinData.state_name);
  } else {
    setSelectedCity('');
    setSelectedState('');
  }
};

 const handelStateModleClose = () =>{
  setIsStateModelOpen(false)
 }

 
 const handelCityModleClose = () =>{
  setIsCityModelOpen(false)
 }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const handelBtnClick = () => {
    console.log("Form Data ==>", formData);
  
    // handelContinue("ProfilePic")
    if(formValid === false){
      showToast("error", "fill the required fields", "");
      return
    }
    console.log("Data",formData)
    RegisterUser()
   
  };
  const AddAddressData = async () => {
    try {
      const url = `${Base_url}basic/all_city`;
      // const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('degree', formData.degree);
      // formData1.append('university', formData.university);
      // formData1.append('year', formData.yearGraduated);

    

      const response = await axios.get(url,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
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
          
             console.log("Data main ==>",data.post)
             const Data = data.post
            
             // Set the unique states in the state variable
             setAddressData(Data);
           
           
              return
            
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelPointsAdd = async()=>{
    try {
      const UserId =localStorage.getItem("refCode");
      console.log("In Cahnge status ==>")
    
      
      const url = `${Base_url}auth/user_refer/${UserId}`;
      // console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      formData1.append('point',10);
    

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data1 = response.data
          console.log("Response check work experience",data1,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data1.status === "success"){
           
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  }

  const RegisterUser = async () => {
    try {
      setLoading(true)
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append('role', Role);
      formData1.append('mobile_number', details.phoneNumber);
      formData1.append('name', formData.firstName );
      formData1.append('last_name', formData.lastName || "");
      formData1.append('gender', formData.gender || "");
      formData1.append('email', formData.email || "");
      formData1.append('state', selectedState || "");
      formData1.append('city', selectedCity || "");
      formData1.append('address', formData.address || "");
      formData1.append('dob', formData.dob || "");
      formData1.append('pin_code', pincode || "");
      formData1.append('country', "India");

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
            setLoading(false);
               localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
               handelPointsAdd()
               handelContinue("ProfilePic")
              return
          }
          // showToast("error", "Try After Some Time", "");
          setLoading(false);
            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };


  const handelEmployersBtnClick = async()=>{
    if(formData2.hotelName === "" || formData2.email === ""){
      showToast("error", "Hotel name and email is required", "");
      return  ;
    }
    try {
      setLoading(true)
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append('role', Role);
      formData1.append('mobile_number', details.phoneNumber);
      formData1.append('name', formData2.hotelName );
      formData1.append('location', formData2.location || "");
      formData1.append('email', formData2.email || "");
      formData1.append('gst_number', formData2.gstin || "");
      formData1.append('reg_email', formData2.gstemail || "");
      formData1.append('gst_name', formData2.gstHotelName || "");
      formData1.append('reg_hadd', formData2.gstAddress || "");
      formData1.append('state', selectedState || "");
      formData1.append('city', selectedCity || "");
      formData1.append('address', formData2.address || "");
      formData1.append('pin_code', pincode2 || "");
      formData1.append('country', "India");

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
            setLoading(false);
               localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
               handelPointsAdd()
               history.push("/phone", 'root','replace')
              return
          }
          // showToast("error", "Try After Some Time", "");
          setLoading(false);
            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
   
  }

  const RegisterHotelier = async () => {
    try {
      setLoading(true)
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append('role', Role);
      formData1.append('mobile_number', details.phoneNumber);
      formData1.append('name', formData.firstName );
      formData1.append('last_name', formData.lastName || "");
      formData1.append('gender', formData.gender || "");
      formData1.append('email', formData.email || "");
      formData1.append('state', selectedState || "");
      formData1.append('city', selectedCity || "");
      formData1.append('address', formData.address || "");
      formData1.append('dob', formData.dob || "");
      formData1.append('pin_code', pincode || "");
      formData1.append('country', "India");

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
            setLoading(false);
               localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
               handelContinue("ProfilePic")
              return
          }
          // showToast("error", "Try After Some Time", "");
          setLoading(false);
            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
      setLoading(false);
    }
  };
 
  useEffect(() => {
    const isValid =
      formData.firstName !== ""
    setFormValid(isValid);
  }, [formData]);
  useEffect(() => {
    AddAddressData()
    // console.log("States:", statesOfIndia)
  }, []);

  // useEffect(()=>{
  //   console.log("In City Data  ===>",formData.state)
  //   if(formData.state !== ""){
  //     const cityData= City.getCitiesOfState('IN', formData.state);
  //     console.log("City Data  ==>",cityData)
  //     setCitys(cityData);
  //   }

  // },[formData.state])
  return (
    <div  className={isMobile ? "" : 'sw'}  style={{display:`${isMobile ? "block" : "flex"}`,justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
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
        
        {selectedLanguage === "English" ? "Add your personal information" : "अपनी व्यक्तिगत जानकारी जोड़ें"}
      </h1>

{
  Role === "Job Seeker" &&  
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
      
      {selectedLanguage === "English" ? "Date of Birth" : "जन्म की तारीख"}
    </label>
    {/* <IonItem> */}
    <input
    className="round-input"
      type="date"
      name="dob"
      value={formData.dob}
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
      
      {selectedLanguage === "English" ? "Gender" : "लिंग"}
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
        placeholder="Gender"
      >
        <IonSelectOption defaultChecked value={""}>
          
          {selectedLanguage === "English" ? "Select Gender" : "लिंग चुनें"}
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
      
      {selectedLanguage === "English" ? "Email (optional)" : "ईमेल (वैकल्पिक)"}
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
      value={pincode} onChange={handlePincodeChange}
     
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
             <div style={{padding:"10px",

height:"48px",
width:"100%",
borderRadius:"50px",
border:"1px solid #31363F ",
display:"flex",justifyContent:"left",alignItems:"center"
}}>
            <span>{selectedState && selectedState}</span>
             </div>
       </div>
    </div>
  </div>

 {
  selectedState !== "" &&  <div style={{ marginTop: "20px" }}>
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
           <div style={{padding:"10px",

height:"48px",
width:"100%",
borderRadius:"50px",
border:"1px solid #E2E8F0 ",
display:"flex",justifyContent:"left",alignItems:"center"
}}>
          <span>{selectedCity && selectedCity}</span>
           </div>
     </div>
  

</div>
 }

 

  {/* </IonItem> */}
</div>
}

{
  Role === "Employers" &&  
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
      
      {selectedLanguage === "English" ? "Hotel Name" : "होटल का नाम"}
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
      
      {selectedLanguage === "English" ? "Hotel Location" : "होटल का स्थान"}
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
      
      {selectedLanguage === "English" ? "Email (optional)" : "ईमेल (वैकल्पिक)"}
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
             <div style={{padding:"10px",

height:"48px",
width:"100%",
borderRadius:"50px",
border:"1px solid #31363F ",
display:"flex",justifyContent:"left",alignItems:"center"
}}>
            <span>{selectedState && selectedState}</span>
             </div>
       </div>
    </div>
  </div>

 {
  selectedState !== "" &&  <div style={{ marginTop: "20px" }}>
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
           <div style={{padding:"10px",

height:"48px",
width:"100%",
borderRadius:"50px",
border:"1px solid #31363F ",
display:"flex",justifyContent:"left",alignItems:"center"
}}>
          <span>{selectedCity && selectedCity}</span>
           </div>
     </div>
  

</div>
 }

<div style={{marginTop: "40px",textAlign:"center" }}>
     <span style={{fontWeight:"bold"}}>
      
      {selectedLanguage === "English" ? "GST Details" : "जीएसटी विवरण"}
      
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
      
      {selectedLanguage === "English" ? "Registered email address" : "पंजीकृत ईमेल पता"}
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
       
      {selectedLanguage === "English" ? "Registered hotel name under GST" : "जीएसटी के अंतर्गत पंजीकृत होटल का नाम"}
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
       
      {selectedLanguage === "English" ? "Registered hotel address " : "पंजीकृत होटल का पता"}
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
 

  {/* </IonItem> */}
</div>
}
      
 {
   <div
  style={{
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {
    Role === "Job Seeker" &&   <CustomBtn1 fun={handelBtnClick} title={selectedLanguage === "English" ? "Continue" : "जारी रखें"}  loading={loading}/>
  }

{
    Role === "Employers" &&   <CustomBtn1 fun={handelEmployersBtnClick} title={selectedLanguage === "English" ? "Continue" : "जारी रखें"}  loading={loading}/>
  }
 
</div>
 }
      <SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={selectedState} setSelectedState={setSelectedState}  />
      <SelectCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedState={selectedState}/>
    
    </div>
  );
};

export default Basicinfo;
