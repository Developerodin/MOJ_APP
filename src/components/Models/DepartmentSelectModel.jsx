import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonToggle,
} from '@ionic/react';
import { chevronBackOutline, bookOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

const DepartmentSelectModel = ({ isOpen, onClose, onSubmit, departmentValue, department }) => {
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || localStorage.getItem("userRegisterDetails"));
  const token = localStorage.getItem("token");

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState({});
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [skillLength, setSkillLength] = useState(1); // Default to single skill
  const [departmentData, setDepartmentData] = useState([]);
  const [subDepartmentData, setSubDepartmentData] = useState([]);
  const [removeSelectedDepartment,setremoveSelectedDepartment] = useState("");
  const [removeSelectedDepartmentClick,setremoveSelectedDepartmentClick] = useState(0);
  const handleSkillToggle = (length) => {
    setSkillLength(length);
    setSelectedDepartments([]);
    setSelectedSubDepartments({});
    if (departmentData.length > 0) {
      setActiveDepartment(departmentData[0].name);
    }
  };

  const handleDepartmentSelect = (departmentName) => {
    if (skillLength === 1) {
      setSelectedDepartments([departmentName]);
      setActiveDepartment(departmentName);
      setSelectedSubDepartments(prevSelectedSubDepartments => {
        const { [departmentName]: prevSubDepartments, ...rest } = prevSelectedSubDepartments;
        return { [departmentName]: prevSubDepartments || [] };
      });
    } else {
      setSelectedDepartments(prevSelectedDepartments => {
        const prevDeps = Array.isArray(prevSelectedDepartments) ? prevSelectedDepartments : [];
        
        if (prevDeps.includes(departmentName)) {
          const updatedDepartments = prevDeps.filter(dep => dep !== departmentName);
          const { [departmentName]: _, ...updatedSubDepartments } = selectedSubDepartments;
          setSelectedSubDepartments(updatedSubDepartments);
          setActiveDepartment(updatedDepartments[0] || null);
          return updatedDepartments;
        } else {
          const newDepartments = [...prevDeps, departmentName];
          if (newDepartments.length <= skillLength) {
            setActiveDepartment(departmentName);
            return newDepartments;
          } else {
            showToast("error", `You can only select up to ${skillLength} departments`);
            return prevDeps;
          }
        }
      });
    }
  };
  
  
  

  const handleSubDepartmentSelect = (departmentName, subDepartment) => {
    
    // if(Object.values(selectedSubDepartments).flat().length >= 5){
    //   showToast("error", "You can select up to 5 skill only", "");
    //   return
    // }
    setSelectedSubDepartments(prevSelectedSubDepartments => {
      const departmentSubDepartments = prevSelectedSubDepartments[departmentName] || [];
      const isAlreadySelected = departmentSubDepartments.some(selectedSubDept => selectedSubDept.sub_department === subDepartment.sub_department);

      if (!isAlreadySelected) {

        console.log("LEngth check ========================>",Object.values(selectedSubDepartments).flat().length,departmentSubDepartments.length , skillLength)
        if (Object.values(selectedSubDepartments).flat().length < skillLength) {
          if (skillLength === 1 && departmentSubDepartments.length >= 1) {
            showToast("error", `You can only select one sub-department for single skill`);
            return prevSelectedSubDepartments;
          }
          return {
            ...prevSelectedSubDepartments,
            [departmentName]: [...departmentSubDepartments, subDepartment]
          };
        } else {
          showToast("error", `You can only select up to ${skillLength} sub-departments`);
          return prevSelectedSubDepartments;
        }
      } else {
        return {
          ...prevSelectedSubDepartments,
          [departmentName]: departmentSubDepartments.filter(selectedSubDept => selectedSubDept.sub_department !== subDepartment.sub_department)
        };
      }
    });
  };

  const DepartmentComponent = ({ department, onSelect }) => {
    const isDepartmentSelected = selectedDepartments.includes(department.name);
    const isActive = activeDepartment === department.name;

    return (
      <div
        style={{
          border: isDepartmentSelected ? "1px solid blue" : "1px solid #E4E4E4",
          color: isDepartmentSelected ? "blue" : "black",
          padding: "10px",
          marginTop: "20px",
          width: "100%",
          borderRadius: "8px",
          backgroundColor: isActive ? "lightblue" : "white"
        }}
        onClick={() => onSelect(department.name)}
      >
        <span style={{ fontSize: "14px" }}>{department.name}</span>
      </div>
    );
  };

  const SubDepartmentComponent = ({ departmentName, subDepartments, onSelect }) => {
    const selectedDepartmentSubDepartments = selectedSubDepartments[departmentName] || [];
    const isSubDepartmentSelected = (subDepartment) =>
      selectedDepartmentSubDepartments.some((selectedSubDept) => selectedSubDept.sub_department === subDepartment.sub_department);

    return subDepartments.map((subDepartment) => (
      <IonCol size="6" key={subDepartment.sub_department}>
        <div
          onClick={() => onSelect(departmentName, subDepartment)}
          style={{
            border: isSubDepartmentSelected(subDepartment) ? "1px solid blue" : "1px solid #E4E4E4",
            color: isSubDepartmentSelected(subDepartment) ? "blue" : "black",
            padding: "10px",
            marginTop: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            height: "80px",
            overflow: "auto"
          }}
        >
          <span style={{ fontSize: "14px" }}>{subDepartment.sub_department}</span>
        </div>
      </IonCol>
    ));
  };

  const handleSubmit = () => {
    console.log("Department Values ===>", selectedDepartments, selectedSubDepartments);
    if (selectedDepartments.length > 0 && Object.values(selectedSubDepartments).flat().length > 0) {
      onSubmit(selectedDepartments, Object.values(selectedSubDepartments).flat());
    } else {
      showToast("error", "Select at least one skill", "");
    }
  };

  const getDepartmentData = async () => {
    try {
      const url = `${Base_url}user/job_pref`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      const data = response.data;

      if (data.status === "success") {
        const Data = data.post;
        const uniqueDepartments = Array.from(new Set(Data.map(item => item.department)));
        const departmentsArray = uniqueDepartments.map(department => ({ name: department }));

        setDepartmentData(departmentsArray);
        setSubDepartmentData(Data);
        if (departmentsArray.length > 0) {
          setActiveDepartment(departmentsArray[0].name);
          setSelectedDepartments([departmentsArray[0].name]);
        }
      } else {
        showToast("error", "Try After Some Time", "");
      }
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
    }
  };

  useEffect(() => {
    getDepartmentData();

    // if (departmentValue !== "") {
    //   const departmentArray = departmentValue.split(", ");
    //   if (departmentArray.length > 1) {
    //     setSkillLength(5);
    //   }
    //   const matchingDepartments = subDepartmentData.filter(item => departmentArray.includes(item.sub_department));
    //   console.log("matching Department ================>",matchingDepartments);
    //   setSelectedSubDepartments(matchingDepartments);
    // }
  }, [isOpen]);

  useEffect(() => {
   
    if(department && department.length >0){
      setSelectedDepartments(department)
    }

    if (departmentValue && typeof departmentValue === "string" && departmentValue !== "") {
      const departmentArray = departmentValue.split(", ");
      if (departmentArray.length > 1) {
        setSkillLength(departmentArray.length);
      }
  
      // Filter subDepartmentData based on departmentArray
      const matchingDepartments = subDepartmentData.filter(item => departmentArray.includes(item.sub_department));
  
      // Initialize an object to hold grouped data
      const groupedDepartments = {};
  
      // Group objects by department
      matchingDepartments.forEach(item => {
        if (!groupedDepartments[item.department]) {
          groupedDepartments[item.department] = [];
        }
        groupedDepartments[item.department].push(item);
      });
  
      // Log or use groupedDepartments as needed
      console.log("Grouped Departments:", groupedDepartments);
  
      // Example of setting state if you need it
      setSelectedSubDepartments(groupedDepartments);
    }
  }, [isOpen, departmentValue, subDepartmentData]);



  useEffect(()=>{
    console.log("Department previous ======>",department)
   console.log("Department Seelcted ======================>",selectedDepartments);
   console.log("Department Values Selected ======================>",selectedSubDepartments);
  },[isOpen])

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <div>
            <IonIcon onClick={onClose} icon={chevronBackOutline} style={{ fontSize: "24px" }} />
          </div>
          <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
              <IonIcon icon={bookOutline} style={{ fontSize: "24px", color: "#395CFF" }} />
              <div style={{ marginLeft: "20px" }}>
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>Department</span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "20px" }}>{Object.values(selectedSubDepartments).flat().length}/{skillLength}</span>
            </div>
          </div>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "grey" }}>
            <span>Department will help us match you with job posting</span>
          </div>
          <div style={{ marginTop: "30px" }}>
            <IonToggle checked={skillLength === 1} onIonChange={() => handleSkillToggle(1)}>Single Skill</IonToggle>
            <IonToggle style={{ marginLeft: "30px" }} checked={skillLength === 5} onIonChange={() => handleSkillToggle(5)}>Multiple Skills</IonToggle>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <div style={{ width: "30%", height: "65vh", overflow: "auto", display: "flex", justifyContent: "left", alignItems: "center", flexDirection: "column" }}>
              {departmentData.map((department, index) => (
                <DepartmentComponent
                  key={index}
                  department={department}
                  onSelect={handleDepartmentSelect}
                />
              ))}
            </div>
            <div style={{ width: "65%", height: "62vh", borderLeft: "1px solid #E4E4E4", overflow: "auto" }}>
              {activeDepartment && (
                <IonGrid>
                  <IonRow>
                    <SubDepartmentComponent
                      departmentName={activeDepartment}
                      subDepartments={subDepartmentData.filter(subDept => subDept.department === activeDepartment)}
                      onSelect={handleSubDepartmentSelect}
                    />
                  </IonRow>
                </IonGrid>
              )}
            </div>
          </div>
        </div>
        <div style={{ padding: "0px 20px", display: "flex", justifyContent: "space-between"  }}>
          <IonButton onClick={onClose}>Cancel</IonButton>
          <IonButton onClick={handleSubmit}>Submit</IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default DepartmentSelectModel;
