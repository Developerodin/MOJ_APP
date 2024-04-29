


import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { addOutline, arrowBack, bookOutline, createOutline, trash } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import EducationModel from "../../../components/Models/EducationModel";
import { EducationCard } from "../../../components/Cards/EducationCard/EducationCard";

export const ProfileEduction = () => {
    const history = useHistory()

    const handelBackClick = ()=>{
      history.goBack()
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const handelSaveClick= ()=>{
    //   history.push("/home")
    }
    
    return (
      <IonPage>
        <IonContent>
 
          <div style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={bookOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Education"}  />

          
               <div style={{padding:"5px"}}>

<div style={{marginTop:"30px"}} >
      <EducationCard />
</div>

<div style={{marginTop:"30px"}} >
      <EducationCard />
</div>






</div>

<div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleOpenModal} title={"Add"}/>

         </div>




             <EducationModel isOpen={isModalOpen} onClose={handleCloseModal} />
           
          </div>
        </IonContent>
      </IonPage>
    );
}



