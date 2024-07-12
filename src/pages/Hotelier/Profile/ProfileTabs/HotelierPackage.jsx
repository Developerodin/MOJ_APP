import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton,IonButton, useIonRouter } from '@ionic/react';
import PackageCard from '../../../../components/Cards/ActivityCards/PackageCard';


export const HotelierPackage = () => {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const history = useIonRouter()
  const plans = [
    {
      id:1,
      plan: 'Free',
      price: '₹ 0',
      benefits: [
        { text: 'All tools you need to manage payments', included: true },
        { text: 'No setup, monthly, or hidden fees', included: true },
      ]
    },
    {
      id:2,
      plan: 'Basic',
      price: '₹ 500',
      benefits: [
        { text: 'No setup, monthly, or hidden fees', included: true },
        { text: 'Comprehensive security', included: true },
        { text: 'Get hundreds of feature updates', included: true },
      ]
    },
    {
      id:3,
      plan: 'Premium',
      price: '₹ 1500',
      benefits: [
        { text: 'Financial reconciliation and reporting', included: true },
        { text: '24×7 phone, chat, and email support', included: false },
        { text: 'Robust developer platform', included: false },
      ]
    },
    {
      id:4,
      plan: 'Premium +',
      price: '₹ 2000',
      benefits: [
        { text: 'Payouts to your bank account', included: true },
        { text: 'Financial reconciliation and reporting', included: true },
        { text: '24×7 phone, chat, and email support', included: true },
        { text: 'Robust developer platform', included: true },
      ]
    }
  ];

  const handlePlanSelect = (id) => {
    setSelectedPlan(id);
  };

  const handleSavePlan = () => {
 
    localStorage.setItem('selectedPlan',selectedPlan);
   
    console.log("Plan saved:", selectedPlan);
    history.goBack();
  };

  useEffect(()=>{
 const id = localStorage.getItem('selectedPlan') || `1`
 setSelectedPlan(parseInt(id));
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Hotelier Package</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {plans.map((plan, index) => (
          <PackageCard
          data={plan}
            key={index}
            plan={plan.plan}
            price={plan.price}
            benefits={plan.benefits}
            selectedPlan={selectedPlan}
            onPlanSelect={handlePlanSelect}
          />
        ))}
       <IonButton expand="block" onClick={handleSavePlan}>Save Plan</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HotelierPackage;
