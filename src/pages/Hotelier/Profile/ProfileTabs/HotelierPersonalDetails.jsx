import { IonContent, IonIcon, IonPage, IonProgressBar } from '@ionic/react'
import React, { useState } from 'react'
import { CustomBtn1 } from '../../../../components/Buttons/CustomBtn1'
import { ProfileHeaders } from '../../../../components/Headers/ProfileHeaders';
import { bookSharp } from 'ionicons/icons';
import { isMobile } from '../../../../IsMobile/IsMobile';
import SelectStateModel from '../../../../components/Models/SelectStateModel';
import SelectCityModel from '../../../../components/Models/SelectCityModel';

export const HotelierPersonalDetails = () => {

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
     
      const [selectedState, setSelectedState] = useState("");
      const [selectedCity, setSelectedCity] = useState("");
      const [pincode,setPincode] = useState("")
      const [pincode2,setPincode2] = useState("")
      const [loading,setLoading] = useState(false);
      const [isStateModelOpen,setIsStateModelOpen] = useState(false);
      const [isCityModelOpen,setIsCityModelOpen] = useState(false);
      const [AddressData,setAddressData] = useState([]);
 const handleInputChange2 = (e) => {
  const { name, value } = e.target;
  setFormData2({
    ...formData2,
    [name]: value,
  });
};

const handlePincodeChange2 = (e) => {
    const newPincode = e.target.value;
    setPincode(newPincode);
    console.log("Enter Pin code ==>",newPincode)
    // Search for the pincode in the data array
    const pinData = AddressData.find(item => item.pincode === newPincode);
  
    console.log("Pincode Data",pinData);
    if (pinData) {
      setSelectedCity2(pinData.city_name);
      setSelectedState2(pinData.state_name);
    } else {
      setSelectedCity2('');
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

  return (
   <IonPage>
    <IonContent>
    <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
    <ProfileHeaders icon={<IonIcon icon={bookSharp} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Personal Details"}  />

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
      Hotel Name
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
      Hotel Location
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
      Email (optional)
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
      Address
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
      Pincode
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
      State
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
    City
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
     <span style={{fontWeight:"bold"}}>GST Details</span>
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
      GSTIN
    </label>
    {/* <IonItem> */}
    <input
    className="round-input"
      type="text"
      // name="lastName"
      // value={formData.lastName}
      // onChange={handleInputChange}
   
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
      Registered email address
    </label>
    {/* <IonItem> */}
    <input
    className="round-input"
      type="text"
      // name="lastName"
      // value={formData.lastName}
      // onChange={handleInputChange}
   
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
      Registered hotel name under GST 
    </label>
    {/* <IonItem> */}
    <input
    className="round-input"
      type="text"
      // name="lastName"
      // value={formData.lastName}
      // onChange={handleInputChange}
   
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
      Registered hotel address  
    </label>
    {/* <IonItem> */}
    <input
    className="round-input"
      type="text"
      // name="lastName"
      // value={formData.lastName}
      // onChange={handleInputChange}
   
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
  <CustomBtn1  title={"Continue"}  loading={loading}/>
  
 
</div>


 </div>
      <SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={selectedState} setSelectedState={setSelectedState}  />
      <SelectCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedState={selectedState}/>
    
    
    </IonContent>
   </IonPage>
  )
}
