import React from 'react';
import { IonCard, IonCardContent, IonLabel, IonRadio, IonRadioGroup, IonButton } from '@ionic/react';
import './PackageCard.css'; // Assuming you create this file for specific styles

const PackageCard = ({ plan, price, benefits = [], selectedPlan, onPlanSelect }) => {
  return (
    <IonCard className={`pricing-card ${selectedPlan === plan ? 'selected' : ''}`} onClick={() => onPlanSelect(plan)}>
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
