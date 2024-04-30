import React, { useContext, useEffect, useState } from "react";
import { IonPage, IonContent, IonLabel, IonIcon, IonButton } from "@ionic/react";
import { addOutline, bookOutline, calendarOutline, chevronBackOutline } from 'ionicons/icons';
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { EducationCard } from "../../components/Cards/EducationCard/EducationCard";
import EducationModel from "../../components/Models/EducationModel";
import { AppContext } from "../../Context/AppContext";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { ProfileHeaders } from "../../components/Headers/ProfileHeaders";

const Personalinfoedu = () => {
  const history = useHistory()
  const { showToast,editUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userRegisterDetails"));
const token =localStorage.getItem("token");
const [update,setUpdate] =  useState(0)
    const [educationData,setEducationData] = useState([])

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

    const getUserEduaction = async () => {
      try {
        const url = `${Base_url}user_education/By_userId/${userDetails.user_id}`;
        
      
  
        const response = await axios.get(url,{
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
       
          }
        });
        const data = response.data
            // console.log("Response check work experience data",data,response)
            
              if(data){
                console.log("Education data",data.data)
                setEducationData(data.data);
              }
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        showToast("error", "Try After Some Time", "");
      }
    };

    const UserWorkEducationDelete = async (id) => {
      try {
        const url = `${Base_url}user_education/delete/${id}`;
        
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
      getUserEduaction()
    },[update,editUpdate])
    
    return (
      <IonPage>
        <IonContent>
 
          <div style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={bookOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Education"}  />

          
               <div style={{padding:"5px"}}>


{
 educationData && educationData.map((el,index)=>{
    return  <div key={index} style={{marginTop:"30px"}} >
    <EducationCard  data={el} UserWorkEducationDelete={UserWorkEducationDelete}/>
   </div>
  })
}






</div>

<div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleOpenModal} title={"Add"}/>

         </div>




             <EducationModel isOpen={isModalOpen} onClose={handleCloseModal} setUpdate={setUpdate} />
           
          </div>
        </IonContent>
      </IonPage>
    );
};

export default Personalinfoedu;
