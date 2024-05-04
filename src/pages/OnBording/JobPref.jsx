import React, { useContext, useState } from "react";
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

export const JobPref = () => {
  const history = useIonRouter();

  const handelBackClick= ()=>{
    history.goBack();
      console.log("Back Presss")
  }
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
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

  const handelSelectedDepartment=(selectedDepartment,subDepartments)=>{
    handelDepartmentModelClose();
    console.log("Data of Department",selectedDepartment,subDepartments);
    const namesString = subDepartments.map(subDepartment => subDepartment.name).join(', ');
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

    handelBackClick()
  };

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
              <div  style={{
              display:"flex",
              justifyContent:"left",
              alignItems: "center",
              borderRadius: "0px",
             
              border: "1px solid #E2E8F0",
              height:"52px",
              backgroundColor:"#F4F4F4",
              
            }}>
        <input
          
           style={{
            padding:"10px",
            outline:"none !important",
            height:"52px",
            width:"100%",
            border:"none",
            backgroundColor:"#F4F4F4",
           }}
          
         name="state"
          list="states"
          value={preferredState}
          onChange={(e)=>setPreferredState(e.target.value)}
          placeholder="Select Preferred State"
        />
        <datalist id="states" >
          {States.map((state) => (
            <option  key={state.isoCode} value={state.name}>{state.name}</option>
          ))}
        </datalist>
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
                Preferred City
              </label>
              <IonSelect
               multiple
                value={preferredCity}
                onIonChange={(e) => setPreferredCity(e.detail.value)}
                interface="popover"
                placeholder="Select Preferred City"
                style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
              >
                <IonSelectOption value="Jaipur">Jaipur</IonSelectOption>
                <IonSelectOption value="Rajkot">Rajkot</IonSelectOption>
                {/* Add more preferred cities as needed */}
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
  
            <DepartmentSelectModel isOpen={departmentModel} onClose={handelDepartmentModelClose} onSubmit={handelSelectedDepartment} />
          </div>
      </IonContent>
    </IonPage>
  );
};
