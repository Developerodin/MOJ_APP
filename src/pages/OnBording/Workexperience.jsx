import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { addOutline, arrowBack, bagHandleOutline, chevronBackOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { WorkExperienceCard } from "../../components/Cards/WorkExperienceCard/WorkExperienceCard";
import WorkExperienceModel from "../../components/Models/WorkExperienceModel";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { AppContext } from "../../Context/AppContext";
import { ProfileHeaders } from "../../components/Headers/ProfileHeaders";

const  Workexperience = () => {
  const history = useHistory()
  const { showToast,editUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userRegisterDetails"));
const token =localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update,setUpdate] =  useState(0)
  const [experienceData,setExperoenceData] = useState([])
 
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

  const getUserWorkExperience = async () => {
    try {
      const url = `${Base_url}user_work_ex/By_userId/${userDetails.user_id}`;
      
    

      const response = await axios.get(url,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          // console.log("Response check work experience data",data,response)
          
            if(data){
              console.log("work experience data",data.data)
              setExperoenceData(data.data);
            }

            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
    }
  };

  const UserWorkExperienceDelete = async (id) => {
    try {
      const url = `${Base_url}user_work_ex/delete/${id}`;
      
       const formData = new FormData();

      const response = await axios.post(url,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          // console.log("Response check work experience data",data,response)
          
            if(data.status === "success"){
              console.log("work experience delete",data.data)
              setUpdate((pre)=>pre+1)
            }

            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
    }
  };

  useEffect(()=>{
    getUserWorkExperience()
  },[update,editUpdate])
  return (
    <IonPage>
      <IonContent>
      {/* <IonButton onClick={handleOpenModal}>Open Form Modal</IonButton> */}
        <div style={{ padding: "20px" }}>

             <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Work experience"} />
                 
                 <div style={{padding:"5px"}}>

{
experienceData && experienceData.map((el,index)=>{
  return  <div key={index} style={{marginTop:"30px"}} >
  <WorkExperienceCard  data={el} UserWorkExperienceDelete={UserWorkExperienceDelete}/>
 </div>
})
}
                

                
              


                
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

        <WorkExperienceModel isOpen={isModalOpen} onClose={handleCloseModal} setUpdate={setUpdate} />
      </IonContent>
    </IonPage>
  )
};

export default Workexperience;
