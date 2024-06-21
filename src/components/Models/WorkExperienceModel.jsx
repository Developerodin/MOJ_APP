import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import SelectStateModel from './SelectStateModel';
import SelectMulipalCityModel from './SelectMulipalCityModel';
import axios from 'axios';

const WorkExperienceModel = ({ isOpen, onClose ,setUpdate}) => {
  const { showToast,languageUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || localStorage.getItem("userRegisterDetails")) ;
  const token =localStorage.getItem("token");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
 
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");



  
  const [formData, setFormData] = useState({
    designation: '',
    profile: '',
    organisation: '',
    startDate: '',
    endDate: '',
    refmobile:'',
    refemail:''
  });
  

   
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

  const handleChange = (e) => {

    const { name, value } = e.target;
    console.log("Value",name, value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
    AddWorkExperience()
    // You can add more validation or submission logic here
    // Close the modal after submission
    // onClose();
  };

  const handelSaveClick= ()=>{
    //   history.push("/home")
    }

    // const handleStateSelect = (selectedState) => {
    //   setState(selectedState);
    //   setIsStateModelOpen(false);
    // };
  
    // const handleCitySelect = (selectedCity) => {
    //   setCity(selectedCity);
    //   setIsCityModelOpen(false);
    // };
     

    
    const AddWorkExperience = async () => {
      try {
        const url = `${Base_url}user_work_ex/store`;
        const formData1 = new FormData();
        formData1.append('user_id', userDetails.user_id);
        formData1.append('organisation', formData.organisation);
        formData1.append('designation', formData.designation);
        formData1.append('profile', formData.profile);
        formData1.append('location', formData.location);
        formData1.append('start_date', formData.startDate);
        formData1.append('end_date', formData.endDate);
        formData1.append('ref_mob', formData.refmobile);
        formData1.append('ref_email', formData.refemail);
        formData1.append('state', preferredState);
        formData1.append('city', preferredCity);
        
      
  
        const response = await axios.post(url, formData1,{
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
                setUpdate((prev)=>prev+1);
                setFormData({
                  designation: '',
                  profile: '',
                  organisation: '',
                  
                  startDate: '',
                  endDate: '',
                  refmobile:'',
                  refemail:'',

                


                  


            }) 
            setPreferredCity("");
            setPreferredState("");
            
                onClose();
                return
            }
            // showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };
    const handelStateModleOpen = () =>{
      setIsStateModelOpen(true);
    }
    const handelStateModleClose = () =>{
      setIsStateModelOpen(false);
    }
  
    const handelCityModelOpen =() =>{
      setIsCityModelOpen(true);
     }
  
     const handelCityModleClose = () =>{
      setIsCityModelOpen(false)
     }

     useEffect(() => {
      setPreferredCity("");
    }, [preferredState]);


    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const maxDate = getCurrentDate();    

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
      <div style={{ padding: "20px" }}>

<div>
         
         <div>
            <IonIcon onClick={onClose} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
         
         <div style={{marginTop:"30px",display:"flex",justifyContent:"left",alignItems:"center"}}>
               
               <div>
               <IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />
               </div>

               <div style={{marginLeft:"20px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>
                  
                  { selectedLanguage === "English" ? "Work experience" : "कार्य अनुभव"}
                  </span>
               </div>
         </div>

    </div>
    <div style={{marginTop:"30px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Hotel name" : "होटल का नाम"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
name="organisation" 
value={formData.organisation} 
onIonChange={handleChange}
placeholder="e.g Hotel xyz"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div>
<div style={{marginTop:"10px"}}>
<label
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Department" : "विभाग"}
</label>
{/* <IonItem> */}
<IonInput
type="text"
name="designation" 
value={formData.designation} 
onIonChange={handleChange}
placeholder="e.g fnb manager"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>

<div style={{marginTop:"10px"}}>
<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Work responsibility" : "कार्य जिम्मेदारी"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
name="profile" 
value={formData.profile} 
onIonChange={handleChange}
placeholder="e.g operations"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div>


{/* </IonItem> */}




<div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Reference  Mobile" : "संदर्भ मोबाइल"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
placeholder="e.g 9090909090"
name="refmobile" 
value={formData.refmobile} 
onIonChange={handleChange}
style={{
borderRadius: "0px",
padding:"10px",
border: "1px solid #E2E8F0",
height:"52px",
backgroundColor:"#F4F4F4"
}}
/>

</div>


<div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Reference  Email" : "संदर्भ ईमेल"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
placeholder="e.g @gmail.com"
name="refemail" 
value={formData.refemail} 
onIonChange={handleChange}
style={{
borderRadius: "0px",
padding:"10px",
border: "1px solid #E2E8F0",
height:"52px",
backgroundColor:"#F4F4F4"
}}
/>

</div>
<div style={{ marginTop: "10px" }}>
      <label
        style={{
          color: "#575757",
          fontFamily: "inter",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "30px",
        }}
      >
        {selectedLanguage === "English" ? "State" : "पसंदीदा राज्य"}
      </label>
      <div
        onClick={handelStateModleOpen}
        
        style={{
          display:"flex",
          justifyContent:"left",
          alignItems: "center",
          borderRadius: "0px",
          padding:"10px",
          border: "1px solid #E2E8F0",
          height:"52px",
          backgroundColor:"#F4F4F4"
        }}
      > 
        {
          preferredState !== "" ? <span>{preferredState}</span> : <span style={{color:"grey"}}>
            {selectedLanguage === "English" ? "Select State" : "पसंदीदा राज्य चुनें"}
          </span>
        }
      </div>
      
      {/* Conditional rendering based on state */}
      {preferredState !== "" && (
        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            {selectedLanguage === "English" ? "City" : "पसंदीदा शहर"}
          </label>
          <div
            onClick={handelCityModelOpen}
            
            style={{
              display:"flex",
              justifyContent:"left",
              alignItems: "center",
              borderRadius: "0px",
              padding:"10px",
              border: "1px solid #E2E8F0",
              height:"52px",
              backgroundColor:"#F4F4F4"
            }}
          > 
            {
              preferredCity !== "" ? <span>{preferredCity}</span> : <span style={{color:"grey"}}>
                {selectedLanguage === "English" ? "Select City" : "पसंदीदा शहर चुनें"}
              </span>
            }
          </div>
        </div>
      )}
    </div>




<div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Location" : "स्थान"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
placeholder="eg jaipur"
name="location" 
value={formData.location} 
onIonChange={handleChange}
style={{
borderRadius: "0px",
padding:"10px",
border: "1px solid #E2E8F0",
height:"52px",
backgroundColor:"#F4F4F4"
}}
/>

</div>


<div style={{marginTop:"10px"}}>
<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Start Date" : "आरंभ तिथि"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="date"
name="startDate" 
value={formData.startDate} 
onIonChange={handleChange}
max={maxDate}
style={{
borderRadius: "0px",
padding:"10px",
border: "1px solid #E2E8F0",
height:"52px",
backgroundColor:"#F4F4F4"
}}
/>

</div>

<div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "End Date" : "समाप्ति तिथि"}
</IonLabel>
{/* <IonItem> */}
<IonInput
type="date"
name="endDate" 
value={formData.endDate} 
onIonChange={handleChange}
max={maxDate}
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>

</div>

</div>    


<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"60px"}}>

<CustomBtn1 fun={handleSubmit} title={ selectedLanguage === "English" ? "Save" : "जारी रखें"}/>
</div>

</div>
      <SelectMulipalCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} preferredCity={preferredCity} setPreferredCity={setPreferredCity} selectedState={preferredState}/>
<SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={preferredState} setSelectedState={setPreferredState}  />
      
      
      </IonContent>
    </IonModal>
  );
};

export default WorkExperienceModel;
