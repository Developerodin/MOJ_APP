import React, { useEffect } from 'react';
import { IonCard, IonCardContent, IonLabel, IonRadio, IonRadioGroup, IonButton } from '@ionic/react';
import './PackageCard.css'; // Assuming you create this file for specific styles

const PackageCard = ({data, plan, price, benefits = [], selectedPlan, onPlanSelect }) => {
  useEffect(()=>{
      console.log("Data ==>",plan)
  },[])
  return (
    <IonCard className={`pricing-card ${selectedPlan === data.id ? 'selected' : ''}`} onClick={() => onPlanSelect(data.id)}>
      <IonCardContent>
        <IonLabel>
          <h2>{plan}</h2>
          <h1>{price}</h1>
        </IonLabel>
        
       
        <ul className="benefits-list">
          {benefits.map((benefit, index) => (
            <li key={index} className={benefit.included ? 'included' : 'not-included'}>
              {benefit.text}
            </li>
          ))}
        </ul>
      </IonCardContent>
    </IonCard>
  );
};

export default PackageCard;
