import React, { useState } from 'react';
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


const FilterModal = ({ isOpen, onClose, onApply }) => {
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
              Cancel
            </IonButton>
          </IonButtons>
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Filter Jobs</div>
          <IonButtons slot="end">
            <IonButton onClick={handleApply} strong={true}>
              Apply
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
            City
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
            State
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
            Min Salary
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
            Max Salary
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
            Job Profile
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
            Job Type
          </label>
          <div style={{
              border: "1px solid #31363F",
              borderRadius: "50px",
              paddingLeft: "10px",
            }}>
          <IonSelect name="jobType" value={filters.jobType} onIonChange={(e) => handleSelectChange({ target: { name: 'jobType', value: e.detail.value } })}>
            <IonSelectOption value="">Any</IonSelectOption>
            <IonSelectOption value="Full Time">Full Time</IonSelectOption>
            <IonSelectOption value="Part Time">Part Time</IonSelectOption>
            <IonSelectOption value="Internship">Internship</IonSelectOption>
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
            <IonSelectOption value="">Any</IonSelectOption>
            <IonSelectOption value="10th">10th</IonSelectOption>
            <IonSelectOption value="12th">12th</IonSelectOption>
            <IonSelectOption value="Graduation">Graduation</IonSelectOption>
            <IonSelectOption value="Post Graduation">Post Graduation</IonSelectOption>
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
            <IonSelectOption value="">Any</IonSelectOption>
            <IonSelectOption value="Fresher">Fresher</IonSelectOption>
            <IonSelectOption value="Experienced">Experienced</IonSelectOption>
          </IonSelect>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FilterModal;
