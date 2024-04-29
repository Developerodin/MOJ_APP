import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { addOutline, arrowBack, chevronBackOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { WorkExperienceCard } from "../../components/Cards/WorkExperienceCard/WorkExperienceCard";
import WorkExperienceModel from "../../components/Models/WorkExperienceModel";

const  Workexperience = () => {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handelBtnClick= ()=>{
    history.replace('/home');
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
            Work experience
          </h1>
             
          <div style={{marginTop:"30px"}} >
                   <WorkExperienceCard />
                  </div>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
  <IonButton onClick={handleOpenModal}>
    <IonIcon icon={addOutline} />
  </IonButton>
</div>
        </div>
        <div style={{ marginTop:"20px",display:"flex",justifyContent:"center",alignItems:"center"}}>

<CustomBtn1 fun={handelBackClick} title={"Save"}/>
</div>
<WorkExperienceModel isOpen={isModalOpen} onClose={handleCloseModal} />
      </IonContent>
    </IonPage>
  );
};

export default Workexperience;
