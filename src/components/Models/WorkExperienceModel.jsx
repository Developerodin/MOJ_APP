import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import SelectStateModel from './SelectStateModel';
import SelectMulipalCityModel from './SelectMulipalCityModel';
import DepartmentSelectModel from './DepartmentSelectModel';
import axios from 'axios';


const WorkExperienceModel = ({ isOpen, onClose ,setUpdate}) => {
  const { showToast,languageUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || localStorage.getItem("userRegisterDetails")) ;
  const token =localStorage.getItem("token");
  const [isStateModelOpen, setIsStateModelOpen] = useState(false);
  const [isCityModelOpen, setIsCityModelOpen] = useState(false);
 
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [departmentModel,setDepartmentModel] = useState(false)
  const [department, setDepartment] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");



  
  const [formData, setFormData] = useState({
  
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
      if ( !formData.organisation || !formData.profile  || !formData.startDate || !formData.endDate || !preferredState || !preferredCity || !department || !departmentValue) {
        showToast("error", "Please fill all the fields", "");
        if (!formData.organisation) {
          showToast("error", "Please enter organisation", "");
          return;
        }
        if (!formData.profile) {
          showToast("error", "Please enter profile", "");
          return;
        }
       
        if (!formData.startDate) {
          showToast("error", "Please enter start date", "");
          return;
        }
        if (!formData.endDate) {
          showToast("error", "Please enter end date", "");
          return;
        }
        if (!preferredState) {
          showToast("error", "Please select state", "");
          return;
        }
        if (!preferredCity) {
          showToast("error", "Please select city", "");
          return;
        }
        // if (!formData.location) {
        //   showToast("error", "Please enter location", "");
        //   return;
        // }
        if (!department) {
          showToast("error", "Please select department", "");
          return;
        }
        if (!departmentValue) {
          showToast("error", "Please select sub department", "");
          return;
        }
        return;

      }



      try {
        


        const url = `${Base_url}user_work_ex/store`;
        const formData1 = new FormData();
        formData1.append('user_id', userDetails.user_id);
        formData1.append('organisation', formData.organisation);
        // formData1.append('designation', formData.designation);
        formData1.append('profile', formData.profile);
        // formData1.append('location', formData.location);
        formData1.append('start_date', formData.startDate);
        formData1.append('end_date', formData.endDate);
        formData1.append('ref_mob', formData.refmobile);
        formData1.append('ref_email', formData.refemail);
        formData1.append('state', preferredState);
        formData1.append('city', preferredCity);
        formData1.append('department', department);
        formData1.append('sub_department', departmentValue);
        ;
        
      
  
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
                  
                  profile: '',
                  organisation: '',
                  
                  startDate: '',
                  endDate: '',
                  refmobile:'',
                  refemail:'',

                


                  


            }) 
            setPreferredCity("");
            setPreferredState("");
            setDepartmentValue("");
            setDepartment("");
            
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



     const handelSelectedDepartment = (selectedDepartment, subDepartments) => {
      handelDepartmentModelClose();
      console.log("Data of Department", selectedDepartment, subDepartments);
      const namesString = subDepartments.map(subDepartment => subDepartment.sub_department).join(', ');
      setDepartment(selectedDepartment);
      setDepartmentValue(namesString);
      if (typeof onSubmit === 'function') {
        onSubmit(selectedDepartment, subDepartments);
      } else {
        console.error("onSubmit is not a function");
      }
    };
    


    
  
    const handelDepartmentModelOpen = ()=>{
      setDepartmentModel(true)
    }
  
    const handelDepartmentModelClose = ()=>{
      setDepartmentModel(false)
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
  
    const addOneDay = (dateString) => {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const handleStartDateChange = (e) => {
      const newStartDate = e.target.value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: newStartDate,
        // Reset end date if it's before the new start date
        endDate: newStartDate >= formData.endDate ? '' : formData.endDate
      }));
      handleChange(e);
    };
  
    const handleEndDateChange = (e) => {
      const newEndDate = e.target.value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        endDate: newEndDate
      }));
      handleChange(e);
    };

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

{ selectedLanguage === "English" ? "Hotel name" : "होटल का नाम"}<span style={{color:"red"}}>*</span>
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
              { selectedLanguage === "English" ? "Department" : "विभाग"}{department !== "" && `(${department})`}<span style={{color:"red"}}>*</span>
            </label>
            <div
           
           onClick={handelDepartmentModelOpen}
           
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
          departmentValue !== "" ? <span>{departmentValue}</span>:<span style={{color:"grey"}}>
             { selectedLanguage === "English" ? "Select Department" : "विभाग चुनें"}
            </span>
         }
         
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

{ selectedLanguage === "English" ? "Work responsibility" : "कार्य जिम्मेदारी"}<span style={{color:"red"}}>*</span>
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

{ selectedLanguage === "English" ? "Reference  Mobile" : "संदर्भ मोबाइल"}<span style={{color:"red"}}>*</span>
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

{ selectedLanguage === "English" ? "Reference  Email" : "संदर्भ ईमेल"}<span style={{color:"red"}}>*</span>
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
        {selectedLanguage === "English" ? "State" : "पसंदीदा राज्य"}<span style={{color:"red"}}>*</span>
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
            {selectedLanguage === "English" ? "City" : "पसंदीदा शहर"}<span style={{color:"red"}}>*</span>
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




{/* <div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>

{ selectedLanguage === "English" ? "Location" : "स्थान"}<span style={{color:"red"}}>*</span>
</IonLabel>

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

</div> */}


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

{ selectedLanguage === "English" ? "Start Date" : "आरंभ तिथि"}<span style={{color:"red"}}>*</span>
</IonLabel>
{/* <IonItem> */}
<IonInput
type="date"
name="startDate" 
value={formData.startDate} 
onIonChange={handleStartDateChange}
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

{ selectedLanguage === "English" ? "End Date" : "समाप्ति तिथि"}<span style={{color:"red"}}>*</span>
</IonLabel>
{/* <IonItem> */}
<IonInput
type="date"
name="endDate" 
value={formData.endDate} 
onIonChange={handleEndDateChange}
min={formData.startDate ? addOneDay(formData.startDate) : ''}
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
<DepartmentSelectModel isOpen={departmentModel} onClose={handelDepartmentModelClose} onSubmit={handelSelectedDepartment} department={department} departmentValue={departmentValue}  />
      <SelectMulipalCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} preferredCity={preferredCity} setPreferredCity={setPreferredCity} selectedState={preferredState}/>
<SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={preferredState} setSelectedState={setPreferredState} setPreferredCity={setPreferredCity} />
      
      
      </IonContent>
    </IonModal>
  );
};

export default WorkExperienceModel;
