import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
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
  const [userWorkExperience,setuserWorkExperience] =  useState("fresher");
 
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
                 
             <div>
               <div style={{ marginTop: "20px" }}>
            <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Do you have work experience or are you a fresher?
            </label>
            <IonSelect
              value={userWorkExperience}
              onIonChange={(e) => setuserWorkExperience(e.detail.value)}
              interface="popover"
              placeholder="Select Job Type"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              <IonSelectOption value="fresher">I am a fresher</IonSelectOption>
              <IonSelectOption value="experienced">I have work experience</IonSelectOption>
              {/* Add more job types as needed */}
            </IonSelect>
          </div>
               </div>
                 <div style={{padding:"5px"}}>

                 {
experienceData ? experienceData && experienceData.map((el,index)=>{
    return  <div key={index} style={{marginTop:"30px"}} >
    <WorkExperienceCard  data={el} UserWorkExperienceDelete={UserWorkExperienceDelete}/>
   </div>
  })
  :
  <div style={{marginTop:"30px"}}>

  <span>Add Work Experience</span>
 </div>
}
                

                
              


                
                 </div>

                 {

userWorkExperience === "experienced"  &&   <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleOpenModal} title={"Add"}/>

       </div>

                 }
                

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
