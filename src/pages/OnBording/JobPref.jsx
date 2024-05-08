import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonRange,
  useIonRouter,
} from "@ionic/react";
import { chevronBackOutline, filterOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { ProfileHeaders } from "../../components/Headers/ProfileHeaders";
import { AppContext } from "../../Context/AppContext";
import DepartmentSelectModel from "../../components/Models/DepartmentSelectModel";
import SelectMulipalCityModel from "../../components/Models/SelectMulipalCityModel";
import SelectStateModel from "../../components/Models/SelectStateModel";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";

export const JobPref = () => {
  const history = useIonRouter();

  const handelBackClick= ()=>{
    history.goBack();
      console.log("Back Presss")
  }
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || JSON.parse(localStorage.getItem("userRegisterDetails"));
  const token =localStorage.getItem("token");
  const [departmentModel,setDepartmentModel] = useState(false)
  const [department, setDepartment] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [preferredCity, setPreferredCity] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("")
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [States, setStates] = useState([]);
  const [isStateModelOpen,setisStateModelOpen] = useState(false);
  const [isCityModelOpen,setIsCityModelOpen] = useState(false);
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
    console.log("DAta ==>",department,preferredCity,preferredState,jobType,salaryRange);
    AddJobPref()
   
  };

  const AddJobPref = async () => {
    try {
      const url = `${Base_url}user_job_prf/store`;
      const formData1 = new FormData();
      formData1.append('user_id', userDetails.user_id);
      formData1.append('department', department || "");
      formData1.append('sub_dep', departmentValue || "");
      formData1.append('job_type', jobType|| "");
      formData1.append('pref_state', preferredState || "");
      formData1.append('pref_city', preferredCity || "");
      formData1.append('salery', salaryRange || "");
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
              handelBackClick()
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
        <div style={{ padding: "20px" }}>
          

        <ProfileHeaders icon={<IonIcon icon={filterOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Job preference"}  />

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
              Job Type
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
        <span style={{fontSize:"14px"}}>Start Time:</span>
        <input
        style={{marginTop:"10px",borderRadius:"5px",border:"1px solid #E4E4E4",padding:"10px"}}
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>

      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:"30px"}}>
      <span style={{fontSize:"14px"}}>End Time:</span>
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
              Department {department !== "" && `(${department})`}
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
          </div>


{
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
}
          

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
              Expected Salary Range
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
              <IonSelectOption value="0 - 10,000">0 - 10,000 ₹</IonSelectOption>
              <IonSelectOption value="10,000 - 30,000">10,000 - 30,000 ₹</IonSelectOption>
              <IonSelectOption value="30,000 - 50,000">30,000 - 50,000 ₹</IonSelectOption>
              <IonSelectOption value="50,000 - 70,000">50,000 - 70,000 ₹</IonSelectOption>
              {/* Add more preferred cities as needed */}
            </IonSelect>
          </div>

          {/* Other job preference fields go here */}

          <div style={{ marginTop:"70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CustomBtn1 fun={handleSaveClick} title={"Save"} />
          </div>
          <SelectStateModel isOpen={isStateModelOpen} onClose={handelStateModleClose} selectedState={preferredState} setSelectedState={setPreferredState}  />
          <DepartmentSelectModel isOpen={departmentModel} onClose={handelDepartmentModelClose} onSubmit={handelSelectedDepartment} department={department} departmentValue={departmentValue} />
          <SelectMulipalCityModel isOpen={isCityModelOpen} onClose={handelCityModleClose} preferredCity={preferredCity} setPreferredCity={setPreferredCity} selectedState={preferredState}/>
        </div>
      </IonContent>
    </IonPage>
  );
};
