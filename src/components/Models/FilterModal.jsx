import React, { useState } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption
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
    experience: ''
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

  if (!isOpen) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={onClose}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Filter Jobs</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleApply} strong={true}>
              Apply
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">City</IonLabel>
          <IonInput type="text" name="city" value={filters.city} onIonChange={handleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">State</IonLabel>
          <IonInput type="text" name="state" value={filters.state} onIonChange={handleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Min Salary</IonLabel>
          <IonInput type="number" name="minSalary" value={filters.minSalary} onIonChange={handleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Max Salary</IonLabel>
          <IonInput type="number" name="maxSalary" value={filters.maxSalary} onIonChange={handleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Job Profile</IonLabel>
          <IonInput type="text" name="jobProfile" value={filters.jobProfile} onIonChange={handleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Job Type</IonLabel>
          <IonSelect name="jobType" value={filters.jobType} onIonChange={(e) => handleSelectChange({ target: { name: 'jobType', value: e.detail.value }})}>
            <IonSelectOption value="">Any</IonSelectOption>
            <IonSelectOption value="Full Time">Full Time</IonSelectOption>
            <IonSelectOption value="Part Time">Part Time</IonSelectOption>
            <IonSelectOption value="Internship">Internship</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Education</IonLabel>
          <IonSelect name="education" value={filters.education} onIonChange={(e) => handleSelectChange({ target: { name: 'education', value: e.detail.value }})}>
            <IonSelectOption value="">Any</IonSelectOption>
            <IonSelectOption value="10th">10th</IonSelectOption>
            <IonSelectOption value="12th">12th</IonSelectOption>
            <IonSelectOption value="Graduation">Graduation</IonSelectOption>
            <IonSelectOption value="Post Graduation">Post Graduation</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Experience</IonLabel>
          <IonSelect name="experience" value={filters.experience} onIonChange={(e) => handleSelectChange({ target: { name: 'experience', value: e.detail.value }})}>
            <IonSelectOption value="">Any</IonSelectOption>
            <IonSelectOption value="Fresher">Fresher</IonSelectOption>
            <IonSelectOption value="Experienced">Experienced</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default FilterModal;
