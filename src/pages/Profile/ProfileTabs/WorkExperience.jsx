import React, { useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { addOutline, arrowBack, bagHandleOutline, createOutline, trash } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import WorkExperienceModel from "../../../components/Models/WorkExperienceModel";
import { WorkExperienceCard } from "../../../components/Cards/WorkExperienceCard/WorkExperienceCard";
import { Base_url } from "../../../Config/BaseUrl";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";

export const ProfileWorkExperience = () => {
    const history = useHistory()
    const { showToast } = useContext(AppContext);
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
    const handelBackClick = ()=>{
      history.goBack()
    }
    return (
      <IonPage>
        <IonContent>
        {/* <IonButton onClick={handleOpenModal}>Open Form Modal</IonButton> */}
          <div style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Work experience"} />
                   
                   <div style={{padding:"5px"}}>

                   <div style={{marginTop:"30px"}} >
                   <WorkExperienceCard />
                  </div>

                  <div style={{marginTop:"30px"}} >
                   <WorkExperienceCard />
                  </div>

                  <div style={{marginTop:"30px"}} >
                   <WorkExperienceCard />
                  </div>

                


                  
                   </div>

                   <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleOpenModal} title={"Add"}/>

         </div>

                   {/* <div style={{marginTop:"40px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <IonButton onClick={handleOpenModal} style={{height:"50px",width:"50px"}}>
                      <IonIcon icon={addOutline} style={{fontSize:"24px",fontWeight:"bold"}}/>
                    </IonButton>
                   </div> */}
                 

           
          </div>

          <WorkExperienceModel isOpen={isModalOpen} onClose={handleCloseModal} />
        </IonContent>
      </IonPage>
    );
}



