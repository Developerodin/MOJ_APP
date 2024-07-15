import { IonContent, IonIcon, IonPage, IonProgressBar } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { CustomBtn1 } from '../../../../components/Buttons/CustomBtn1'
import { ProfileHeaders } from '../../../../components/Headers/ProfileHeaders';
import { bookSharp } from 'ionicons/icons';
import { isMobile } from '../../../../IsMobile/IsMobile';
import SelectStateModel from '../../../../components/Models/SelectStateModel';
import SelectCityModel from '../../../../components/Models/SelectCityModel';
import { AppContext } from '../../../../Context/AppContext';
import { Base_url } from '../../../../Config/BaseUrl';
import axios from 'axios';
import { useHistory } from 'react-router';

export const HotelierPersonalDetails = () => {
  const history = useHistory()
  const Role = localStorage.getItem("role") || "";
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
      const [userDetails,setUserdetails] = useState(JSON.parse( localStorage.getItem("userDetails")));
  const { showToast ,setProfileHealthUpdate,languageUpdate} = useContext(AppContext);
      const [selectedState, setSelectedState] = useState("");
      const [selectedCity, setSelectedCity] = useState("");
      const [pincode,setPincode] = useState("")
      const [pincode2,setPincode2] = useState("")
      const [loading,setLoading] = useState(false);
      const [isStateModelOpen,setIsStateModelOpen] = useState(false);
      const [isCityModelOpen,setIsCityModelOpen] = useState(false);
      const [AddressData,setAddressData] = useState([]);
      const [update,setupdate] = useState(0)
      const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("selectedLanguage") || "English"
      );
      useEffect(() => {
        
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

const handlePincodeChange2 = (e) => {
    const newPincode = e.target.value;
    setPincode2(newPincode);
    console.log("Enter Pin code ==>",newPincode)
    
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

  const handelStateModelOpen =() =>{
    setIsStateModelOpen(true);
   }
  
   const handelCityModelOpen =() =>{
    setIsCityModelOpen(true);
   }
   const handelStateModleClose = () =>{
    setIsStateModelOpen(false)
   }
  
   
   const handelCityModleClose = () =>{
    setIsCityModelOpen(false)
   }
   const handelSaveClick = ()=>{
    UpdateUser();
  }

   const UpdateUser = async () => {
    try {
      const url = `${Base_url}auth/hotelior_update`;
      const formData1 = new FormData();
      formData1.append('role', Role);
      formData1.append('user_id', userDetails.user_id);
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
                showToast("success", "Personal details updated", "");
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

  
   useEffect(()=>{
    console.log("Personal detailsss =>",userDetails)
   let profileDetails ={
    hotelName: userDetails.name,
    location:userDetails.location,
     email: userDetails.email,
     state: userDetails.state,
     city: userDetails.city,
     pincode:userDetails.pin_code,
     address:userDetails.address,
     gstin:userDetails.gst_number,
     gstemail:userDetails.reg_email,
     gstHotelName:userDetails.gst_name,
     gstAddress:userDetails.reg_hadd
   }
   setPincode2(userDetails.pin_code);
   setSelectedState(userDetails.state);
   setSelectedCity(userDetails.city);
    console.log("Data profile ===>",profileDetails)
   setFormData2(profileDetails);
 },[update])

//  useEffect(()=>{
//   if ( userDetails && userDetails.city !== "" ) {
//     return
//   }else {
//     setSelectedCity("");
//   }
// },[selectedState])




 

  return (
   <IonPage>
    <IonContent>
    <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
    <ProfileHeaders icon={<IonIcon icon={bookSharp} style={{fontSize:"24px",color:"#395CFF"}} />} title={selectedLanguage === "English" ? "Personal Details" : "व्यक्तिगत विवरण"}  />

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
   <span style={{fontWeight:"bold"}}>{selectedLanguage === "English" ? "GST Details" : "जीएसटी विवरण"}</span>
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
      {selectedLanguage === "English" ? "GSTIN" : "जीएसटीआईएन"}
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
      {selectedLanguage === "English" ? "Registered hotel name under GST" : "जीएसटी के तहत पंजीकृत होटल का नाम"}
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
      {selectedLanguage === "English" ? "Registered hotel address" : "पंजीकृत होटल का पता"} 
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

   <div
  style={{
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <CustomBtn1  title={selectedLanguage === "English" ? "Save" : "सहेजें"}  loading={loading} fun={handelSaveClick}/>
  
 
</div>


 </div>
      <SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={selectedState} setSelectedState={setSelectedState} setPreferredCity={setSelectedCity} />
      <SelectCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedState={selectedState}/>
    
    
    </IonContent>
   </IonPage>
  )
}
