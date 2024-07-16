import React, { useState,useContext,useEffect } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonItem,
} from '@ionic/react';
import { AppContext } from '../../Context/AppContext';


const FilterModal = ({ isOpen, onClose, onApply }) => {
  const { languageUpdate } = useContext(AppContext);
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    minSalary: '',
    maxSalary: '',
    jobProfile: '',
    jobType: '',
    education: '',
    experience: '',
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
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const updatedFilters = {
      ...filters,
      minSalary: filters.minSalary ? parseInt(filters.minSalary, 10) : '',
      maxSalary: filters.maxSalary ? parseInt(filters.maxSalary, 10) : '',
    };
    onApply(updatedFilters);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={onClose}>
              {selectedLanguage === "English" ? "Cancel" : "रद्द करें"}
            </IonButton>
          </IonButtons>
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>{selectedLanguage === "English" ? "Filter Jobs" : "नौकरियां फ़िल्टर करें"}</div>
          <IonButtons slot="end">
            <IonButton onClick={handleApply} strong={true}>
            {selectedLanguage === "English" ? "Apply" : "लागू करें"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
            {selectedLanguage === "English" ? "City" : "शहर"}
          </label>
          <input
            className="round-input"
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
          />
        </div>
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
            {selectedLanguage === "English" ? "State" : "राज्य"}
          </label>
          <input
            className="round-input"
            type="text"
            name="state"
            value={filters.state}
            onChange={handleChange}
          />
        </div>
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
            {selectedLanguage === "English" ? "Min Salary" : "न्यूनतम वेतन"}
          </label>
          <input
            className="round-input"
            type="number"
            name="minSalary"
            value={filters.minSalary}
            onChange={handleChange}
          />
        </div>
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
            {selectedLanguage === "English" ? "Max Salary" : "अधिकतम वेतन"}
          </label>
          <input
            className="round-input"
            type="number"
            name="maxSalary"
            value={filters.maxSalary}
            onChange={handleChange}
          />
        </div>
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
            {selectedLanguage === "English" ? "Job Profile" : "नौकरी का प्रोफ़ाइल"}
          </label>
          <input
            className="round-input"
            type="text"
            name="jobProfile"
            value={filters.jobProfile}
            onChange={handleChange}
          />
        </div>
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
            {selectedLanguage === "English" ? "Job Type" : "नौकरी का प्रकार"}
          </label>
          <div style={{
              border: "1px solid #31363F",
              borderRadius: "50px",
              paddingLeft: "10px",
            }}>
          <IonSelect name="jobType" value={filters.jobType} onIonChange={(e) => handleSelectChange({ target: { name: 'jobType', value: e.detail.value } })}>
            <IonSelectOption value="">{selectedLanguage === "English" ? "Any" : "कोई भी"}</IonSelectOption>
            <IonSelectOption value="Full Time">{selectedLanguage === "English" ? "Full Time" : "पूर्ण समय"}</IonSelectOption>
            <IonSelectOption value="Part Time">{selectedLanguage === "English" ? "Part Time" : "अंशकालिक"}</IonSelectOption>
            <IonSelectOption value="Internship">{selectedLanguage === "English" ? "Internship" : "इंटर्नशिप"}</IonSelectOption>
          </IonSelect>
          </div>
        </div>
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
            Education
          </label>
          <div style={{
              border: "1px solid #31363F",
              borderRadius: "50px",
              paddingLeft: "10px",
            }}>
          <IonSelect name="education" value={filters.education} onIonChange={(e) => handleSelectChange({ target: { name: 'education', value: e.detail.value } })}>
            <IonSelectOption value="">{selectedLanguage === "English" ? "Any" : "कोई भी"}</IonSelectOption>
            <IonSelectOption value="10th">10th</IonSelectOption>
            <IonSelectOption value="12th">12th</IonSelectOption>
            <IonSelectOption value="Graduation">{selectedLanguage === "English" ? "Graduation" : "स्नातक"}</IonSelectOption>
            <IonSelectOption value="Post Graduation">{selectedLanguage === "English" ? "Post Graduation" : "स्नातकोत्तर"}</IonSelectOption>
          </IonSelect>
          </div>
        </div>
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
            Experience
          </label>
          <div style={{
              border: "1px solid #31363F",
              borderRadius: "50px",
              paddingLeft: "10px",
            }}>
          <IonSelect name="experience" value={filters.experience} onIonChange={(e) => handleSelectChange({ target: { name: 'experience', value: e.detail.value } })}>
            <IonSelectOption value="">{selectedLanguage === "English" ? "Any" : "कोई भी"}</IonSelectOption>
            <IonSelectOption value="Fresher">{selectedLanguage === "English" ? "Fresher" : "फ्रेशर"}</IonSelectOption>
            <IonSelectOption value="Experienced">{selectedLanguage === "English" ? "Experienced" : "अनुभवी"}</IonSelectOption>
          </IonSelect>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FilterModal;
