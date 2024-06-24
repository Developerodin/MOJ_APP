


import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonButton,
  IonInput,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import { chevronBackOutline,arrowBack, bookOutline, bookSharp, callOutline, chevronForward, filterOutline, phoneLandscape, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";

import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import { Base_url } from "../../../Config/BaseUrl";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import SelectStateModel from "../../../components/Models/SelectStateModel";
import DepartmentSelectModel from "../../../components/Models/DepartmentSelectModel";
import SelectMulipalCityModel from "../../../components/Models/SelectMulipalCityModel";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { isMobile } from "../../../IsMobile/IsMobile";

export const HotelierPostJob = () => {
  const history = useIonRouter();

  const handelBackClick= ()=>{
    history.goBack();
      console.log("Back Presss")
  }
  const { showToast,jobUpdate,setJobUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token =localStorage.getItem("token");
  const [departmentModel,setDepartmentModel] = useState(false)
  const [department, setDepartment] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience,setExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState("")
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [States, setStates] = useState([]);
  const [isStateModelOpen,setisStateModelOpen] = useState(false);
  const [isCityModelOpen,setIsCityModelOpen] = useState(false);
  const [Education,setEducation] = useState("")
   const [jobDescription,setJobDescription] = useState("");
   const [numberOfEmployeRequired,setnumberOfEmployeRequired] = useState("");
   const [jobTitle,setJobTitle] = useState("")
   const [address,setAddress] = useState("")
   const [hotelName,setHotelName] = useState("")
  const handelStateModleOpen = () =>{
    setisStateModelOpen(true);
  }
  const handelStateModleClose = () =>{
    setisStateModelOpen(false);
  }

  const handelCityModelOpen =() =>{
    setIsCityModelOpen(true);
   }

   const handelCityModleClose = () =>{
    setIsCityModelOpen(false)
   }

  const handelSelectedDepartment=(selectedDepartment,subDepartments)=>{
    handelDepartmentModelClose();
    console.log("Data of Department",selectedDepartment,subDepartments);
    const namesString = subDepartments.map(subDepartment => subDepartment.sub_department).join(', ');
    // console.log("Names String:", namesString);
    setDepartment(selectedDepartment);
    setDepartmentValue(namesString);
  }

  const handelDepartmentModelOpen = ()=>{
    setDepartmentModel(true)
  }

  const handelDepartmentModelClose = ()=>{
    setDepartmentModel(false)
  }

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };


  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const handleSaveClick = () => {
    // Save logic here
    console.log("DAta ==>",hotelName,jobTitle,address,numberOfEmployeRequired,jobDescription,experience,Education,department,preferredCity,preferredState,jobType,salaryRange,startTime,endTime);
    AddJob();
 
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const AddJob = async () => {
//     if (!department || !jobType || !jobDescription || !Education || !salaryRange || !experience || numberOfEmployeRequired ||(jobType === "Part Time" && (!startTime || !endTime))) {
//     if(jobType === "") {
//       showToast("error", "Please select job type", "");
//       return;
//     }
//     if(jobTitle === "") {
//       showToast("error", "Please enter job title", "");
//       return;
//     }
//     if(jobDescription === "") {
//       showToast("error", "Please enter job description", "");
//       return;
//     }
//     if(department === "") {
//       showToast("error", "Please select department", "");
//       return;
//     }
//     if(departmentValue === "") {
//       showToast("error", "Please select sub department", "");
//       return;
//     }
//     if(Education === "") {
//       showToast("error", "Please select education", "");
//       return;
//     }
//     if(experience === "") {
//       showToast("error", "Please select experience", "");
//       return;
//     }
//     if(numberOfEmployeRequired === "") {
//       showToast("error", "Please enter number of employees required", "");
//       return;
//     }
//     if(salaryRange === "") {
//       showToast("error", "Please select salary range", "");
//       return;
//     }
//     if(jobType === "Part Time" && (startTime === "" || endTime === "")) {
//       showToast("error", "Please select start and end time", "");
//       return;
//     }

  
//   return;
// }





    try {
      const url = `${Base_url}job/store`;
      const formData1 = new FormData();
      formData1.append('user_id', userDetails.user_id);
      // formData1.append('Hotel_name', hotelName || "");
      formData1.append('job_title', jobTitle || "");
      formData1.append('job_description', jobDescription || "");
      formData1.append('job_type', jobType|| "");
      // formData1.append('location', address|| "");
      formData1.append('department', department || "");
      formData1.append('sub_department', departmentValue || "");
      formData1.append('education', Education || "");
      formData1.append('experience', experience || "");
      formData1.append('number_employees', numberOfEmployeRequired || "");
      // formData1.append('state', preferredState || "");
      // formData1.append('city', preferredCity || "");
      formData1.append('off_salery', salaryRange || "");
      formData1.append('start_time', startTime || "");
      formData1.append('end_time', endTime || "");
      
    

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
              showToast("success", "updated", "");
              setJobUpdate((prev)=>prev+1)
              handleBackClick();
              return
          }
          showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
    }
  };


  const getJobPrefDetails = async() =>{
    try {
      const url = `${Base_url}user_job_pref_userid/${userDetails.user_id}`;
     

    

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
                console.log("Data get from job pref ==>",data);
                const Data = data.post[0];
                setJobType(Data.job_type)
                setDepartment(Data.department);
                setSalaryRange(Data.salery);
                setPreferredState(Data.pref_state);
                setPreferredCity(Data.pref_city)
                setStartTime(Data.start_time)
                setEndTime(Data.end_time)
                setDepartmentValue(Data.sub_dep)
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  }


  useEffect(() => {
    setPreferredCity("");
  }, [preferredState]);

  useEffect(()=>{
    if(jobType === "Full Time"){
      setStartTime("");
      setEndTime("");
    }
    
  },[jobType])

  useEffect(()=>{
    getJobPrefDetails()
  },[])
  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          

        <ProfileHeaders icon={<IonIcon icon={filterOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Post new job"}  />

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
              Job Type<span style={{color:"red"}}>*</span>
            </label>
            <IonSelect
              value={jobType}
              onIonChange={(e) => setJobType(e.detail.value)}
              interface="popover"
              placeholder="Select Job Type"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="Full Time">Full Time</IonSelectOption>
              <IonSelectOption value="Part Time">Part Time</IonSelectOption>
              {/* Add more job types as needed */}
            </IonSelect>
          </div>
          

          {
            jobType === "Part Time"  && <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Select Time Slote
            </label>
           
           <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <span style={{fontSize:"14px"}}>Start Time:<span style={{color:"red"}}>*</span></span>
        <input
        style={{marginTop:"10px",borderRadius:"5px",border:"1px solid #E4E4E4",padding:"10px"}}
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>

      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:"30px"}}>
      <span style={{fontSize:"14px"}}>End Time:<span style={{color:"red"}}>*</span></span>
        <input
        style={{marginTop:"10px",borderRadius:"5px",border:"1px solid #E4E4E4",padding:"10px"}}
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>
           </div>

           <div>

           </div>
          </div>
          }

{/* <div style={{marginTop:"20px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Hotel Name
</IonLabel>
<IonInput
type="text"
value={hotelName}

onIonChange={(e) => setHotelName(e.detail.value)}
placeholder="Enter Hotel Name"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div> */}

             <div style={{marginTop:"20px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Job Title<span style={{color:"red"}}>*</span>
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
value={jobTitle}

onIonChange={(e) => setJobTitle(e.detail.value)}
placeholder="Enter a job title"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div>

          <div style={{marginTop:"20px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Job description<span style={{color:"red"}}>*</span>
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
value={jobDescription}

onIonChange={(e) => setJobDescription(e.detail.value)}
placeholder="Enter a job description"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
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
              Department {department !== "" && `(${department})`}<span style={{color:"red"}}>*</span>
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
          departmentValue !== "" ? <span>{departmentValue}</span>:<span style={{color:"grey"}}>Select Department</span>
         }
         
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
              Experience<span style={{color:"red"}}>*</span>
            </label>
            <IonSelect
              value={experience}
              onIonChange={(e) => setExperience(e.detail.value)}
              interface="popover"
              placeholder="Select experience"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="fresher">Fresher</IonSelectOption>
              <IonSelectOption value="experienced">Experience</IonSelectOption>
              {/* Add more job types as needed */}
            </IonSelect>
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
              Education<span style={{color:"red"}}>*</span>
            </label>
            <IonSelect
              value={Education}
              onIonChange={(e) => setEducation(e.detail.value)}
              interface="popover"
              placeholder="Select education"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="10th">10th pass</IonSelectOption>
              <IonSelectOption value="12th">12th pass</IonSelectOption>
              <IonSelectOption value="UG">Gradution/Diploma</IonSelectOption>
              <IonSelectOption value="PG">Post gradution</IonSelectOption>
              <IonSelectOption value="PhD">Doctorate</IonSelectOption>
              <IonSelectOption value="bhm">BHM</IonSelectOption>
              
              {/* Add more job types as needed */}
            </IonSelect>
          </div>

          {/* <div style={{marginTop:"20px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
  Address
</IonLabel>

<IonInput
type="text"
value={address}

onIonChange={(e) => setAddress(e.detail.value)}
placeholder="Enter a  Address"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div> */}


          {/* <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Preferred State
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
          preferredState !== "" ? <span>{preferredState}</span>:<span style={{color:"grey"}}>Select Preferred State</span>
         }
         
         </div>
          </div> */}


{/* {
  preferredState !== "" && <div style={{ marginTop: "20px" }}>
  <label
    style={{
      color: "#575757",
      fontFamily: "inter",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "30px",
    }}
  >
    Preferred City
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
preferredCity !== "" ? <span>{preferredCity}</span>:<span style={{color:"grey"}}>Select Preferred City</span>
}

</div>
</div>
} */}
<div style={{marginTop:"20px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Please enter number of employee(s) required*
</IonLabel>
{/* <IonItem> */}
<IonInput
type="number"
name="organisation" 
 value={numberOfEmployeRequired}
 onIonChange={(e) => setnumberOfEmployeRequired(e.detail.value)}
placeholder=""
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
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
              Offered salary<span style={{color:"red"}}>*</span> 
            </label>
            {/* <IonRange
              min={0}
              max={100000}
              dualKnobs={true}
              pin={true}
              snaps={true}
              value={salaryRange}
              onIonChange={(e) => setSalaryRange(e.detail.value)}
            >
              <div slot="start">0</div>
              <div slot="end">100k</div>
            </IonRange> */}
               <IonSelect
              value={salaryRange}
              onIonChange={(e) => setSalaryRange(e.detail.value)}
              interface="action-sheet"
              placeholder="Select Salary Range"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
             <IonSelectOption value="0 - 5,000">0 - 5,000 ₹</IonSelectOption>
              <IonSelectOption value="5,000 - 10,000">5,000 - 10,000 ₹</IonSelectOption>
              <IonSelectOption value="10,000 - 20,000">10,000 - 20,000 ₹</IonSelectOption>
              <IonSelectOption value="20,000 - 30,000">20,000 - 30,000 ₹</IonSelectOption>
              <IonSelectOption value="30,000 - 50,000">30,000 - 50,000 ₹</IonSelectOption>
              <IonSelectOption value="50,000 - 70,000">50,000 - 70,000 ₹</IonSelectOption>
              <IonSelectOption value="70,000 - more">70,000 - more ₹</IonSelectOption>
            </IonSelect>
          </div>

          {/* Other job preference fields go here */}

          <div style={{ marginTop:"70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomBtn1 fun={handleSaveClick} title={"Save"} />
          </div>
          <SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={preferredState} setSelectedState={setPreferredState}  />
          <DepartmentSelectModel isOpen={departmentModel} onClose={handelDepartmentModelClose} onSubmit={handelSelectedDepartment} department={department} departmentValue={departmentValue}  />
          <SelectMulipalCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} preferredCity={preferredCity} setPreferredCity={setPreferredCity} selectedState={preferredState}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

