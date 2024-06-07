





import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  useIonRouter,
  IonGrid,
  IonRadio,
  IonRow,
  IonCol,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { IonSelect, IonSelectOption } from "@ionic/react";
import { State, City } from "country-state-city";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import SelectCityModel from "../../../components/Models/SelectCityModel";
import { isMobile } from "../../../IsMobile/IsMobile";
export const ProfilePersonalDetails = () => {
  const history = useIonRouter();
  const Role = localStorage.getItem("role") || "";
  const details = JSON.parse( localStorage.getItem("Mobile"));
  
  const [userDetails,setUserdetails] = useState(JSON.parse( localStorage.getItem("userDetails")));
  const { showToast ,setProfileHealthUpdate,languageUpdate} = useContext(AppContext);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pincode,setPincode] = useState("")
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

  const [formValid, setFormValid] = useState(false);
 const [loading,setLoading] = useState(false);
 const [update,setupdate] = useState(0)
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
    RegisterUser()
    // handelContinue("ProfilePic")
    // if(formValid === false){
    //   showToast("error", "fill the required fields", "");
    //   return
    // }
   
  };

  const handelSaveClick = ()=>{
    UpdateUser();
  }

  const UpdateUser = async () => {
    try {
      const url = `${Base_url}auth/user_update`;
      const formData1 = new FormData();
      // formData1.append('role', Role);
      formData1.append('user_id', userDetails.user_id);
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
      formData1.append('created_at', userDetails.created_at);
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
               localStorage.setItem("userDetails", JSON.stringify(data.user));
              //  handelContinue("ProfilePic")
              setupdate((prev)=>prev+1)
                showToast("success", "updated", "");
                setProfileHealthUpdate((prev)=>prev+1)
                history.goBack()
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
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
 
  useEffect(() => {
    const isValid =
      formData.firstName !== ""
    setFormValid(isValid);
  }, [formData]);
  
  useEffect(() => {
    AddAddressData()
    // console.log("States:", statesOfIndia)
  }, []);
  useEffect(()=>{
     console.log("Personal detailsss =>",userDetails)
    let profileDetails ={
      firstName: userDetails.name,
      lastName: userDetails.last_name,
      gender: userDetails.gender,
      email: userDetails.email,
      state: userDetails.state,
      city: userDetails.city,
      pincode:userDetails.pin_code,
      address:userDetails.address,
      dob:userDetails.dob
    }
    setPincode(userDetails.pin_code);
    setSelectedState(userDetails.state);
    setSelectedCity(userDetails.city);

    setFormData(profileDetails);
  },[update])



 



    return (
      <IonPage>
        <IonContent>

          <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={bookSharp} style={{fontSize:"24px",color:"#395CFF"}} />} title={selectedLanguage === "English" ? "Personal Details" : "व्यक्तिगत जानकारी"}  />

          
               <div style={{ marginTop: "30px" }}>

                <IonGrid>
                  <IonRow>
                    <IonCol size="12" size-md="6">
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    <div >
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
    border:"1px solid #31363F",
    display:"flex",justifyContent:"left",alignItems:"center"
  }}>
                  <span>{selectedState && selectedState}</span>
                   </div>
             </div>
          </div>
        </div>
                    </IonCol>

                    <IonCol size="12" size-md="6">
                    {
        selectedState !== "" &&  <div>
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
  border:"1px solid #31363F",
  display:"flex",justifyContent:"left",alignItems:"center"
}}>
                <span>{selectedCity && selectedCity}</span>
                 </div>
           </div>
        
  
      </div>
       }
                    </IonCol>
                  </IonRow>
                </IonGrid>
       

     

      

       
        

       

        
       

      

    

       

        {/* </IonItem> */}
      </div> 
         

          <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelSaveClick} title= {selectedLanguage === "English" ? "Update" : "अपडेट करो"}/>
             </div>
             <SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={selectedState} setSelectedState={setSelectedState}  />
      <SelectCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedState={selectedState}/>
          </div>
        </IonContent>
      </IonPage>
    );
}



