import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonSelect, IonSelectOption, IonToggle } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, bookOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';



const DepartmentSelectModel = ({ isOpen, onClose,onSubmit }) => {
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails" )|| localStorage.getItem("userRegisterDetails"));
  const token =localStorage.getItem("token");
       
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState([]);

  const [skillLength, setSkillLength] = useState(1); // Default to single skill
  const [departmentdata,setdepartmentdata] = useState([]);
  const [SubDepartmentData,setSubDepartmentData] = useState([]);
  const handleSingleSkillToggle = () => {
    setSkillLength(1);
    setSelectedSubDepartments([])
  };

  const handleMultipleSkillsToggle = () => {
    setSkillLength(5);
    setSelectedSubDepartments([])
  };

  const handleDepartmentSelect = departmentName => {
    setSelectedDepartment(departmentName);
    setSelectedSubDepartments([]);
  };

  const handleSubDepartmentSelect = subDepartment => {
      console.log("Sub dep name ==>",subDepartment)
      const isAlreadySelected = selectedSubDepartments.some(
        selectedSubDept => selectedSubDept.sub_department === subDepartment.sub_department
      );
    
      if (!isAlreadySelected) {
        console.log("Not selected ==>",skillLength)
        if (selectedSubDepartments.length < skillLength) {
          setSelectedSubDepartments([...selectedSubDepartments, subDepartment]);
        } else {
          // Do something when user tries to select more than 5 sub-departments
          showToast("error",`You can only select up to ${skillLength} sub-departments`);
        }
      } else {
        // Optionally, you can provide feedback that the sub-department is already selected
        const updatedSelectedSubDepartments = selectedSubDepartments.filter(
            selectedSubDept => selectedSubDept.name !== subDepartment.name
          );
          setSelectedSubDepartments(updatedSelectedSubDepartments);
        alert('This sub-department is already selected');
      }

      console.log("selectedSubDepartments",selectedSubDepartments)
  };


  // const departmentdata = [
  //   {name:"Front Office"},
  //   {name:"Bacnquet & food Service"},
  //   {name:"Kitchen"},
  //   {name:"House Keeping"},

  // ]

  // const SubDepartmentData = [
  //   {department:"Front Office",name:"Manager"},
  //   {department:"Bacnquet & food Service",name:"Banquet Manager"},
  //   {department:"Bacnquet & food Service",name:"Cashier"},
  //   {department:"Kitchen",name:"Juice Maker"},
  //   {department:"Kitchen",name:"Line Cook"},
  //   {department:"Kitchen",name:"Pastry Chef"},
  //   {department:"House Keeping",name:"House Keeping Manager"},
  //   {department:"House Keeping",name:"Room boy (room cleaner)"},
  //   {department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},{department:"House Keeping",name:"Room boy (room cleaner)"},
  // ]

  const DepartmentComponent = ({ department, onSelect }) => {
    const isDepartmentSelected = department => {
        return selectedDepartment === department.name ;
      };
    return (
      <div style={{
    border: isDepartmentSelected(department) ? "1px solid blue" : "1px solid #E4E4E4",
    color:isDepartmentSelected(department) ? "blue" : "black",
      padding:"10px",
      marginTop:"20px",
      width:"100%",
      borderRadius:"8px",
      
      }} button onClick={() => onSelect(department.name)}>
        <span style={{fontSize:"14px"}}>{department.name}</span>
      </div>
    );
  };
  
  const SubDepartmentComponent = ({ subDepartments, onSelect }) => {
    const isSubDepartmentSelected = subDepartment => {
        return selectedSubDepartments.some(selectedSubDept => selectedSubDept.sub_department === subDepartment.sub_department);
      };
    
     
      return subDepartments.map(subDepartment => (
        <IonCol size="6" key={subDepartment.sub_department}>
          <div
            onClick={() => handleSubDepartmentSelect(subDepartment)}
            style={{
            border: isSubDepartmentSelected(subDepartment) ? "1px solid blue" : "1px solid #E4E4E4",
            color:isSubDepartmentSelected(subDepartment) ? "blue" : "black",
              padding: "10px",
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius:"8px",
            }}
          >
            <span style={{fontSize:"14px"}}>{subDepartment.sub_department}</span>
          </div>
        </IonCol>
      ));
  };

 

  const getDepartmentData = async () => {
    try {
      const url = `${Base_url}user/job_pref`;
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
          
             console.log("Data ==>",data.post)

             const Data = data.post;
             const uniqueDepartments = Array.from(new Set(Data.map(item => item.department)));

// Step 2: Construct array of objects with unique department names
               const departmentsArray = uniqueDepartments.map(department => ({ name: department }));
               setdepartmentdata(departmentsArray);
               setSubDepartmentData(Data);
              return
            
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };


  useEffect(()=>{
    getDepartmentData()
  },[isOpen])

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
        
        <div style={{padding:"20px"}}>
        <div>
         
         <div>
            <IonIcon onClick={onClose} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
         
         <div style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
               
               <div>
               <IonIcon icon={bookOutline} style={{fontSize:"24px",color:"#395CFF"}} />
               </div>

               <div style={{marginLeft:"20px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>Department</span>
               </div>
         </div>

         <div tyle={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           <span style={{fontSize:"20px"}}>{selectedSubDepartments && selectedSubDepartments.length}/{skillLength}</span>
         </div>

         </div>
         

    </div>

    <div style={{marginTop:"10px",fontSize:"14px",color:"grey"}}>
        <span>Department will help us match you with job posting</span>
    </div>

    <div style={{marginTop:"30px"}}>
     
      <IonToggle checked={skillLength === 1} onIonChange={handleSingleSkillToggle}>Single Skill</IonToggle>
        {/* <input type="checkbox" onChange={handleSingleSkillToggle}  />
        Single Skill */}
     
      {/* <label>
        <input type="checkbox" onChange={handleMultipleSkillsToggle} checked={skillLength === 5} />
       
      </label> */}
      <IonToggle style={{marginLeft:"30px"}} checked={skillLength === 5} onIonChange={handleMultipleSkillsToggle}>  Multiple Skills</IonToggle>
    </div>


    <div style={{display:"flex",justifyContent:"space-between",marginTop:"30px"}}>
   
           <div style={{width:"30%",height:"65vh",overflow:"auto",display:"flex",justifyContent:"left",alignItems:"center",flexDirection:"column"}}>
           {departmentdata.map((department, index) => (
                <DepartmentComponent
                  key={index}
                  department={department}
                  onSelect={handleDepartmentSelect}
                />
              ))}
           </div>
             
           <div style={{width:"65%",height:"65vh",borderLeft:"1px solid #E4E4E4",overflow:"auto"}}>

           {selectedDepartment && (
                    <IonGrid>
                        <IonRow>
                            
                            <SubDepartmentComponent
                  subDepartments={SubDepartmentData.filter(subDept => subDept.department === selectedDepartment)}
                  onSelect={handleSubDepartmentSelect}
                />
                        </IonRow>
                    </IonGrid>
                
            
        )}
           </div>
        
     

    </div>
    <div style={{background:"#fff",padding:"10px",width:"100%",position:"fixed",bottom:0,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={()=>onSubmit(selectedDepartment,selectedSubDepartments)} title={"Submit"}/>

        </div>
        </div>

      
      
      </IonContent>
    </IonModal>
  );
};

export default DepartmentSelectModel;
