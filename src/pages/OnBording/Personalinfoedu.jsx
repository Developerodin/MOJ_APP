import React, { useState } from "react";
import { IonPage, IonContent, IonLabel, IonIcon, IonButton } from "@ionic/react";
import { addOutline, calendarOutline, chevronBackOutline } from 'ionicons/icons';
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { EducationCard } from "../../components/Cards/EducationCard/EducationCard";
import EducationModel from "../../components/Models/EducationModel";

const Personalinfoedu = () => {
  const history = useHistory()
  const [yearGraduated, setYearGraduated] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  const handleYearChange = (event) => {
    setYearGraduated(event.target.value);
  };



  const handelBtnClick= ()=>{
    history.push("/work")
  }
  const handelBackClick = ()=>{
    history.goBack()
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: "20px" }}>
        <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
          <h1
            style={{
              color: "#232323",
              fontSize: "30px",
              fontFamily: "inter",
              fontWeight: "700",
            }}
          >
            Education
          </h1>

          <div style={{padding:"5px"}}>

<div style={{marginTop:"30px"}} >
      <EducationCard />
</div>


<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
  <IonButton onClick={handleOpenModal}>
    <IonIcon icon={addOutline} />
  </IonButton>
</div>






</div> 
        </div>
        <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <CustomBtn1 fun={handelBackClick} title={"Proceed"} />
          
          
        </div>
        <EducationModel isOpen={isModalOpen} onClose={handleCloseModal} />
      </IonContent>
    </IonPage>
  );
};

export default Personalinfoedu;
