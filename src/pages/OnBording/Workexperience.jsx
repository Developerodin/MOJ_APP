import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
  useIonRouter,
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
  const history = useIonRouter()
  const { showToast,editUpdate,languageUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || JSON.parse(localStorage.getItem("userRegisterDetails"));
const token =localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update,setUpdate] =  useState(0)
  const [experienceData,setExperoenceData] = useState([])
  const [userData,setUserData] = useState(null);
  const [userWorkExperience,setuserWorkExperience] =  useState("fresher");
  
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);
  
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
      // showToast("error", "Try After Some Time", "");
    }
  };

  const getUser = async () => {
    try {
      const url = `${Base_url}get_user/${userDetails.user_id}`;
      
    

      const response = await axios.get(url,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          // console.log("Response check work experience data",data,response)
          
            if(data){
              console.log("user  data ==>",data.data)
              const Data = data.data
              setUserData(Data);
              setuserWorkExperience(Data.work_ex)
            }

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
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
      // showToast("error", "Try After Some Time", "");
    }
  };

  const UpdateWorkExp = async (value) => {
    try {
      const url = `${Base_url}auth/work_up/${userDetails.user_id}`;
      const formData1 = new FormData();
      // formData1.append('role', Role);
      formData1.append('work_ex',value);
      // formData1.append('mobile_number', details.phoneNumber);
      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
              
              //  handelContinue("ProfilePic")
              setUpdate((prev)=>prev+1)
              getUser();
                showToast("success", "updated", "");
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelWorkexpChange=(e)=>{
    setuserWorkExperience(e.detail.value);
    UpdateWorkExp(e.detail.value);
  }

  useEffect(()=>{
    getUser()
    getUserWorkExperience()
  },[update,editUpdate])

  return (
    <IonPage>
    <IonContent>
    {/* <IonButton onClick={handleOpenModal}>Open Form Modal</IonButton> */}
      <div style={{ padding: "20px" }}>

           <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={ selectedLanguage === "English" ? "Work experience" : "कार्य अनुभव"} />
                
           
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
          
          { selectedLanguage === "English" ? "Do you have work experience or are you a fresher?" : "क्या आपके पास कार्य का अनुभव है या आप नये हैं?"}
        </label>
        <IonSelect
          value={userWorkExperience}
          onIonChange={(e) => handelWorkexpChange(e)}
          interface="popover"
          placeholder="Select Job Type"
          style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
        >
          <IonSelectOption value="fresher">{ selectedLanguage === "English" ? "I am a fresher" : "मैं एक नवसिखुआ हूँ"}</IonSelectOption>
          <IonSelectOption value="experienced"> { selectedLanguage === "English" ? "I have work experience" : "मेरे पास कार्य अनुभव है"}</IonSelectOption>
          {/* Add more job types as needed */}
        </IonSelect>
      </div>
           </div>



               <div style={{padding:"5px"}}>

{
userWorkExperience !== "fresher" && experienceData ? experienceData && experienceData.map((el,index)=>{
return  <div key={index} style={{marginTop:"30px"}} >
<WorkExperienceCard  data={el} UserWorkExperienceDelete={UserWorkExperienceDelete}/>
</div>
})
:
<div style={{marginTop:"30px"}}>

<span>
  
  { selectedLanguage === "English" ? "No Work Experience  Records Available" : "कोई कार्य अनुभव रिकॉर्ड उपलब्ध नहीं है"}
  </span>
</div>
}
              

              
            


              
               </div>

{

userWorkExperience === "experienced"  &&    <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleOpenModal} title={ selectedLanguage === "English" ? "Add" : "जोड़ें"}/>

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
